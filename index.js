var async = require('async');
var lodash = require('lodash');
var through = require('through2');
var File = require('vinyl');
var path = require('path');
var fs = require('fs');
var imageinfo = require('imageinfo');

function lazyImageCSS(options) {

    options = lodash.extend({
        width: true,
        height: true,
        backgroundSize: true,
        slice: 'slice'
    }, options);

    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {

        var _this = this;

        var images = [];

        var cssContent = file.contents.toString();
        var sliceRegex = new RegExp('background-image:[\\s]*url\\(["\']?(?!http[s]?|/)[^)]*?([\\./]*?' + options.slice + '/[\\w\\d\\s!./\\-\\_@]*\\.[\\w?#]+)["\']?\\)[^}]*?', 'ig');
        var codelines = cssContent.match(sliceRegex);

        if (!codelines || codelines.length === 0) {
            _this.push(new File({
                base: file.base,
                path: file.path,
                contents: file.contents
            }));
            return cb(null);
        }

        async.eachSeries(codelines, function (backgroundCodeLine, eachCb) {

            var relativePath = backgroundCodeLine.replace(sliceRegex, '$1');
            var absolutePath = path.join(path.dirname(file.path), relativePath);

            options.retina = false;

            if (backgroundCodeLine.indexOf('@2x') > 0) {
                options.retina = true;
            }

            if (lodash.includes(images, absolutePath)) {
                return eachCb();
            }

            images.push(absolutePath);

            fs.readFile(absolutePath, function (err, data) {
                if (err) throw err;

                info = imageinfo(data);

                var code = '';
                var width, height;

                if (options.retina) {
                    width = info.width / 2;
                    height = info.height / 2;
                } else {
                    width = info.width;
                    height = info.height;
                }

                if (options.width) {
                    code += 'width: ' + width + 'px;';
                }

                if (options.height) {
                    code += 'height: ' + height + 'px;';
                }

                code += backgroundCodeLine + ';';

                if (options.backgroundSize && options.retina) {
                    code += 'background-size: ' + width + 'px;';
                }

                if (code) {
                    cssContent = cssContent.split(backgroundCodeLine).join(code);
                }

                eachCb();

            });


        }, function () {
            _this.push(new File({
                base: file.base,
                path: file.path,
                contents: new Buffer(cssContent)
            }));

            cb();
        })
    });
}

// Exporting the plugin main function
module.exports = lazyImageCSS;
