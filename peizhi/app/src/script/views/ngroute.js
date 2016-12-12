var app=angular.module("myapp",["ngRoute"]);

   app.config(["$routeProvider",function($routeProvider){
    	$routeProvider
    	    .when("/home",{
    	    	 templateUrl:"/app/src/script/tpls/home.html",
                controller:"homeCon",
                caseInsensitiveMatch:true//忽略大小写

    	    })
    	    .when("/product/:id/:name",{
    	    	templateUrl:"/app/src/script/tpls/product.html",
                controller:"productCon",
                caseInsensitiveMatch:true

    	    })
    	    .when("/call",{
    	    	templateUrl:"/app/src/script/tpls/call.html",
                controller:"callCon",
                caseInsensitiveMatch:true

    	    })
          .when("/error",{
             template:"<h2>页面走丢了。。。。。。</h2>"
          })
          /*.otherwise("/home")*/
          .otherwise({
            redirectTo:"/error"
          })
    }])
   app.controller("homeCon",["$scope",function($scope){
   	   $scope.names="这是首页";
   }])
   app.controller("productCon",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
   	   $scope.names="这是产品列表业";
       //console.log($routeParams.id);
       var id=$routeParams.id;
       var name=$routeParams.name;
       var datas=null;
       $http({
          url:"/api/getLivelist.php",
          method:"post",
          data:{
            id:id,
            name:name
          }
       }).then(function(result){
         //console.log(result.data.data);
         datas=result.data.data;
         $scope.datas=datas;
       })
   }])
   app.controller("callCon",["$scope",function($scope){
   	   $scope.names="这是售后服务页面";
       $scope.items=[
          {id:1, product:"手机",times:"一年",products:["苹果","三星","HTC","小米","魅族"]},
          {id:2, product:"小家电",times:"半年",products:["风扇","吸尘器","挂烫机","小米","剃须刀"]},
          {id:3, product:"大家电",times:"三年",products:["电视机","空调","冰箱","洗衣机"]},
          {id:4, product:"厨具",times:"半年",products:["电磁炉","抽油烟机","微波炉","烤箱"]},
          {id:5, product:"电脑",times:"一年",products:["平板电脑","台式机","笔记本"]}
          
          ]
        $scope.search="苹果";
   }])