# Awesome WPO

A curated list of Web Performance Optimization. Everyone can contribute here!

- [Docs](#documentation)
- [Blogs](#blogs)
- [Talks](#talks)
- [Analyzers](#analyzers)
- [Analyzers API](#analyzers---api)
- [Benchmark - CSS](#benchmark---css)
- [Benchmark - JS](#benchmark---javascript)
- [Bookmarklets](#bookmarklets)
- [CDN](#cdn)
- [CDN - Monitor](#cdn---monitor)
- [CDN - Utilities](#cdn---utilities)
- [Image Optimizers](#image-optimizers)
- [Loaders](#loaders)
- [Metrics Monitor](#metrics-monitor)
- [Minifiers HTML](#inifiers---html)
- [Minifiers JS & CSS](#minifiers---js--css)
- [Miscellaneous](#miscellaneous)
- [Sprite Generators](#sprite-generators)
- [SVG](#svg)
- [Web Components](#web-components)
- [Webserver modules](#webserver-modules)
- [Webserver Benchmarks](#webserver-benchmarks)
- [Specs](#specs)
- [Stats](#stats)
- [Web Performance Meetup Groups](#web-performance-meetup-groups)
- [Other Awesome Lists](#other-awesome-lists)
- [Contributing](#contributing)


## Documentation

* [Browser Diet](http://browserdiet.com/en/) - A collaborative guide about front-end performance.
* [PageSpeed Insights Rules](https://developers.google.com/speed/docs/insights/rules) - A guide created by PageSpeed Team.
* [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html) - The list includes 35 best practices divided into 7 categories, created by Yahoo! Exceptional Performance team.


## Blogs

* [Performance Calendar](http://calendar.perfplanet.com/2013/) - The speed geek's favorite time of the year.
* [Web Performance Today](http://www.webperformancetoday.com/) - Great posts written by @tameverts.


## Talks
> Best talks about to WPO

* [CSS Performance Tooling](https://www.youtube.com/watch?v=FEs2jgZBaQA) - CSS Performance Tooling ( Addy Osmani).
* [Performance Tooling](https://www.youtube.com/watch?v=HAqjyCH_LOE) - Performance Tooling (Paul Irish).


## Analyzers

* [Confess](https://github.com/jamesgpearce/confess) - Uses PhantomJS to headlessly analyze web pages and generate manifests.
* [Page Speed](https://developers.google.com/speed/pagespeed/) - The PageSpeed family of tools is designed to help you optimize the performance of your website. PageSpeed Insights products will help you identify performance best practices that can be applied to your site, and PageSpeed optimization tools can help you automate the process.
* [YSlow](https://github.com/marcelduran/yslow) - YSlow analyzes web pages and suggests ways to improve their performance based on a set of rules for high performance web pages.
* [YSlow for PhantomJS](http://yslow.org/phantomjs/) - YSlow for PhantomJS also introduces new output formats for automated test frameworks: TAP (Test Anything Protocol) and JUnit.
* [Grunt-yslow](https://github.com/andyshora/grunt-yslow) - Grunt task for testing page performance using PhantomJS, a headless WebKit browser.
* [Grunt-perfbudget](https://github.com/tkadlec/grunt-perfbudget) - A Grunt.js task for enforcing a performance budget (more on performance budgets).
* [Web Tracing Framework](https://github.com/google/tracing-framework) - Web Tracing Framework is a set of libraries, tools, and visualizers for the tracing and investigation of complex web applications.


## Analyzers - API

* [Node-yslowjs](https://github.com/jmervine/node-yslowjs) - YSlow.js on Node.js is a simple Node.js wrapper for programmatically running phantomjs yslow.js.


## Benchmark - CSS

* [CSS-perf](https://github.com/mdo/css-perf) - Completely unscientific way of testing CSS performance. Most of these tests will revolve around methodologies and techniques for determining effective CSS architecture. Put another way, I want to know what works best given a particular comparison of CSS strategies.

## Benchmark - Javascript
> A set of tools for creating test cases and compare different implementations in JavaScript.

* [JSPerf](http://jsperf.com/) - jsPerf aims to provide an easy way to create and share test cases, comparing the performance of different JavaScript snippets by running benchmarks.
* [Benchmark.js](http://benchmarkjs.com/) - A robust benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results.
* [JSlitmus](https://github.com/broofa/jslitmus) - JSLitmus is a lightweight tool for creating ad-hoc JavaScript benchmark tests.
* [Matcha](https://github.com/logicalparadox/matcha) - Matcha allow you to design experiments that will measure the performance of your code. It is recommended that each bench focus on a specific point of impact in your application.
* [Timing.js](https://github.com/addyosmani/timing.js) - Timing.js is a small set of helpers for working with the Navigation Timing API to identify where your application is spending its time. Useful as a standalone script, DevTools Snippet or bookmarklet.
* [Stats.js](https://github.com/mrdoob/stats.js) - This class provides a simple info box that will help you monitor your code performance.


## Bookmarklets

* [Yahoo YSlow for Mobile/Bookmarklet](https://developer.yahoo.com/yslow/) - YSlow analyzes web pages and suggests ways to improve their performance based on a set of rules for high performance web pages.
* [PageSpeed](https://developers.google.com/speed/pagespeed/insights_extensions) - PageSpeed Insights is available as an open-source browser extension for Google Chrome. Webmasters and web developers can use PageSpeed Insights to evaluate the performance of their web pages and to get suggestions on how to improve them.
* [PerfMap](https://github.com/zeman/perfmap) - A bookmarklet to create a front-end performance heatmap of resources loaded in the browser using the Resource Timing API.
* [DOM Monster](https://github.com/madrobby/dom-monster) - A cross-platform, cross-browser bookmarklet that will analyze the DOM & other features of the page you're on, and give you its bill of health.


## CDN

* [jsDelivr](https://github.com/jsdelivr/jsdelivr) - Similar to Google Hosted Libraries, jsDelivr is an open source CDN that allows developers to host their own projects and anyone to link to our hosted files in their websites.
* [Google Hosted Libraries](https://developers.google.com/speed/libraries/) - Google Hosted Libraries is a content distribution network for the most popular, open-source JavaScript libraries.
* [CDNjs](https://cdnjs.com/) - An open source CDN for Javascript and CSS sponsored by CloudFlare that hosts everything from jQuery and Modernizr to Bootstrap.
* [Microsoft Ajax Content Delivery Network](http://www.asp.net/ajax/cdn) - Microsoft Ajax Content Delivery Network (CDN) hosts popular third party JavaScript libraries such as jQuery and enables you to easily add them to your Web applications.
* [jQuery](http://code.jquery.com/) - jQuery CDN – Latest Stable Versions, powered by MaxCDN.
* [Bootstrap](http://www.bootstrapcdn.com/) - The recommended CDN for Bootstrap, Font Awesome, and Bootswatch.
* [Handpicked jQuery Plugins Repository CDN](https://www.jque.re/) - Content Delivery Network for popular jQuery plugins.


## CDN - Monitor

* [CDNperf](http://www.cdnperf.com/about) - finds you fast and reliable JavaScript CDNs that make your websites snappy and happy.


## CDN - Utilities

* [Gulp-google-cdn](https://github.com/sindresorhus/gulp-google-cdn) - Replaces script references with Google CDN ones.


## Image Optimizers
>  How to remove all this unnecessary data and give you a file without degrading quality.

* [Grunt-smushit](https://github.com/heldr/grunt-smushit) - Grunt plugin to remove unnecessary bytes of PNG and JPG using Yahoo Smushit.
* [Gulp-smushit](https://github.com/heldr/gulp-smushit) - Gulp plugin to optimize PNG and JPG using Yahoo Smushit. Made on top of smosh.
* [Smush.it](http://www.smushit.com/ysmush.it/) - Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.
* [Imagemin](https://github.com/imagemin/imagemin) - Minify images seamlessly with Node.js.
* [Sharp](https://github.com/lovell/sharp) - The typical use case for this high speed Node.js module is to convert large images of many formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.
* [Gm](https://github.com/aheckmann/gm) - GraphicsMagick and ImageMagick for node.
* [Exexif](https://github.com/h4cc/awesome-elixir) - Pure elixir library to extract tiff and exif metadata from jpeg files.
* [OptiPNG](http://optipng.sourceforge.net/) - OptiPNG is a PNG optimizer that recompresses image files to a smaller size, without losing any information.
* [Grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) - Minify PNG and JPEG images for Grunt.
* [Gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - Minify PNG, JPEG, GIF and SVG images with imagemin for Gulp.
* [Grunt-webp](https://github.com/somerandomdude/grunt-webp) - Convert your images to WebP format.
* [Gulp-webp](https://github.com/sindresorhus/gulp-webp) - Convert images to WebP for Gulp.
* [Imageoptim](https://imageoptim.com/) - Free app that makes images take up less disk space and load faster, without sacrificing quality. It optimizes compression parameters, removes junk metadata and unnecessary color profiles.
* [Grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) - Make ImageOptim, ImageAlpha and JPEGmini part of your automated build process.
* [ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI) - Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of images part of your automated build process.
* [Tinypng](https://tinypng.com/) - Advanced lossy compression for PNG images that preserves full alpha transparency.
* [Web-interface](https://kraken.io/web-interface) - Optimize your images and will be available for download for 12 hours.


## Loaders

* [headjs](https://github.com/headjs/headjs)- The only script in your HEAD.
 for Responsive Design, Feature Detections, and Resource Loading.
* [RequireJS](http://requirejs.org/) - RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node.
* [Labjs](http://labjs.com/) - is an open-source (MIT license) project supported by Getify Solutions. The core purpose of LABjs is to be an all-purpose, on-demand JavaScript loader, capable of loading any JavaScript resource, from any location, into any page, at any time.
* [Defer.js](https://github.com/wessman/defer.js) - Async Everything: Make the meat of your pages load faster with this JS morsel.


## Metrics Monitor

* [Phantomas](https://github.com/macbre/phantomas) - PhantomJS-based web performance metrics collector and monitoring tool.
* [Showslow](http://www.showslow.com/) - open source tool that helps monitor various website performance metrics over time. It captures the results of YSlow, Page Speed Insights, WebPageTest and dynaTrace AJAX Edition.
* [Bench](https://github.com/jmervine/bench) - Using Phantomas (a PhantomJS backed client performance metrics scrapper). Benchmark a page, store results in MongoDB and display result via the built in server.
* [Keepfast](https://github.com/davidsonfellipe/keepfast) - Tool to monitor indicators related to performance of a web page.
* [GTmetrix](http://gtmetrix.com/) - GTmetrix uses Google Page Speed and Yahoo! YSlow to grade your site's performance and provides actionable recommendations to fix these issues.
* [Pingdom Website Speed Test](http://tools.pingdom.com/fpt/) - Test the load time of that page, analyze it and find bottlenecks.
* [Dotcom-tools](https://www.dotcom-tools.com/website-speed-test.aspx) - analyze your website's speed in real browsers from 20 locations worldwide.
* [Libra](https://github.com/pitomba/libra) - Libra is a service to measure the weight along the time, written in Python.
* [WebPageTest](http://www.webpagetest.org/) - Run a free website speed test from multiple locations around the globe using real browsers (IE and Chrome) and at real consumer connection speeds. You can run simple tests or perform advanced testing including multi-step transactions, video capture, content blocking and much more. Your results will provide rich diagnostic information including resource loading waterfall charts, Page Speed optimization checks and suggestions for improvements.
* [Sitespeed.io](http://www.sitespeed.io/documentation/) - Sitespeed.io is an open source tool that will check your site against web performance best practice rules and use the Navigation Timing API to collect metrics. It will create XML & HTML output of the result.
* [Grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas) - Grunt plugin wrapping phantomas to measure frontend performance.
* [Perfjankie](https://www.npmjs.org/package/perfjankie) - Runtime Browser Performance regression suite ([Demo](https://github.com/asciidisco/perfjankie-test)).
* [BrowserView Monitoring](https://www.dotcom-monitor.com/website-monitor/website-speed-monitoring.aspx) - Continually checks web page load times in Internet Explorer, Chrome and Firefox from multiple points around the world.


## Metrics Monitor - API

* [WebPageTest API Wrapper for NodeJS](https://github.com/marcelduran/webpagetest-api) - WebPageTest API Wrapper is a NPM package that wraps WebPageTest API for NodeJS as a module and a command-line tool.


## Minifiers - HTML

* [HTMLCompressor](https://code.google.com/p/htmlcompressor/) - HtmlCompressor is a small, fast and very easy to use Java library that minifies given HTML or XML source by removing extra whitespaces, comments and other unneeded characters without breaking the content structure. As a result pages become smaller in size and load faster. A command-line version of the compressor is also available.
* [Django-htmlmin](https://github.com/cobrateam/django-htmlmin) - django-html in an HTML minifier for Python with full support for HTML 5. It supports Django, Flask and any other Python web framework. It also provides a command line tool that can be used for static websites or deployment scripts.
* [HTMLMinifier](https://github.com/kangax/html-minifier) - HTMLMinifier is a highly configurable, well-tested, Javascript-based HTML minifier, with lint-like capabilities.
* [Grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) - A grunt plugin to minify HTML that uses HTMLMinifier.
* [Gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) - A gulp plugin to minify HTML that uses HTMLMinifier.
* [Grunt-htmlcompressor](https://github.com/jney/grunt-htmlcompressor) - Grunt plugin for html compression, using htmlcompressor.
* [HTML_minifier](https://github.com/stereobooster/html_minifier) - Ruby wrapper for kangax html-minifier.
* [HTML_press](https://github.com/stereobooster/html_press) - Ruby gem for compressing html, that removes all whitespace junk, and leaves only HTML.
* [Koa HTML Minifier](https://github.com/koajs/html-minifier) - Middleware that minifies your HTML responses using html-minifier. It uses html-minifier's default options which are all turned off by default, so you have to set the options otherwise it's not going to do anything.
* [HTML Minifier Online](http://kangax.github.io/html-minifier/) - A HTML min tool by kangax (HTMLMinifier Creator).
* [Minimize](https://github.com/Moveo/minimize) - Minimize is a HTML minifier based on the node-htmlparser,currently, HTML minifier is only usuable server side. Client side minification will be added in a future release.


## Minifiers - JS & CSS

* [YUI Compressor](https://github.com/yui/yuicompressor) - JavaScript compressor which, in addition to removing comments and white-spaces, obfuscates local variables using the smallest possible variable name. This obfuscation is safe, even when using constructs such as 'eval' or 'with' (although the compression is not optimal is those cases) Compared to jsmin, the average savings is around 20%.
* [UglifyJS2](https://github.com/mishoo/UglifyJS2) - UglifyJS is a JavaScript parser, minifier, compressor or beautifier toolkit,  written in JavaScript.
* [CSSO](https://github.com/css/csso) - CSS minimizer unlike others. In addition to usual minification techniques it can perform structural optimization of CSS files, resulting in smaller file size compared to other minifiers.
* [CSSmin.js](https://github.com/stoyan/yuicompressor/blob/master/ports/js/cssmin.js) - cssmin.js is a JavaScript port of YUICompressor's CSS minifier.
* [Grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) - A Grunt plugin to concatenate files.
* [Grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - A Grunt plugin to concatenate and minify Javascript files.
* [Clean-css](https://github.com/jakubpawlowicz/clean-css) - A fast, efficient, and well tested CSS minifier for node.js.
* [Django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline javascript or CSS into a single cached file.
* [Django-pipeline](https://github.com/cyberdelia/django-pipeline) - Pipeline is an asset packaging library for Django, providing both CSS and JavaScript concatenation and compression, built-in JavaScript template support, and optional data-URI image and font embedding.
* [JShrink](https://github.com/tedious/JShrink) - JShrink is a PHP class that minifies javascript so that it can be delivered to the client quicker.
* [CSSshrink](https://github.com/stoyan/cssshrink) - Because CSS is ospon the critical path to rendering pages. It must be small! Or else!
* [Grunt-cssshrink](https://github.com/JohnCashmore/grunt-cssshrink) - This is just a grunt wrapper for CSS Shrink.
* [Gulp-cssshrink](https://github.com/torrottum/gulp-cssshrink) - Shrinks CSS files using cssshrink for Gulp.
* [Prettyugly](https://github.com/stoyan/prettyugly) - Uglify (strip spaces) or prettify (add consistent spaces) CSS code.
* [Grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) - CSS Minifier for Grunt.
* [Gulp-cssmin](https://github.com/chilijung/gulp-cssmin) - CSS Minifier for Gulp.
* [Grunt-uncss](https://github.com/addyosmani/grunt-uncss) - A grunt task for removing unused CSS from your projects.
* [Gulp-uncss](https://github.com/ben-eb/gulp-uncss) - A gulp task for removing unused CSS from your projects.


## Miscellaneous

* [Socialite.js](http://socialitejs.com/) - Socialite provides a very easy way to implement and activate a plethora of social sharing buttons — any time you wish. On document load, on article hover, on any event.
* [uCSS](https://github.com/operasoftware/ucss) - uCSS is made for crawling (large) websites to find unused CSS selectors, but not remove unused CSS.
* [HTTPinvoke](https://github.com/jakutis/httpinvoke)- A no-dependencies HTTP client library for browsers and Node.js with a promise-based or Node.js-style callback-based API to progress events, text and binary file upload and download, partial response body, request and response headers, status code.
* [Critical](https://github.com/addyosmani/critical) - Extract & Inline Critical-path CSS in HTML pages (alpha).
* [Csscolormin](https://github.com/stoyan/csscolormin) - Utility that minifies CSS colors, example: min("white"); // minifies to "#fff".
* [StyleStats](http://www.stylestats.org/) - StyleStats is a Node.js library to collect CSS statistics.
* [Lazysizes](https://github.com/aFarkas/lazysizes) - High performance lazy loader for images (responsive and normal), iframes and scripts, that detects any visibility changes triggered through user interaction, CSS or JavaScript without configuration.


## Sprite Generators

* [Glue](https://github.com/jorgebastida/glue) - Glue is a simple command line tool to generate sprites:
* [Pitomba-spriter](https://github.com/pitomba/spriter) - Spriter is a simple and flexible dynamic sprite generator for CSS, using Python. It can process CSS both synchronous and asynchronous as it provides classes to be used in your python code and also a watcher that listens to your filesystem and changes CSS and sprite as soon as a static is changed.
* [Grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith) - Grunt task for converting a set of images into a spritesheet and corresponding CSS variables.
* [Gulp-sprite](https://github.com/aslansky/gulp-sprite) - gulp task for creating a image sprite and the corresponding stylesheets for Gulp.
* [Gulp-svg-sprites](https://github.com/shakyShane/gulp-svg-sprites) - gulp task for creating svg sprites.
* [Assetgraph-sprite](https://github.com/assetgraph/assetgraph-sprite) - Assetgraph transform for auto generating sprites based on the CSS dependency graph.
* [Sprite Cow](http://www.spritecow.com/) - Sprite Cow helps you get the background-position, width and height of sprites within a spritesheet as a nice bit of copyable css.
* [spriteme](http://spriteme.org/) - Create, integrate, and maintain CSS sprites with ease.


## SVG

* [SVGO](https://github.com/svg/svgo) - SVGO is a Nodejs-based tool for optimizing SVG vector graphics files.
* [Grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) - Minify SVG using SVGO for Grunt.
* [Gulp-svgmin](https://www.npmjs.org/package/gulp-svgmin) - Minify SVG with SVGO for Gulp.
* [Scour](http://www.codedread.com/scour/) - Scour is an open-source Python script that aggressively cleans SVG files, removing a lot of 'cruft' that certain tools or authors embed into their documents.
* [SVG Cleaner](https://github.com/RazrFalcon/SVGCleaner) - SVG Cleaner could help you to clean up your SVG files from unnecessary data. It has a lot of options for cleanup and optimization, works in batch mode, provides threaded processing on the multicore processors.


## Web Components

* [Vulcanize](https://github.com/Polymer/vulcanize) - Concatenate a set of Web Components into one file, a Build tool for HTMLImports and Web Components.
* [Grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize) - Grunt task for Polymer's Vulcanize.
* [Gulp-vulcanize](https://github.com/sindresorhus/gulp-vulcanize) - Concatenate a set of Web Components into one file that use Vulcanize.


## Webserver modules

* [PageSpeed Module](https://developers.google.com/speed/pagespeed/module/download) - PageSpeed speeds up your site and reduces page load time. This open-source webserver module automatically applies web performance best practices to pages and associated assets (CSS, JavaScript, images) without requiring that you modify your existing content or workflow. PageSpeed is available as a module for Apache 2.x and Nginx 1.x.
* [Webp-detect](https://github.com/igrigorik/webp-detect) - WebP with Accept negotiation.


## Webserver Benchmarks

* [HTTPerf](https://code.google.com/p/httperf/) - httperf is a tool for measuring web server performance. It provides a flexible facility for generating various HTTP workloads and for measuring server performance.
* [Apache JMeter](http://jmeter.apache.org/download_jmeter.cgi) - Open source load testing tool: It is a Java platform application.
* [Autoperf](https://github.com/igrigorik/autoperf) - Autoperf is a ruby driver for httperf, designed to help you automate load and performance testing of any web application - for a single end point, or through log replay.
* [HTTPerf.rb](https://github.com/jmervine/httperfrb) - Simple Ruby interface for httperf, written in Ruby.
* [PHP-httperf](https://github.com/jmervine/php-httperf) - PHP Port of HTTPerf.rb.
* [HTTPerf.js](https://github.com/jmervine/httperfjs) - JS Port of HTTPerf.rb.
* [HTTPerf.py](https://github.com/jmervine/httperfpy) - Python Port of HTTPerf.rb.
* [Gohttperf](https://github.com/jmervine/gohttperf) - Go Port of HTTPerf.rb.


# Specs

* [Web Performance Working Group](http://www.w3.org/2010/webperf/) - The mission of the Web Performance Working Group, part of the Rich Web Client Activity, is to provide methods to measure aspects of application performance of user agent features and APIs.
* [Page Visibility](http://www.w3.org/TR/page-visibility/) - It is a permanent repository of web performance information such as size of pages, failed requests, and technologies utilized. This performance information allows us to see trends in how the Web is built and provides a common data set from which to conduct web performance research.
* [Navigation Timing](https://w3c.github.io/navigation-timing/) - This specification defines a unified interface to store and retrieve high resolution performance metric data related to the navigation of a document.
* [Resource Timing](http://www.w3.org/TR/resource-timing/) - This specification defines an interface for web applications to access the complete timing information for resources in a document.
* [User Timing](http://www.w3.org/TR/user-timing/) - This specification defines an interface to help web developers measure the performance of their applications by giving them access to high precision timestamps.
* [Performance Timeline](http://www.w3.org/TR/performance-timeline/) - This specification defines an unified interface to store and retrieve performance metric data. This specification does not cover individual performance metric interfaces.


# Stats

* [HTTP Archive](http://httparchive.org/index.php) - It is a permanent repository of web performance information such as size of pages, failed requests, and technologies utilized. This performance information allows us to see trends in how the Web is built and provides a common data set from which to conduct web performance research.

# Web Performance Meetup Groups

* [Web Performance Meetup Groups](http://web-performance.meetup.com/) - Full list on www.meetup.com.


# Other Awesome Lists

* [bayandin/awesome-awesomeness](https://github.com/bayandin/awesome-awesomeness).
* [sindresorhus/awesome](https://github.com/sindresorhus/awesome).


# Contributing

For contributing, [open an issue](https://github.com/davidsonfellipe/awesome-wpo/issues) and/or a [pull request](https://github.com/davidsonfellipe/awesome-wpo/pulls).
