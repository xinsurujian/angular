var gulp=require("gulp");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var sass=require("gulp-sass");
var minify=require("gulp-minify-css");
var webserver=require("gulp-webserver");
var webpack=require("gulp-webpack");
//引入named
var named=require("vinyl-named");
// 引入版本控制插件
var rev = require("gulp-rev");
// 引入自动替换文件名
var revCollecotr = require("gulp-rev-collector");
//引入url和fs
var url=require("url");
var fs=require("fs");
//构建sass编译任务
var scssFiles=["./app/src/style/**/*.scss"];
gulp.task("sass",function(){
	gulp.src(scssFiles)
	    .pipe(sass())
	    .pipe(minify())
	    .pipe(gulp.dest("./app/prd/style"))
})
//构建css编译任务
var cssFiles=["./app/src/style/**/*.css"];
gulp.task("css",function(){
	gulp.src(cssFiles)
	    .pipe(minify())
	    .pipe(gulp.dest("./app/prd/style"))
})


//构建模块化Js任务
var jsFile=["./app/src/script/app.js"];
gulp.task("pack",function(){
	gulp.src(jsFile)
	    .pipe(named())
	    .pipe(webpack({
	    	output:{filename:"[name].js"},
	    	modules:{
	    		loaders:[{
	    			test:/\.js$/,
	    			loader:'imports?define=>false'
	    		}]
	    	}
	    }))
	    .pipe(uglify().on("error",function(e){
	    	 console.log("\x70"+e.lineNumber+e.message);
	    	 return this.end();
	    }))
	    .pipe(gulp.dest("./app/prd/script"))
})
//构建版本控制的任务
var cssDestFiles=["./app/prd/style/app.css"];
var jsDestFiles=["./app/prd/script/app.js"];
gulp.task("ver",function(){
	gulp.src(cssDestFiles)
	    .pipe(rev())
	    .pipe(gulp.dest("./app/prd/style"))
	    .pipe(rev.manifest())
	    .pipe(gulp.dest("./app/ver/style"));
	gulp.src(jsDestFiles)
	    .pipe(rev())
	    .pipe(gulp.dest("./app/prd/script"))
	    .pipe(rev.manifest())
	    .pipe(gulp.dest("./app/ver/script"));
})
// 让HTML自动将入口文件的文件名替换为MD5加密后的名称
gulp.task("html",function(){
	gulp.src(["./app/ver/**/*.json","./*.html"])
	    .pipe(revCollecotr())
	    .pipe(gulp.dest("./app"))
})
gulp.task("min",["ver","html"]);
//构建监听任务
gulp.task("watch",function(){
	 gulp.watch("./app/src/style/**/*.scss",["sass"]);
	 gulp.watch("./app/src/style/**/*.css",["css"]);
	 gulp.watch("./app/src/script/**/**.js",["pack"])
})

//构建服务器任务
gulp.task("webserver",function(){
	gulp.src("./")
	    .pipe(webserver({
	    	port:80,
	    	livereload:true,//页面保存自动刷新
	    	directoryListing:{//显示目录结构
	    		enable:true,//是否显示目录结构
	    		path:"./"//显示具体路径下的目录
	    	},
        // mock数据
            middleware:function(req,res,next){
                var urlObj = url.parse(req.url,true);
                switch(urlObj.pathname){
                  case '/api/getLivelist.php':
                  res.setHeader("Content-type","application/json");
                  fs.readFile('./mock/livelist.json','utf-8',function(err,data){
                        res.end(data);
                  });
                  return;
                  case '/api/getLivelistmore.php':
                  res.setHeader("Content-type","application/json");
                  fs.readFile('./mock/livelist-more.json','utf-8',function(err,data){
                        res.end(data);
                  });
                    return;
                }
                next();
            }
	    }))
})
//设置默认任务操作
gulp.task("default",["watch","webserver"])
