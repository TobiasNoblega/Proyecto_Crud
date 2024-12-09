

// document.querySelector('.formulario').addEventListener('input', function(evento) {
//     evento.preventDefault();
  
//     let valid = true;  // Controlador de validación general
//     const errorMessages = [];
  
//     // Obtener valores de los campos
//     const nombre = document.getElementById('nombre').value;
//     const telefono = document.getElementById('telefono').value;
//     const email = document.getElementById('email').value;
//     const mensaje = document.getElementById('mensaje').value;
  
//     // Patrones
//     const patronNombre = /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/;  // Letras y espacios
//     const patronTelefono = /^\(?\d{4,8}\)?[\s\-]?\d{6,14}$/;  // Teléfono con formato: (011) 5555-5555 o 01155555555
//     const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,25}$/;  // Formato de correo electrónico
  
//     // Validación de Nombre
//     if (!patronNombre.test(nombre)) {
//       valid = false;
//       errorMessages.push('El nombre solo puede contener letras y espacios.');
//     }
  
//     // Validación de Teléfono
//     if (!patronTelefono.test(telefono)) {
//       valid = false;
//       errorMessages.push('El teléfono debe ser un número válido de al menos 8 dígitos.');
//     }
  
//     // Validación de Correo Electrónico
//     if (!patronEmail.test(email)) {
//       valid = false;
//       errorMessages.push('El correo electrónico no tiene un formato válido.');
//     }
  
//     // Validación de Mensaje
//     if (mensaje.trim().length === 0) {
//       valid = false;
//       errorMessages.push('El mensaje no puede estar vacío.');
//     }
  
//     // Si hay errores, mostrar un alert
//     if (!valid) {
//       //alert('Errores encontrados:\n- ' + errorMessages.join('\n- '));
//       alert(errorMessages)
//     } else {
//       alert('Formulario enviado correctamente');
//       // evento.target.submit(); // Si quieres enviar el formulario de manera real
//     }
//   });

// Obtener valores de los campos
     const nombre = document.getElementById('nombre');
     const telefono = document.getElementById('telefono');
     const email = document.getElementById('email');
     const mensaje = document.getElementById('mensaje');

     nombre.addEventListener('input', function(evento) {

     })