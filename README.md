# Awesome WPO [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![GitHub contributors](https://img.shields.io/github/contributors/davidsonfellipe/awesome-wpo.svg)](https://github.com/davidsonfellipe/awesome-wpo/graphs/contributors)
[![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat)](https://davidsonfellipe.mit-license.org/)

Welcome to the curated list of Web Performance Optimization resources. This repository aims to gather the best tools, articles, blogs, books, and talks related to optimizing website performance. Whether you're a developer, designer, or performance enthusiast, you'll find valuable content here to supercharge your web projects.

## Categories

:memo: [Awesome WPO / Articles](#articles)

:newspaper: [Awesome WPO / Blogs](#blogs)

:books: [Awesome WPO / Books](#books)

:book: [Awesome WPO / Docs](#documentation)

:calendar: [Awesome WPO / Events](#events)

:movie_camera: [Awesome WPO / Talks](#talks)

## Table of Contents

Here's a quick overview of the categories covered in this collection:

- [Agent Skills](#agent-skills)
- [Analyzers](README.md#analyzers)
- [Analyzers API](README.md#analyzers---api)
- [Application Performance Monitoring](#application-performance-monitoring)
- [Bundle Analyzer](#bundle-analyzer)
- [Benchmark - CSS](#benchmark---css)
- [Benchmark - JS](#benchmark---javascript)
- [Benchmark - PHP](#benchmark---php)
- [Bookmarklets](#bookmarklets)
- [CDN](#cdn)
- [CDN - Monitor](#cdn---monitor)
- [CDN - Utilities](#cdn---utilities)
- [Core Web Vitals](#core-web-vitals)
- [Extensions](#extensions)
- [Image Optimizers](#image-optimizers)
- [Generators](#generators)
- [Lazyloaders](#lazyloaders)
- [Loaders](#loaders)
- [Metrics Monitor](#metrics-monitor)
- [Minifiers HTML](#minifiers---html)
- [Minifiers JS & CSS](#minifiers---js--css)
- [Miscellaneous](#miscellaneous)
- [Real User Monitoring](#real-user-monitoring)
- [SVG](#svg)
- [Web Components](#web-components)
- [Web server Benchmarks](#web-server-benchmarks)
- [Web server Modules](#web-server-modules)
- [Specs](#specs)
- [Stats](#stats)
- [Other Awesome Lists](#other-awesome-lists)
- [Contributing](#contributing)

## Agent Skills

> Agent skills for web quality audits and optimization workflows.

- [web-quality-audit](https://github.com/addyosmani/web-quality-skills#web-quality-audit) - Comprehensive quality review across all categories.
- [core-web-vitals](https://github.com/addyosmani/web-quality-skills#core-web-vitals) - LCP, INP, and CLS specific optimizations.
- [accessibility](https://github.com/addyosmani/web-quality-skills#accessibility) - WCAG compliance, screen reader support, and keyboard navigation.
- [performance](https://github.com/addyosmani/web-quality-skills#performance) - Loading speed, runtime efficiency, and resource optimization.
- [best-practices](https://github.com/addyosmani/web-quality-skills#best-practices) - Security, modern APIs, and code quality patterns.

## Articles

> Go to [ARTICLES.md](content/ARTICLES.md).

## Blogs

> Go to [BLOGS](content/BLOGS.md).

## Books

> Best books about WPO

- [HTTP/2 in Action by Barry Pollard](https://www.manning.com/books/http2-in-action) - Barry Pollard.
- [Web Performance in Action by Jeremy Wagner](https://www.manning.com/books/web-performance-in-action) - Jeremy L. Wagner.
- [Book of Speed](https://www.bookofspeed.com/) - Stoyan Stefanov.
- [Designing for Performance: Weighing Aesthetics and Speed](https://designingforperformance.com/) - Lara Hogan.
- [Even Faster Web Sites: Performance Best Practices for Web Developers](https://www.oreilly.com/library/view/even-faster-web/9780596803773/) - Steve Souders.
- [High Performance Browser Networking: What every web developer should know about networking and web performance](https://www.oreilly.com/library/view/high-performance-browser/9781449344757/) - Ilya Grigorik.
- [High Performance JavaScript](https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/) - Nicholas C. Zakas.
- [High Performance Web Sites: Essential Knowledge for frontend Engineers](https://www.oreilly.com/library/view/high-performance-web/9780596529307/) - Steve Souders.
- [High Performance Responsive Design: Building Faster Sites Across Devices](https://www.oreilly.com/library/view/high-performance-responsive/9781491949979/) - Tom Barker.
- [Lean sites](https://www.sitepoint.com/premium/books/lean-websites/) - Barbara Bermes.
- [Time Is Money: The Business Value of Web Performance](https://www.oreilly.com/library/view/time-is-money/9781491928783/) - Tammy Everts.
- [Using WebPagetest](https://www.oreilly.com/library/view/using-webpagetest/9781491902783/) - Rick Viscomi, Andy Davies, Marcel Duran.
- [Web Performance Daybook Volume 2](https://www.amazon.com/Web-Performance-Daybook-Stoyan-Stefanov-ebook/dp/B008CQA8BA/) - Stoyan Stefanov.
- [Web Performance Tuning](https://www.oreilly.com/library/view/web-performance-tuning/059600172X/) - Patrick Killelea.
- [You Don't Know JS: Async & Performance](https://www.oreilly.com/library/view/you-dont-know/9781491905197/) - Kyle Simpson.
- [Linux, Apache, MySQL, PHP Performance end-to-end](https://play.google.com/store/books/details/Colin_McKinnon_Linux_Apache_MySQL_PHP_Performance?id=Z3ciBgAAQBAJ) - Colin McKinnon.
- [Web Components in Action](https://www.manning.com/books/web-components-in-action) - Ben Farrell.
- [Image Optimization](https://www.smashingmagazine.com/printed-books/image-optimization/) - Addy Osmani.
- [Performance Engineering in Practice](https://www.manning.com/books/performance-engineering-in-practice) - Den Odell.
- [Web Performance Engineering in the Age of AI](https://www.oreilly.com/library/view/web-performance-engineering/9798341660182/) - Addy Osmani.

## Case studies

- [WPOStats](https://wpostats.com/) - Case studies and experiments demonstrating the impact of web performance optimization (WPO) on user experience and business metrics.
- [Google Developers Case Studies](https://web.dev/case-studies) - Learn why and how other developers have used the web to create amazing web experiences for their users.

## Documentation

- [PageSpeed Insights Rules](https://developers.google.com/speed/docs/insights/v5/get-started) - A guide created by PageSpeed Team.
  Deprecated. This is deprecated and will be shut down in May 2019. Version 5 is the latest and provides both real-world data from the Chrome User Experience Report and lab data from Lighthouse.
- [Best Practices for Speeding Up Your site](https://developer.yahoo.com/performance/rules.html) - The list includes 35 best practices divided into 7 categories, created by Yahoo! Exceptional Performance team.
- [Chrome Developers: Performance](https://developer.chrome.com/docs/performance/) - Deep guides on rendering, loading, and runtime performance.
- [Lighthouse Docs](https://developer.chrome.com/docs/lighthouse/) - Audit methodology, scoring details, and usage guidance.
- [Navigation Timing API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API) - Page navigation and load milestone metrics.
- [Resource Timing API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API) - Detailed network timing for assets.
- [Long Tasks API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API) - Detect main-thread blocking work.
- [Paint Timing API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Paint_Timing_API) - First paint and first contentful paint signals.
- [Largest Contentful Paint API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint) - Programmatic access to LCP entries.
- [Layout Instability API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift) - Measure and inspect layout shifts (CLS).

## Events

> Because community matters!

### Conferences

- [We Love Speed](https://www.welovespeed.com/2024/) - Born from the desire to share knowledge and experiences in web performance as widely as possible.
- [PWA Summit](https://pwasummit.org/) - A free, online, single-track conference focused on helping everyone succeed with Progressive Web Apps.
- [performance.now()](https://perfnow.nl/) - The performance.now() conference will return to Amsterdam! We're a single-track conference with fourteen world-class speakers, covering today’s most important web performance insights.
- [PerfMatters](https://perfmattersconf.com/) - Conference is the ONLINE web performance conference by internationally renowned performance developers.

### Meetups

> They are categorized into [content/MEETUPS.md](content/MEETUPS.md).

## Talks

> They are categorized into [content/TALKS.md](content/TALKS.md).

## Tools

## Analyzers

- [Web.dev](https://web.dev/) - Get the web's modern capabilities on your own sites and apps with useful guidance and analysis from web.dev.
- [PageSpeed Insights](https://pagespeed.web.dev/) - Lab and field CWV diagnostics for any URL.
- [PageGym](https://pagegym.com) - Advanced page speed analysis and optimization tool for experienced users and technical SEO professionals.
- [DebugBear](https://www.debugbear.com/) - Site monitoring based on Lighthouse. See how your scores and metrics changed over time, with a focus on understanding what caused each change. Paid product with a free 30-day trial.
- [Page Speed](https://developers.google.com/speed) - The PageSpeed family of tools is designed to help you optimize the performance of your site. PageSpeed Insights products will help you identify performance best practices that can be applied to your site, and PageSpeed optimization tools can help you automate the process.
- [Screpy](https://screpy.com) - AI-Based SEO Analysis & Monitoring Tool.
- [YSlow](https://github.com/marcelduran/yslow) - Analyzes web pages and suggests ways to improve their performance based on a set of rules for high-performance web pages.
- [Grunt-WebPageTest](https://github.com/sideroad/grunt-wpt) - Grunt plugin for continuous measurement of WebPageTest. ([Demo](http://sideroad.github.io/sample-wpt-page/))
- [Grunt-perfbudget](https://github.com/tkadlec/grunt-perfbudget) - A Grunt.js task for enforcing a performance budget ([more on performance budgets](https://timkadlec.com/2013/01/setting-a-performance-budget/)).
- [Web Tracing Framework](https://github.com/google/tracing-framework) - Libraries, tools, and visualizers for tracing and investigating complex web applications.
- [Yandex.Tank](https://github.com/yandex/yandex-tank) - An extensible open-source load testing tool for advanced Linux users which is especially good as a part of an automated load testing suite.
- [Yellow Lab Tools](https://yellowlab.tools/) - Online quick and easy tool that audits frontend bad practices, reveals performance issues, and profiles JavaScript.
- [Pagelocity](https://pagelocity.com/) - A web performance optimization and analysis tool.
- [Speed Racer](https://github.com/speedracer/speedracer) - Collect performance metrics for your library/application using Chrome headless.
- [Lightest App](https://lightest.app/) - Webpage load time is extremely important for conversion and revenue. Visualize web performance against competitors.
- [Redirect Checker](https://github.com/brancogao/redirect-checker) - Analyze HTTP redirect chains, detect loops, and measure performance impact on page load times.
- [Third Party Analysis Tool](https://tools.paulcalvano.com/wpt-third-party-analysis/) - Analyze third-party request risk, render-blocking impact, and potential single points of failure from WebPageTest runs.
- [Web Font Analyzer](https://tools.paulcalvano.com/wpt-font-analysis/) - Inspect font loading timing, payload, and glyph usage using WebPageTest data.
- [Webfont Usage Analyzer](https://github.com/paulcalvano/webfont-usage-analyzer) - Bookmarklet script to map loaded web fonts to visible DOM usage and help spot font optimization opportunities.

## Analyzers - API

- [PSI](https://github.com/GoogleChromeLabs/psi) - PageSpeed Insights for Node.js - with reporting.

## Application Performance Monitoring

- [Datadog APM](https://www.datadoghq.com/product/apm/) - End-to-end distributed tracing and APM at scale, correlated to all telemetry.
- [BetterUptime](https://betteruptime.com) - A good website monitoring tool (bundling status page, incident notification).
- [Pingdom](https://www.pingdom.com/) - A tool to get the uptime of your website (with probes from different locations).
- [UptimeRobot](https://uptimerobot.com) - Another uptime monitoring tool (with a generous free plan).
- [StatusList](https://statuslist.app) - Uptime, performance monitoring with debug details, and hosted status page in one simple dashboard.

## Real User Monitoring

- [Catchpoint Real User Monitoring](https://www.catchpoint.com/real-user-monitoring) - RUM for web and native mobile apps with Core Web Vitals, third-party impact, and correlation with synthetic monitoring (OpenTelemetry-based).
- [Atatus](https://www.atatus.com/) - Full-stack observability including RUM, APM, synthetic uptime, session replay, and OpenTelemetry.
- [Datadog Real User Monitoring](https://www.datadoghq.com/product/real-user-monitoring/) - Browser and mobile RUM with session replay, Core Web Vitals, and correlation with traces and logs.
- [New Relic Browser Monitoring](https://newrelic.com/platform/browser-monitoring) - Real-user browser monitoring with Core Web Vitals, distributed tracing to backend, and deployment markers.
- [SpeedCurve](https://www.speedcurve.com/features/performance-monitoring/) - Web performance monitoring combining synthetic testing, RUM, Lighthouse, Core Web Vitals, performance budgets, and competitive benchmarking.
- [Boomerang (Open Source)](https://akamai.github.io/boomerang/oss/) - Documentation for the Open Source version of Boomerang, which is maintained by Akamai employees with contributions from the OSS community.
- [Akamai mPulse Boomerang](https://techdocs.akamai.com/mpulse-boomerang/docs/welcome-to-mpulse-boomerang) - Documentation for the Akamai mPulse version of Boomerang, which includes additions specific to interacting with mPulse.

## Bundle Analyzer

- [Bundlesize](https://github.com/siddharthkp/bundlesize) - Keep your bundle size in check.
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - Analyze and debug bundle space usage through source maps.
- [Bundlephobia](https://bundlephobia.com/) - Helps you find the performance impact of adding an npm package to your frontend bundle.
- [Webpack bundle analyzer](https://github.com/webpack/webpack-bundle-analyzer) - Webpack plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.
- [Disc](http://hughsk.io/disc/) - Visualise the module tree of browserify project bundles and track down bloat.
- [Lasso-analyzer](https://github.com/pajaydev/lasso-analyzer) - Analyze and visualise project bundles created by Lasso.
- [Compression Webpack plugin](https://github.com/webpack/compression-webpack-plugin) - Prepare compressed versions of assets to serve them with Content-Encoding.
- [BundleStats](https://github.com/relative-ci/bundle-stats) - Generate bundle report(bundle size, assets, modules, packages) and compare the results between different builds.

## Benchmark - CSS

- [CSS-perf](https://github.com/mdo/css-perf) - Completely unscientific way of testing CSS performance. Most of these tests will revolve around methodologies and techniques for determining effective CSS architecture. Put another way, I want to know what works best given a particular comparison of CSS strategies.

## Benchmark - JavaScript

> A set of tools for creating test cases and comparing different implementations in JavaScript.

- [JSBench](https://jsbench.me/) - A modern browser-based JavaScript benchmarking tool for quickly creating and sharing performance tests.
- [Benchmark.js](https://benchmarkjs.com/) - A robust benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results.
- [JSlitmus](https://github.com/broofa/jslitmus) - Lightweight tool for creating ad-hoc JavaScript benchmark tests.
- [Matcha](https://github.com/logicalparadox/matcha) - Lets you design experiments that measure the performance of your code. Each bench should focus on a specific point of impact in your application.
- [Timing.js](https://github.com/addyosmani/timing.js) - Small helpers for working with the Navigation Timing API to identify where your application is spending its time. Useful as a standalone script, DevTools snippet, or bookmarklet.
- [Stats.js](https://github.com/mrdoob/stats.js) - This class provides a simple info box that will help you monitor your code performance.
- [PerfTests](https://github.com/kogarashisan/PerfTests) - Performance tests of JavaScript inheritance models.
- [Memory-stats.js](https://github.com/paulirish/memory-stats.js) - Minimal monitor for JS Heap Size via performance memory.
- [JSPerf](https://github.com/jsperf/jsperf.com) - Create and share test cases comparing JavaScript snippet performance via benchmarks. `Follow this issue for updates: https://github.com/jsperf/jsperf.com/issues/537`.


## Benchmark - PHP

- [PHPench](https://github.com/mre/PHPench) - Graphical output for PHP benchmarks: plot any function's runtime in real time with GnuPlot and export an image of the result.
- [php-bench](https://github.com/jacobbednarz/php-bench) - Benchmark and profile PHP code blocks whilst measuring the performance footprint.

## Bookmarklets

- [Yahoo YSlow for Mobile/Bookmarklet](https://developer.yahoo.com/yslow/) - YSlow analyzes web pages and suggests ways to improve their performance based on a set of rules for high-performance web pages.
- [PerfMap](https://github.com/zeman/perfmap) - A bookmarklet to create a frontend performance heatmap of resources loaded in the browser using the Resource Timing API.
- [DOM Monster](https://github.com/madrobby/dom-monster) - A cross-platform, cross-browser bookmarklet that will analyze the DOM & other features of the page you're on, and give you its bill of health.
- [CSS Stress](https://andy.edinborough.org/CSS-Stress-Testing-and-Performance-Profiling) - Stress testing and performance profiling for CSS.
- [Performance-Bookmarklet](https://github.com/micmro/performance-bookmarklet) - Analyze the current page through the Resource Timing API, Navigation Timing API and User-Timing - Sort of a light live WebPageTest. As [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/performance-analyser/?src=cb-dl-created) under the name Performance-Analyser.

## CDN

> A content delivery network or content distribution network (CDN) is a large distributed system of servers deployed in multiple data centers across the Internet. The goal of a CDN is to serve content to end-users with high availability and high performance. See a large list of CDN in [Wikipedia](http://en.wikipedia.org/wiki/Content_delivery_network#Notable_content_delivery_service_providers).

- [Cloudflare CDN](https://www.cloudflare.com/application-services/products/cdn/) - A content delivery network that uses next-gen tech to deliver fast, reliable, CDN services.
- [PageCDN](https://pagecdn.com/lib) - A state-of-the-art opensource CDN with aggressive content optimization using brotli-11 compression, HTTP/2 server push, better HTTP/2 multiplexing, and more. Supports 100s of libraries and 2000+ WordPress themes already. Easy to use, easy to link, and very fast.
- [jsDelivr](https://github.com/jsdelivr/jsdelivr) - Similar to Google Hosted Libraries, jsDelivr is an open-source CDN that allows developers to host their own projects and anyone to link to our hosted files on their sites.
- [Google Hosted Libraries](https://developers.google.com/speed/libraries/) - Google-run CDN for the most popular open-source JavaScript libraries.
- [CDNjs](https://cdnjs.com/) - An open-source CDN for JavaScript and CSS sponsored by Cloudflare that hosts everything from jQuery and Modernizr to Bootstrap.
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/) - A content delivery network by Amazon that integrates nicely with other Amazon services or can be used standalone.
- [jQuery](https://releases.jquery.com/) - Official CDN for the latest stable releases, powered by MaxCDN.
- :cn: [UpYun CDN](http://jscdn.upai.com/) - CDN provided by upyun.
- :cn: [Bootstrap 中文网开放 CDN 服务](http://www.bootcdn.cn/) - Bootstrap Chinese net open CDN service (only HTTP).
- :ru: [Yandex CDN](https://yandex.ru/dev/jslibs/) - Yandex Content Delivery Network hosts popular third-party JavaScript and CSS libraries (best for use in Russia).

> To find useful more information for you to make the right choice between paid CDNs, please visit [CDNPlanet](http://www.cdnplanet.com/).

## CDN - Monitor

- [CDNperf](https://www.cdnperf.com/) - Finds you fast and reliable JavaScript CDNs that make your sites snappy and happy.

## CDN - Utilities

- [Gulp-google-cdn](https://github.com/sindresorhus/gulp-google-cdn) - Replaces script references with Google CDN ones.

## Core Web Vitals

- [web-vitals](https://github.com/GoogleChrome/web-vitals) - Small library to accurately measure Core Web Vitals (LCP, FID, CLS, INP, TTFB) in the browser.
- [Lighthouse](https://github.com/GoogleChrome/lighthouse) - Audits Core Web Vitals in lab conditions (see [Analyzers](#analyzers)).
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Run Lighthouse in CI to enforce Core Web Vitals budgets on every commit.

## Extensions

- [Browser Calories](https://github.com/zenorocha/browser-calories) - The easiest way to measure your performance budget.

## Generators

- [AtBuild](https://github.com/jarred-sumner/atbuild) - JavaScript code generation tool that lets you write JavaScript that outputs JavaScript. Good for unrolling loops and writing libraries that compile away the runtime.
- [Glue](https://github.com/jorgebastida/glue) - A simple command-line tool to generate CSS sprites.
- [Pitomba-spriter](https://github.com/pitomba/spriter) - Spriter is a simple and flexible dynamic sprite generator for CSS, using Python. It can process CSS both synchronous and asynchronous as it provides classes to be used in your Python code and also a watcher that listens to your filesystem and changes CSS and sprite as soon as a static is changed.
- [Grunt-spritesmith](https://github.com/twolfson/grunt-spritesmith) - Grunt task for converting a set of images into a sprite sheet and corresponding CSS variables.
- [Grunt-sprite-css-replace](https://www.npmjs.com/package/grunt-sprite-css-replace) - Grunt task that generates a sprite from images referenced in a style sheet and then updates the references with the new sprite image and positions.
- [Grunt-svg-sprite](https://www.npmjs.com/package/grunt-svg-sprite) - SVG sprites & stacks galore — Grunt plugin wrapping around svg-sprite that reads in a bunch of SVG files, optimizes them and creates SVG sprites and CSS resources in various flavors.
- [Gulp-sprite](https://github.com/aslansky/gulp-sprite) - Gulp task for creating an image sprite and the corresponding style sheets for Gulp.
- [Gulp-svg-sprites](https://github.com/shakyShane/gulp-svg-sprites) - Gulp task for creating SVG sprites.
- [SvgToCSS](https://github.com/kajyr/SvgToCSS) - Optimizes and renders SVG files in CSS / Sass sprites.
- [Assetgraph-sprite](https://github.com/assetgraph/assetgraph-sprite) - Assetgraph transform for auto-generating sprites based on the CSS dependency graph.
- [Sprite Cow](http://www.spritecow.com/) - Get the background-position, width, and height of sprites within a spritesheet as copyable CSS.
- [CSS Sprite Generator](https://css.spritegen.com/) - CSS sprites allow you to combine multiple images into a single file.
- [Sprity](https://github.com/sprity/sprity) - A modular image sprite generator with a lot of features: supports retina sprites, supports different output formats, generates sprites and proper style files out of a directory of images, etc...
- [Sprite Factory](https://github.com/jakesgordon/sprite-factory) - The sprite factory is a ruby library that can be used to generate CSS sprites. It combines individual image files from a directory into a single unified sprite image and creates an appropriate CSS style sheet for use in your web application.

## Image Optimizers

> How to remove all this unnecessary data and give you a file without degrading quality.

- [Shortpixel](https://shortpixel.com/online-image-compression) - Compress Your Image by removing unnecessary bytes of the image and Convert it into WebP/AVIF.
- [Grunt-smushit](https://github.com/heldr/grunt-smushit) - Grunt plugin to remove unnecessary bytes of PNG and JPG using Yahoo Smushit.
- [Gulp-smushit](https://github.com/heldr/gulp-smushit) - Gulp plugin to optimize PNG and JPG using Yahoo Smushit. Made on top of smosh.
- [Smush it](https://www.imgopt.com/) - Uses format-specific optimization to remove unnecessary bytes from image files. Lossless: optimizes images without changing their look or visual quality.
- [Imagemin](https://github.com/imagemin/imagemin) - Minify images seamlessly with Node.js.
- [Sharp](https://github.com/lovell/sharp) - The typical use case for this high-speed Node.js module is to convert large images of many formats to smaller, web-friendly JPEG, PNG, and WebP images of varying dimensions.
- [Gm](https://github.com/aheckmann/gm) - GraphicsMagick and ImageMagick for Node.js.
- [ExifCleaner](https://exifcleaner.com) - GUI app to remove EXIF metadata from images and video files with drag and drop. Free and open source.
- [OptiPNG](https://optipng.sourceforge.net/) - PNG optimizer that recompresses image files to a smaller size without losing information.
- [Grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) - Minify PNG and JPEG images for Grunt.
- [Gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - Minify PNG, JPEG, GIF and SVG images with imagemin for Gulp.
- [Grunt-WebP](https://github.com/somerandomdude/grunt-webp) - Convert your images to WebP format.
- [Gulp-WebP](https://github.com/sindresorhus/gulp-webp) - Convert images to WebP for Gulp.
- [Imageoptim](https://imageoptim.com/mac) - Free app that makes images take up less disk space and load faster, without sacrificing quality. It optimizes compression parameters, and removes junk metadata and unnecessary color profiles.
- [Imager](http://github.com/imager-io/imager) - Automated image compression for efficiently distributing images on the web.
- [Grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) - Make ImageOptim, ImageAlpha, and JPEGmini part of your automated build process.
- [ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI) - Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimization of images part of your automated build process.
- [Tapnesh-CLI](https://github.com/JafarAkhondali/Tapnesh) - Tapnesh is a CLI tool that will optimize all your images in parallel easily and efficiently!
- [Tinypng](https://tinypng.com/) - Advanced lossy compression for PNG images that preserves full alpha transparency.
- [Kraken Web-interface](https://kraken.io/web-interface) - Optimize your images and will be available for download for 12 hours.
- [Compressor](https://compressor.io/) - Online image compressor for JPG, PNG, SVG and GIF.
- [mozjpeg](https://github.com/mozilla/mozjpeg) - Improved JPEG encoder.
- [Jpegoptim](https://github.com/tjko/jpegoptim) - Utility to optimize/compress JPEG files.
- [AdvPNG](http://www.advancemame.it/doc-advpng.html) - Recompress PNG files to get the smallest possible size.
- [Leanify](https://github.com/JayXon/Leanify) - Lightweight lossless file minifier/optimizer.
- [Trimage](https://trimage.org/) - A cross-platform tool for losslessly optimizing PNG and JPG files.
- [ImageEngine](https://imageengine.io) - Cloud service for optimizing, resizing and caching images on the fly with great mobile support.
- [ImageKit.io](https://imagekit.io) - Intelligent real-time image optimizations, image transformations with a global delivery network and storage.
- [Optimizt](https://github.com/343dev/optimizt) - CLI image optimization tool. It can compress PNG, JPEG, GIF and SVG lossy and lossless, and also create AVIF and WebP versions for raster images.
- [ResponsiveImage](https://responsive-image.dev/) - Generate optimized images (WebP, AVIF) and LQIP placeholders using Vite or Webpack plugins and render responsive image markup with an image component for multiple frameworks.

## Lazyloaders

- [lazyload](https://github.com/vvo/lazyload) - Defer images, iframes, and widgets with a standalone JavaScript lazyloader (~1kb).
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) - Highly performant, light ~0.9kb, and configurable lazy loader in pure JS with no dependencies for responsive images, iframes, and more.
- [quicklink](https://github.com/GoogleChromeLabs/quicklink) - Prefetch links in the viewport (via Intersection Observer) to make future navigations faster.

## Loaders

- [HeadJS](https://github.com/headjs/headjs) - The only script in your HEAD. for Responsive Design, Feature Detections, and Resource Loading.
- [RequireJS](https://requirejs.org/) - JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node.js.
- [Labjs](https://github.com/getify/LABjs) - An open-source (MIT license) project supported by Getify Solutions. The core purpose of LABjs is to be an all-purpose, on-demand JavaScript loader, capable of loading any JavaScript resource, from any location, into any page, at any time.
- [Defer.js](https://github.com/wessman/defer.js) - Async Everything: Make the meat of your pages load faster with this JS morsel.
- [InstantClick](https://github.com/dieulot/instantclick) - Preloads pages on hover so in-site links feel instant.
- [prerender.js](https://github.com/genderev/prerender.js) - Preloads pages and assets ahead of navigation for faster page transitions.
- [JIT](https://github.com/shootaroo/jit-grunt) - A JIT (Just In Time) plugin loader for Grunt. The load time of Grunt does not slow down even if there are many plugins.
- [Guess.js](https://github.com/guess-js/guess) - Predictive prefetching and performance optimization using analytics and machine learning.

## Metrics Monitor

- [Phantomas](https://github.com/macbre/phantomas) - PhantomJS-based web performance metrics collector and monitoring tool.
- [Bench](https://github.com/jmervine/bench) - Using Phantomas (a PhantomJS-backed client performance metrics scrapper). Benchmark a page, store results in MongoDB, and display results via the built-in server.
- [Keepfast](https://github.com/keepfast/keepfast) - Tool to monitor indicators related to the performance of a web page.
- [GTmetrix](https://gtmetrix.com/) - Free tool to test and monitor your page's performance. Uses Lighthouse to score your pages and offers actionable recommendations on how to optimize them.
- [Pingbreak.com](https://pingbreak.com/) - Free site and SSL Monitoring with response time alerting (on Slack, Twitter, Mattermost, Discord or custom Webhook).
- [Pingdom site Speed Test](https://tools.pingdom.com/) - Test the load time of that page, analyze it, and find bottlenecks.
- [Dotcom-tools](https://www.dotcom-tools.com/website-speed-test) - Analyze your website's speed in real browsers from 20 locations worldwide.
- [WebPageTest](https://www.catchpoint.com/webpagetest) - Run a free site speed test from multiple locations around the globe using real browsers (IE and Chrome) and at real consumer connection speeds. You can run simple tests or perform advanced testing including multi-step transactions, video capture, content blocking and much more. Your results will provide rich diagnostic information including resource-loading waterfall charts, Page Speed optimization checks and suggestions for improvements.
- [Sitespeed.io](https://www.sitespeed.io/) - Open-source tool that checks your site against web performance best practices and uses the Navigation Timing API to collect metrics. Outputs XML and HTML reports.
- [Grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas) - Grunt plugin wrapping phantomas to measure frontend performance.
- [Perfjankie](https://www.npmjs.com/package/perfjankie) - Runtime Browser Performance regression suite ([Demo](https://github.com/asciidisco/perfjankie-test)).
- [BrowserView Monitoring](https://www.dotcom-monitor.com/products/web-page-monitoring/) - Continually checks web page load times in Internet Explorer, Chrome and Firefox from multiple points around the world.
- [DareBoost](https://www.dareboost.com/en) - Real Browser Monitoring. Offers complete reports about web performance and quality using YSlow, Page Speed and numerous custom tips.
- [Perfume.js](https://github.com/Zizzamia/perfume.js) - Tiny library to collect Core Web Vitals and other performance metrics from real users.
- [puppeteer-webperf](https://github.com/addyosmani/puppeteer-webperf) - Collect web performance metrics in Puppeteer scripts.

## Metrics Monitor - API

- [WebPageTest API Wrapper for Node.js](https://github.com/catchpoint/WebPageTest.api-nodejs) - WebPageTest API Wrapper is an npm package that wraps WebPageTest API for Node.js as a module and a command-line tool.

## Metrics Monitor - EMAIL

- [WebPerformance Report](https://webperformancereport.com/) - Web performance report every week in your inbox. Get a Personalized Report on the Status of the E-commerce or Website that you want to monitor in terms of Web performance and Web optimization, Core Web Vitals are included.

## Minifiers - HTML

- [HTMLCompressor](https://code.google.com/archive/p/htmlcompressor/) - Small, fast Java library that minifies HTML or XML by removing extra whitespace, comments, and unneeded characters without breaking structure. Includes a command-line build.
- [Django-htmlmin](https://github.com/cobrateam/django-htmlmin) - HTML minifier for Python with full support for HTML 5. Supports Django, Flask, and any other Python web framework, plus a command-line tool for static sites or deployment scripts.
- [HTMLMinifier](https://github.com/kangax/html-minifier) - Highly configurable, well-tested, JavaScript-based HTML minifier with lint-like capabilities.
- [Grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) - A grunt plugin to minify HTML that uses HTMLMinifier.
- [Gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) - A gulp plugin to minify HTML that uses HTMLMinifier.
- [Grunt-htmlcompressor](https://github.com/jney/grunt-htmlcompressor) - Grunt plugin for HTML compression, using htmlcompressor.
- [HTML_minifier](https://github.com/stereobooster/html_minifier) - Ruby wrapper for kangax html-minifier.
- [HTML_press](https://github.com/stereobooster/html_press) - Ruby gem for compressing html, that removes all whitespace junk, and leaves only HTML.
- [Koa HTML Minifier](https://github.com/koajs/html-minifier) - Middleware that minifies your HTML responses using html-minifier. It uses html-minifier's default options which are all turned off by default, so you have to set the options otherwise it's not going to do anything.
- [HTML Minifier Online](http://kangax.github.io/html-minifier/) - A HTML min tool by kangax (HTMLMinifier Creator).
- [Minimize](https://github.com/Swaagie/minimize) - HTML minifier based on node-htmlparser; currently server-side only. Client-side minification is planned.
- [Html-minifier](https://github.com/deanhume/html-minifier) - A simple Windows command-line tool to minify your HTML, Razor views & Web Forms views.

## Minifiers - JS & CSS

- [UglifyJS2](https://github.com/mishoo/UglifyJS) - UglifyJS is a JavaScript parser, minifier, compressor or beautifier toolkit, written in JavaScript.
- [CSSO](https://github.com/css/csso) - CSS minimizer unlike others. In addition to usual minification techniques, it can perform structural optimization of CSS files, resulting in smaller file size compared to other minifiers.
- [Grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) - A Grunt plugin to concatenate files.
- [Grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - A Grunt plugin to concatenate and minify JavaScript files.
- [Clean-css](https://github.com/clean-css/clean-css) - A fast, efficient, and well-tested CSS minifier for node.js.
- [Django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline JavaScript or CSS into a single cached file.
- [Django-pipeline](https://github.com/jazzband/django-pipeline) - Pipeline is an asset packaging library for Django, providing both CSS and JavaScript concatenation and compression, built-in JavaScript template support, and optional data-URI image and font embedding.
- [JShrink](https://github.com/tedious/JShrink) - PHP class that minifies JavaScript for faster delivery to the client.
- [JSCompress](http://jscompress.com/) - The most minimalistic online JS Compress tool.
- [CSSshrink](https://github.com/stoyan/cssshrink) - Because CSS is ospon the critical path to rendering pages. It must be small! Or else!
- [Grunt-cssshrink](https://github.com/JohnCashmore/grunt-cssshrink) - This is just a grunt wrapper for CSS Shrink.
- [Gulp-cssshrink](https://github.com/torrottum/gulp-cssshrink) - Shrinks CSS files using cssshrink for Gulp.
- [Prettyugly](https://github.com/stoyan/prettyugly) - Uglify (strip spaces) or prettify (add consistent spaces) CSS code.
- [Grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) - CSS Minifier for Grunt.
- [Grunt-uncss](https://github.com/uncss/grunt-uncss) - A grunt task for removing unused CSS from your projects.
- [Gulp-uncss](https://github.com/ben-eb/gulp-uncss) - A gulp task for removing unused CSS from your projects.

## Miscellaneous

- [Socialite.js](http://socialitejs.com/) - Socialite provides a very easy way to implement and activate a plethora of social sharing buttons — any time you wish. On document load, on article hover, on any event.
- [uCSS](https://github.com/oyvindeh/ucss) - Crawls large sites to find unused CSS selectors (does not remove unused CSS).
- [HTTPinvoke](https://github.com/jakutis/httpinvoke) - A no-dependencies HTTP client library for browsers and Node.js with a promise-based or Node.js-style callback-based API to progress events, text, and binary file upload and download, partial response body, request and response headers, status code.
- [Critical](https://github.com/addyosmani/critical) - Extract & Inline Critical-path CSS in HTML pages (alpha).
- [Csscolormin](https://github.com/stoyan/csscolormin) - Utility that minifies CSS colors, example: min("white"); // minifies to "#fff".
- [Lazysizes](https://github.com/aFarkas/lazysizes) - High-performance lazy loader for images (responsive and normal), iframes, and scripts, that detects any visibility changes triggered through user interaction, CSS or JavaScript without configuration.
- [TMI](https://github.com/addyosmani/tmi) - Too Many Images: discover your image weight on the web.

## SVG

- [SVGO](https://github.com/svg/svgo) - Node.js-based optimizer for SVG vector graphics.
- [SVG OMG](https://jakearchibald.github.io/svgomg/) - SVGOMG is SVGO's Missing GUI, aiming to expose the majority, if not all the configuration options of SVGO.
- [Grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) - Minify SVG using SVGO for Grunt.
- [Gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin) - Minify SVG with SVGO for Gulp.
- [Scour](http://www.codedread.com/scour/) - Open-source Python script that aggressively cleans SVG files, stripping cruft that tools or authors embed in documents.
- [SVG Cleaner](https://github.com/RazrFalcon/SVGCleaner) - Cleans SVG files of unnecessary data with batch mode, many cleanup options, and threaded processing on multicore CPUs.

## Web Components

- [Polymer Bundler](https://github.com/Polymer/tools/tree/master/packages/bundler) - Polymer-bundler is a library for packaging project assets for production to minimize network round-trips.
- [Gulp-vulcanize](https://github.com/sindresorhus/gulp-vulcanize) - Concatenate a set of Web Components into one file that use Vulcanize.

## Web server Benchmarks

- [HTTPerf](https://github.com/httperf/httperf) - Measures web server performance with flexible generation of HTTP workloads and server metrics.
- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) - Open source load testing tool: It is a Java platform application.
- [Locust](https://locust.io/) - An open-source load testing tool. Define user behaviour with Python code, and swarm your system with millions of simultaneous users.
- [Autoperf](https://github.com/igrigorik/autoperf) - Ruby driver for httperf to automate load and performance testing for a single endpoint or via log replay.
- [HTTPerf.rb](https://github.com/jmervine/httperfrb) - Simple Ruby interface for httperf, written in Ruby.
- [PHP-httperf](https://github.com/jmervine/php-httperf) - PHP Port of HTTPerf.rb.
- [HTTPerf.js](https://github.com/jmervine/httperfjs) - JS Port of HTTPerf.rb.
- [HTTPerf.py](https://github.com/jmervine/httperfpy) - Python Port of HTTPerf.rb.
- [Gohttperf](https://github.com/jmervine/gohttperf) - Go Port of HTTPerf.rb.
- [wrk](https://github.com/wg/wrk) - A HTTP benchmarking tool (with optional Lua scripting for request generation, response processing, and custom reporting).
- [beeswithmachineguns](https://github.com/newsapps/beeswithmachineguns) - A utility for arming (creating) many bees (micro EC2 instances) to attack (load test) targets (web applications).
- [k6](https://k6.io/) - An open-source load testing tool built for developers. Easy to integrate into CI pipelines. Tests are written in ES6 JS and you can test APIs, microservices and sites using HTTP/1.1, HTTP/2 and WebSocket.

## Web server Modules

- [PageSpeed Module](https://modpagespeed.com/docs/getting-started/) - PageSpeed speeds up your site and reduces page load time. This open-source web server module automatically applies web performance best practices to pages and associated assets (CSS, JavaScript, images) without requiring that you modify your existing content or workflow. PageSpeed is available as a module for Apache 2.x and Nginx 1.x.
- [WebP-detect](https://github.com/igrigorik/webp-detect) - WebP with Accept negotiation.

## Specs

- [Web Performance Working Group](https://www.w3.org/webperf/) - The mission of the Web Performance Working Group, part of the Rich Web Client Activity, is to provide methods to measure aspects of application performance of user agent features and APIs.
- [Page Visibility](https://html.spec.whatwg.org/multipage/interaction.html#page-visibility) - This specification defines a means for site developers to programmatically determine the current visibility state of the page in order to develop power and CPU-efficient web applications.
- [Navigation Timing](https://w3c.github.io/navigation-timing/) - This specification defines a unified interface to store and retrieve high resolution performance metric data related to the navigation of a document.
- [Resource Timing](https://www.w3.org/TR/resource-timing/) - This specification defines an interface for web applications to access the complete timing information for resources in a document.
- [User Timing](https://www.w3.org/TR/user-timing/) - This specification defines an interface to help web developers measure the performance of their applications by giving them access to high-precision timestamps.
- [Performance Timeline](https://www.w3.org/TR/performance-timeline/) - This specification defines a unified interface to store and retrieve performance metric data. This specification does not cover individual performance metric interfaces.
- [CSS will-change](https://drafts.csswg.org/css-will-change/) - This specification defines the `will-change` CSS property which allows an author to declare ahead-of-time what properties are likely to change in the future, so the UA can set up the appropriate optimizations some time before they’re needed. This way, when the actual change happens, the page updates in a snappy manner.
- [Resource Hints](http://www.w3.org/TR/resource-hints/) - This specification defines the dns-prefetch, preconnect, prefetch, and prerender relationships of the HTML Link Element (&lt;link&gt;). These primitives enable the developer, and the server generating or delivering the resources, to assist the user agent in the decision process of which origins it should connect to, and which resources it should fetch and preprocess to improve page performance.
- [RFC 9218: HTTP Prioritization](https://www.rfc-editor.org/rfc/rfc9218.html) - Protocol-level prioritization mechanisms for HTTP.

## Stats

- [HTTP Archive](https://httparchive.org/) - It's a permanent repository of web performance information such as size of pages, failed requests, and technologies utilized. This performance information allows us to see trends in how the Web is built and provides a common data set from which to conduct web performance research.
- [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux/) - Origin-level real-user performance data from Chrome users.

## Other Awesome Lists

- [iamakulov/awesome-webpack-perf](https://github.com/iamakulov/awesome-webpack-perf) - A curated list of Webpack tools for web performance.
- [imteekay/web-performance-research](https://github.com/imteekay/web-performance-research) - Research in Web Performance.

## Contributing

For contributing, please check [contributing.md](contributing.md), then [open an issue](https://github.com/davidsonfellipe/awesome-wpo/issues) and/or a [pull request](https://github.com/davidsonfellipe/awesome-wpo/pulls).
