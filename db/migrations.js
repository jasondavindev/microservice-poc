const Mysql = require('./mysql');

async function main() {
  await Mysql.query(`CREATE TABLE orders (
    id int(11) primary key auto_increment,
    user varchar(40) not null,
    address varchar(100) not null,
    uuid varchar(40) not null,
    price decimal(14,2) default 0,
    shipping_price decimal(6,2) default 0
  );`);
}

main()
  .catch((e) => console.log(e.message))
  .finally(Mysql.close);
