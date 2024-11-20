document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);

    // Information about the movie
    const movieTitleElement = document.querySelector('.movie-title__text');
    const sessionDetailsElement = document.querySelector('.session-details');
    const bannerImageElement = document.querySelector('.movie-details__background-image');
    const totalDisplay = document.getElementById('total-value');

    // Initialize ticket price and cart total
    let ticketTotal = parseFloat(params.get('totalPrice')) || 0;
    let cartTotal = ticketTotal;
    const cartItems = {}; // Object to track quantities of each product

    // Function to update the total display
    const updateTotalDisplay = () => {
        if (totalDisplay) {
            totalDisplay.textContent = `${cartTotal.toFixed(2)} €`;
        }
    };

    // Initialize total display
    updateTotalDisplay();

    // Render movie information
    if (movieTitleElement) {
        movieTitleElement.textContent = params.get('movieTitle') || "SIN TÍTULO";
    }

    if (sessionDetailsElement) {
        sessionDetailsElement.innerHTML = `
            <p>CINE: ${params.get('cineName') || "Sin cine"}</p>
            <p>SESIÓN: ${params.get('date') || "Fecha no disponible"}, ${params.get('time') || "Hora no disponible"}</p>
        `;
    }

    if (bannerImageElement) {
        const bannerImage = params.get('bannerImage');
        if (bannerImage) {
            bannerImageElement.src = bannerImage;
        } else {
            console.warn("No banner image provided.");
        }
    }

    const productsContainer = document.querySelector('.products-bar__items');
    const categoriesContainer = document.querySelector('.products-bar__categories ul');

    // Load products by category
    const loadProducts = async (category = "") => {
        try {
            const response = await fetch(`http://localhost:5006/api/Productos/GetProductos?categoria=${encodeURIComponent(category)}`);
            if (!response.ok) throw new Error("Failed to load bar products.");

            const products = await response.json();
            if (!productsContainer) {
                console.error("Products container not found.");
                return;
            }

            productsContainer.innerHTML = ""; // Clear previous products

            if (products.length === 0) {
                productsContainer.innerHTML = `
                    <p class="no-products-message">No products available in this category.</p>
                `;
                return;
            }

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card__button';
                productCard.innerHTML = `
                    <div class="product-card__image-container">
                        <img src="${product.imagenUrl}" alt="${product.nombre}" class="product-card__image">
                    </div>
                    <div class="product-card__details">
                        <span class="product-card__name">${product.nombre}</span>
                        <span class="product-card__price">${product.precio.toFixed(2)} €</span>
                        <div class="product-card__quantity">
                            <button class="product-card__add-button" data-id="${product.id}" data-price="${product.precio}" data-action="decrease">-</button>
                            <span class="quantity-display" data-id="${product.id}">x0</span>
                            <button class="product-card__add-button" data-id="${product.id}" data-price="${product.precio}" data-action="increase">+</button>
                        </div>
                    </div>
                    <p class="product-card__description">Check allergens on our website or ask staff.</p>
                `;
                productsContainer.appendChild(productCard);
            });

            // Add events to "Add" and "Remove" buttons
            const addButtons = document.querySelectorAll('.product-card__add-button');
            addButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.id;
                    const productPrice = parseFloat(button.dataset.price);
                    const action = button.dataset.action;
                    const quantityDisplay = document.querySelector(`.quantity-display[data-id="${productId}"]`);

                    if (!cartItems[productId]) {
                        cartItems[productId] = 0;
                    }

                    if (action === "increase") {
                        cartItems[productId]++;
                        cartTotal += productPrice;
                    } else if (action === "decrease" && cartItems[productId] > 0) {
                        cartItems[productId]--;
                        cartTotal -= productPrice;
                    }

                    if (cartItems[productId] < 0) {
                        cartItems[productId] = 0;
                    }

                    if (quantityDisplay) {
                        quantityDisplay.textContent = `x${cartItems[productId]}`;
                    }

                    updateTotalDisplay();
                });
            });
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    // Load categories
    const loadCategories = async () => {
        try {
            const response = await fetch("http://localhost:5006/api/Productos/GetCategorias");
            if (!response.ok) throw new Error("Failed to load categories.");

            const categories = await response.json();
            if (!categoriesContainer) {
                console.error("Categories container not found.");
                return;
            }

            categoriesContainer.innerHTML = ""; // Clear previous categories

            categories.forEach(category => {
                const categoryItem = document.createElement("li");
                const categoryLink = document.createElement("a");
                categoryLink.textContent = category;
                categoryLink.href = "#";
                categoryLink.className = "category-link";
                categoryLink.dataset.category = category;

                categoryLink.addEventListener("click", async (e) => {
                    e.preventDefault();
                    await loadProducts(category); // Filter products by category
                    document.querySelectorAll(".category-link").forEach(link => link.classList.remove("active"));
                    categoryLink.classList.add("active");
                });

                categoryItem.appendChild(categoryLink);
                categoriesContainer.appendChild(categoryItem);
            });

            // Load products from the first category by default
            if (categories.length > 0) {
                const firstCategoryLink = categoriesContainer.querySelector('.category-link');
                if (firstCategoryLink) {
                    firstCategoryLink.classList.add('active');
                    await loadProducts(categories[0]);
                }
            }
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    };

    // Load categories and initialize
    await loadCategories();

    // Continue Button
    const continueButton = document.getElementById("continue-btn");
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            params.set('cartTotal', cartTotal.toFixed(2));
            window.location.href = `/cine_web_app/front-end/views/Compra/guest-purchase.html?${params.toString()}`;
        });
    }
});