import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

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

app.listen(4000, () => {
  console.log("Server running in port: 4000");
});
