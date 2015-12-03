'use strict';

module.exports = function(grunt) {
	// Load all tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/*.js'
			]
		},
		sass: {
			dev: {
				options: {
					sourceMap: true,
					outputStyle: 'compact'
				},
				dist: {
					files: {
						'assets/css/main.css': 'assets/scss/main.scss'
					}
				}
			},
			build: {
				options: {
					sourceMap: true,
					outputStyle: 'compressed'
				},
				dist: {
					files: {
						'assets/css/main.min.css': 'assets/scss/main.scss'
					}
				}
			}
		},
	});

	grunt.registerTask('default', []);
};