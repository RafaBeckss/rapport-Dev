const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        nome: {
            type: String,
            lowercase: true,
        },
        usuario: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        senha: {
            type: String,
            required: true,
            minlength: 6,
        },
        pronome: {
            type: String,
            lowercase: true,
        },
        genero: {
            type: String,
            enum: ['cisgênero', 'travesti', 'transgênero', 'não-binário'],
            required: true,
            lowercase: true,
        },
        idade: {
            type: Number,
            required: true,
        },
        cidade: {
            type: String,
            required: true,
            lowercase: true,
        },
        estado: {
            type: String,
            enum: ['acre', 'alagoas', 'amapá', 'amapa', 'amazonas', 'bahia', 'ceará', 'ceara', 'distrito federal', 'espírito santo', 'espirito santo', 'goiás', 'goias', 'maranhão', 'maranhao', 'mato grosso', 'mato grosso do sul', 'minas gerais', 'pará', 'para', 'paraíba', 'paraiba', 'paraná', 'parana', 'pernambuco', 'piauí', 'piaui', 'rio de janeiro', 'rio grande do norte', 'rio grande do sul', 'rondônia', 'rondonia', 'roraima', 'santa catarina', 'são paulo', 'sao paulo', 'sergipe', 'tocantins'],
            required: true,
            lowercase: true,
        },
        autodeclaracaoEtnicoRacial: {
            type: String,
            enum: ['preta', 'indígenas', 'indigenas', 'pardos', 'amarelos', 'branca'],
            required: true,
            lowercase: true,
        },
        profissao: {
            type: String,
            required: true,
            lowercase: true,
        },
        escolaridade: {
            type: String,
            enum: ['ensino fundamental', 'ensino fudamental incopleto', 'ensino médio completo', 'ensino medio completo', 'ensino médio incompleto', 'ensino medio incompleto', 'ensino superior completo', 'ensino superior incompleto'],
            required: true,
            lowercase: true,
        },
        areaDeAtuaçao: {
            type: String,
            required: true,
            lowercase: true,
        },
    },
    {
        timestamp: true  // usar no relato tbm
    }

);

const Model = mongoose.model("Usuário", UsuarioSchema);

module.exports = Model