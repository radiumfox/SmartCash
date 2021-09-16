const gulp = require("gulp");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");

const uncss = require('postcss-uncss');
const cleanCss = require('gulp-clean-css');

const autoprefixer = require("autoprefixer");
const del = require("del");
const sync = require("browser-sync").create();
const concat = require("gulp-concat");
const terser = require("gulp-terser");

const ghPages = require("gulp-gh-pages");

const plugins = [
  uncss({
    html: ['source/*.html'],
    ignore: [
      ".fade",
      ".fade.in",
      ".collapse",
      ".collapse.in",
      ".collapsing",
      ".alert-danger",
      ".open",
      "/open+/"
    ]
  }),
];

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(cleanCss({
      level: 0,
      format: 'keep-breaks'
    }))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(plumber())
    .pipe(concat("main.js"))
    .pipe(gulp.dest("build/js/"))
    .pipe(terser())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("build/js/"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/**/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
  ),
  gulp.series(
    server,
    watcher
  ));

  // deploy

  gulp.task("deploy", function() {
    return gulp.src("./build/**/*")
      .pipe(ghPages());
  });
