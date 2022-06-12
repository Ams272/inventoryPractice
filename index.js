const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const {Pool} = require('pg');
require('dotenv').config();
const cors = require('cors');

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const database = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;
const por = process.env.PGPORT;

let pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: por,
    ssl  : true
  });

  console.log(user,host,database,password,por);
  pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) =>{
    res.type('json');
    // res.json({message: "something"})
   res.send(`${__dirname}/static/index.html`);
})

app.get('/info/get', (req, res) =>{

    try{
        pool.connect(async (error, client, release)=>{
            let resp = await client.query(`SELECT * FROM inventory`);
            release();
            console.log(resp)
            res.json(resp.rows);
        })

    }catch(error){
        console.log(error);
        res.json({message: "error", error: error});
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
            let resp = await client.query(`INSERT INTO inventory (name, qty, comment) VALUES ('${req.body.name.trim()}', '${req.body.quantity.trim()}', '${req.body.comment.trim()}')`);
            console.log(resp.rows);
            //res.redirect('/');

            res.json({message:'succesful'});
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
            res.json({message:'successfully deleted'})
        })

    }catch(error){
        console.log(error);
        res.json({message: "error", error: error});
    }
});

app.post('/info/update', (req, res) =>{
    try{
        pool.connect(async (error, client, release)=>{
            //console.log(req.body);
            let resp = await client.query(`UPDATE inventory SET name = '${req.body.newValue}' WHERE name = '${req.body.oldValue}'`);
            //console.log(resp)
            res.json({message:'updated'})
            //res.redirect('/info/get');
        })

    }catch(error){
        console.log('made it');
        console.log(error);
        res.json({message: "error", error: error});
    }
});

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})