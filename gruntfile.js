module.exports = function(grunt) {
	// DavidRSLopes configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/***************************************************************************
		* DEPENDECIES
		***************************************************************************/
		// Copy Bower dependencies
		bowercopy: {
			options: {
				srcPrefix: "bower_components",
				runBower: true,
			},
			jquerydist: {
				src: "jquery/dist",
				dest: "src/vendor/jquery",
			},
			twbsdist: {
				src: "bootstrap/dist",
				dest: "src/vendor/bootstrap",
			},
		},
		/***************************************************************************
		 * IMAGES
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

		// Minify & concat CSS
		cssmin: {
			options: {
				keepSpecialComments: 0,
			},
			combine: {
				files: {
					'assets/css/style.min.css': [
						'src/vendor/bootstrap/css/bootstrap.css',
						'src/css/style.css',
					]
				},
			}
		}, // cssmin

		/***************************************************************************
		 * CONCAT JS
		 ***************************************************************************/

		concat: {
			options: {
				stripBanners: true,
			},
			jsfiles: {
				src: [
					'src/vendor/jquery/jquery.js',
					'src/vendor/bootstrap/js/bootstrap.js',
					'src/js/script.js',
				],
				dest: 'src/js/app.js',
				nonull: true,
			},
		},

		/***************************************************************************
		 * MINIFY JS
		 ***************************************************************************/

		uglify: {
			jsfiles: {
				files: {
					'assets/js/app.min.js': ['src/js/app.js']
				}
			}
		},

		/***************************************************************************
		 * WATCH
		 ***************************************************************************/

		watch: {
			lessfiles: {
				files: ['*.less', '**/*.less'],
				tasks: ['less']
			},
			cssfiles: {
				files: ['src/css/*.css'],
				tasks: ['cssmin'],
				options : {
					livereload : true
				}
			},
			jsfiles: {
				files: ['src/js/*.js'],
				tasks: ['concat', 'uglify'],
				options : {
					livereload : true
				}
			},
			images: {
				files: ['src/img/**/*.{png,jpg,gif,svg}'],
				tasks: ['imagemin'],
				options : {
					livereload : true
				}
			},
			index:{
				files: ['index.html'],
				options : {
					livereload : true
				}
			},
		} // watch
	}); // grunt.initConfig

	// Load necessary plugins
	grunt.loadNpmTasks("grunt-bowercopy");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask("default", ["bowercopy", "less", "cssmin", "concat", "uglify", "imagemin", "watch"]);
};