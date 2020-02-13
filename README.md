# Microservices Proof of concept

## Running

Run:

```bash
source dev.sh
```

Up Rabbit and Mysql containers:

```bash
start_stores
```

Install Node.js packages:

```bash
install_packages
```

## Queues Service

Start API and Worker:

```bash
start_queues_micro
```

Create a new order:

```bash
curl -H 'Content-type: application/json' -X POST -d '{"user": "juca", "address": "Av Sao joao", "price": 1223.2}' localhost:3000/order

Response:

{"id":"e8af94e4-e739-436e-9f4f-38d2e2a15688"}
```

Check order status:

```bash
curl localhost:3000/status/e8af94e4-e739-436e-9f4f-38d2e2a15688

Response:

{
  "id": 1,
  "user": "juca",
  "address": "Av Sao joao",
  "uuid": "e8af94e4-e739-436e-9f4f-38d2e2a15688",
  "price": "1223.2",
  "shipping_price": "608.00"
}
```

## Exchanges Service

Start API and Workers:

```bash
start_exchanges_micro
```

Create a new school:

```bash
curl -H 'Content-type: application/json' -X POST -d '{"name": "Escola", "address": "Av Sao joao"}' localhost:3000/school

Response:

{"success":true}
```
