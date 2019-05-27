'use strict'

const gulp = require('gulp')

const connect = require('gulp-connect')
const openBrowser = require('gulp-open')
const run = require('gulp-shell')

// Jekyll tasks
gulp.task('jekyll:dev', run.task('bundle exec jekyll build --drafts --future --incremental --trace --config=_config.yml'))

// Connect server definitions
gulp.task('connect:dev', (done) => {
  connect.server({
    root: '_site',
    port: 8080,
    livereload: true
  })
  done()
})

// Open browser
gulp.task('open:dev', (done) => {
  gulp.src(__filename)
    .pipe(openBrowser({
      uri: 'http://localhost:8080'
    }))
  done()
})

// Watch
gulp.task('watch', (done) => {
  gulp.watch(['_config.yml',
    '*.md',
    '*.html',
    '_drafts/**/*',
    '_includes/**/*',
    '_layouts/**/*',
    '_posts/**/*',
    '_sources/**/*',
    '_data/**/*',
    '_assets/**/*',
    '!_site/**/*'
  ], gulp.series(['jekyll:dev']))
  done()
})

// Task definitions

gulp.task('dev', gulp.series([
  'jekyll:dev',
  gulp.parallel([
    'connect:dev',
    'open:dev',
    'watch'
  ])
]))
