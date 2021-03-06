module.exports = function(grunt) {
  grunt.initConfig({

    compass: {
      prod: {
        options: {
          environment: 'production',
          config: 'src/stylesheets/config.rb',
          basePath: 'src/stylesheets',
          outputStyle: 'compressed'
        }
      },
      dev: {
        options: {
          environment: 'development',
          config: 'src/stylesheets/config.rb',
          basePath: 'src/stylesheets',
          outputStyle: 'nested'
        }
      }
    },

    autoprefixer: {
      no_dest: {
        src: 'www/assets/css/app.css'
      }
    },

    uglify: {
      prod: {
        options: {
          compress: true,
          preserveComments: false
        },
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: '**/*.js',
          dest: 'www/assets/js'
        }]
      },
      dev: {
        options: {
          compress: false,
          preserveComments: true,
          beautify: true
        },
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: '**/*.js',
          dest: 'www/assets/js'
        }]
      }
    },

    htmlmin: {
      prod: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        files: [
          {'www/index.html': 'www/index.html'},
          {'www/about/index.html': 'www/about/index.html'},
          {'www/contact/index.html': 'www/contact/index.html'},
          {'www/events/index.html': 'www/events/index.html'},
          {'www/venue/index.html': 'www/venue/index.html'}
        ]
      }
    },

    imagemin: {
      prod: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'www/media/images',
          src: ['*.{png,jpg,gif}'],
          dest: 'www/media/images'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('prod', ['compass:prod', 'uglify:prod', 'htmlmin:prod', 'imagemin:prod']);
  grunt.registerTask('dev', ['compass:dev', 'autoprefixer', 'uglify:dev']);
  grunt.registerTask('default', 'Does nothing.', function() {grunt.log.writeln('Available tasks to run are "prod" and "dev".')});
}
