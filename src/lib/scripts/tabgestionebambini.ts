$(document).on('click', '#lockunlockbtn', function(){
   
    if($("#lockunlockbtn").text()=="BLOCCA"){
    $("#lockunlockbtn").html('<i class="fa fa-unlock" aria-hidden="true"></i>SBLOCCA');
    $('input[type="checkbox"]').attr("disabled", true);

    sessionStorage.setItem("bloccato",true);
    for(let i=1;i<=6;i++){
       if( $('#checkbox'+i).attr("checked") != "checked")
            sessionStorage.setItem("sezione"+i,"unchecked");
        else sessionStorage.setItem("sezione"+i,"checked");
        
    }
    }else{
    $("#lockunlockbtn").html('<i class="fa fa-lock" aria-hidden="true"></i>BLOCCA');
    $('input[type="checkbox"]').removeAttr("disabled");
        console.log("Sbloccato");
        sessionStorage.removeItem("bloccato");
        for(let i=1;i<=6;i++){
           sessionStorage.removeItem("sezione"+i);      
         }
    }
});