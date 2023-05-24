const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

const cors = require('cors');
app.use(cors());

app.use(express.json())

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://pradeep:prad2003@backgroundcluster.pzm6kzq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
//hi
const database = client.db("EAH_db");
const logintab = database.collection("EAH_login");

app.post('/userlogin',(req, res) => {

    console.log("Got login")

    // const query = {
    //     email: req.body.email,
    //     password: req.body.password
    // }

    // const result = await logintab.findOne(query);

    // if(result !== null)
    // {
    //     const objToSend = {
    //         name: result.name,
    //         email: result.email
    //     }

    //     res.status(200).send(JSON.stringify(objToSend))
    // }

    // else {
    //     res.status(404).send()
    // }

    // console.log("received login")
})

app.listen(5000, () => {
    console.log("Listening on port 5000...")
})
