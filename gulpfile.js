import * as nodePath from "path";

import gulp from "gulp";
import postcss from "gulp-postcss";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import combineMediaQuery from "postcss-combine-media-query";
import webpcss from "gulp-webpcss";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import sourcemaps from "gulp-sourcemaps";
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import webp from "gulp-webp";
import svgSprite from "gulp-svg-sprite";
import imageMin from "gulp-image";
import newer from "gulp-newer";
import { deleteSync } from "del";
import babel from "gulp-babel";
import gulpIf from "gulp-if";

const sass = gulpSass(dartSass);

const buildFolder = "./dest";
const srcFolder = "./src";
const rootFolder = nodePath.basename(nodePath.resolve());

const isBuild = process.argv.includes("--build");

const path = {
  build: {
    html: `${buildFolder}/`,
    assets: `${buildFolder}/assets/`,
    css: `${buildFolder}/styles/`,
    js: `${buildFolder}/scripts/`,
    img: `${buildFolder}/img/`,
    icons: `${buildFolder}/icons/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    assets: `${srcFolder}/assets/**/*.*`,
    scss: `${srcFolder}/styles/styles.scss`,
    js: `${srcFolder}/scripts/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    icons: `${srcFolder}/icons/**/*.svg`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    assets: `${srcFolder}/assets/**/*.*`,
    scss: `${srcFolder}/styles/**/*.scss`,
    js: `${srcFolder}/scripts/**/*.js`,
    img: `${srcFolder}/img/**/*.*`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};

const server = () => {
  browsersync.init({
    server: {
      baseDir: path.build.html,
    },
    notify: false,
    port: 3000,
  });
};

const reset = (done) => {
  deleteSync([path.clean]);
  done();
};

const copy = () => {
  return gulp.src(path.src.assets).pipe(gulp.dest(path.build.assets));
};

const js = () => {
  return gulp
    .src(path.src.js)
    .pipe(gulpIf(!isBuild, sourcemaps.init()))
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      gulpIf(isBuild,
        babel({
          presets: [["@babel/preset-env"]],
        })
      )
    )
    .pipe(gulpIf(isBuild, gulp.dest(path.build.js)))
    .pipe(
      gulpIf(isBuild,
        babel({
          presets: [["minify"], ["@babel/preset-env"]],
        })
      )
    )
    .pipe(
      gulpIf(isBuild,
        rename({
          extname: ".min.js",
        })
      )
    )
    .pipe(gulpIf(!isBuild, sourcemaps.write()))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream());
};

const css = () => {
  const plugins = [
    autoprefixer({
      grid: true,
      cascade: true,
    }),
    combineMediaQuery,
    cssnano,
  ];

  return gulp
    .src(path.src.scss)
    .pipe(
      plumber(
        notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(gulpIf(!isBuild, sourcemaps.init()))
    .pipe(
      webpcss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
          cascade: true,
        }),
      ])
    )
    .pipe(gulpIf(isBuild, gulp.dest(path.build.css)))
    .pipe(gulpIf(isBuild, postcss(plugins)))
    .pipe(
      gulpIf(isBuild,
        rename({
          extname: ".min.css",
        })
      )
    )
    .pipe(gulpIf(!isBuild, sourcemaps.write()))
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream());
};

const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(
      plumber(
        notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(webpHtmlNosvg())
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream());
};

const images = () => {
  return gulp
    .src(path.src.img)
    .pipe(
      plumber(
        notify.onError({
          title: "Image",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(newer(path.build.img))
    .pipe(webp())
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.img))
    .pipe(newer(path.build.img))
    .pipe(imageMin())
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.img))
    .pipe(browsersync.stream());
};

const sprite = () => {
  return gulp
    .src(path.src.icons)
    .pipe(
      plumber(
        notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest(path.build.icons))
    .pipe(browsersync.stream());
};

const watcher = () => {
  gulp.watch(path.watch.assets, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, images);
};

const mainTasks = gulp.parallel(copy, html, css, js, images);
const dev = gulp.series(
  reset,
  sprite,
  mainTasks,
  gulp.parallel(watcher, server)
);
const build = gulp.series(reset, sprite, mainTasks);

gulp.task("sprite", sprite);
gulp.task("default", dev);
gulp.task("build", build);
