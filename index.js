const express = require('express');
const conectarDb = require('./config/db');
const cors = require('cors');

// crea el servidor
const app = express();

// conectar a la base de datos
conectarDb();

// habilitar cors
app.use(cors());

// para leer datos que pone el usuario
app.use(express.json({ extend:true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importamos las rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// correr la app
app.listen(PORT, () => console.log());
