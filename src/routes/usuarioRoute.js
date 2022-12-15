const controller = require("../controllers/usuarioController");
const express = require('express');
const router = express.Router();

router.get("/localiza/atuacao", controller.localizaPelaAreaDeAtuaçao);

router.post("/novousuario", controller.addNewUsuario); 

router.post("/login", controller.login); 

router.get("/all", controller.findAllUsuario); 

router.get("/find/:id", controller.findUsuarioById); 

 router.get("/encontra/:genero", controller.localizaPeloGenero); 

router.patch("/editar/:id", controller.updateUsuario); 

router.delete("/delete/:id", controller.deleteUsuario); 



module.exports = router;