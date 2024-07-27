const { createHandler } = require('next/dist/build/webpack/plugins/webpack5/incremental-cache');

module.exports = createHandler({
  cacheDir: './.next/cache',
});
