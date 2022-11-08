import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();

// configs
app.use(cors());
app.use(express.json());
const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;

mongoClient
  .connect()
  .then(() => {
    db = mongoClient.db("dcComics");
  })
  .catch((err) => console.log(err));

app.get("/herois", (req, res) => {
  db.collection("herois")
    .find()
    .toArray()
    .then((herois) => {
      /* console.log(herois); */
      res.send(herois);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo whey",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque o pão",
  },
  {
    id: 2,
    titulo: "Mingau de Whey",
    ingredientes: "Leite, Aveia e Whey",
    preparo: "Mistura tudo na panela fervendo",
  },
];

app.get("/receitas", (req, res) => {
  const { ingrediente, titulo } = req.query;

  if (ingrediente) {
    const receitaFiltrada = receitas.filter(
      (receita) =>
        receita.ingredientes.toLowerCase().indexOf(ingrediente.toLowerCase()) >=
          0 && receita.titulo.toLowerCase().indexOf(titulo.toLowerCase()) >= 0
    );

    res.send(receitaFiltrada);
    return;
  }

  res.send(receitas);
});

app.get("/receitas/:id", (req, res) => {
  const id = Number(req.params.id);

  const receita = receitas.find((objeto) => objeto.id === id);

  res.send(receita);
});

app.post("/receitas", (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;
  const { user } = req.headers;

  if (!titulo || !ingredientes || !preparo) {
    res.status(400).send({ message: "Insira todos os campos porfavor lindus" });
    return;
  }

  if (user !== "Thiago") {
    res.status(401).send({ message: "Usuário não autorizado" });
    return;
  }

  const novaReceita = {
    id: receitas.length + 1,
    titulo,
    ingredientes,
    preparo,
  };

  receitas.push(novaReceita);

  res.status(201).send("Receita criada com sucesso!");
});

app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`);
});
