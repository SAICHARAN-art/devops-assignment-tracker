const { Builder, By, until } = require('selenium-webdriver');

(async function uiTest(){
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(process.env.APP_URL || 'http://localhost:3000');
    await driver.wait(until.titleIs('College Assignment Tracker'), 5000);
    const title = await driver.getTitle();
    if(title !== 'College Assignment Tracker') throw new Error('Unexpected page title');
    const heading = await driver.findElement(By.css('h1')).getText();
    if(!heading.includes('College Assignment Tracker')) throw new Error('Heading not found');
    console.log('Selenium UI test passed');
  } finally { await driver.quit(); }
})();
