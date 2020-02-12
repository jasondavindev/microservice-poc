const amqp = require('amqplib');

class RabbitConnectionError extends Error {}

const Rabbit = {
  _conn: null,
  _channel: null,

  connect: async (configs) => {
    try {
      this._conn = await amqp.connect(configs.RABBITMQ_CONNECTION_URL);
      this._channel = await this._conn.createChannel();
      await this._channel.assertQueue('micro-orders');
    } catch (error) {
      throw new RabbitConnectionError(error);
    }
  },

  sendToQueue: async (queue, data) => {
    await this._channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  },

  close: async () => {
    await this._channel.close();
    await this._conn.close();
  },

  consume: (queue, cb, options) => {
    this._channel.consume(
      queue,
      async (message) => {
        cb(message.content.toString());
        this._channel.ack(message);
      },
      options
    );
  },
};

module.exports = Rabbit;
