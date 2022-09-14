import {consts} from '../consts';
import $ from 'jquery';
$(document).on('click', '#logout', function(){ 
    /**/
    if(sessionStorage.getItem("key")==null){
      swalAlert(0,"Devi effettuare prima il login.");
      return;
    }
    Swal.fire({
        title: '<div style="background-color:#fff">Vuoi veramente uscire dal sistema?</div>',
        showDenyButton: true,
        denyButtonText: `Esci`,
        confirmButtonText: 'Annulla',
        background:'url("../media_resources/alert_resources/alert_background.jpg")'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title:'<div style="background-color:#fff">Rimani loggato nel sistema!</div>', 
            icon:'success',
            background:'url("../media_resources/alert_resources/alert_background.jpg")'});
        } else if (result.isDenied) {
            console.log("Clicked");
            
              axios({
                method:"post",
                url:consts.DOMAIN+"/auth/logout/",
                headers:{"Authorization":"Token" + sessionStorage.getItem("key")}
              }).then(response=>{
                if(response.data.detail == "Invalid token"){
                  swalAlert(0,"Logout non riuscito");
                  return;
                }else{
                  sessionStorage.removeItem("key");
                  sessionStorage.removeItem("tentativiCambio");
                  sessionStorage.removeItem("user");
                  sessionStorage.removeItem("email");
                  sessionStorage.removeItem("bloccato");
                 
                  for(let i=1;i<=6;i++){
                    sessionStorage.removeItem("sezione"+i);      
                  }
                  setTimeout(function(){
                    location.href="/";
                 },1200);
                }
              })
            
  
            
              }
            });
    /**/
   
});

/*  _                             _                     _   _ _                 _            
 (_)                           | |                   | | (_) |               | |           
 _ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
 | '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
 | |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
 | .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
 | |               | |                                                                           
 |_|               |_|                                                                           
 */