import {consts} from "../consts";
import * as $ from 'jquery';
/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})*/

$(document).on('click', '#edit-btn', function(){ 
   
    $('#hidden-row').show();
    
});

$(document).on('click', '#confirm-btn', function(){
  if($('#nuova-email').val() == "" && $('#vecchia-password').val() == "" && $('#nuova-password').val() == "" && $('#ripeti-nuova-password').val() =="" ){
    swalAlert(0,"Tutti i campi devono essere riempiti.");
      return;
  }
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
  console.log($('#nuova-email').val());
    let nuovaemail = "";
   
    if($('#nuova-email').val() != ""){
      if(!regex.test($('#nuova-email').val())){
        swalAlert(0,"L'email inserita non è valida.");
            return;
      }
      nuovaemail=$('#nuova-email').val();
    }

    if($('#nuova-password').val()!=""){
      if($('#nuova-password').val() != $('#ripeti-nuova-password').val()){
        console.log($('#nuova-password').val());
        console.log($('#ripeti-nuova-password').val());
        swalAlert(0,"Le password non coincidono.");
          
          return;
      }

      if($('#vecchia-password').val() == ""){
        swalAlert(0,"Devi inserire la vecchia password.");
          return;
      }
    }
    const nuovapassword = $('#nuova-password').val();
    const passwordattuale = $('#vecchia-password').val()

    //aggiornamento_profilo = {'Email-attuale':localStorage.getItem('email'),'Password-attuale':passwordattuale,'Nuova-email':nuovaemail,'Nuova-password':nuovapassword}
    const aggiornamento_profilo = {'email':sessionStorage.getItem('email'),'old_password':passwordattuale,'new_password1':nuovapassword,'new_password2':$('#nuova-password').val()}

    Swal.fire({
      title:"Caricamento in corso",
      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
      didOpen: function(){
        axios({
          method:"post",
          url:consts.DOMAIN+"/auth/password/change/",
          data:aggiornamento_profilo,
          headers:{"Authorization":"Token " + sessionStorage.getItem("key")}
        }).then(response=>{
          console.log(response.data);
          swalAlert(1,"La nuova password è stata salvata con successo");
          pulisciInputFields();
          return;
        }).catch(function(err){
          if(err.response.status == 400){
            if(err.response.data.new_password1!=null){
            if(err.response.data.new_password1.length>0){
              checkErrorAboutPasswords(err.response.data.new_password1);
              return;
            }
          }
          if(err.response.data.new_password2!=null){
            if(err.response.data.new_password2.length>0){
              checkErrorAboutPasswords(err.response.data.new_password2);
              return;
            }
          }

          if(err.response.data.old_password!=null){
            if(sessionStorage.getItem("tentativiCambio") == 0){
              axios({
                method:"post",
                url:"http://127.0.0.1:8000/auth/logout/",
                headers:{"Authorization":"Token" + sessionStorage.getItem("key")}
              }).then(response=>{
                if(response.data.detail != "Invalid token"){
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
            
              return;
            }
            swalAlert(0,"La tua vecchia password è stata inserita in modo errato. Si prega di inserirlo di nuovo.<br> Hai " + (sessionStorage.getItem("tentativiCambio"))+" tentativi");
            sessionStorage.setItem("tentativiCambio",sessionStorage.getItem("tentativiCambio")-1);
            return;
          }
          }
            console.log(err.response.data);
            swalAlertCONN_REF();
            return;
          });
        
        
      }});
    
 
 function checkErrorAboutPasswords(arrayErrors){
  textToShowinAlert="";
              for(let i=0;i<arrayErrors.length;i++){
                if(textToShowinAlert.length != 0){
                  textToShowinAlert = textToShowinAlert+"<br>Inoltre<br>";
                }
                if(arrayErrors[i] == "The password is too similar to the first name.")
                  textToShowinAlert = textToShowinAlert+"La password è molto simile al tuo nome.";
                else if(arrayErrors[i] == "The password is too similar to the last name.")
                  textToShowinAlert = textToShowinAlert+"La password è molto simile al tuo cognome.";
                else if(arrayErrors[i] == "This password is too short. It must contain at least 8 characters.")
                  textToShowinAlert = textToShowinAlert+"Questa password è troppo breve. Deve contenere almeno 8 caratteri.";
              }
              swalAlert(0,textToShowinAlert);
              return;
 }


});

function pulisciInputFields(){
  $('#nuova-password').val("");
  $('#ripeti-nuova-password').val("");
  $('#vecchia-password').val("");
  if($('#nuova-email').val()!=""){
    $('#nuova-email').val("");
  }
}