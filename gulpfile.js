var gulp = require('gulp');

// RUNNABLE COMMANDS

gulp.task('build', ['build:all']);
gulp.task('clean', ['clean:all']);
gulp.task('watch', ['watch:all']);

// IMPLEMENTATION

var
    babel        = require('gulp-babel'),
    del          = require('del'),
    sequence     = require('run-sequence')
    transform    = require('gulp-transform'),
    rename       = require('gulp-rename'),
    wrap         = require('gulp-wrap');
;

gulp.task('clean:all', function() {
  return del('js');
});

gulp.task('build:all', function() {
  sequence('clean:all', ['build:js', 'build:svg']);
})

gulp.task('build:js', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js'));
});

gulp.task('build:svg', function() {
  		gulp
  			.src('node_modules/wds-styles/svg/wds-*.svg')
        .pipe(transform(contents => JSON.stringify(contents), {'encoding': 'utf8'}))
        .pipe(wrap('module.exports.src=<%= contents %>'))
        .pipe(rename({'extname': '.js'}))
  			.pipe(gulp.dest("js/svg"));
  	});

gulp.task('watch:all', ['build'], function() {
  return gulp.watch([
    "src/**"
  ],['build']);
});
