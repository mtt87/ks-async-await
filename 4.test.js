const puppeteer = require('puppeteer');

async function getPageTitle(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const Title = await page.$('title');
    const pageTitle = await page.evaluate(body => body.innerHTML, Title);
    console.log(pageTitle);
    await browser.close();
    return pageTitle;
  } catch (err) {
    console.log(err);
    return err;
  }
}

test('example.com page title should be "Example Domain"', async () => {
  expect(await getPageTitle('http://www.example.com')).toBe('Example Domain');
});

test('google.com page title should be "Google"', async () => {
  expect(await getPageTitle('http://www.google.com')).toBe('Google');
});
