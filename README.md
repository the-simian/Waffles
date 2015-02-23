waffles
==========

[![Join the chat at https://gitter.im/the-simian/Waffles](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/the-simian/Waffles?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A responsive grid framework that supports automatic sizing and mixed fixed/
fluid layouts.

Waffles, fundamentally is based on the idea of a unit of measurement, that scales every fluid and fixed element to a 'worldspace value'. If a measurement is not by natre, fluid, then it is probably scaled to this value. This value, defaulted to 40px can be overidden at any point by overriding the value $brick before including waffle sin your build pipeline.

Including waffle sin your pipeline is pretty straighforaward, and is like any other stylus plugin. Here is an example using gulp:

```

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var nib = require('nib');
var waffles = require('waffles');

//showing some other popular stylus libraries, for the sake of example

var stylusConfig = {
  use: [
    nib(),
    waffles(), //include waffles so it might be @imported
    autoprefixer({
      browsers: ['ie 7', 'ie 8']
    })
  ]
};

var src = ['/allmystylus/**/*.styl'];

gulp
  .src(src)
  .pipe(stylus(stylusConfig))
  .pipe(gulp.dest('output.css'));
      
```      

Then just use @import "waffles" in your actual stylus files.

It is recommended to use some sort of css reset in addition to waffles. If you're using something like nib, it comes with a css reset just call

```
global-reset()
```

in your stylus files after also including nib


