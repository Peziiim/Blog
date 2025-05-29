import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const anoAtual = new Date().getFullYear()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render('index', {anoAtual})
}); 


app.post("/submit", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let emailError = "";
  let passError = "";

 if (!email.includes("gmail")) {
    emailError = "Email inválido";
  }
  if (password.length < 7) {
    passError = "Tamanho mínimo de 7 caracteres";
  }

  if (emailError || passError) {
    res.render('index', { anoAtual, emailError, passError });
  } else {
    res.redirect('home');
  }
})

app.get("/login", (req, res) => {
    res.render('login', {anoAtual})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});