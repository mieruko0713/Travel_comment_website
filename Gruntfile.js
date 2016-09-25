module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {  
    //定义用于检测的文件  
    files: ['js/main.js'],  
    //配置JSHint (参考文档:http://www.jshint.com/docs)  
    options: {  
        // 重写jshint的默认配置选项  
        globals: {  
          jQuery: true,  
          console: true,  
          module: true ,
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      // build: {
      //   src: 'js/*.js',
      //   dest: 'dest/<%= pkg.file[0] %>.min.js'
      // }
      dist: 
      {
        files: {
          "dest/js/main.min.js":"js/main.js"
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      target : {
        files: {
         "dest/css/main.min.css":["css/main.css"]
       }
     }
   }
 });
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  // 默认任务
  grunt.registerTask('default', ["jshint","uglify","cssmin"]);
}