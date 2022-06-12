const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const {Pool} = require('pg');
require('dotenv').config();
const cors = require('cors');

let pool = new Pool();
const port = process.env.PORT;

//app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) =>{
    res.type('json');
    res.json({message: "something"})
   // res.send({data:`${__dirname}/static/index.html`});
})

app.get('/info/get', (req, res) =>{
    try{
        pool.connect(async (error, client, release)=>{
            let resp = await client.query(`SELECT * FROM inventory`);
            release();
            res.json(resp.rows);
        })

    }catch(error){
        console.log(error);
    }
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });

app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + "/" + "script.js");
  });

app.post('/info/add', (req, res) =>{
    try{
        pool.connect(async (error, client, release)=>{
            console.log(req.body)
            let resp = await client.query(`INSERT INTO inventory (name, qty, comment) VALUES ('${req.body.name}', '${req.body.quantity}', '${req.body.comment}')`);
            console.log(resp.rows);
            //res.redirect('/');
            res.send('succesful');
        })

    }catch(error){
        console.log(error);
    }
});

app.post('/info/delete', (req, res) =>{
    try{
        pool.connect(async (error, client, release)=>{
            let resp = await client.query(`DELETE FROM inventory WHERE name = '${req.body.delete}'`);
            //res.redirect('/info/get');
            console.log(req);
            res.send('successfully deleted')
        })

    }catch(error){
        console.log(error);
    }
});

app.post('/info/update', (req, res) =>{
    try{
        pool.connect(async (error, client, release)=>{
            //console.log(req.body);
            let resp = await client.query(`UPDATE inventory SET name = '${req.body.newValue}' WHERE name = '${req.body.oldValue}'`);
            //console.log(resp)
            res.send('updated')
            //res.redirect('/info/get');
        })

    }catch(error){
        console.log('made it');
        console.log(error);
    }
});

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})