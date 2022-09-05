import * as $ from 'jquery';

var avatar = "default-avatar";
var orario_bambino = "19:00";
import {consts} from "../consts";
/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
  //jQueryScript.setAttribute('src','https://unpkg.com/axios/dist/axios.min.js');
  
	document.head.appendChild(jQueryScript);
  
    
})*/

$(document).on('click', '#registraa-btn', function(){ 
    
  
  if($('#nome-bambino').val().length == 0 || $('#cognome-bambino').val().length == 0 || $('#data-bambino').val() == null || $('#orario-bambino').val() == null|| $('#sezione-select').val() == null || $('#email-padre').val().length == 0 && $('#email-madre').val().length == 0 )  {
    console.log($("input[name='gender']:checked").val());
   
    if($('#nome-bambino').val().length == 0  ||  $('#cognome-bambino').val().length == 0 || $('#data-bambino').val() == null || $('#orario-bambino').val() == null|| $('#sezione-select').val() == null){

    $('#hidden-row').show();
      swalAlert(0,"Tutti i campi obbligatori devono essere riempiti.");
      return;
    
  }
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
    
    if($('#email-padre').val() != null){
      if(!regex.test($('#email-padre').text())){
        $('#hidden-row').show();
        swalAlert(0,"L'email del genitore 1 non è valida.");
    return;
    
      }
    }

    if($('#email-madre').val() != null){
      if(!regex.test($('#email-madre').text())){
        $('#hidden-row').show();
        swalAlert(0,"L'email del genitore 2 non è valida.");
    return;
      }
    }
   
  }

    const nome_bambino = $('#nome-bambino').val()+"";
    const cognome_bambino = $('#cognome-bambino').val()+"";
    //sezione = $('#sezione').val()
    const sezione = $("#sezione-select option:selected").text();
    const email_padre = $('#email-padre').val();
    const email_madre = $('#email-padre').val();
    const data_bambino = $('#data-bambino').val()+"";
    if ($('#orario-bambino').val()!=orario_bambino){
        orario_bambino = $('#orario-bambino').val();
        console.log(orario_bambino);
    }

    let currentDate = new Date().toJSON().slice(0, 10);
    
    if(currentDate < data_bambino) {
     swalAlert(0,"La data di nascita inserita non è valida.");
      return;
    }
  
    const bambino = {'Nome':nome_bambino,'Cognome':cognome_bambino,'Email_Genitore1':email_padre,'Email_Genitore2':email_madre,'Data_di_nascita':data_bambino,'Orario_uscita':orario_bambino,'Avatar':avatar,'NomeSezione':sezione};
    console.log("BAMBINO",bambino);
    console.log("ORARIO_BAMBINO",orario_bambino);
    Swal.fire({
      title:"Caricamento in corso",
      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
      didOpen: function(){
        axios({method:"post",url:consts.DOMAIN+'/singolo_bambino',data:bambino,headers:{"Authorization":"Token " + sessionStorage.getItem("key")}})
        .then(response => {
          console.log(response)
          if(response.data == "Aggiunto con successo"){
            swalAlert(1,"Operazione avvenuta con successo.");
            setTimeout(function(){
              location.reload();
            },1200);
            return;
          }else{
            swalAlert(0,"L'operazione non è andata a buon fine.");
          }
        }).catch(function(err){
          swalAlertCONN_REF();
          return;
        });
      }});

    
    
  });

function pulisciInputFields(){
  $('#nome-bambino').val("");
  $('#cognome-bambino').val("");
  $('#data-bambino').val("");
  $( "#r1" ).prop( "checked", false );
  $( "#r2" ).prop( "checked", false );
  $('#email-padre').val("");
  $('#email-madre').val("");
  $('#orario-bambino').val("");
  $('#seleziona-sezione').val("");
}
$(document).ready(function(){
$('#imageinput').change(function() {
  var myFile = $('#imageinput').prop('files');
  console.log($('#imageinput').val());
  //const deepai = require(['deepai']); 
  $('#default-avatar').attr("src", "../media_resources/loader_resources/cat_loader.gif");
 
  deepai.setApiKey('e80958c5-b1f3-476b-9fac-3ca7ce06e858');
console.log("QUA");
$('#registra-btn').prop("disabled", true);
(async function() {
  try{
    var resp = await deepai.callStandardApi("toonify", {
            
            image: document.getElementById('imageinput'),
    });
    $('#default-avatar').attr("src", resp['output_url']);
    console.log(resp['output_url']);
    avatar = resp['output_url']+"";
    console.log("NOTHING");
    $('#registra-btn').prop("disabled", false);
  }catch(err){
    console.log("ERRORE");
    avatar = "default-avatar";
    $('#default-avatar').attr("src", "../media_resources/error_resources/error_image_input.png");
    
    $('#formatimg').fadeIn();
  }
})()

});

});

$(document).on('click', '#formatimg', function(){ 
  $('#default-avatar').attr("src", "../default-avatar.jpg");
  $('#registra-btn').prop("disabled", false);
  avatar = "default-avatar";
  $('#formatimg').fadeOut();
});