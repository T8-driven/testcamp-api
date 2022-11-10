import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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

// PROMISSE HELL

// Nivel 1
app.get("/receitas", async (req, res) => {
  // callback
  /* const { ingrediente, titulo } = req.query;

  if (ingrediente) {
    const receitaFiltrada = receitas.filter(
      (receita) =>
        receita.ingredientes.toLowerCase().indexOf(ingrediente.toLowerCase()) >=
          0 && receita.titulo.toLowerCase().indexOf(titulo.toLowerCase()) >= 0
    );

    res.send(receitaFiltrada);
    return;
  } */

  try {
    const receitas = await db.collection("receitas").find().toArray();
    res.send(receitas);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* app.get("/receitas/:id", (req, res) => {
  const id = Number(req.params.id);

  const receita = receitas.find((objeto) => objeto.id === id);

  res.send(receita);
}); */

app.post("/receitas", async (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;
  /* const { user } = req.headers; */

  if (!titulo || !ingredientes || !preparo) {
    res.status(400).send({ message: "Insira todos os campos porfavor lindus" });
    return;
  }

  /* if (user !== "Thiago") {
    res.status(401).send({ message: "Usuário não autorizado" });
    return;
  } */

  /* const novaReceita = {
    id: receitas.length + 1,
    titulo,
    ingredientes,
    preparo,
  }; */

  try {
    await db.collection("receitas").insert({
      titulo,
      ingredientes,
      preparo,
    });
    res.status(201).send("Receita criada com sucesso!");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`);
});
