#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const hasUber = require('has-uber')
const chalk = require('chalk')

const titleCase = require('./lib/title-case')

const cli = meow(`
  Usage:
    $ has-uber <city>   Check if Uber is available or not
  Example:
    $ has-uber new-york
    $ has-uber sao-paulo
    $ has-uber toronto
  Options:
    -h, --help         Show help options
    -v, --version      Show version
`, {
  alias: {
    h: 'help',
    v: 'version'
  }
})

updateNotifier({pkg: cli.pkg}).notify()

const run = () => {
  if (cli.input[0]) {
    const place = cli.input[0]
    const pretty = titleCase(place)

    hasUber(place)
      .then(() => console.log(`${chalk.green('✔')} Uber is available in ${pretty}`))
      .catch(() => console.log(`${chalk.red('✖')} Uber is not available in ${pretty}`))
  } else {
    cli.showHelp()
  }
}

run(cli)
