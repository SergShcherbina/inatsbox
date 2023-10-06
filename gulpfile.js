"use strict";

import gulp from 'gulp';
import webpackStream from "webpack-stream";
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from "gulp-rename";
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import webp from 'gulp-webp';

const dist = "./dist/";
const sass = gulpSass(dartSass);

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('video', function () {
    return gulp.src("src/video/**/*")
        .pipe(gulp.dest("dist/video"))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*.+(png|jpeg|gig|svg|jpg)")
        // .pipe(imagemin())
        .pipe(webp())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*.+(png|jpeg|gig|svg|jpg)")
        // .pipe(imagemin())
        .pipe(webp())
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

//из-за динамического импорта, 1 скрипт в обход webpack
gulp.task('scripts', function () {
    return gulp.src("src/js/module/onSubmit.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('slider', function () {
    return gulp.src("src/js/module/slider.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task("watch", () => {
    browserSync.init({
        server: "./dist/",
        port: 3000,
        notify: true
    });

    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('copy-html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('build-js'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/video/**/*").on('all', gulp.parallel('video'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/mailer/**/*").on('all', gulp.parallel('mailer'));
    gulp.watch("src/js/module/onSubmit.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/js/module/slider.js").on('change', gulp.parallel('slider'));
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/script.js")
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'script.js',
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist + "/js"))
        // .pipe(browserSync.stream());
        .on("end", browserSync.reload);
});

gulp.task("build", gulp.parallel("copy-html", "styles", "fonts", "video", "images", "mailer", "icons", "build-js", "scripts", "slider"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/index.js")
        .pipe(webpackStream({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));