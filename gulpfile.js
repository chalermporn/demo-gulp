// const { src, dest, watch } = require("gulp");

// const browserSync = require("browser-sync").create();
// const reload = browserSync.reload;

// function serve() {
//   return browserSync.init({
//     server: {
//       baseDir: "./dist",
//     },
//   });
// }
// exports.serve = serve;

// function css() {
//   return src("./src/css/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(dest("./dist/assets/"));
// }
// exports.css = css;

// function js() {
//   return src("./src/js/*.js")
//     .pipe(concat("script.js"))
//     .pipe(dest("./dist/assets/"));
// }
// exports.js = js;

// function html() {
//   return src("./src/pug/views/*.pug")
//     .pipe(
//       pug({
//         pretty: true,
//       })
//     )
//     .pipe(dest("./dist"));
// }
// exports.html = html;

// exports.watch = function () {
//   serve();
//   watch("./src/css/*.scss", css).on("change", reload);
//   watch("./src/pug/**/*.pug", html).on("change", reload);
//   watch("./src/js/*.js", js).on("change", reload);
// };

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const stripCssComments = require("gulp-strip-css-comments");
const cleanCSS = require("gulp-clean-css");
const cleanCssConfig = require("./configs/clean-css");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

gulp.task("css", function () {
  return gulp
    .src("src/**/styles.css")
    .pipe(
      postcss([
        require("tailwindcss")("./configs/tailwind.config.js"),
        require("autoprefixer"),
      ])
    )
    .pipe(stripCssComments({ preserve: false }))
    .pipe(cleanCSS(cleanCssConfig))
    .pipe(postcss([require("postcss-final-newline")]))
    .pipe(gulp.dest("./dist/assets/"));
});

gulp.task("pug", function () {
  return gulp
    .src("./src/pug/views/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("js", function () {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("./dist/assets/"));
});

gulp.task("scss", function () {
  return gulp
    .src("./src/css/**/*.scss")
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/assets/"));
});

gulp.task(
  "bs",
  gulp.series(["css", "scss", "js", "pug"], function () {
    browserSync.init({
      server: {
        baseDir: "./dist/",
      },
    });

    gulp.watch(
      ["./dist/**/*.html", "configs/tailwind.config.js"],
      gulp.parallel("css", "html-watch")
    );
    gulp.watch(["./src/pug/**/*.pug"], gulp.parallel("pug", "html-watch"));
    gulp.watch(["./src/js/**/*.js"], gulp.parallel("js", "html-watch"));
    gulp.watch(["./src/css/**/*.scss"], gulp.parallel("scss", "html-watch"));
  })
);

gulp.task("html-watch", (done) => {
  browserSync.reload();
  done();
});

gulp.task("default", gulp.series("bs"));
