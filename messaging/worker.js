const uuid = require('uuid/v4');
const Sequelize = require('sequelize');

const Mysql = require('../db/mysql');
const Rabbit = require('../db/rabbit');
const configs = require('../config');
const { sleep, random } = require('../utils');

async function consume() {
  Rabbit.consume(
    'micro-orders',
    (message) => {
      const order = JSON.parse(message);
      processOrder(order);
    },
    { consumerTag: uuid() }
  );
}

async function processOrder({ user, price, address, id }) {
  await sleep(random(500, 1000));
  const shippingPrice = random(price / 2, price * 3);
  await storeOrder({ id, user, price, address, shippingPrice });
}

async function storeOrder({ id, user, address, price, shippingPrice }) {
  const rs = await Mysql.query(
    'INSERT INTO orders (uuid, user, price, address, shipping_price) VALUES (?, ?, ?, ?, ?)',
    {
      replacements: [id, user, price, address, shippingPrice],
      type: Sequelize.QueryTypes.INSERT,
    }
  );
  console.log(rs);
}

process.on('SIGINT', async () => await Rabbit.close());

Rabbit.connect(configs)
  .then(consume)
  .catch((e) => console.log(e.message));
