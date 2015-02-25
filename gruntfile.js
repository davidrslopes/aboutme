module.exports = function(grunt) {
	// DavidRSLopes configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/***************************************************************************
		 * Images
		 ***************************************************************************/
		imagemin: {
			dynamic: {
				options: {
					cache: false
				},
				files: [{
					expand: true,						// Enable dynamic expansion
					cwd: 'src/img/',					// Src matches are relative to this path
					src: ['**/*.{png,jpg,gif,svg}'],	// Actual patterns to match
					dest: 'assets/img/'					// Destination path prefix
				}]
			}
		},
		/***************************************************************************
		 * LESS & CSS
		 ***************************************************************************/

		// LESS to CSS
		less: {
			development: {
				files: {"src/css/style.css": "src/less/style.less"}
			}
		}, //less

		// Minify CSS
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.css', '!*.min.css'],
					dest: 'assets/css',
					ext: '.min.css'
				}]
			}
		},
		/***************************************************************************
		 * MINIFY JS
		 ***************************************************************************/

		uglify: {
			jsfiles: {
				files: {
					'assets/js/script.min.js': ['src/js/script.js']
				}
			}
		}, // uglify
		/***************************************************************************
         * Watch
         ***************************************************************************/

		watch: {
			lessfiles: {
				files: ['*.less', '**/*.less'],
				tasks: ['less']
			},
			cssfiles: {
				files: ['src/css/*.css'],
				tasks: ['cssmin']
			},
			jsfiles: {
				files: ['src/js/*.js'],
				tasks: ['uglify']
			},
			images: {
				files: ['src/img/**/*.{png,jpg,gif,svg}'],
				tasks: ['imagemin']
			}
		} // watch
	}); // grunt.initConfig

	// Load necessary plugins
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["less", "cssmin", "uglify", "imagemin", "watch"]);
};