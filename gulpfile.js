const gulp = require('gulp');
const size = require('gulp-size');

gulp.task('default', () => {
	return gulp
		.src('axe.min.js')
		.pipe(size())
		.pipe(
			size({
				gzip: true
			})
		);
});
