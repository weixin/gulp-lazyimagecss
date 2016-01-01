## gulp-lazyimagecss [![NPM Version](http://img.shields.io/npm/v/gulp-lazyimagecss.svg?style=flat)](https://www.npmjs.com/package/gulp-lazyimagecss "Package version") 

[![Build Status](https://travis-ci.org/weixin/node-lwip.svg)](https://travis-ci.org/weixin/gulp-lazyimagecss "Build Status")
[![Win Build status](https://img.shields.io/appveyor/ci/hzlzh/gulp-lazyimagecss.svg?label=Win%20build)](https://ci.appveyor.com/project/hzlzh/gulp-lazyimagecss) 
[![devDependencies](https://img.shields.io/david/dev/weixin/gulp-lazyimagecss.svg)](https://ci.appveyor.com/project/weixin/gulp-lazyimagecss "devDependencies") 
[![NPM Downloads](https://img.shields.io/npm/dm/gulp-lazyimagecss.svg?style=flat)](https://www.npmjs.com/package/gulp-lazyimagecss "NPM Downloads") 

[![Join the chat at https://gitter.im/weixin/gulp-lazyimagecss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/TmT?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![TmT Name](https://img.shields.io/badge/Team-TmT-brightgreen.svg?style=flat)](https://github.com/orgs/TmT/people "Tencent Moe Team") 
[![License](https://img.shields.io/npm/l/gulp-lazyimagecss.svg?style=flat)](http://opensource.org/licenses/MIT "Feel free to contribute.") 

> 高效地书写 CSS 必备，自动生成图片`CSS`属性，如：`width` & `height` 等。   
> 省时省力，懒人必备！

**NPM 官方主页:** [https://www.npmjs.com/package/gulp-lazyimagecss](https://www.npmjs.com/package/gulp-lazyimagecss)

## 安装

通过 [NPM](https://npmjs.org/) 安装*（也可使用 [CNPM](http://cnpmjs.org/) 等源）*

```javascript
npm install gulp-lazyimagecss --save
```

## 使用

配置 **gulpfile.js**

```javascript
var lazyimagecss = require('gulp-lazyimagecss');

gulp.src(paths.src.less)
    .pipe(less())
    .pipe(lazyimagecss())
    .pipe(gulp.dest(paths.src.css));
        	
```

**配置选项**  
设置希望被自动生成的 CSS 属性  
设置生效的图片目录

```javascript
options = lodash.extend({
    width: true, // 生成 CSS: width
    height: true, // 生成 CSS: height
    backgroundSize: true, // 生成 CSS: background-size
    imagePath: [] // 设置图片生效目录（数组格式，如：`['../slice','../img']`）
}, options);
```

## 效果

**CSS 输入**


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

**CSS 输出**

```css
.bg-test {
	background: url(../img/bg.png);
	background-repeat: no-repeat;
	width: 1100px;
	height: 300px;
}
.icon-test {
	background-image: url(../slice/test.png); // test.png  原图片尺寸为 32x32
	width: 32px;
    height: 32px;
}
.icon-test-retina {
	background-image: url(../slice/test@2x.png); // test@2x.png 原图片尺寸为 64x64
	width: 32px;
    height: 32px;
    background-size: 32px;
}
```

_提示: 输出 CSS 可配合使用 [PostCSS](https://github.com/postcss/postcss) 进一步处理_

## 说明

* 如果 `width` / `height` / `background-size` 等属性已存在，则不会覆盖**对应的**原始属性值。
* 使用 `background-image: url()` 或 `background: url()` 均可被正确识别。
* 通过读取图片 `HEX` 数据取得图片 宽/高 信息，大大提升相应速度，参看：[fast-image-size](https://github.com/Ziv-Barber/fast-image-size)。
* 通过 [file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures) 判断检测图片类别，如：`PNG` & `JPG`。
* 去掉图片最小 `buffer size` 的限制，参看：[/fast-image-size/pull/5](https://github.com/Ziv-Barber/fast-image-size/pull/5)。

## 参与贡献

此项目由 [TmT 团队](https://github.com/orgs/TmT/people) 创建和维护。  
如果你有 `Bug反馈` 或 `功能建议`，请创建 [Issue](https://github.com/weixin/gulp-lazyimagecss/issues) 或发送 [Pull Request](https://github.com/weixin/gulp-lazyimagecss/pulls) 给我们，感谢你的参与和贡献。