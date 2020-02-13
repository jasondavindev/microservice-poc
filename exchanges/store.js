const Rabbit = require('../db/rabbit');
const configs = require('../config');
const { sleep, random } = require('../utils');

async function assertQueues() {
  await Rabbit.assertQueue('schools.store');
  await Rabbit.bindQueue('schools.store', 'schools.add', '');
}

async function consume() {
  // Microservice 2
  Rabbit.consume('schools.store', async (message) => {
    const school = JSON.parse(message);
    console.log(`Salvando a escola ${school.name} no banco de dados`);
    await sleep(random(1000, 2000));
    console.log(`Escola ${school.name} armazenada`);
  });
}

process.on('SIGINT', async () => await Rabbit.close());

Rabbit.connect(configs)
  .then(assertQueues)
  .then(consume)
  .catch((e) => console.log(e.message));
