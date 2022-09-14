import $ from 'jquery';
/*  _                             _                     _   _ _                 _            
 (_)                           | |                   | | (_) |               | |           
 _ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
 | '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
 | |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
 | .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
 | |               | |                                                                           
 |_|               |_|                                                                           
 */
$(document).on('click', '#lockunlockbtn', function(){
   
    if($("#lockunlockbtn").text()=="BLOCCA"){
    $("#lockunlockbtn").html('<i class="fa fa-unlock" aria-hidden="true"></i>SBLOCCA');
    $('input[type="checkbox"]').attr("disabled", true);

    sessionStorage.setItem("bloccato",true);
    for(let i=1;i<=6;i++){
		
		if(document.getElementById("checkbox"+i).checked == false)
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