#!/usr/bin/env node

// run a docker-compose yaml file with optional list of services

// usage: shell/docker COMMAND SETUP [SERVICES]
// COMMAND can be start, startd, stop
// SETUP is the setup subfolder, eg vmc, ccs-pa
// SERVICES is an optional space-delim list of services to start/stop
// eg `shell/docker startd ccs-pa agent`

const fs = require('fs')
const { exec } = require('child_process')

const cmd = process.argv[2] // eg 'start', 'startd', 'stop'
const setup = process.argv[3] // eg 'vmc'
const services = process.argv.slice(4).join(' ') // eg 'agent timescaledb'

const composefile = `setups/compose.yaml`
let args = `--file ${composefile}`

const composefile2 = `setups/${setup}/compose-${setup}.yaml`
if (fs.existsSync(composefile2)) {
  args += ` --file ${composefile2}`
}

const envfile = `setups/.env`
if (fs.existsSync(envfile)) {
  args += ` --env-file ${envfile}`
}

let flags = ''
if (cmd == 'startd') {
  flags = '--detach'
}

if (cmd === 'start' || cmd === 'startd') {
  // pull any required images in the docker-compose files and start services.
  const cmd = `SETUP=${setup} docker-compose ${args} pull ${services} && SETUP=${setup} docker-compose ${args} up --build ${flags} ${services}`
  console.log(cmd)
  exec(cmd)
} else if (cmd === 'stop') {
  const cmd = `SETUP=${setup} docker-compose ${args} down ${services}`
  console.log(cmd)
  exec(cmd)
}
