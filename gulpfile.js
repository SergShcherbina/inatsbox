// import gulp from 'gulp';
// import browserSync from 'browser-sync';
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';
// import cleanCSS from 'gulp-clean-css';
// import autoprefixer from 'gulp-autoprefixer';
// import rename from "gulp-rename";
// import imagemin from 'gulp-imagemin';
// import htmlmin from 'gulp-htmlmin';
//
// const sass = gulpSass(dartSass);
//
// gulp.task('server', function () {
//
//     browserSync.init({
//         server: {
//             baseDir: "./dist"
//         }
//     });
//
//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });
//
// gulp.task('styles', function () {
//     return gulp.src("src/sass/**/*.+(scss|sass)")
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(rename({suffix: '.min', prefix: ''}))
//         .pipe(autoprefixer())
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest("dist/css"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('watch', function () {
//     gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
//     gulp.watch("src/*.html").on('change', gulp.parallel('html'));
//     gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
//     gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
//     gulp.watch("src/video/**/*").on('all', gulp.parallel('video'));
//     gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
//     gulp.watch("src/mailer/**/*").on('all', gulp.parallel('mailer'));
// });
//
// gulp.task('reset', async function () {
//     return gulp.src("src/**/*.*")
//         .del(gulp.dest("dist/"));
// });
//
// gulp.task('html', function () {
//     return gulp.src("src/*.html")
//         .pipe(htmlmin({collapseWhitespace: true}))
//         .pipe(gulp.dest("dist/"));
// });
//
// gulp.task('scripts', function () {
//     return gulp.src("src/js/**/*.js")
//         .pipe(gulp.dest("dist/js"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('fonts', function () {
//     return gulp.src("src/fonts/**/*")
//         .pipe(gulp.dest("dist/fonts"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('video', function () {
//     return gulp.src("src/video/**/*")
//         .pipe(gulp.dest("dist/video"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('mailer', function () {
//     return gulp.src("src/mailer/**/*")
//         .pipe(gulp.dest("dist/mailer"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('images', function () {
//     return gulp.src("src/img/**/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/img"))
//         .pipe(browserSync.stream());
// });
//
// gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'video', 'html', 'mailer', 'images'));

"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
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
        .pipe(gulp.dest(dist))
        .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest(dist + "/assets"))
        .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
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