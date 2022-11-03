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

  /* const novaReceita = req.body; */

  const novaReceita = {
    id: req.body.id,
    titulo: req.body.titulo,
    ingredientes: req.body.ingredientes,
    preparo: req.body.preparo,
  };

  receitas.push(novaReceita)

  res.send("Deu bom!")
});

app.listen(4000, () => {
  console.log("Server running in port: 4000");
});
