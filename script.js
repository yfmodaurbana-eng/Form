/* ============================================================
   CONFIGURACIÓN
   ============================================================

   EDITA AQUÍ LOS DATOS DE CONFIGURACIÓN.

   IMPORTANTE:
   El email de destino NO debe utilizarse directamente desde
   el navegador para enviar mensajes.

   El valor de EMAIL_DESTINO sirve como referencia para tu
   backend.

============================================================ */


/* ============================================================
   EDITAR: EMAIL DE DESTINO
============================================================ */

const EMAIL_DESTINO = "tu-email@ejemplo.com";


/* ============================================================
   EDITAR: ENDPOINT DEL SERVIDOR
============================================================

   Tu servidor debe recibir:

   POST /api/send-sms

============================================================ */

const ENDPOINT_ENVIO = "/api/send-sms";


/* ============================================================
   EDITAR: MENSAJES DEL FORMULARIO
============================================================ */

const MENSAJE_ENVIANDO =
    "Enviando información...";


const MENSAJE_EXITO =
    "¡Información enviada correctamente!";


const MENSAJE_ERROR =
    "No se ha podido enviar la información. Inténtalo de nuevo.";


const MENSAJE_CAMPOS =
    "Por favor, introduce tu nombre y apellidos.";


/* ============================================================
   ELEMENTOS HTML
============================================================ */

const formulario =
    document.getElementById("signupForm");


const nombre =
    document.getElementById("firstName");


const apellidos =
    document.getElementById("lastName");


const titulo =
    document.getElementById("mainTitle");


const descripcion =
    document.getElementById("mainDescription");


const boton =
    document.getElementById("submitButton");


const mensaje =
    document.getElementById("statusMessage");


/* ============================================================
   MOSTRAR MENSAJE
============================================================ */

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className =
        "statusMessage " + tipo;
}


/* ============================================================
   OBTENER DATOS DEL FORMULARIO
============================================================ */

function obtenerDatos() {

    return {

        /*
         * Nombre introducido por el usuario
         */

        nombre:
            nombre.value.trim(),


        /*
         * Apellidos introducidos por el usuario
         */

        apellidos:
            apellidos.value.trim(),


        /*
         * Título editable
         */

        titulo:
            titulo.innerText.trim(),


        /*
         * Descripción editable
         */

        descripcion:
            descripcion.innerText.trim(),


        /*
         * Email configurado.

         * El backend debe decidir el destinatario real.
         */

        emailDestino:
            EMAIL_DESTINO
    };
}


/* ============================================================
   ENVÍO
============================================================ */

formulario.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* ==============================================
           VALIDAR NOMBRE
        ============================================== */

        if (!nombre.value.trim()) {

            mostrarMensaje(
                MENSAJE_CAMPOS,
                "error"
            );

            nombre.focus();

            return;
        }


        /* ==============================================
           VALIDAR APELLIDOS
        ============================================== */

        if (!apellidos.value.trim()) {

            mostrarMensaje(
                MENSAJE_CAMPOS,
                "error"
            );

            apellidos.focus();

            return;
        }


        /* ==============================================
           PREPARAR DATOS
        ============================================== */

        const datos =
            obtenerDatos();


        /* ==============================================
           CAMBIAR BOTÓN
        ============================================== */

        boton.disabled = true;

        boton.textContent =
            MENSAJE_ENVIANDO;


        try {

            /* ==========================================
               ENVIAR AL BACKEND
            ========================================== */

            const respuesta =
                await fetch(
                    ENDPOINT_ENVIO,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(datos)
                    }
                );


            /* ==========================================
               COMPROBAR RESPUESTA
            ========================================== */

            if (!respuesta.ok) {

                throw new Error(
                    "El servidor respondió con un error."
                );
            }


            /* ==========================================
               ÉXITO
            ========================================== */

            mostrarMensaje(
                MENSAJE_EXITO,
                "success"
            );


            /* Limpiar formulario */

            formulario.reset();


        } catch (error) {

            console.error(
                "Error de envío:",
                error
            );


            mostrarMensaje(
                MENSAJE_ERROR,
                "error"
            );

        } finally {

            boton.disabled = false;

            boton.textContent =
                "Registrarse";
        }

    }
);
