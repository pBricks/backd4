import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const Grade = db.Grade;

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    if (!name) {
      const data = await Grade.find();
      res.send(data);
    } else {
      const data = await Grade.find(condition);
      res.send(data);
    }
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const create = async (req, res) => {
  try {
    const grade = new Grade({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
    });
    const data = await grade.save(grade);
    res.send(data);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findOne({ _id: id });
    res.send(data);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndUpdate({ _id: id }, req.body);
    if (!data) {
      res.send("id nao encontrado");
    } else {
      res.send({ message: "Grade atualizado com sucesso" });
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndRemove({ _id: id });
    if (!data) {
      res.send("id nao encontrado");
    } else {
      res.send({ message: "Grade excluido com sucesso" });
    }

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  //const id = req.params.id;

  try {
    const data = await Grade.deleteMany();
    res.send({ message: "Grade excluido com sucesso" });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todas as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };