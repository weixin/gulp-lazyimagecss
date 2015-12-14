## gulp-lazyimagecss [![NPM version](https://badge.fury.io/js/gulp-lazyimagecss.png)](http://badge.fury.io/js/grunt-timestamp) [![devDependency Status](https://david-dm.org/weixin/gulp-lazyimagecss/dev-status.png?theme=shields.io)](https://david-dm.org/weixin/gulp-lazyimagecss#info=devDependencies)

> Be lazy, add images' CSS automatically, like `width` & `height` and more.
> Save time, make money.

**NPM Home Page:** [https://www.npmjs.com/package/gulp-lazyimagecss](https://www.npmjs.com/package/gulp-lazyimagecss)

## Install

Install with [NPM](https://npmjs.org/):

```
npm install gulp-lazyimagecss --save
```

## Usage

**gulpfile.js**

```
var lazyimagecss = require('gulp-lazyimagecss');

gulp.src(paths.src.less)
    .pipe(less())
    .pipe(lazyimagecss())
    .pipe(gulp.dest(paths.src.css));
        	
```

**Options**  
Set CSS which you wish to be added automatically.

```
options = lodash.extend({
    width: true,
    height: true,
    backgroundSize: true, 
    slice: 'slice' // Set slice image path
}, options);
```

## Result

**CSS In**


```
.icon-test {
	background-image: url(../slice/test.png);
}
```

**CSS Out**

```
.icon-test {
	width: 32px;
	height: 66px;
	background-image: url(../slice/test.png);
	backgroundSize: 32px;
}
```

## Team & License

* [TmT Team](https://github.com/orgs/weixin/teams/tmt)
* [MIT License](http://en.wikipedia.org/wiki/MIT_License)