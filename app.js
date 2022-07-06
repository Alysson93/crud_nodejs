const express = require('express');
const app = express();
const path = require('path');

const firebase = require('./services/firebase');


////////// config //////////
//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//req.body
app.use(express.urlencoded({extended: true}));


////////// Rotas //////////

app.get('/',(req,res)=>{
    res.render('index', {
        titulo: 'Bem vindo!',
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    firebase.signinWithEmailAndPassword(req,res);
    res.json({
        email: req.body.email,
        senha: req.body.senha
    });
})

app.get('*',(req,res)=>{
    res.send('404 - Página não encontrada.');
});

//////////  //////////

app.listen(8080,()=>{
    console.log('Servidor rodando na porta 8080.');
});