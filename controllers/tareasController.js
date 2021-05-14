const Tarea = require('../models/Tarea');
const Proyectos = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    // obtengo el proyecto primero
    const {proyecto} = req.body;

    try {
        const buscoProyecto = await Proyectos.findById(proyecto);
        if(!buscoProyecto) {
            return res.status(404).json({msg:"Proyecto no encontrado"});
        }

        // esto simplemente para confirmar que el usuario que crea la tarea sea el que creo el proyecto
        if (buscoProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'No estas autorizado a editar este proyecto'});
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const {proyecto} = req.query;

    try {
        const buscoProyecto = await Proyectos.findById(proyecto);
        if(!buscoProyecto) {
            return res.status(404).json({msg:"Proyecto no encontrado"});
        }

        if (buscoProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'No estas autorizado a editar este proyecto'});
        }

        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        res.json({tareas});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// actualizar tareas
exports.actualizarTareas = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const {proyecto, nombre, estado} = req.body;

    try {
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({msg:"Tarea no encontrada"});
        }

        const buscoProyecto = await Proyectos.findById(proyecto);
        if (buscoProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'No estas autorizado a editar este proyecto'});
        }

        const nuevaTarea = {}
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        res.json({tarea});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const {proyecto} = req.query;

    try {
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({msg:"Tarea no encontrada"});
        }

        const buscoProyecto = await Proyectos.findById(proyecto);
        if (buscoProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'No estas autorizado a editar este proyecto'});
        }

        await Tarea.findByIdAndRemove({_id: req.params.id});
        res.json({msg: "Tarea eliminada con éxito"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
