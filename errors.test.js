async function returnError() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('newError')), 1000));
}

async function throwError() {
  return new Promise((resolve, reject) => {
    throw new Error('THROW');
    // should never get here
    console.log('paperino');
    resolve('paperino');
  })
}

test('try/catch should not catch new Error', async () => {
  let result = '';
  try {
    result = await returnError();
    // it will never get here
    expect('should get here').toBe(false);
  } catch (err) {
    expect(err).toEqual(new Error('newError'));
  }
  expect.assertions(1);
});

test('.catch() should catch throw new Error', () => {
  let result = '';
  return returnError().then((res) => {
    result = res;
    // it will never get here
    expect('should get here').toBe(false);
  }).catch((err) => {
    expect(err).toEqual(new Error('newError'));
    expect.assertions(1);
  })
});

test('try/catch should catch thrown new Error', async () => {
  let result = '';
  try {
    result = await throwError();
    // it will never get here
    expect('should get here').toBe(false);
  } catch (err) {
    expect(err).toEqual(new Error('THROW'));
    expect.assertions(1);
  }
});

test('.catch() should catch thrown new Error', () => {
  let result = '';
  return throwError().then((res) => {
    result = res;
    // it will never get here
    console.log(result);
    expect('should get here').toBe(false);
  }).catch((err) => {
    expect(err).toEqual(new Error('THROW'));
    expect.assertions(1);
  })
});
