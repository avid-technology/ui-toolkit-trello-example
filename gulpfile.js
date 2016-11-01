"use strict";

let gulp = require('gulp');
let webdriver = require('gulp-webdriver');
let selenium = require('selenium-standalone');
let webpack = require('gulp-webpack');
let runSequence = require('run-sequence');

gulp.task('webpack', () => {
    return gulp.src('./index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('selenium:start', (done) => {
    return selenium.install({logger: console.log}, () => {
        selenium.start(() => {
            done();
        });
    });
});

gulp.task('wdio', () => {
    return gulp.src('./wdio.conf.js').pipe(webdriver());
});

gulp.task('test', done => {
    runSequence('webpack', 'selenium:start', 'wdio', () => {
        done();
    });
});