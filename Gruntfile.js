/*
 * Export module
 */
module.exports = function(grunt) {

	grunt.initConfig({
	  raml2html: {
	    all: {
	      files: {
	        'api/index.html': ['_api/index.raml'],
	      }
	    }
	  },
		watch: {
			options: {
				livereload: true
			},
			apidocs: {
				files: ['**/*.raml', '**/*.md'],
				tasks: ['raml2html'],
			}
		},
		jekyll: {
			options: {
				safe: true
			},
			server: {
				options: {
					serve: true
				}
			},
			dist: {
			}
		}
	});

	grunt.loadNpmTasks('grunt-raml2html');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');

	grunt.registerTask(
		'default',
		'Generate API docs.',
		['raml2html', 'jekyll:dist']
	);

}
