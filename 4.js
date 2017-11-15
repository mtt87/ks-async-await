// How does it work?

// async keyword very important
async function getPageTitle(url) {
  try {
    // stop here until request is fulfilled
    const response = await request(url);
    // return data only after request has been fulfilled
    return response;
  } catch (err) {
    return err;
  }
}
