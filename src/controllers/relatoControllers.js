const relatoModel = require("../models/relatoModel");
const usuarioModel = require("../models/usuarioModel");

const script = require("./scripts");

const addNewRelato = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const {
      usuarioId,
      nomeDoRelato,
      empresa,
      nomeDaVaga,
      cargo,
      localDaVaga,
      remotaOuPresencial,
      descricao,
    } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ message: "Necessário: Digite o ID do Relato" });
    };

    const findUsuario = await usuarioModel.findById(usuarioId);

    if (!findUsuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    };
    const informaçoesAusentes = []
    if (!nomeDoRelato) informaçoesAusentes.push("nomeDoRelato");
    if (!empresa) informaçoesAusentes.push("empresa");
    if (!nomeDaVaga) informaçoesAusentes.push("nomeDaVaga");
    if (!cargo) informaçoesAusentes.push("cargo");
    if (!localDaVaga) informaçoesAusentes.push("localDaVaga");
    if (!remotaOuPresencial) informaçoesAusentes.push("remotaOuPresencial");
    if (!descricao) informaçoesAusentes.push("descricao");
    if (informaçoesAusentes.length > 0) return res.status(400).json({ msg: "Por favor, adicione as seguintes informações:", informaçoesAusentes });

    const newRelato = new relatoModel({
      usuario: usuarioId,
      nomeDoRelato,
      empresa,
      nomeDaVaga,
      cargo,
      localDaVaga,
      remotaOuPresencial,
      descricao,
    });
    const savedRelato = await newRelato.save();
    res.status(200).json({ message: "Novo Relato adicionado com sucesso!", savedRelato });
  } catch (error) {

    res.status(500).json(error.message);
  };
};

const findAllRelato = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const allRelato = await relatoModel.find()
    res.status(200).json(allRelato);
  } catch (error) {
    res.status(500).json(error.message);
  };
};

const findRelatoById = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const findRelato = await relatoModel.findById(req.params.id)
    if (findRelato == null) {
      res.status(404).json({ message: "Relato não encontrado" });
    }
    res.status(200).json(findRelato);
  } catch (error) {
    res.status(500).json(error.message);
  };
};


const updateRelato = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const {
      usuarioId,
      nomeDoRelato,
      nomeDaEmpresa,
      nomeDaVaga,
      cargo,
      localDaVaga,
      remotaOuPresencial,
      descricao,
    } = req.body;
    const updateRelato = await relatoModel.findByIdAndUpdate(req.params.id, {
      usuarioId,
      nomeDoRelato,
      nomeDaEmpresa,
      nomeDaVaga,
      cargo,
      localDaVaga,
      remotaOuPresencial,
      descricao,
    });
    res.status(200).json({ message: "Usuário atualizado com sucesso", updateRelato });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message)
  }
};

const deleteRelato = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const { id } = req.params;
    const findrelato = await relatoModel.findById(id);

    if (findrelato == null) {
      return res.status(404).json({ message: `Relato com id ${id} não encontrado` });
    };
    await findrelato.remove();
    res.status(200).json({ message: `Relato com id ${id} foi deletado com sucesso` });
  } catch (error) {
    res.status(500).json(error.message);
  };
};

const localizaPeloNomeDaEmpresa = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const localizaNomeDaEmpresa = await relatoModel.find({ empresa: req.params.empresa });
    if (!localizaNomeDaEmpresa) {
      return res
        .status(400)
        .json({
          mensagem: `A empresa '${req.params.empresa}' não foi localizada, por favor confira e tente novamente.`,
        });
    }
    res.status(200).json(localizaNomeDaEmpresa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messagem: error.message });
  }
};

const localizaPeloCargo = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    const Acesso = script.TokenVerifier(authHeader);
    if (Acesso) return res.status(401).send("Acesso Bloqueado: Header Invalido");
    const localizaCargo = await relatoModel.find({ cargo: req.params.cargo });
    if (!localizaCargo) {
      return res
        .status(400)
        .json({
          mensagem: `O cargo '${req.params.cargo}' não foi localizado, por favor confira e tente novamente.`,
        });
    }
    res.status(200).json(localizaCargo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messagem: error.message });
  }
};

module.exports = {
  addNewRelato,
  findAllRelato,
  findRelatoById,
  updateRelato,
  deleteRelato,
  localizaPeloNomeDaEmpresa,
  localizaPeloCargo,
};

