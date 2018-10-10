import {Selector} from 'testcafe'

fixture`Home Page`.page`http://localhost:8080`

test('Check if can click [Learn More/Discover Coffee] button', async t => {
  await t.setTestSpeed(0.3)

  const btnLearn = await Selector(`.q-btn-inner div`).withText(`LEARN MORE`)
  await t.click(btnLearn)

  const btnBackLearn = await Selector('.q-btn-inner div').withText('Bring on the fruit')
  await t.expect(btnBackLearn.count).eql(1)
  await t.click(btnBackLearn)

  const btnDiscover = await Selector(`.q-btn-inner div`).withText(`DISCOVER COFFEE`)
  await t.click(btnDiscover)

  const btnBackDiscover = await Selector('.q-btn-inner div').withText('Find a new favorite')
  await t.expect(btnBackDiscover.count).eql(1)
  await t.click(btnBackDiscover)
})

test('Just another test ...', async t => {})
test('And another test ...', async t => {})
