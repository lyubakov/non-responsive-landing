'use strict';

var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync');

// сборка html css javascript + удаление папки dist
var rimraf = require('gulp-rimraf'),    
    useref = require('gulp-useref'),    
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
		plumber = require('gulp-plumber'), 
    cleanCSS = require('gulp-clean-css');

// финальная сборка
var filter = require('gulp-filter'), 
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'); 


// Перенос шрифтов
        gulp.task('fonts', function() {
          gulp.src('app/fonts/*')
            .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
            .pipe(gulp.dest('dist/fonts/'))
        });

// Картинки
        gulp.task('images', function () {
          return gulp.src('app/img/**/*')
            .pipe(imagemin({
              progressive: true,
              interlaced: true
            }))
            .pipe(gulp.dest('dist/img'));
        });

// Остальные файлы, такие как favicon.ico и пр.
        gulp.task('extras', function () {
          return gulp.src([
            'app/*.*',
            '!app/*.html'
          ]).pipe(gulp.dest('dist'));
        });

//Работаем с Jade
  var jade = require('gulp-jade');
  var jadePath = 'jade/index.jade';
    gulp.task('jade', function() {
      return gulp.src(jadePath)
        .pipe(plumber())
        .pipe(jade({
          pretty: '\t',    
        }))
        .pipe(gulp.dest('./app'))
    });

//Работаем с Sass
	var sass = require('gulp-sass'),
			autoprefixer = require('gulp-autoprefixer');
	var sassInput = 'sass/main.scss',
			sassDest = './app/css',
			sassOptions = {
			  errLogToConsole: true,
			  outputStyle: 'expanded',
			},
			autoprefixerOptions = {
  			browsers: ['last 2 versions']
			};
	gulp.task('sass', function () {
	  return gulp
	    .src(sassInput)
	    .pipe(sass(sassOptions).on('error', sass.logError))
	    .pipe(autoprefixer(autoprefixerOptions))
	    .pipe(gulp.dest(sassDest));
	});
	
// Загружаем сервер
gulp.task('server', function () {
    browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  }); 
});

// Загружаем сервер
gulp.task('server-dist', ['jade', 'sass'], function () {  
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    },
    tunnel: true
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch('jade/**/*.jade', ['jade']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);


// Следим за bower
    gulp.task('wiredep', function () {
      gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app/'))
    });

// Переносим HTML, CSS, JS в папку dist 
    gulp.task('useref', function () {
      return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
    });

    // Очистка
        gulp.task('clean', function() {
            return gulp.src('dist', { read: false }) 
            .pipe(rimraf());
        });


// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function () {
  gulp.start('dist');
});
    

// ====================================================
// ====================================================
// ===================== Функции ======================

// Более наглядный вывод ошибок
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}


// ====================================================
// ====================================================
// =============== Важные моменты  ====================
// gulp.task(name, deps, fn) 
// deps - массив задач, которые будут выполнены ДО запуска задачи name
// внимательно следите за порядком выполнения задач!
