const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browser-sync',()=> {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', ()=> {
    browserSync.reload();
});

gulp.task('default',['browser-sync'], ()=> {
    gulp.watch('*.html',['bs-reload']);
    gulp.watch('*.js',['bs-reload']);
    gulp.watch('*.css',['bs-reload']);
});