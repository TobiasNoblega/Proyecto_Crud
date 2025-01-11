.env:

```
PORT = 5000
MONGO_URI=mongodb+srv://nataliagonzalezuba:33198139@cluster0.2l9kp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```


hasta ahora la funcion de registrarse y logearse no esta funcionando, pero si quiere que las funciones de editar y eliminar contactos dependan de estar logueado simplemente hay que descomentar la siguiente linea en src/servidor/router.js:

router.use(['/modificar/:email', '/eliminar', '/perfil'], verificarAutenticacion);

(linea 106)

la idea era que una vez logueado se habilite la funcion de editar y eliminar contactos. pero como no llegue a reparar la funcion tuve que dejar las funciones libres
