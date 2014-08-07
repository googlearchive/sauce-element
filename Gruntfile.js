'use strict';

var _ = require('lodash');

var desireds = require('./desireds');

var gruntConfig = {
        env: {
            // dynamically filled
        },
        simplemocha: {
            sauce: {
                options: {
                    timeout: 60000,
                    reporter: 'spec'
                },
                src: ['tests/*-specs.js']
            }
        },
        concurrent: {
            'test-sauce': [], // dynamically filled
        }
    };

_(desireds).each(function(desired, key) {
    gruntConfig.env[key] = {
        DESIRED: JSON.stringify(desired)
    };
    gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

//console.log(gruntConfig);

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig(gruntConfig);

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task.
    grunt.registerTask('default', ['test:sauce:' + _(desireds).keys().first()]);

    _(desireds).each(function(desired, key) {
            grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
    });

    grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);
};
