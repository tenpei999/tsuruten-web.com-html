const gulp = require('gulp')                                    //gulpパッケージを変数に格納
//scss
const sass = require('gulp-dart-sass');//Dart Sass はSass公式が推奨 @use構文などが使える
const sassGlob = require('gulp-sass-glob-use-forward')
const gulpUglify = require('gulp-uglify'); 
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード
const changed = require('gulp-changed');
const imageMin = require('gulp-imagemin')

const paths = {
  rootDir   : {root: './', html: './index.html'},
  srcDir    : {css: './src/scss/**/*.scss', js: './src/js/**/*.js', img: './src/img/min/*.{jpg,jpeg,png,svg,gif}', imgmin: './src/img/min/*.{jpg,jpeg,png,svg,gif}' },
  dstDir    : { css: './css', js: './js', img: './img' },
  serverDir : 'localhost',
};

/**
 * sass
 *
 */
const cssSass = () => {
  return gulp.src(paths.srcDir.css)
  .pipe(
    //エラーが出ても処理を止めない
    plumber({
      errorHandler: notify.onError('Error:<%= error.message %>')
    }))
  .pipe( sassGlob() )
  .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
  .pipe(gulp.dest(paths.dstDir.css))
  .pipe(browserSync.stream())
  .pipe(notify({
    message: 'Sassをコンパイルしました！',
    onLast: true
  }))
}

const uglify = () => {
  return gulp.src(paths.srcDir.js)
  .pipe(gulpUglify())
  // .pipe(rename({
  //     extname: '.min.js'
  // }))
  .pipe(gulp.dest(paths.dstDir.js));
}

/**
 * html
 */
const html = () => {
  return gulp.src(paths.rootDir.html)
  }

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  server: paths.rootDir
}

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

const watchFiles = () => {
  gulp.watch(paths.srcDir.css, gulp.series(cssSass))
  gulp.watch(paths.srcDir.js, gulp.series(uglify))
  gulp.watch(paths.rootDir.html, gulp.series(html, browserSyncReload))
}

const imagemin = (done) => {
  gulp.src(paths.srcDir.imgmin)
  .pipe(
    changed(paths.srcDir.imgmin),
    imageMin([
      // imageMin.svgo(),
      // imageMin.optipng(),
      // imageMin.gifsicle({ optimizationLevel: 3 }),
    ])
  )
  .pipe(gulp.dest(paths.dstDir.img));
  done();
}

exports.imagemin = imagemin;

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
  gulp.parallel(html, cssSass),
  gulp.parallel(uglify),
  gulp.parallel(watchFiles, browserSyncFunc)
);


