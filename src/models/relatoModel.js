const mongoose = require("mongoose");
const ususario = require("./usuarioModel");

const relatoSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        nomeDoRelato: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,

        },
        empresa: {
            type: String,
            required: true,
            lowercase: true,
        },
        nomeDaVaga: {
            type: String,
            required: true,
            lowercase: true,
        },
        cargo: {
            type: String,
            required: true,
            lowercase: true,
        },
        localDaVaga: {
            type: String,
            required: true,
            lowercase: true,
        },
        remotaOuPresencial: {
            type: String,
            enum: ['remota', 'presencial'],
            required: true,
            lowercase: true,
        },
        descricao: {
            type: String,
            required: true,
            minlength: 50,
            maxlength: 5000,
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "usuario"
        },

    },
    { timestamp: true }

);

const Model = mongoose.model("Relato", relatoSchema);

module.exports = Model

