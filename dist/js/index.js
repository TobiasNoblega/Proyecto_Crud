

 document.querySelector('.formulario').addEventListener('submit', function(evento) {
     evento.preventDefault();
  
     let valid = true;  // Controlador de validación general
     const errorMessages = [];
  
     // Obtener valores de los campos
     const nombre = document.getElementById('nombre').value;
     const telefono = document.getElementById('telefono').value;
     const email = document.getElementById('email').value;
     //const mensaje = document.getElementById('mensaje').value;
  
     // Patrones
     const patronNombre = /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/;  // Letras y espacios
     const patronTelefono = /^[0-9]+[-|\s]?[0-9]+[-|\s]?[0-9]+$/ ///^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;  // Teléfono con formato: (011) 5555-5555 o 01155555555
     const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,25}$/;  // Formato de correo electrónico
  
     // Validación de Nombre
     if (!patronNombre.test(nombre)) {
       valid = false;
       errorMessages.push('El nombre solo puede contener letras y espacios.');
     }
  
     // Validación de Teléfono
     if (!patronTelefono.test(telefono)) {
       valid = false;
       errorMessages.push('El teléfono debe ser un número válido de al menos 8 dígitos.');
     }
  
     // Validación de Correo Electrónico
     if (!patronEmail.test(email)) {
       valid = false;
       errorMessages.push('El correo electrónico no tiene un formato válido.');
     }
  
     // Validación de Mensaje
     //if (mensaje.trim().length === 0) {
     //  valid = false;
     //  errorMessages.push('El mensaje no puede estar vacío.');
     // }
  
     // Si hay errores, mostrar un alert
     if (!valid) {
       alert('Errores encontrados:\n- ' + errorMessages.join('\n- '));
       //alert(errorMessages)
     } else {
       //alert('Formulario enviado correctamente');
       evento.target.submit(); // Si quieres enviar el formulario de manera real
     }
   });


//validacion en vivo
import { ValidaCadena } from "./class/valida.class";
const nombre = document.querySelector('#nombre');
const telefono = document.querySelector('#telefono');
//const email = document.querySelector('#email');

nombre.addEventListener('input', validaCampo);
telefono.addEventListener('input', validaCampo);

function validaCampo(evento){
     const campo = new ValidaCadena(evento.target.id, evento.target.value);
     mensaje(evento);
};

 function mensaje(evento){
     const campo = evento.target;
     const validaCampo = campo.validity;

     if (validaCampo.tooShort) {
          campo.setCustomValidity(`El campo ${evento.target.id.toUpperCase()} requiere ${evento.target.minLength} caracteres`)
     }else{
          campo.setCustomValidity('');
     }
     campo.reportValidity();
 };