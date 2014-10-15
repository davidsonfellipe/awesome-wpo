# Awesome WPO

A curated list of Web Performance Optimization. Everyone can contribute here!

- [Awesome WPO](#awesome-wpo)
    - [Browsers - Bookmarklet](#browsers-bookmarklet)
    - [Other](#other)
- [Contributing](#contributing)


## Documentation

* [Browser Diet](http://browserdiet.com/en/) - A collaborative guide about front-end performance.
* [PageSpeed Insights Rules](https://developers.google.com/speed/docs/insights/rules) - A guide created by PageSpeed Team
* [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html) - The list includes 35 best practices divided into 7 categories, created by Yahoo! Exceptional Performance team.

## Blogs

* [Performance Calendar](http://calendar.perfplanet.com/2013/) - The speed geek's favorite time of the year, maintained by @stoyanstefanov.
* [Web Performance Today](http://www.webperformancetoday.com/) - Great posts written by @tameverts.

## Browsers - Bookmarklet

* [Yahoo YSlow for Mobile/Bookmarklet](https://developer.yahoo.com/yslow/) - YSlow analyzes web pages and suggests ways to improve their performance based on a set of rules for high performance web pages.
* [PageSpeed](https://developers.google.com/speed/pagespeed/insights_extensions) - PageSpeed Insights is available as an open-source browser extension for Google Chrome. Webmasters and web developers can use PageSpeed Insights to evaluate the performance of their web pages and to get suggestions on how to improve them.
* [PerfMap](https://github.com/zeman/perfmap) - A bookmarklet to create a front-end performance heatmap of resources loaded in the browser using the Resource Timing API.
* [DOM Monster](https://github.com/madrobby/dom-monster) - A cross-platform, cross-browser bookmarklet that will analyze the DOM & other features of the page you're on, and give you its bill of health

## Webserver modules
* [PageSpeed Module](https://developers.google.com/speed/pagespeed/module/download) - PageSpeed speeds up your site and reduces page load time. This open-source webserver module automatically applies web performance best practices to pages and associated assets (CSS, JavaScript, images) without requiring that you modify your existing content or workflow. PageSpeed is available as a module for Apache 2.x and Nginx 1.x.

## Metrics Monitor
* [Keepfast](https://github.com/davidsonfellipe/keepfast) - Tool to monitor indicators related to performance of a web page.
* [Showslow](http://www.showslow.com/) - open source tool that helps monitor various website performance metrics over time. It captures the results of YSlow, Page Speed Insights, WebPageTest and dynaTrace AJAX Edition.
* [Bench](https://github.com/jmervine/bench) - Using Phantomas (a PhantomJS backed client performance metrics scrapper). Benchmark a page, store results in MongoDB and display result via the built in server.

## Grunt Plugins
* [grunt-yslow](https://github.com/andyshora/grunt-yslow) - Grunt task for testing page performance using PhantomJS, a headless WebKit browser.


## Image Optim
* [grunt-smushit](https://github.com/heldr/grunt-smushit) - Grunt plugin to remove unnecessary bytes of PNG and JPG using Yahoo Smushit
* [gulp-smushit](https://github.com/heldr/gulp-smushit) - Gulp plugin to optimize PNG and JPG using Yahoo Smushit. Made on top of smosh.
* [Smush.it](http://www.smushit.com/ysmush.it/) - Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality
* [magemin](https://github.com/imagemin/imagemin) - Minify images seamlessly with Node.js

## Minifiers - HTML
* [htmlcompressor](https://code.google.com/p/htmlcompressor/) - HtmlCompressor is a small, fast and very easy to use Java library that minifies given HTML or XML source by removing extra whitespaces, comments and other unneeded characters without breaking the content structure. As a result pages become smaller in size and load faster. A command-line version of the compressor is also available.
* [django-htmlmin](https://github.com/cobrateam/django-htmlmin) - django-html in an HTML minifier for Python with full support for HTML 5. It supports Django, Flask and any other Python web framework. It also provides a command line tool that can be used for static websites or deployment scripts.
* [HTMLMinifier](https://github.com/kangax/html-minifier) - HTMLMinifier is a highly configurable, well-tested, Javascript-based HTML minifier, with lint-like capabilities.
* [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) - A grunt plugin to minify HTML that uses HTMLMinifier.
* [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) - A gulp plugin to minify HTML that uses HTMLMinifier.
* [grunt-htmlcompressor](https://github.com/jney/grunt-htmlcompressor) - Grunt plugin for html compression, using htmlcompressor.
* [html_minifier](https://github.com/stereobooster/html_minifier) - Ruby wrapper for kangax html-minifier
* [html_press](https://github.com/stereobooster/html_press) - Ruby gem for compressing html, that removes all whitespace junk, and leaves only HTML.
* [Koa HTML Minifier](https://github.com/koajs/html-minifier) - Middleware that minifies your HTML responses using html-minifier. It uses html-minifier's default options which are all turned off by default, so you have to set the options otherwise it's not going to do anything.
* [HTML Minifier Online](http://kangax.github.io/html-minifier/) - A HTML min tool by kangax (HTMLMinifier Creator)
* [minimize](https://github.com/Moveo/minimize) - Minimize is a HTML minifier based on the node-htmlparser,currently, HTML minifier is only usuable server side. Client side minification will be added in a future release.

## Minifiers - JS & CSS

* [YUI Compressor](https://github.com/yui/yuicompressor) - JavaScript compressor which, in addition to removing comments and white-spaces, obfuscates local variables using the smallest possible variable name. This obfuscation is safe, even when using constructs such as 'eval' or 'with' (although the compression is not optimal is those cases) Compared to jsmin, the average savings is around 20%.
* [UglifyJS2](https://github.com/mishoo/UglifyJS2) - UglifyJS is a JavaScript parser, minifier, compressor or beautifier toolkit,  written in JavaScript.
* [CSSO](https://github.com/css/csso) - CSS minimizer unlike others. In addition to usual minification techniques it can perform structural optimization of CSS files, resulting in smaller file size compared to other minifiers.
* [CSSmin.js](https://github.com/stoyan/yuicompressor/blob/master/ports/js/cssmin.js) - cssmin.js is a JavaScript port of YUICompressor's CSS minifier.
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) - A Grunt plugin to concatenate files.
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - A Grunt plugin to concatenate and minify Javascript files.



## SVG
* [SVGO](https://github.com/svg/svgo) - SVGO is a Nodejs-based tool for optimizing SVG vector graphics files.


## Javascript benchmark

* [benchmark.js](http://benchmarkjs.com/) - A robust benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results.
* [JSlitmus](https://github.com/broofa/jslitmus) - JSLitmus is a lightweight tool for creating ad-hoc JavaScript benchmark tests.
* [Matcha](https://github.com/logicalparadox/matcha) - Matcha allow you to design experiments that will measure the performance of your code. It is recommended that each bench focus on a specific point of impact in your application.




## Online Tools

* [GTmetrix](http://gtmetrix.com/) - GTmetrix uses Google Page Speed and Yahoo! YSlow to grade your site's performance and provides actionable recommendations to fix these issues.
* [Pingdom Website Speed Test](http://tools.pingdom.com/fpt/) - Test the load time of that page, analyze it and find bottlenecks
* [WebPageTest](http://www.webpagetest.org/) - Run a free website speed test from multiple locations around the globe using real browsers (IE and Chrome) and at real consumer connection speeds. You can run simple tests or perform advanced testing including multi-step transactions, video capture, content blocking and much more. Your results will provide rich diagnostic information including resource loading waterfall charts, Page Speed optimization checks and suggestions for improvements.


## Miscellaneous

* [Socialite.js](http://socialitejs.com/) - Socialite provides a very easy way to implement and activate a plethora of social sharing buttons — any time you wish. On document load, on article hover, on any event!

# Contributing

For contributing, [open an issue](https://github.com/davidsonfellipe/awesome-wpo/issues) and/or a [pull request](https://github.com/davidsonfellipe/awesome-wpo/pulls).