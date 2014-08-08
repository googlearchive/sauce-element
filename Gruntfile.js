module.exports = function (grunt) {
  var browsers = [{
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.9'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '.tmp',
          port: 9999
        }
      }
    },
    'saucelabs-mocha': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/sauce-element/runner.html'
          ],
          browsers: browsers,
          build: process.env.TRAVIS_JOB_ID,
          testname: 'mocha tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    },
    clean: {
      tmp: ['.tmp']
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          dest: '.tmp/sauce-element',
          src: [
            '**/*',
            '!.tmp'
          ]
        }]
      }
    },
    'bower-install-simple': {
      all: {
        options: {
          cwd: '.tmp/sauce-element'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'bower-install-simple',
    'connect',
    'saucelabs-mocha'
  ]);

  grunt.registerTask('serve', [
    'clean',
    'copy',
    'bower-install-simple',
    'connect:server:keepalive'
  ]);
};
