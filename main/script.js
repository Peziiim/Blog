import express from "express";
import bodyParser from "body-parser";
import session from "express-session";  

const app = express();
const port = 3000;
const anoAtual = new Date().getFullYear()
let posts = []

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use( session({
  secret: 'laskfopeaskf23435456672Alkaplk',
  resave: false,
  saveUninitialized: true
}))

app.get("/", (req, res) => {
  res.render('index', { anoAtual })
});



app.post("/submit", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
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
    req.session.username = username
    res.render('home', { posts, username});
  }
})

app.post("/add-post", (req, res) => {
  const content = req.body.content
  const username = req.session.username
  const newPost = {
    username: username,
    content: content
  };
 
  posts.push(newPost);
  res.json(newPost);

})




app.get("/login", (req, res) => {
  res.render('login', { anoAtual })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});