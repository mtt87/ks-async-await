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
