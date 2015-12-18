## gulp-lazyimagecss [![NPM version](https://badge.fury.io/js/gulp-lazyimagecss.png)](http://badge.fury.io/js/gulp-lazyimagecss) [![devDependency Status](https://david-dm.org/weixin/gulp-lazyimagecss/dev-status.png?theme=shields.io)](https://david-dm.org/weixin/gulp-lazyimagecss#info=devDependencies)

> Be lazy, add images's CSS automatically, like `width` & `height` and more.    
> Save time, make money.

**NPM Home Page:** [https://www.npmjs.com/package/gulp-lazyimagecss](https://www.npmjs.com/package/gulp-lazyimagecss)

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
    width: true,
    height: true,
    backgroundSize: true, 
    slice: 'slice' // Set slice image path
}, options);
```

## Result

**CSS In**


```css
.icon-test {
	background-image: url(../slice/test.png);
}
```

**CSS Out**

```css
.icon-test {
	width: 32px;
	height: 66px;
	background-image: url(../slice/test.png);
	background-size: 32px;
}
```

## Team & License

* [TmT Team](https://github.com/orgs/TmT/people)
* [MIT License](http://en.wikipedia.org/wiki/MIT_License)