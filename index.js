#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const hasUber = require('has-uber')
const ora = require('ora')
const chalk = require('chalk')
const wer = require('wer')

const cli = meow(
  `
  Usage:
    $ has-uber <city>     Check if Uber is available or not

  Example:
    $ has-uber new-york
    $ has-uber sao-paulo
    $ has-uber toronto

  Options:
    -h, --help            Show help options
    -v, --version         Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = async () => {
  const input = cli.input[0]
  const location = input ? input : await wer()
  const city = input
    ? location
    : location.region.replace(/\s+/g, '-').toLowerCase()
  const spinner = ora(`Verifying Uber in ${city}`)

  spinner.start()

  const uber = await hasUber(city)

  spinner.stop()

  if (uber.length > 0) {
    return console.log(`${chalk.green('✔')} Uber is available in ${city}`)
  }

  return console.log(`${chalk.red('✖')} Uber is not available in ${city}`)
}

run(cli)
