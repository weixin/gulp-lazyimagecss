## gulp-lazyimagecss [![NPM Version](http://img.shields.io/npm/v/gulp-lazyimagecss.svg?style=flat)](https://www.npmjs.com/package/gulp-lazyimagecss "Package version") 

[![Build Status](https://travis-ci.org/weixin/node-lwip.svg)](https://travis-ci.org/weixin/gulp-lazyimagecss "Build Status")
[![Win Build status](https://img.shields.io/appveyor/ci/hzlzh/gulp-lazyimagecss.svg?label=Win%20build)](https://ci.appveyor.com/project/hzlzh/gulp-lazyimagecss) 
[![devDependencies](https://img.shields.io/david/dev/weixin/gulp-lazyimagecss.svg)](https://ci.appveyor.com/project/weixin/gulp-lazyimagecss "devDependencies") 
[![NPM Downloads](https://img.shields.io/npm/dm/gulp-lazyimagecss.svg?style=flat)](https://www.npmjs.com/package/gulp-lazyimagecss "NPM Downloads") 

[![Join the chat at https://gitter.im/weixin/gulp-lazyimagecss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/TmT?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![TmT Name](https://img.shields.io/badge/Team-TmT-brightgreen.svg?style=flat)](https://github.com/orgs/TmT/people "Tencent Moe Team") 
[![License](https://img.shields.io/npm/l/gulp-lazyimagecss.svg?style=flat)](http://opensource.org/licenses/MIT "Feel free to contribute.") 

> Be lazy, add images's CSS automatically, like `width` & `height` and more.    
> Save time, make money.

**NPM Home Page:** [https://www.npmjs.com/package/gulp-lazyimagecss](https://www.npmjs.com/package/gulp-lazyimagecss)

*[中文(zh_CN) 说明文档 →](https://github.com/weixin/gulp-lazyimagecss/blob/master/README-zh_CN.md)*

## Install

Install with [NPM](https://npmjs.org/):

```javascript
npm install gulp-lazyimagecss --save
```

## Usage

**gulpfile.js**

```javascript
var lazyimagecss = require('gulp-lazyimagecss');

gulp.src(paths.src.less)
    .pipe(less())
    .pipe(lazyimagecss())
    .pipe(gulp.dest(paths.src.css));
        	
```

**Options**  
Set CSS which you wish to be added automatically.

```javascript
options = lodash.extend({
    width: true, // Output width in CSS
    height: true, // Output height in CSS
    backgroundSize: true, // Output background-size in CSS
    imagePath: [] // Set image path to be worked (e.g. `['../slice','../img']`)
}, options);
```

## Result

**CSS In**


```css
.bg-test {
	background: url(../img/bg.png);
	background-repeat: no-repeat;
}
.icon-test {
	background-image: url(../slice/test.png);
}
.icon-test-retina {
	background-image: url(../slice/test@2x.png);
}
```

**CSS Out**

```css
.bg-test {
	background: url(../img/bg.png);
	background-repeat: no-repeat;
	width: 1100px;
	height: 300px;
}
.icon-test {
	background-image: url(../slice/test.png); // test.png - 32x32
	width: 32px;
    height: 32px;
}
.icon-test-retina {
	background-image: url(../slice/test@2x.png); // test.png - 64x64
	width: 32px;
    height: 32px;
    background-size: 32px;
}
```

_Tips: Use [PostCSS](https://github.com/postcss/postcss) with `CSS Out` if needed._

## Notes

* CSS property generating will be ignored if any of those `width` / `height` / `background-size` already set.
* Get image size from `HEX` data from file buffer via [fast-image-size](https://github.com/Ziv-Barber/fast-image-size), more fast now.
* Detect `PNG` & `JPG` based on [file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures).
* No minimum image buffer size limited now [/fast-image-size/pull/5](https://github.com/Ziv-Barber/fast-image-size/pull/5).

## Contributing

This repo is build and maintained by [TmT Team](https://github.com/orgs/TmT/people).  
If you get any bugs or feature requests, please open a new [Issue](https://github.com/weixin/gulp-lazyimagecss/issues) or send us [Pull Request](https://github.com/weixin/gulp-lazyimagecss/pulls), Thank you for your contributions.