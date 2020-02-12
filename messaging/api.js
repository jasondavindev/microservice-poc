const express = require('express');
const uuid = require('uuid/v4');
const { QueryTypes } = require('sequelize');

const Rabbit = require('../db/rabbit');
const Mysql = require('../db/mysql');
const configs = require('../config');

const app = express();
app.use(express.json());

app.post('/order', async (req, res) => {
  const order = req.body;
  try {
    const { id } = await storeOrder(order);
    return res.status(201).json({ id });
  } catch (error) {
    res.status(400).end(error.message);
  }
});

app.get('/status/:uuid', async (req, res) => {
  try {
    const rs = await Mysql.query('SELECT * FROM orders where uuid = ?', {
      replacements: [req.params.uuid],
      type: QueryTypes.SELECT,
    });

    if (!rs.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(rs[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

async function storeOrder({ user, price, address }) {
  const id = uuid();
  await Rabbit.sendToQueue('micro-orders', { id, user, price, address });
  return { id };
}

Rabbit.connect(configs).then(() => {
  app.listen(3000, () => console.log('server runnning'));
});

process.on('SIGINT', async () => {
  await Rabbit.close();
  console.log('exiting');
});
