'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify-css');
var help = require('gulp-task-listing');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var livereload = require('gulp-livereload');

var options = {
	srcFiles: './lib/**/*',
	distPath: './dist',
	developmentName: 'waffles.css',
	productionName: 'waffles.min.css',
	readme: './README.md',
	gulpfile: './gulpfile.js'
};

function buildDev() {
	gulp.src(options.srcFiles)
		.pipe(stylus())
		.pipe(gulp.dest(options.distPath));
}

function buildProduction() {
	gulp.src(options.srcFiles)
		.pipe(stylus())
		.pipe(minify())
		.pipe(rename(function addMin(path) {
			path.extname = '.min.css';
		}))
		.pipe(gulp.dest(options.distPath));
}

function cleanDist() {
	gulp.src(options.distPath)
		.pipe(rimraf({
			force: true
		}));
}

function notifyStylusChange() {
	gulp.watch(options.srcFiles, livereload.changed);
}

function notifyReadmeChange() {
	gulp.watch(options.readme, livereload.changed);
}

function notifyGulpfileChange() {
	// Can you handle the meta!?
	gulp.watch(options.gulpfile, livereload.changed);
}

function startListener() {
	livereload.listen();
}

gulp.task('watch-stylus', notifyStylusChange);
gulp.task('watch-readme', notifyReadmeChange);
gulp.task('watch-gulpfile', notifyGulpfileChange);
gulp.task('watch-startListener', startListener);

gulp.task('watch', [
	'watch-stylus',
	'watch-readme',
	'watch-gulpfile',
	'watch-startListener'
]);

gulp.task('build-development', buildDev);
gulp.task('build-production', buildProduction);

gulp.task('build', ['build-development', 'build-production']);

gulp.task('clean', cleanDist);

gulp.task('help', help);
gulp.task('default', ['help']);
