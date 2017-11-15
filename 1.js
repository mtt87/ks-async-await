// What problem are we solving?

function doSomeAsyncStuff(done) {
  getData(function(err, x) {
    if (err) return done(err);
    return getMoreData(x, function(err, y) {
      if (err) return done(err);
      return getMoreData(y, function(err, z) {
        if (err) return done(err);
        return done(null, z);
      });
    });
  });
}

// Harder to read, especially for newbies
// Convention cb(err, result)
// Doesn't feel like reading synchronous code
// More prone to errors?
