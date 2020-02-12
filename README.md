# RabbitMQ Proof of concept

## References

- https://www.rabbitmq.com/tutorials/amqp-concepts.html
- http://www.squaremobius.net/amqp.node/channel_api.html
- https://github.com/eduardo-matos/async-concurrent-talk
- https://github.com/squaremo/amqp.node/tree/master/examples/tutorials

## Running

Run:

```bash
source dev.sh
```

Up Rabbit container:

```bash
dkup
```

Install Node.js packages:

```bash
install_packages
```

Publish messages in direct queue:

```bash
dk node queues/publisher.js --messages-count=1000
```

Access http://localhost:15672/ to view published messages.

Consume messages:

```bash
dk node queues/consumer.js
```

Consume messages concurrently:

```bash
dk node queues/consumer.js --concurrency=20
```

Publish messages by exchanges (read [Exchanges and Exchange Types](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges) for more details):

```bash
dk node exchanges/publisher.js --messages-count=1000
```

Consume messages:

```bash
dk node exchanges/consumer.js --concurrency=20
```
