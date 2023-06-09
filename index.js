require('dotenv').config();
const express = require('express')
const cors = require("cors")
require('./src/db/mongoose')
const app = express()
const userRoutes = require('./src/routes/user')

const env = process.env.ENVIRONMENT;
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;
let port = process.env.LOCAL_PORT;

if (env == "PROD") {
    port = process.env.PROD_PORT;
  }

app.use(express.json())
app.use(cors())
app.use(userRoutes)


app.get('/' , (req,res)=>{
  res.send("Working")
})

app.listen(port,()=>{
    console.log('working on port'+ port)
})

