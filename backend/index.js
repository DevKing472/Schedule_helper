const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

const cors = require('cors');
app.use(cors());

const url = "mongodb+srv://pradeep:prad2003@backgroundcluster.pzm6kzq.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json())

MongoClient.connect(url,(err,db) => {
    if(err)
    {
        console.log(err);
        return;
    }

    console.log("Ready and connected to Mongodb")

    var myDb = db.db("EAH_db");

    const loginndata = myDb.collection('EAH_login')

    app.post('/userlogin', (req, res) => {

        const query = {
            email: req.body.email,
            password: req.body.password
        }

        loginndata.findOne(query, (err, result) => {

            if (result != null) {

                const objToSend = {
                    name: result.name,
                    email: result.email
                }

                res.status(200).send(JSON.stringify(objToSend))

            } else {
                res.status(404).send()
            }

        })

        console.log("received login")
    })


})


app.listen(3005, () => {
    console.log("Listening on port 3005...")
})