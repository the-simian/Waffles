'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify-css');
var help = require('gulp-task-listing');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

var options = {
	srcFiles: './stylus/**/*',
	distPath: './dist',
	developmentName: 'waffles.css',
	productionName: 'waffles.min.css'
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

gulp.task('build-development', buildDev);
gulp.task('build-production', buildProduction);

gulp.task('build', ['build-development', 'build-production']);

gulp.task('clean', cleanDist);

gulp.task('help', help);
gulp.task('default', ['help']);
