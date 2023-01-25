const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql')

const app = express();

//conectando a extensão da rota
app.use(
    express.urlencoded({
        extended:true,
    }),
)

//traduzindo para json
app.use(express.json())

//iniciando o handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

//incluindo o css
app.use(express.static('public'));

//criando página principal
app.get('/', (req, res) => {
    res.render('home')
});


//inserindo dados , criando rota POST
app.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    connection.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }

        //redirecionando para  atela inicial, caso o resultado seja positivo
        res.redirect('/books')
    })

})

//resgatando dados, criando rota GET
 app.get('/books', (req, res) => {
    
     const sql = 'SELECT * FROM books';

     connection.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const books = data;

       

        res.render('books', {books})
     })

 })
//encontrando dados, criando rota GET - SELECT

app.get('/books/:id', (req, res) => {

    const id = id.params.id
    const sql = `SELECT * FROM books WHERE ID = ${id}`

    connection.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('infobook', {book})
    })
})

//conectando ao sql
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'nodesql',
})


//checando conexão
connection.connect(function(err){
    if(err){
        console.log(err)
    }

    console.log('Conectado ao mysql')

    app.listen(3000)
})