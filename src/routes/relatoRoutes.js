const controller = require("../controllers/relatoControllers");
const express = require('express');
const router = express.Router();

router.post("/add", controller.addNewRelato); 

router.get("/all", controller.findAllRelato); 

router.get("/find/:id", controller.findRelatoById); 

router.get("/localiza/:empresa", controller.localizaPeloNomeDaEmpresa); 

router.get("/encontra/:cargo", controller.localizaPeloCargo);  

router.patch("/editar/:id", controller.updateRelato);  

router.delete("/deletar/:id", controller.deleteRelato);  



module.exports = router;