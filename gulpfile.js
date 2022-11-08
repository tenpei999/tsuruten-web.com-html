const gulp = require('gulp')                                    //gulpパッケージを変数に格納
//scss
const sass = require('gulp-dart-sass');//Dart Sass はSass公式が推奨 @use構文などが使える
const sassGlob = require('gulp-sass-glob-use-forward')
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード

/**
 * sass
 *
 */
const cssSass = () => {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(
    //エラーが出ても処理を止めない
    plumber({
      errorHandler: notify.onError('Error:<%= error.message %>')
    }))
  .pipe( sassGlob() )
  .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream())
  .pipe(notify({
    message: 'Sassをコンパイルしました！',
    onLast: true
  }))
}

/**
 * html
 */
const html = () => {
  return gulp.src('./index.html')
  }

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  server: './'
}

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

const watchFiles = () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series(cssSass))
  gulp.watch('./index.html', gulp.series(html, browserSyncReload))
}

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
  gulp.parallel(html, cssSass),
  gulp.parallel(watchFiles, browserSyncFunc)
);