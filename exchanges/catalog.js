const Rabbit = require('../db/rabbit');
const configs = require('../config');
const { sleep, random } = require('../utils');

async function assertQueues() {
  await Rabbit.assertQueue('schools.catalog');
  await Rabbit.bindQueue('schools.catalog', 'schools.add', '');
}

async function consume() {
  // Microservice 1
  Rabbit.consume('schools.catalog', async (message) => {
    const school = JSON.parse(message);
    console.log(`Adicionando catalogo da escola ${school.name}`);
    await sleep(random(500, 1000));
    console.log(`Adicionado dados da escola ${school.name} no catalogo`);
  });
}

process.on('SIGINT', async () => await Rabbit.close());

Rabbit.connect(configs)
  .then(assertQueues)
  .then(consume)
  .catch((e) => console.log(e.message));
