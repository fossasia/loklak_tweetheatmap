module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffeelint:
      options:
        configFile: 'coffeelint.json'
      source: ['coffee/angular-daterangepicker.coffee']

    coffee:
      compileJoined:
        options:
          join: true
        files:
          'js/angular-daterangepicker.js': ['coffee/angular-daterangepicker.coffee']

    watch:
      files: ['example.html', 'coffee/*.coffee']
      tasks: ['default']

    uglify:
      options:
        sourceMap: true
      target:
        files:
          'js/angular-daterangepicker.min.js': ['js/angular-daterangepicker.js']

    wiredep:
      target:
        src: [
          './example.html'
        ]

    ngAnnotate:
      options:
        singleQuotes: true

      daterangepicker:
        files:
          'js/angular-daterangepicker.js': ['js/angular-daterangepicker.js']


  # Default task(s).
  grunt.registerTask "default", ["coffeelint", "coffee"]
  grunt.registerTask "develop", ["default", "watch"]
  grunt.registerTask "dist", ["default", "ngAnnotate", "uglify"]
