var should = require('should');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var noop = function () {};

var lazyimagecss = require('../');

describe('lazyimagecss test', function() {
    it('生成 width', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/width/g).length.should.equal(4);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('width 值正确', function(done) {

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

    it('生成 height', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/height/g).length.should.equal(4);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('height 值正确', function(done) {

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

    it('生成 background-size', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss())
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.match(/background-size/g).length.should.equal(2);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('background-size 值正确', function(done) {

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

    it('width: false 测试', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                width: false
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('width').should.equal(-1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('height: false 测试', function(done) {

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

    it('backgroundSize: false 测试', function(done) {

        vfs.src('./test/src/css/style.css')
            .pipe(lazyimagecss({
                backgroundSize: false
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                content.indexOf('background-size').should.equal(-1);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });

    it('slicePath 测试', function(done) {

        vfs.src('./test/src/css/slicePath.css')
            .pipe(lazyimagecss({
                slicePath: '../img'
            }))
            .pipe(through2.obj(function(file, enc, cb){
                content = file.contents.toString();

                //能跑起来证明正确
                content.match(/width/g).length.should.equal(4);

                cb();
            }))
            .on('data', noop)
            .on('end', done);

    });
});

