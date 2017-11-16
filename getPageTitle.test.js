const puppeteer = require('puppeteer');

function getPageTitlePromise(url) {
  return new Promise((resolve, reject) => {
    let browser;
    let page;
    let pageTitle;
    puppeteer
      .launch()
      .then((b) => {
        browser = b;
        return browser.newPage();
      })
      .then((p) => {
        page = p;
        return page
          .goto(url)
          .then(() => page.$('title'))
          .then(titleEl => page.evaluate(body => body.innerHTML, titleEl))
          .then((pTitle) => {
            pageTitle = pTitle;
          })
          .then(() => browser.close())
          .then(() => resolve(pageTitle));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

test('example.com page title should be "Example Domain"', async () => {
  getPageTitlePromise('http://www.example.com').then((pageTitle) => {
    expect(pageTitle).toBe('Example Domain');
  });
});

test('google.com page title should be "Google"', async () => {
  getPageTitlePromise('http://www.google.com').then((pageTitle) => {
    expect(pageTitle).toBe('Google');
  });
});

async function getPageTitle(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const TitleEl = await page.$('title');
    const pageTitle = await page.evaluate(body => body.innerHTML, TitleEl);
    await browser.close();
    return pageTitle;
  } catch (err) {
    return err;
  }
}

test('example.com page title should be "Example Domain"', async () => {
  expect(await getPageTitle('http://www.example.com')).toBe('Example Domain');
});

test('google.com page title should be "Google"', async () => {
  expect(await getPageTitle('http://www.google.com')).toBe('Google');
});