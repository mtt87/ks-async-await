// Why not async utility module?
async.waterfall(
  [
    function(callback) {
      callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
      callback(null, 'three');
    },
    function(arg1, callback) {
      callback(null, 'done');
    },
  ],
  function(err, result) {},
);

// Using an external module not standard JS features
// You need to read the documentation of that library
// This code will be transformed
// (will it be performant? will it be optimized by v8?)
// Still doesn't feel like reading synchronous code
