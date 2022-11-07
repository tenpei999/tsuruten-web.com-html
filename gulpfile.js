const gulp = require('gulp');                                    //gulpパッケージを変数に格納
const plumber = require("gulp-plumber");                         // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));              //gulp-sassパッケージを変数に格納

//タスクの記述
gulp.task('sass', function() {
	return gulp.src('./src/scss/style.scss')
  .pipe(
    //エラーが出ても処理を止めない
    plumber({
      errorHandler: notify.onError('Error:<%= error.message %>')
    }))
    .pipe( sassGlob() )
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./css'));
});

// sassコマンドをデフォルトにする
gulp.task('default', gulp.series(['sass']));

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
  gulp.parallel('sass'),
);