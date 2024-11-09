document.addEventListener("DOMContentLoaded", function() {
    const languageToggle = document.getElementById("language-toggle");
    const languageDropdown = document.querySelector(".header__language-dropdown");
    const languageOption = document.querySelector(".header__language-option");
    const currentLanguageSpan = document.getElementById("current-language");

    // Inicializar el idioma actual
    let currentLanguage = "en";
    updateLanguageOption();

    // Mostrar/Ocultar el menú desplegable al hacer clic en el botón
    languageToggle.addEventListener("click", function(event) {
        event.stopPropagation(); // Evita que el clic se propague y cierre el menú automáticamente
        languageDropdown.style.display = languageDropdown.style.display === "block" ? "none" : "block";
    });

    // Cambiar el idioma al hacer clic en la opción del menú
    languageOption.addEventListener("click", function() {
        currentLanguage = currentLanguage === "en" ? "es" : "en";
        currentLanguageSpan.textContent = currentLanguage === "en" ? "English" : "Español";
        translateContent(currentLanguage);
        languageDropdown.style.display = "none"; // Cerrar el menú después de seleccionar
        updateLanguageOption(); // Actualizar la opción del menú desplegable
    });

    // Cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener("click", function(event) {
        if (!languageToggle.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });

    // Función para traducir el contenido
    function translateContent(language) {
        document.querySelectorAll("[data-en]").forEach(element => {
            element.textContent = element.getAttribute(`data-${language}`);
        });
    }

    // Función para actualizar la opción de idioma en el menú desplegable
    function updateLanguageOption() {
        languageOption.textContent = currentLanguage === "en" ? "Español" : "English";
        languageOption.setAttribute("data-language", currentLanguage === "en" ? "es" : "en");
    }
});
