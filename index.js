const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.ols3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('food-network');
        const restaurantData = database.collection('restaurantData');

        // get all restaurantData
        app.get('/restaurantData', async (req, res) => {
            const result = await restaurantData.find({}).toArray();
            res.json(result);
        });

        // all products added in database
        app.post('/restaurantData', async (req, res) => {
            const restaurantInfo = req.body;
            const result = await restaurantData.insertOne(restaurantInfo);
            res.json(result);
        });
    }
    finally {
        // await client.close();
    }
};

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('food network app is running');
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})