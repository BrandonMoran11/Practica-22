const express = require('express');//inyeccion de express
const router = express.Router();//creacion del router
const mongoose = require('mongoose');//inyeccion de mongoose

const Person = require('../models/persons');//variable para guardar lo que exportamos en el archivo persons, carpeta models

router.get('/gente', async (req, res) => {//router tipo get para renderizar la vista index en la ruta "/gente"
    const Persons = await Person.find({});
    res.render("index", ({ Persons }));
});

router.get('/addPerson', async (req, res) => {//router tipo get para renderizar la vista "addPerson" en la ruta /addPerson
    res.render("addPerson");
});

router.post('/addPerson', function (req, res) {// nuevo router tipo post para mandar los datos que seran agregados a la tabla de la ruta /addPerson
    const newPerson = Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }); // Este modelo tiene el Schema de MongoDB lo que nos permite crear un nuevo documento.

    newPerson
        .save()//decimos que se guarde
        .then(() => { res.redirect("gente") })//en caso de que no salte ningun error nos redireccionara a "gente"
        .catch((error) => { res.json({ message: error }) });//en caso de que algo salga mal saltara un error tipo json
});
router.get('/findById/:id', (req, res) => {//ruta para buscar personas por id y en caso de que logre encontrar al id de la persona, nos respondera renderizando el archivo updatePerson
    Person.findById(req.params.id)
        .then((person) => { res.render('updatePerson', { person }) })
        .catch((error) => { res.json({ message: error }) });
});
router.post('/updatePerson', (req, res) => { //creamos una ruta tipo post para /updatePerson y esta ruta buscara a la persona por id y podra editar la informacion por otra diferente
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    })
        .then((data) => { res.redirect('/gente') })
        .catch((error) => { res.json({ message: error }) });
});
module.exports = router;//exportamos el modulo