import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";

const receitaSchema = joi.object({
  titulo: joi.string().required().min(3).max(100),
  ingredientes: joi.string().required(),
  preparo: joi.string().required(),
});

const app = express();

// configs
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db("tastecamp");
} catch (err) {
  console.log(err);
}

app.get("/receitas", async (req, res) => {
  try {
    const receitas = await db
      .collection("receitas")
      .find({}, { _id: 0 })
      .toArray();
    /* const receitasSemId = receitas.map((receita) => {
      return {
        titulo: receita.titulo,
        ingredientes: receita.ingredientes,
        preparo: receita.preparo,
      };
    }); */
    res.send(receitas);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/receitas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const receitaEncontrada = await db
      .collection("receitas")
      .findOne({ _id: new ObjectId(id) });

    console.log(receitaEncontrada);

    if (!receitaEncontrada) {
      res.status(400).send("Receita não encontrada");
      return;
    }

    res.send(receitaEncontrada);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/receitas", async (req, res) => {
  const body = req.body;

  const validation = receitaSchema.validate(body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.send(errors);
    return;
  }

  try {
    await db.collection("receitas").insert(body);
    res.status(201).send("Receita criada com sucesso!");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/receitas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resp = await db
      .collection("receitas")
      .deleteOne({ _id: ObjectId(id) });

    console.log(resp);
    res.send("Receita apagada com sucesso!");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/receitas/many/:ingredientes", async (req, res) => {
  const { ingredientes } = req.params;

  try {
    const { deletedCount } = await db
      .collection("receitas")
      .deleteMany({ ingredientes: ingredientes });

    if (!deletedCount) {
      return res.status(400).send("Nenhuma receita foi deletada");
    }

    res.send("Receitas deletadas com sucesso!");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/receitas/:id", async (req, res) => {
  const { id } = req.params;
  const receita = req.body;

  const validation = receitaSchema.validate(receita, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.send(errors);
    return;
  }

  try {
    const receitaEncontrada = await db
      .collection("receitas")
      .findOne({ _id: new ObjectId(id) });

    console.log(receitaEncontrada);

    if (!receitaEncontrada) {
      res.status(400).send("Receita não encontrada");
      return;
    }

    await db
      .collection("receitas")
      .updateOne({ _id: receitaEncontrada._id }, { $set: receita });

    res.send("Receita atualizada com sucesso!");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/receitas/many/:ingredientes", async (req, res) => {
  const { ingredientes } = req.params;
  const receita = req.body;

  try {
    const receitasEncontradas = await db
      .collection("receitas")
      .find({ ingredientes: ingredientes });

    if (receitasEncontradas.length === 0) {
      res.status(400).send("Receitas não encontradas");
      return;
    }

    await db
      .collection("receitas")
      .updateMany({ ingredientes: ingredientes }, { $set: receita });

    res.send("Receitas atualizadas com sucesso!");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`);
});
