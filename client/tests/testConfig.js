require.config({
  paths: {
    jquery:'/js/vendor/jquery',
    // Underscore
    underscore:'/js/vendor/underscore',
    // Backbone
    backbone:'/js/vendor/backbone',
    // Templating
    handlebars:'/js/vendor/handlebars',
    text: '/js/vendor/text',
    jasmine: '/tests/lib/jasmine-2.0.0/jasmine',  
    'jasmine-html': '/tests/lib/jasmine-2.0.0/jasmine-html',
    spec: '/tests/spec',
    boot: '/tests/lib/jasmine-2.0.0/boot'
  },
  shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        underscore: {
            exports: '_'
        },
        boot: {
            exports:'boot'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});
var requiredModules = [
     'jquery',
     'jasmine',
     'jasmine-html',
     'boot' ];
require(requiredModules, function () {
    console.log(jasmine)
});
