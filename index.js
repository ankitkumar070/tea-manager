dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import logger from "./logger.js";
import morgan from "morgan";


const app = express();

const PORT = process.env.PORT||3000;

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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