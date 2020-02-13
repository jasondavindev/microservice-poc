const express = require('express');

const Rabbit = require('../db/rabbit');
const configs = require('../config');

const app = express();
app.use(express.json());

app.post('/school', async (req, res) => {
  const { name, address } = req.body;

  try {
    await storeSchool({ name, address });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

async function storeSchool({ name, address }) {
  return Rabbit.publish('schools.add', '', { name, address });
}

async function assertExchanges() {
  await Rabbit.assertExchange('schools.add', 'fanout', {
    durable: false,
    autoDelete: false,
  });
}

Rabbit.connect(configs)
  .then(assertExchanges)
  .then(() => {
    app.listen(3000, () => console.log('server runnning'));
  });

process.on('SIGINT', async () => {
  await Rabbit.close();
  console.log('exiting');
});
