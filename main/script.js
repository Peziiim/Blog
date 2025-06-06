import express from "express";
import bodyParser from "body-parser";
import session from "express-session";  

const app = express();
const port = 3000;
const anoAtual = new Date().getFullYear();
let posts = [];
let postID = 0;
let count;

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
  res.render('index', { anoAtual });
  count = 0;
  
});


app.post("/submit", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
  
  let emailError = "";
  let passError = "";
  let userError = "";
  
  if (password.length < 7) {
    passError = "Tamanho mínimo de 7 caracteres";
  }
  
  if (req.session.email == email && count != 0) {
    emailError = "Email já utilizado";
  }
  
  if (req.session.username == username && count != 0) {
    userError = "Usuário existente";
  }
  
  
  if (emailError || passError || userError) {
    res.render('index', { anoAtual, emailError, passError, userError });
  } else {
    req.session.username = username
    req.session.password = password
    req.session.email = email
    emailError = "";
    passError = "";
    userError = "";
    count++;
    res.render('home', {posts, username, email});
  }
})

app.get("/login", (req, res) => {
  res.render('login', { anoAtual });
});

app.post("/login", (req, res) => {
  const login = req.body.login
  const password = req.body.password;
  const email = req.session.email
  const username = req.session.username
  let emailError = "";

    if (!login) {
    emailError = "Preencha todos os campos";
     res.render('login', { anoAtual, emailError });
  }


if (email !== login && username != login) {
    emailError = "Usuário não encontrado";
    res.render('login', { anoAtual, emailError });

  } else if (req.session.password !== password) {
    emailError = "Senha incorreta";
    res.render('login', { anoAtual, emailError });

  } else { 
     res.render('home', {posts, username, email})
  }

})

app.post("/add-post", (req, res) => {
  const content = req.body.content
  const username = req.session.username
  const day = new Date().getDate();
  
  let month = new Date().getMonth();
  let meses = ["Janeiro", "Fevereiro", 
              "Março", "Abril", "Maio", "Junho", 
              "Julho", "Agosto", "Setembro", "Outubro", 
              "Novembro", "Dezembro"];
  
  month = meses[month]
  postID++

  const newPost = {
    username: username,
    content: content,
    postID: postID,
    day: day,
    month: month
  };
  
  posts.push(newPost);
  res.json(newPost);
  
})

app.delete("/delete-post/:id", (req, res) => {
  const id = req.params.id;

  posts.forEach(post => {
    if(post.postID == id) {
      posts.pop(post);
    }
  })
});


app.patch("/edit-post/:id", (req, res) => {
  const id = Number(req.params.id)
  const content = req.body.content

    const post = posts.find(post => post.postID === id);
  if (post) {
    post.content = content;
    res.json(post);
  } else {
    res.status(404).json({ error: "Post não encontrado" });
  }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});