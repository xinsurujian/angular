var app=angular.module("myapp",[])
    app.controller("login",function($scope,$http){
    	$scope.phone=false;
    	$scope.pwd=false;
    	$scope.regs=false;
    	$scope.ishide=function($event){
    		this.phone=false;
    	    this.pwd=false;
    	    this.regs=false;
    	    
    	}
    	var arr=["A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    	    arrs=[];
       $scope.str="KMIH";
       function getNums(){
       	   for(var i=0;i<4;i++){
              arrs[i]=arr[Math.floor(Math.random()*26)];
    		}
    		str=arrs.join("");
    		$scope.str=str;
       }
      function regPhone(){
           if($scope.phoneValues!="admin")return true;
           
           return false
       }
       function regPwd(){
       	   if($scope.pwdValues!="123456")return true;
       	   
       	   return false;
       }

       function regNums(){
       	   if($scope.regsValues!=$scope.str)return true;
       	   return false;
       	}
       $scope.getNum=function(){
            getNums();
    		
       }

        
    	$scope.submit=function(){
    	
            if(regNums()){
            	$scope.regs=true;
                $scope.phone=false;
    	        $scope.pwd=false;
    	        
            }else{
                if(regPhone()){
                	$scope.phone=true;
                	$scope.pwd=false;
                	$scope.regs=false;
                }else{
                	if(regPwd()){
                		$scope.phone=false;
                	    $scope.pwd=true;
                	    $scope.regs=false;
                	}else{
                		$scope.phone=false;
                	    $scope.pwd=false;
                	    $scope.regs=false;
                	    $http({
                	    	url:"/login/login.json"
                	    	/*method:"post"*/
                	    }).then(function(res){
                	    	console.log(res);
                	    })
                	}
                		
                        
                }
            }
            getNums();
           








    	}

       









    })