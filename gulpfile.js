const gulp = require('gulp')                                    //gulpパッケージを変数に格納
const sassGlob = require('gulp-sass-glob-use-forward')
const postcss = require('postcss-scss')
const sass = require('gulp-dart-sass')       //gulp-sassパッケージを変数に格納
const autoprefixer = require('autoprefixer')

const autoprefixerOption = {
  grid: true
}
console.log(postcss)

const postcssOption = [autoprefixer(autoprefixerOption)]
/**
 * sass
 *
 */
const cssSass = () => {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(postcss(postcssOption))
  .pipe( sassGlob() )
  .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
  .pipe(gulp.dest('./css'))
}

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
  gulp.parallel(cssSass),
)
