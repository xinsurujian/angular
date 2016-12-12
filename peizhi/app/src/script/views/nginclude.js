var app=angular.module("myapp",["ngRoute"]);
        
    app.controller("box",["$scope",function($scope){
    	$scope.urls="/app/src/script/tpls/home.html";
    	$scope.urlTo=function(url){
    		//console.log(url)
           $scope.urls="/app/src/script/tpls/"+url+".html";   
    	}
    }])
   