"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var uglify = require("gulp-uglify");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minify = require('gulp-csso');
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function() {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .on("end", server.reload);
});

gulp.task("minifyJS", function () {
  return gulp.src("src/js/*.js")
    
    .pipe(gulp.dest("dist/js"))
    .on("end", server.reload);
});

gulp.task("images", function() {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img"));
  });

gulp.task("sprite", function() {
  return gulp.src("src/img/inline-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img"));
  });

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("dist"));
  });

gulp.task("serve", function() {
  server.init({
    server: "dist/"
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("style"));
  gulp.watch("src/js/**/*.js", gulp.series("minifyJS"));
  gulp.watch("src/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task("clean", function () {
  return del("dist");
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**",
    "src/vendor/**"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series("clean", "copy", "style", "sprite", "html", "minifyJS"));

