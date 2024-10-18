// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    // Manejo del evento de envío del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario

        // Capturamos los valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const edad = document.getElementById("edad").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const genero = document.querySelector('input[name="genero"]:checked');
        const intereses = document.querySelectorAll('input[name="intereses"]:checked');

        // Validaciones
        if (!esValidoNombre(nombre)) {
            alert("El nombre solo debe contener letras y espacios.");
            return;
        }

        if (!esValidaEdad(edad)) {
            alert("La edad debe ser mayor que 0.");
            return;
        }

        if (!esValidoEmail(email)) {
            alert("Introduce un correo electrónico válido.");
            return;
        }

        if (!esValidaPassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (!coincidenPasswords(password, confirmPassword)) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!genero) {
            alert("Debes seleccionar un género.");
            return;
        }

        if (intereses.length === 0) {
            alert("Debes seleccionar al menos un interés.");
            return;
        }

        // Mostrar los datos en la página
        mostrarDatosEnPagina({ nombre, edad, email, genero: genero.value, intereses });
    });

    // Validación del nombre
    const esValidoNombre = (nombre) => /^[a-zA-Z\s]+$/.test(nombre);

    // Validación de la edad
    const esValidaEdad = (edad) => Number(edad) > 0;

    // Validación del correo electrónico
    const esValidoEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validación de la contraseña
    const esValidaPassword = (password) => password.length >= 8;

    // Verificar que ambas contraseñas coinciden
    const coincidenPasswords = (password, confirmPassword) => password === confirmPassword;

    // Función para mostrar los datos en la página
    const mostrarDatosEnPagina = ({ nombre, edad, email, genero, intereses }) => {
        const resultadosDiv = document.getElementById("resultados");

        // Obtenemos los intereses seleccionados
        const interesesSeleccionados = Array.from(intereses).map(interes => interes.value).join(", ");

        // Creamos el contenido dinámico
        const contenido = `
            <h2>Datos ingresados</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Edad:</strong> ${edad}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Género:</strong> ${genero}</p>
            <p><strong>Intereses:</strong> ${interesesSeleccionados}</p>
        `;

        // Insertamos el contenido en el contenedor de resultados
        resultadosDiv.innerHTML = contenido;
    };
});
