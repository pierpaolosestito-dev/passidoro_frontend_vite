import {consts} from "../consts";
import $ from 'jquery';
/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');

  jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);

    
})*/
$(document).ready(function(){
$('#r1').on("click",function() {
  console.log("Ciao");
  $('#default-avatar').attr("src", "../media_resources/staff_resources/staff_admin.png");
});

$('#r2').on("click",function() {
  console.log("Ciao");
  $('#default-avatar').attr("src", "../media_resources/staff_resources/staff_teacher.png");
});
});

$(document).on('click', '#registra-btn', function(){ 
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 

    if($('#nome').val().length == 0 || $('#cognome').val().length == 0 || $('#email').val().length == 0 ||( $('input[name="permessi"]:checked').val() != "Maestra" && $('input[name="permessi"]:checked').val() != "Amministratore")  )  {
      swalAlert(0,"Tutti i campi devono essere riempiti.");
  return;
    }
    if(!regex.test($('#email').val())){
     swalAlert(0,"L'email inserita non è valida");
          
          return;
    }
    let riuscito = false;
    
    Swal.fire({
      title:"Caricamento in corso",
      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
      didOpen: function(){
        
        const membro_staff = {'Nome':$('#nome').val(),"Cognome":$('#cognome').val(),"Email":$('#email').val(),"Ruolo":$('input[name="permessi"]:checked').val()+""}
        console.log(membro_staff);
        
        axios({method:"post",url:consts.DOMAIN+'/singolo_staff',data:membro_staff,headers:{"Authorization":"Token " + sessionStorage.getItem("key")}})
            .then(response => {
              
              riuscito = true;
              if(response.data == "OK"){
                swalAlert(1,"Operazione avvenuta con successo.");
                setTimeout(function(){
                  location.reload();
                },1200);
                return;
              }else{
                swalAlert(0,"L'operazione non è andata a buon fine, controlla se esiste un utente con la stessa e-mail");
              }
            }).catch(function(err){
              if(!riuscito)
                swalAlertCONN_REF();
          return;
            });
    

      }});
    
});
function pulisciInputFields(){
    $('#nome').val("");
    $('#cognome').val("");
    $('#email').val("");
    $( "#r1" ).prop( "checked", false );
    $( "#r2" ).prop( "checked", false );
    $('#default-avatar').attr("src", "https://e7.pngegg.com/pngimages/182/390/png-clipart-faculty-staff-icon-text-orange.png");
    
  }