//alert("jquery included");
$(document).ready(function(){
    
   
    $("button").click(function(e){
        $(".option").fadeIn(1000,function(){
          $(".option").fadeToggle();
            
        });
        
        
    });
    
});