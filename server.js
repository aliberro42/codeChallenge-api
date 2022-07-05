const express = require('express');
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const app  = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes)
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.post('/signin',(req,res)=>{
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json("sccess");
  }else{
    res.status(400).json('error loging in');
  }
})

app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    database.users.push({
        
                id:"125",
                name:name,
                email:email,
                password:password,
                joined:new Date()
        
    })
    res.json(database.users[database.users.length - 1 ])
  })

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.listen(3000,()=>{
    console.log("app running on port 3000")
})