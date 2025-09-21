import express from 'express';

const app = express();

const PORT = 3000;

const teas = [];
let idCounter = 1;

app.use(express.json());

app.post('/add-tea', (req, res) => {
    const { type, price } = req.body;

    if (!type || !price) {
        return res.status(400).send({ error: 'Type and price are required' });
    }

    const newTea = { id: idCounter++, type, price };
    teas.push(newTea);

    res.status(201).send(teas);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
});