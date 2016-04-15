var gulp = require('gulp');
var minify = require('gulp-minify');
 
gulp.task('minify', function() {
  gulp.src('src/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        //Will not minify files in the dirs.
        // exclude: ['tasks'],
        
        //Will not minify files which matches the pattern.
        // ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['minify'])