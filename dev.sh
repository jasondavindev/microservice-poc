export BASE=$PWD

function dkup {
  CD=$(pwd)
  cd $BASE
  docker-compose up -d rabbit mysql
  exitcode=$?
  cd $CD
  return $exitcode
}

function dkdown {
  CD=$(pwd)
  cd $BASE
  docker-compose down
  exitcode=$?
  cd $CD
  return $exitcode
}

function install_packages {
  dk "yarn install"
}

function start_services {
  CD=$(pwd)
  cd $BASE
  docker-compose up -d api worker
  exitcode=$?
  cd $CD
  return $exitcode
}
