import express from "express";
import cors from "cors";

const app = express();

// configs
app.use(cors());
app.use(express.json());

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo",
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
  res.send(receitas);
});

app.get("/receitas/:id", (req, res) => {
  const id = Number(req.params.id);

  const receita = receitas.find((objeto) => objeto.id === id);

  res.send(receita);
});

app.post("/receitas", (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;

  if (!titulo || !ingredientes || !preparo) {
    res.status(400).send({ message: "Insira todos os campos porfavor lindus" });
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

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
