var gulp = require('gulp');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/js/main2.js')
    .pipe(webpack({
        watch: true,
        output: {
            filename: 'app.js',
        }
    }))
    .pipe(gulp.dest('dist/js'));
});
 
gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'));
});
gulp.task('img', function() {
	return gulp.src('src/img/**')
		.pipe(gulp.dest('dist/img/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/css/**/*.scss', ['sass']);
});

gulp.task('build', ['html', 'sass', 'img']);

// gulp.task('minify', function() {
//   gulp.src('src/js/*.js')
//     .pipe(minify({
//         ext:{
//             src:'-debug.js',
//             min:'.js'
//         },
//         //Will not minify files in the dirs.
//         // exclude: ['tasks'],
        
//         //Will not minify files which matches the pattern.
//         // ignoreFiles: ['.combo.js', '-min.js']
//     }))
//     .pipe(gulp.dest('dist/js'))
// });


gulp.task('default', ['webpack', 'sass:watch', 'html', 'img']);