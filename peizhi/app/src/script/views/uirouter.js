var app=angular.module("myapp",["ui.route"]);
 app.config(["$stateProvider",function($stateProvider){
    	$stateProvider
    	    .state("home",{
    	    	 url:"/app/src/script/tpls/home.html",
                controller:"homeCon"

    	    })
    	    .state("product",{
    	    	url:"/app/src/script/tpls/product.html",
                controller:"productCon"
    	    })
    	    .state("call",{
    	    	url:"/app/src/script/tpls/call.html",
                controller:"callCon"

    	    })
          
    }])
  