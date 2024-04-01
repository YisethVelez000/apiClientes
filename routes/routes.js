
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const router = require('express').Router();
const cors = require('cors');
const cliente = require('../models/cliente');
const bodyParser = require('body-parser')
//usamos cors para poder hacer peticiones desde el front
router.use(cors());

// Configura el body parser
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/clientes', async (req, res) => {
    // Create a new user
    const Cliente = new cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password
    });
    try {
        const savedCliente = await Cliente.save();
        res.send(savedCliente);
    } catch (error) {
        res
            .status(400)
    }
})

router.get('/clientes', async (req, res) => {
    const clientes = await cliente.find();
    res.send(clientes);
})

//Consultar un cliente por id
router.get('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findById(req.params.id);
    res.send(clientes);
})

//Eliminar un cliente por id
router.delete('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findByIdAndDelete(req.params.id);
    res.send(clientes);
})

//Actualizar un cliente por id
router.put('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findByIdAndUpdate(req
        .params.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password

    }, { new: true });
    res.send(clientes);
})

//Cambiamos unicamente el estado del cliente
router.put('/clientes/:id/estado', async (req, res) => {
    const clientes = await cliente.findByIdAndUpdate(req.params.id, {
        estado: req.body.estado
    }, { new: true });
    res.send(clientes);
})



module.exports = router;
