const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');

// login
passport.use(new LocalStrategy(
    {
        usernameField: 'usuario',  // Nombre del campo de usuario en el formulario
        passwordField: 'password', // Nombre del campo de contraseña en el formulario
    },
    async (usuario, password, done) => {
        try {
            // Buscar usuario en bbdd
            const usuarioEncontrado = await Usuario.findOne({ usuario });

            if (!usuarioEncontrado) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // Verificar contraseña
            const esValido = await bcrypt.compare(password, usuarioEncontrado.password);
            if (!esValido) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, usuarioEncontrado);
        } catch (error) {
            return done(error);
        }
    }
));

// Serializar usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});
