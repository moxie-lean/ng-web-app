var browserSync = require("browser-sync").create();
var historyApiFallback = require('connect-history-api-fallback');

browserSync.init({
  files: ["public/*.html", "public/css/*.css", "public/js/*.js"],
  port: 8000,
  server: {
    baseDir: "public",
    middleware: [ historyApiFallback() ]
  }
});