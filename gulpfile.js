const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

function serve() {
  return browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}
exports.serve = serve;

function css() {
  return src("./src/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/assets/"));
}
exports.css = css;

function js() {
  return src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("./dist/assets/"));
}
exports.js = js;

function html() {
  return src("./src/pug/views/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("./dist"));
}
exports.html = html;

exports.watch = function () {
  serve();
  watch("./src/css/*.scss", css).on("change", reload);
  watch("./src/pug/**/*.pug", html).on("change", reload);
  watch("./src/js/*.js", js).on("change", reload);
};
