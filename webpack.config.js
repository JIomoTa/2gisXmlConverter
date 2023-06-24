const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'app.js'),
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
  },
  resolve: {
    fallback: {
        "timers": false, 
        "stream": require.resolve("stream-browserify"),
        "string_decoder": false,
        "buffer": false,
        "events": false
    }
  }
};