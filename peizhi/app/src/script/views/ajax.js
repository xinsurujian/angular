$(function() {
	  //var url="/app/src/script/tpls/home.html";
	 $("#nav").on("click","a",function(){

	  // console.log($(this).data("nav"));
	  var urls;
	   switch ($(this).data('nav')){
	     case "home":
	     urls="/app/src/script/tpls/home.html";
	     break;
	     case "product":
	     urls="/app/src/script/tpls/product.html";
	     break;
	     case "call":
	     urls="/app/src/script/tpls/call.html";
	     break;
	    }
	    //console.log(url);
	   $.ajax({
	    	url:urls,
	    	success:function(data){
	    		//console.log()
	    		$("#conts").html(data);
	    	}
	    })
     })























})
