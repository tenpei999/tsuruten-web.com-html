const gulp = require('gulp');                                    //gulpパッケージを変数に格納
const watch = require('gulp-watch');
const plumber = require("gulp-plumber");                         // エラーが発生しても強制終了させない
const notify = require("gulp-notify");                           // エラー発生時のアラート出力
const browserSync = require("browser-sync");                     //ブラウザリロード
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));              //gulp-sassパッケージを変数に格納

//タスクの記述
gulp.task('sass', function(done) {
	return gulp.src('./src/scss/style.scss')
  .pipe(
    //エラーが出ても処理を止めない
    plumber({
      errorHandler: notify.onError('Error:<%= error.message %>')
    }))
  .pipe( sassGlob() )
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream()),
  done();
});

/**
 * html
 */
const html = () => {
  return gulp.src('./**.html')
    .pipe(gulp.dest('./**.html'))
  }


/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  server: "./"
}

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

gulp.task('watch', function(done) {
  return watch('./src/scss/style.scss', function() {
    gulp.series(sass)
    done();
  });
});

gulp.task('watch', function(done) {
  return watch('*/**/', function() {
      gulp.series(html, browserSyncReload)
      done();
  });
});

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
  gulp.parallel('sass'),
  gulp.parallel(browserSyncFunc),
  gulp.parallel('watch'),
);

const browsers = [
  'last 2 versions',
  '> 5%',
  'ie = 11',
  'ios >= 8',
  'and_chr >= 5',
  'Android >= 5',
]