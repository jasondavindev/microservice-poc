export BASE=$PWD

function start_stores {
  CD=$(pwd)
  cd $BASE
  docker-compose -f docker-compose-dbs.yml up
  exitcode=$?
  cd $CD
  return $exitcode
}

function install_packages {
  docker run --rm -v $PWD:/app -w /app node:10.16.0 yarn install
}

function start_queues_micro {
  CD=$(pwd)
  cd $BASE
  docker-compose -f docker-compose-queues.yml up
  exitcode=$?
  cd $CD
  return $exitcode
}

function start_exchanges_micro {
  CD=$(pwd)
  cd $BASE
  docker-compose -f docker-compose-exchanges.yml up
  exitcode=$?
  cd $CD
  return $exitcode
}
