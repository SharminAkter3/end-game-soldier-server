const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5nmtx0a.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const postCollection = client.db('endGameSoldier').collection('posts');

        app.get('/posts', async (req, res) => {
            const query = {};
            const post = await postCollection.find(query).toArray();
            res.send(post);
        });

        app.get('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const selectedPost = await postCollection.find(p => p._id === id);
            res.send(selectedPost);
        });

    }

    catch {

    }

}

run().catch(error => console.error(error));


app.get('/', (req, res) => {
    res.send('Social media server is running');
});

app.listen(port, () => {
    console.log(`Social media server is running on port ${port}`)
})