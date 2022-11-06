const gulp = require('gulp');                        //gulpパッケージを変数に格納
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));  //gulp-sassパッケージを変数に格納

//タスクの記述
gulp.task('sass', function() {
	return gulp.src('./src/scss/style.scss')
    .pipe( sassGlob() )
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./css'));
});

// sassコマンドをデフォルトにする
gulp.task('default', gulp.series(['sass']));