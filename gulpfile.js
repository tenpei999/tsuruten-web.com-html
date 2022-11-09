const gulp = require('gulp')                                    //gulpパッケージを変数に格納
//scss
const sass = require('gulp-dart-sass');//Dart Sass はSass公式が推奨 @use構文などが使える
const sassGlob = require('gulp-sass-glob-use-forward')
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード
const autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス付与
const sourcemaps = require('gulp-sourcemaps'); // ソースマップ出力
const changed = require('gulp-changed')
const cached  = require('gulp-cached'); // ファイルキャッシュ
const imageMin = require('gulp-imagemin')
const purgecss  = require ( 'gulp-purgecss' )
const cleanCss  = require ( 'gulp-clean-css' )


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
  .pipe(cached('scss')) // ファイルをキャッシュ
  .pipe(sourcemaps.init())
  .pipe( sassGlob() )
  .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
  .pipe(autoprefixer({
    cascade: true
  }))
  .pipe(sourcemaps.write('./'))
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
  gulp.parallel(watchFiles, browserSyncFunc),
);

function imagemin(done) {
  gulp.src("./src/img/min/*")
    .pipe(
      changed("./src/img/**"),
      imageMin([
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest("./dist/img/"));
  done();
}

gulp.task('css', () => {
  return gulp.src('./css/*.css')
      .pipe(purgecss({
          content: ['./*.html']
      }))
      .pipe(cleanCss())
      .pipe(gulp.dest('./css/build'))
})

exports.imagemin = imagemin
exports.css = gulp.css