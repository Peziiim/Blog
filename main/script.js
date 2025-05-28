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



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});