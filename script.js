/* ==========================================================
   CONFIGURACIÓN
========================================================== */


/*
    ========================================================
    ===== EDITAR AQUÍ: MENSAJES =====
    ========================================================
*/

const MENSAJE_EXITO =
    "¡Registro completado correctamente!";


const MENSAJE_ERROR =
    "Ha ocurrido un error. Inténtalo de nuevo.";


const MENSAJE_CAMPOS =
    "Por favor, completa todos los campos.";


const MENSAJE_ENVIANDO =
    "Enviando...";


/*
    ========================================================
    ELEMENTOS HTML
    ========================================================
*/

const formulario =
    document.getElementById(
        "registrationForm"
    );


const nombre =
    document.getElementById(
        "firstName"
    );


const apellidos =
    document.getElementById(
        "lastName"
    );


const boton =
    document.getElementById(
        "submitButton"
    );


const mensaje =
    document.getElementById(
        "message"
    );


/*
    ========================================================
    MOSTRAR MENSAJE
    ========================================================
*/

function mostrarMensaje(
    texto,
    tipo
) {

    mensaje.textContent =
        texto;

    mensaje.className =
        "message " + tipo;
}


/*
    ========================================================
    FORMULARIO
    ========================================================
*/

formulario.addEventListener(
    "submit",
    function(event) {

        /*
            Evita recargar la página
        */

        event.preventDefault();


        /*
            Obtener valores
        */

        const nombreValor =
            nombre.value.trim();


        const apellidosValor =
            apellidos.value.trim();


        /*
            Validar
        */

        if (
            !nombreValor ||
            !apellidosValor
        ) {

            mostrarMensaje(
                MENSAJE_CAMPOS,
                "error"
            );

            return;
        }


        /*
            Mostrar estado
        */

        boton.disabled =
            true;

        boton.textContent =
            MENSAJE_ENVIANDO;


        /*
            ==================================================
            DEMOSTRACIÓN

            En esta primera versión GitHub solamente
            recibe el formulario.

            Aquí conectaremos posteriormente el servicio
            de email.

            ==================================================
        */

        console.log(
            "Nombre:",
            nombreValor
        );


        console.log(
            "Apellidos:",
            apellidosValor
        );


        /*
            Simular envío
        */

        setTimeout(
            function() {

                mostrarMensaje(
                    MENSAJE_EXITO,
                    "success"
                );


                formulario.reset();


                boton.disabled =
                    false;


                boton.textContent =
                    "Registrarse";

            },
            800
        );

    }
);
