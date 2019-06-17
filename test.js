// Packages
import test from 'ava'
import execa from 'execa'

test('it should check uber availability', async t => {
  const { stdout } = await execa('./cli.js')

  t.truthy(stdout)
})

test('it should check uber availability in new york', async t => {
  const { stdout } = await execa('./cli.js', ['new-york'])

  t.is(stdout, '✔ Uber is available in new-york')
})

test('it should check uber availability in random place', async t => {
  const { stdout } = await execa('./cli.js', ['random-place'])

  t.is(stdout, '✖ Uber is not available in random-place')
})
