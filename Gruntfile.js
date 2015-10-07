/*
 * Export module
 */
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-raml2html');

	grunt.initConfig({
	  raml2html: {
	    all: {
	      files: {
	        'api/index.html': ['_api/index.raml'],
	      }
	    }
	  }
	});

	grunt.registerTask(
		'default',
		'Generate API docs.',
		['raml2html']
	);

}
