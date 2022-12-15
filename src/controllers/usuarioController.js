const usuarioModel = require("../models/usuarioModel");
const SECRET = process.env.SECRET  
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt");

const script = require("./scripts");

const addNewUsuario = async (req, res) => {
    try {
        const {
            nome,
            usuario,
            email,
            senha,
            pronome,
            genero,
            idade,
            cidade,
            estado,
            autodeclaracaoEtnicoRacial,
            profissao,
            escolaridade,
            areaDeAtuaçao,
        } = req.body;

        const informaçoesAusentes = []
        if (!usuario) informaçoesAusentes.push("usuario");
        if (!email) informaçoesAusentes.push("email");
        if (!senha) informaçoesAusentes.push("senha");
        if (!pronome) informaçoesAusentes.push("pronome");
        if (!genero) informaçoesAusentes.push("genero");
        if (!idade) informaçoesAusentes.push("idade");
        if (!cidade) informaçoesAusentes.push("cidade");
        if (!estado) informaçoesAusentes.push("estado");
        if (!autodeclaracaoEtnicoRacial) informaçoesAusentes.push("autodeclaracaoEtnicoRacial");
        if (!profissao) informaçoesAusentes.push("profissao");
        if (!escolaridade) informaçoesAusentes.push("escolaridade");
        if (!areaDeAtuaçao) informaçoesAusentes.push("areaDeAtuaçao");
        if (informaçoesAusentes.length > 0) return res.status(400).json({ msg: "Por favor, adicione as seguintes informações:", informaçoesAusentes });


        const senhaHashed = bcrypt.hashSync(senha, 10);
        const newUsuario = new usuarioModel({
            nome,
            usuario,
            email,
            senha: senhaHashed,
            pronome,
            genero,
            idade,
            cidade,
            estado,
            autodeclaracaoEtnicoRacial,
            profissao,
            escolaridade,
            areaDeAtuaçao,
        });
        const savedUsuario = await newUsuario.save();
        res.status(200).json({ message: "Novo usuário foi cadastrado com sucesso", savedUsuario });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    };
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email) return res.status(400).json("Por favor insira um e-mail e senha");

        const usuarioValido = await usuarioModel.findOne({ email: email });
        if (!usuarioValido) return res.status(404).json(`E-mail: ${email} não encontrado`);

        const senhaValida = bcrypt.compareSync(senha, usuarioValido.senha);
        if (!senhaValida) return res.status(401).json("email ou senha incorreto");

        const token = jwt.sign({ email: email }, SECRET);
        return res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json(error.message);
    };
};


const findAllUsuario = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const allUsuario = await usuarioModel.find({}, ["usuario", "nome", "pronome", "genero", "idade", "cidade", "estado", "estado", "autodeclaracaoEtnicoRacial", "profissao", "areaDeAtuação"]);
        res.status(200).json(allUsuario);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.messege)
    };
};

const findUsuarioById = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const findUsuario = await usuarioModel.findById(req.params.id);
        res.status(200).json(findUsuario);
    } catch (error) {                                                                          //get
        console.error(error);
        res.status(500).json(error.message);
    };
};

const updateUsuario = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const {
            nome,
            usuario,
            email,
            senha,
            pronome,
            genero,
            idade,
            cidade,
            estado,
            autodeclaracaoEtnicoRacial,
            profissao,
            escolaridade,
            areaDeAtuaçao,
        } = req.body;
        const updateUsuario = await usuarioModel.findByIdAndUpdate(req.params.id, {
            nome,
            usuario,
            email,
            senha,
            pronome,
            genero,
            idade,
            cidade,
            estado,
            autodeclaracaoEtnicoRacial,
            profissao,
            escolaridade,
            areaDeAtuaçao,
        });
        res.status(200).json({ message: "Usuário atualizado com sucesso", updateUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const { id } = req.params;
        const deleteUsuario = await usuarioModel.findByIdAndDelete(id);
        const message = `O usuário ${deleteUsuario.id} foi editado com sucesso`
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    };
};

const localizaPelaAreaDeAtuaçao = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const localizaAreaDeAtuaçao = await usuarioModel.find({ areaDeAtuaçao: req.query.areaDeAtuaçao });
        if (!localizaAreaDeAtuaçao) {
            return res
                .status(400)
                .json({
                    mensagem: `A área de atuação '${req.query.areaDeAtuaçao}' não foi localizada, por favor confira e tente novamente.`,
                });
        }
        res.status(200).json(localizaAreaDeAtuaçao);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messagem: error.message });
    }
};

const localizaPeloGenero = async (req, res) => {
    try {
        const authHeader = req.get("Authorization");
        const Acesso = script.TokenVerifier(authHeader);
        if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
        const localizaGenero = await usuarioModel.find({ genero: req.params.genero });
        if (!localizaGenero) {
            return res
                .status(400)
                .json({
                    mensagem: `O usuario com a indentidade de genero '${req.params.genero}' não foi localizade, por favor confira e tente novamente.`,
                });
        }
        res.status(200).json(localizaGenero);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messagem: error.message });
    }
};
module.exports = {
    addNewUsuario,
    login,
    findAllUsuario,
    findUsuarioById,
    updateUsuario,
    deleteUsuario,
    localizaPelaAreaDeAtuaçao,
    localizaPeloGenero,
};