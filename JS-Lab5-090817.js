
document.addEventListener("DOMContentLoaded" , function(){
   $("#keyboard-upper-container").hide();
   $(document).keydown(function(e){
    if(e.which === 16)//Enter key pressed
        //Trigger search button click event
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    })
    $(document).keyup(function(e){
        if(e.which === 16)//Enter key pressed
            //Trigger search button click event
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        })
})