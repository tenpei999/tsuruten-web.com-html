//gulpパッケージを変数に格納
const gulp = require('gulp');

//gulp-sassパッケージを変数に格納
const sass = require('gulp-sass')(require('sass'));

//タスクの記述
gulp.task('sass', function() {
	return gulp.src('./src/scss/**/*.scss','./src/scss/style.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./css'));
});

// sassコマンドをデフォルトにする
gulp.task('default', gulp.series(['sass']));