const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
})

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: "sabana@gmail.com" },
    { id: 2, name: 'Purnima', email: "purnima@gmail.com" },
    { id: 3, name: 'Sabnur', email: "sabnur@gmail.com" }
];
// username: dbUser1
// password: CnfX8RVto2ZmNXDz



const uri = "mongodb+srv://dbUser1:CnfX8RVto2ZmNXDz@cluster0.etkkvpu.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'Mithun', email: 'meh@gmail.com' }
        const result = await userCollection.insertOne(user);
        console.log(result);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(err => console.log(err))

app.get('/users', (req, res) => {
    if (req.query.name) {
        // filter users by query
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else {
        res.send(users);
    }
})

app.post('/users', (req, res) => {
    console.log('POst API called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user)
})

app.listen(port, () => {
    console.log(`Simple Node Server Running On Port ${port}`);
})
