// Why not Promises?
function executeAsyncTask() {
  return functionA().then(valueA => {
    return functionB(valueA).then(valueB => {
      return functionC(valueA, valueB);
    });
  });
}

function executeAsyncTask() {
  let valueA;
  return functionA()
    .then(v => {
      valueA = v;
      return functionB(valueA);
    })
    .then(valueB => {
      return functionC(valueA, valueB);
    });
}

// The Promises "Christmas tree"
