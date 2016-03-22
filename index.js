var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var async = require('async');
var _ = require('lodash');
var through = require('through2');
var fastImageSize = require('./lib/fastimagesize');
var css = require('css');
var applySourceMap = require('vinyl-sourcemaps-apply');

function lazyImageCSS(options) {

    options = _.extend({
        width: true,
        height: true,
        backgroundSize: true,
        imagePath: []
    }, options);

    return through.obj(function (file, enc, cb) {

        var cssContent = file.contents.toString();

        var imagePath = options.imagePath;

        if (imagePath.length) {
            imagePath = '(' + options.imagePath.join('|') + '/)';
            imagePath = imagePath.replace(/\./g, '\\.');
        } else {
            imagePath = '';
        }

        var imageRegex = new RegExp('url\\(["\']?(' + imagePath + '[^)]*?)["\']?\\)');

        var obj = css.parse(cssContent);

        function setProperty(property, value) {
            return {
                "type": "declaration",
                "property": property,
                "value": value
            };
        }

        function parseRules(rules) {

            for (var i = 0; i < rules.length; i++) {

                var rule = rules[i];

                if (rule.type === 'keyframes') {
                    parseRules(rule.keyframes);
                }

                if (rule.type === 'media') {
                    parseRules(rule.rules);
                }

                if (rule.type === 'rule' || rule.type === 'keyframe') {

                    var declarations = rule.declarations;
                    var code = {};

                    declarations.forEach(function (declaration) {
                        code[declaration.property] = declaration.value;
                    });

                    var property;
                    var hasImage = false;

                    if (code['background-image']) {
                        property = 'background-image';
                        hasImage = true;
                    } else if (code['background']) {
                        property = 'background';
                        hasImage = true;
                    }

                    if (!hasImage) {
                        continue;
                    }

                    var value = code[property];

                    var matchValue = imageRegex.exec(value);

                    if (!matchValue || matchValue[1].indexOf('data:') === 0) {
                        continue;
                    }

                    var relativePath = matchValue[1];
                    var absolutePath = path.join(path.dirname(file.path), relativePath);

                    if (value.indexOf('@2x') > -1) {
                        options.retina = true;
                    } else {
                        options.retina = false;
                    }

                    var info = fastImageSize(absolutePath);

                    if (info.type === 'unknown') {
                        console.log('' + 'unknown type: ' + absolutePath);
                        continue;
                    }

                    var width, height, newDeclaration;

                    if (options.retina) {
                        width = info.width / 2 + 'px';
                        height = info.height / 2 + 'px';
                    } else {
                        width = info.width + 'px';
                        height = info.height + 'px';
                    }

                    if (options.width && !code['width']) {
                        newDeclaration = setProperty('width', width);
                        declarations.push(newDeclaration);
                    }

                    if (options.height && !code['height']) {
                        newDeclaration = setProperty('height', height);
                        declarations.push(newDeclaration);
                    }

                    if (options.backgroundSize && options.retina && !code['background-size'] && !code['-webkit-background-size']) {
                        newDeclaration = setProperty('background-size', width);
                        declarations.push(newDeclaration);
                    }
                }
            }
        }

        if (obj.stylesheet.rules.length > 0) {
            parseRules(obj.stylesheet.rules);
            cssContent = css.stringify(obj);
        }

        file.contents = new Buffer(cssContent);

        if(file.sourceMap){
            var map = file.sourceMap;

            map.file = file.relative;
            map.sources = map.sources.map(function (source) {
                return path.relative(file.base, source);
            });


            applySourceMap(file, map);
        }



        this.push(file);


        // this.push(new File({
        //     base: file.base,
        //     path: file.path,
        //     contents: new Buffer(cssContent)
        // }));

        cb();
    });

}

// Exporting the plugin main function
module.exports = lazyImageCSS;
