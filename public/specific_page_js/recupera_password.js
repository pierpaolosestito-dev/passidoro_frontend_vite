
import {consts} from "../../src/lib/consts";
let codiceRecuperoPassword;
let id;
let tentativi = 3;
let tentativiPassword = 3;
let counter = 0;
let emailVar;
/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})*/
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
$(document).on('click', '#invia-email-recupero', function(){ 
     
    if(!regex.test($('#email').val())){
      swalAlert(0,"L'email inserita non è valida");
            return;
    }
    $("#hidden-row").fadeIn();
    //$("#spinner").show();
    emailVar = $('#email').val();
    const email = {'Email':$('#email').val()}
    //Qui verificheremo l'esistenza della mail, se esiste
    var regex2 =  /(\d+)/;
    var regex3 = /Email per recupero password inviata con successo,(\d+)/;
    console.log("Ciao");
    axios.post(consts.DOMAIN+'/recupero_password', email)
    .then(response => {
      console.log(response)
      if(response.data == "Risulta esserci un errore"){
        swalAlert(0,"L'operazione non è andata a buon fine");
        setTimeout(errore,1200);
      }else{
        swalAlert(1,"Email per il recupero password inviata con successo");
        //codiceRecuperoPassword = response.data.code_to_sent;
        id=response.data.id;
        console.log(id);
        //console.log(codiceRecuperoPassword);
        setTimeout(codice,3000);
        return;
      }
    }).catch(function(err){
      swalAlertCONN_REF();
      setTimeout(errore,1200);
    });
    
    counter+=1;
});
function errore(){
    $("#spinner").replaceWith
    ("<div class='error' id='error'>ERRORE 404</div><p id='spinner'>La pagina si aggiornerà tra qualche secondo</p>");
    setTimeout(reload,3000);
 
}

function reload(){
    location.reload();
}
function codice(){
   /*var today = new Date();
   orario = today.getHours+":"+today.getMinutes()
   sessionStorage.setItem("orario",orario);*/ 
    $("#spinner").replaceWith
    ("<input id='codice_input' type='number' placeholder='Inserisci il codice che hai ricevuto'/>");
    $("#hidden-col").fadeIn();
    $(document).on('click', '#confermaCodice-btn', function(){

      axios({method:"post",url:consts.DOMAIN+"/recupero_password/conferma_codice",data:{"id":id,"codice":$('#codice_input').val()}}).then(response=>{
        console.log(response.data);
        if(response.data == "Codice corretto"){
          swalAlert(1,"Il codice è corretto.");
            
            $("#codice_input").fadeOut();
            $("#confermaCodice-btn").fadeOut();
            $("#hidden-row2").fadeIn();
           
            $(document).on('click', '#confermaPassword-btn', function(){
              
                if($('#password').val() == $('#repeated-password').val()){
                    if($('#password').val().length < 8){
                      swalAlert(0,"Questa password è troppo breve. Deve contenere almeno 8 caratteri.");
                      return;
                    }

                    const oggetto = {'Email':emailVar,'Password':$('#password').val(),'id':id,'codice':$('#codice_input').val()}
                    
                    Swal.fire({
                      title:"Caricamento in corso",
                      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
                      didOpen: function(){
                        axios({method:"post",url:consts.DOMAIN+'/recupero_password/cambio_password', data:oggetto})
                        .then(response => {
                            console.log(response);
                                if(response.data == "Password cambiata con successo"){
                                  swalAlert(1,response.data);
                                    setTimeout(function(){
                                      location.href="/"
                                    },3000);
                                    return;
            
                                }else{
                                  swalAlert(0,response.data);
                               }
          
                        }).catch(function(err){
                          swalAlertCONN_REF();
                          return;
                        });
                      }});
                    
                
              }else{
                    if(tentativiPassword == 0){
                        setTimeout(reload,1200);
                        return;
                      }
                      
                      swalAlert(0,"Errore! Le password non combaciano. Hai " + tentativiPassword + " TENTATIVI");
                      tentativiPassword-=1;
                      
                      
                }
            });
        }else{
          console.log("Codice errato");
          if(tentativi == 0){
            /*orario=sessionStorage.getItem("orario");
            orarioSplitted = orario.split(":");
            //Alle 23 e 00 non si può fare
            if(orarioSplitted[1]+20 > 60){
              orarioSplitted[0]=orarioSplitted[0]+1;
              orarioSplitted[1] = (orarioSplitted[1]+20) - 60;
            }
            if(orarioSplitted[1]+20 == 60){
              orarioSplitted[0] = orarioSplitted[0]+1
              orarioSplitted[1]="00";
            }
            nuovoOrario = orarioSplitted[0]+":"+orarioSplitted[1];
            sessionStorage.setItem("orario",nuovoOrario);*/
            today = new Date();
            today.setMinutes(today.getMinutes()+20);
            console.log(today.getTime());
            sessionStorage.setItem("orario",today.getTime());
          
            setTimeout(reload,1200);
            return;
          }
          
          swalAlert(0,"Errore! Il codice non sembra combaciare con quello ricevuto. Hai " + tentativi + " TENTATIVI");
          tentativi-=1;
          
        }
      })

        /*console.log(codiceRecuperoPassword);
        console.log($('#codice_input').val());
        //Successo, mostra un messaggio che la password è stata cambiata con successo
        if(codiceRecuperoPassword == $('#codice_input').val() ){
            console.log("COMBACIANO");
            swalAlert(1,"Il codice è corretto.");
            
            $("#codice_input").fadeOut();
            $("#confermaCodice-btn").fadeOut();
            $("#hidden-row2").fadeIn();
           
            $(document).on('click', '#confermaPassword-btn', function(){
              
                if($('#password').val() == $('#repeated-password').val()){
                    if($('#password').val().length < 8){
                      swalAlert(0,"Questa password è troppo breve. Deve contenere almeno 8 caratteri.");
                      return;
                    }

                    const oggetto = {'Email':emailVar,'Password':$('#password').val(),'id':id}
                    
                    Swal.fire({
                      title:"Caricamento in corso",
                      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
                      didOpen: function(){
                        axios({method:"post",url:consts.DOMAIN+'/recupero_password/cambio_password', data:oggetto,headers:{'CUSTOM-OPTION':codiceRecuperoPassword}})
                        .then(response => {
                            console.log(response);
                                if(response.data == "Password cambiata con successo"){
                                  swalAlert(1,response.data);
                                    setTimeout(function(){
                                      location.href="/"
                                    },3000);
                                    return;
            
                                }else{
                                  swalAlert(0,response.data);
                               }
          
                        }).catch(function(err){
                          swalAlertCONN_REF();
                          return;
                        });
                      }});
                    
                
              }else{
                    if(tentativiPassword == 0){
                        setTimeout(reload,1200);
                        return;
                      }
                      
                      swalAlert(0,"Errore! Le password non combaciano. Hai " + tentativiPassword + " TENTATIVI");
                      tentativiPassword-=1;
                      
                      
                }
            });
        /*swal({
            title: "Successo!",
            text: "La password è stata cambiata con successo",
            icon: "https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-success-icon-for-your-project-png-image_1522120.jpg",
          });
        }else{
            if(tentativi == 0){
                /*orario=sessionStorage.getItem("orario");
                orarioSplitted = orario.split(":");
                //Alle 23 e 00 non si può fare
                if(orarioSplitted[1]+20 > 60){
                  orarioSplitted[0]=orarioSplitted[0]+1;
                  orarioSplitted[1] = (orarioSplitted[1]+20) - 60;
                }
                if(orarioSplitted[1]+20 == 60){
                  orarioSplitted[0] = orarioSplitted[0]+1
                  orarioSplitted[1]="00";
                }
                nuovoOrario = orarioSplitted[0]+":"+orarioSplitted[1];
                sessionStorage.setItem("orario",nuovoOrario);
                today = new Date();
                today.setMinutes(today.getMinutes()+20);
                console.log(today.getTime());
                sessionStorage.setItem("orario",today.getTime());
              
                setTimeout(reload,1200);
                return;
              }
              
              swalAlert(0,"Errore! Il codice non sembra combaciare con quello ricevuto. Hai " + tentativi + " TENTATIVI");
              tentativi-=1;
              
              
        }*/
        //Errore, che il codice non risulta combaciare.
        //$("#hidden-col-2").fadeIn();
    });

};


 