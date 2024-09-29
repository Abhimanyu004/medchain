
const express = require('express');
const { sayHello } = require('../connect');
const cors = require('cors')
const app = express(); 

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/sayHello', async (req, res) => {
    try {
        const result = await sayHello()
        console.log(result); 
        res.send(result); 
    }catch (error) {
        res.status(500).send(error.toString());
    }
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
