document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el formulario de registro
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("name").value;
            const correo = document.getElementById("email").value;
            const contraseña = document.getElementById("password").value;

            try {
                const response = await fetch("https://localhost:5006/api/auth/register", { // URL del endpoint
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, contraseña })
                });

                if (response.ok) {
                    const result = await response.text();
                    alert(result);
                } else {
                    const errorText = await response.text();
                    alert(`Error en el registro: ${errorText}`);
                }
            } catch (error) {
                console.error("Error en la solicitud de registro:", error);
                alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
            }
        });
    } else {
        console.warn("Formulario de registro no encontrado en el DOM.");
    }

    // Selecciona el formulario de inicio de sesión
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const correo = document.getElementById("login-email").value;
            const contraseña = document.getElementById("login-password").value;

            try {
                const response = await fetch("https://localhost:5006/api/auth/login", { // URL del endpoint
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correo, contraseña })
                });

                if (response.ok) {
                    alert("Inicio de sesión exitoso.");
                } else {
                    const errorText = await response.text();
                    alert(`Error en el inicio de sesión: ${errorText}`);
                }
            } catch (error) {
                console.error("Error en la solicitud de inicio de sesión:", error);
                alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
            }
        });
    } else {
        console.warn("Formulario de inicio de sesión no encontrado en el DOM.");
    }
});
