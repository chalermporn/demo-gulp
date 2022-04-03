const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

const { src, dest, watch, task } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const pug = require("gulp-pug");
// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("dist/**/*.html").on("change", reload);
    gulp.watch("./src/css/*.scss", css).on("change", reload);
    gulp.watch("./src/pug/**/*.pug", html).on("change", reload);
    gulp.watch("./src/js/*.js", js).on("change", reload);
});



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
  watch("./src/css/*.scss", css);
  watch("./src/pug/**/*.pug", html);
  watch("./src/js/*.js", js);
};