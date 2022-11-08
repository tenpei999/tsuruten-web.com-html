"use strict";

var gulp = require('gulp'); //gulpパッケージを変数に格納


var plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない


var notify = require("gulp-notify"); // エラー発生時のアラート出力


var browserSync = require("browser-sync"); //ブラウザリロード


var sassGlob = require("gulp-sass-glob-use-forward");

var sass = require('gulp-sass')(require('sass')); //gulp-sassパッケージを変数に格納
//タスクの記述


gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss').pipe( //エラーが出ても処理を止めない
  plumber({
    errorHandler: notify.onError('Error:<%= error.message %>')
  })).pipe(sassGlob()).pipe(sass({
    outputStyle: 'expanded'
  })).pipe(gulp.dest('./css')).pipe(browserSync.stream());
});
/**
 * html
 */

var html = function html() {
  return gulp.src('./**.html').pipe(gulp.dest('./**.html'));
};
/**
 * ローカルサーバー立ち上げ
 */


var browserSyncFunc = function browserSyncFunc() {
  browserSync.init(browserSyncOption);
};

var browserSyncOption = {
  server: "./"
};
/**
 * リロード
 */

var browserSyncReload = function browserSyncReload(done) {
  browserSync.reload();
  done();
};

var watchFiles = function watchFiles(done) {
  gulp.watch('./src/scss/style.scss', gulp.series['sass']);
  gulp.watch('*/**/', function () {
    gulp.series(html, browserSyncReload);
  });
};
/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */


exports["default"] = gulp.series(gulp.parallel('sass'), gulp.parallel(browserSyncFunc), gulp.parallel(watchFiles));