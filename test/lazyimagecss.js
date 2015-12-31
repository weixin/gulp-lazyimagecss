var should = require('should');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var css = require('css');
var noop = function () {};

var lazyimagecss = require('../');

//vfs.src('./src/css/style.css')
//    .pipe(lazyimagecss())
//    .pipe(vfs.dest('./src/ouput'))
//    .on('data', noop);

describe('lazyimagecss test', function() {
    it('[Generated] Image `width`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/width/g).length.should.equal(8);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Correct] `width` value', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('width: 64px').should.be.above(0);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Generated] Image `height` ', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/height/g).length.should.equal(8);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Correct] `height` value', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('height: 64px').should.be.above(0);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Generated] Image `background-size`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/background-size/g).length.should.equal(6);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Correct] `background-size` value', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('background-size: 64px').should.be.above(0);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Worked] Option: `width`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                width: false
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/width/g).length.should.equal(1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Worked] Option: `height`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                height: false
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('height').should.equal(-1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Worked] Option: `backgroundSize`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                backgroundSize: false
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/background-size/g).length.should.equal(1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('[Worked] Option: `imagePath`', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                imagePath: ['../img']
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                // check it work or not.
                content.match(/background-size/g).length.should.equal(1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });
});

