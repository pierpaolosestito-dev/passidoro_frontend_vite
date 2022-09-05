


import {consts} from "../consts";

/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})*/
var avatarModificato = false;
var avatar = "";
let oldTime;
let imagePrePut = $('#defaultAvatar').attr('src');
let parameters = new URLSearchParams(window.location.search);
console.log(parameters.get("ID"));
  let IDn= parameters.get("ID")

       
$(document).on('click', '#editButton', function(){ 
    alert(imagePrePut);
    $('#hiddenRow').show();
    $('#hiddenRow2').show();
    $('#badge').show();
    
    $('#emailPadre').show();
    $('#emailMadre').show();
    $( "#time" ).prop( "disabled", false );
    oldTime = $('#time').val();
    $('#hiddenRow3').hide();
  });
  
  $(document).on('click', '#confirmButton', function(){ 

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 

    var email_padre = $("#email-padre").text();
    var email_madre = $("#email-madre").text();
    alert(email_padre);
    if($('#emailPadre').val() != ""){
        if(!regex.test($('#emailPadre').val())){
          swalAlert(0,"Controlla le email inserite.");
              
              return;
        }
        email_padre = $('#emailPadre').val();
        
    }

    if($('#emailMadre').val() != ""){
        if(!regex.test($('#emailMadre').val())){
          swalAlert(0,"Controlla le email inserite.")
              return;
        }
        email_madre = $('#emailMadre').val();
    }

    if($('#emailMadre').val() != "" && $('#emailPadre').val() != ""){
      swalAlert(1,"Stai modificando entrambe le e-mail. Ricorda che è opportuno modificarle anche nei fogli Excel che contengono informazioni su questo bambino.<br> Oppure dopo aver aggiornato tutti i bambini, sostituisci i fogli Excel scaricando il nuovo dal sistema.")
    }
    var orario_uscita = oldTime;
    if($('#time').val() != oldTime){
        oldTime =$('#time').val();
        orario_uscita = oldTime;

    }
    
    
    Swal.fire({
      title:"Caricamento in corso",
      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
      didOpen: function(){
        var aggiornamenti_bambino = {"ID":IDn,"Email_Genitore1":email_padre,"Email_Genitore2":email_madre,"Orario_uscita":orario_uscita};
        if(avatarModificato){
        var aggiornamenti_bambino = {"ID":IDn,"Email_Genitore1":email_padre,"Email_Genitore2":email_madre,"Avatar":avatar,"Orario_uscita":orario_uscita};
        }
        axios({method:"put",url:consts.DOMAIN+"/singolo_bambino",data:aggiornamenti_bambino,headers:{"Authorization":"Token " +sessionStorage.getItem("key")}})
    .then(response => {
      console.log(response.data);
      Swal.close()
      if(response.data == "Aggiornato con successo"){
        swalAlert(1,"Operazione avvenuta con successo.<br> Se non hai apportato alcuna modifica, i dati rimarranno integri.");
      }else{
        swalAlert(0,"L'operazione non è andata a buon fine.");
      }
    }).catch(function(err){
      swalAlertCONN_REF();
      return;
    });
        
      }
    });
    
    
    /*
    console.log(orario_uscita);
    //AGGIUNGERE ORARIO USCITA
    console.log("AVATAR_MODIFICATO",avatarModificato);
    aggiornamenti_bambino = {"ID":IDn,"Email_Genitore1":email_padre,"Email_Genitore2":email_madre};
    if(avatarModificato){
      console.log("Avatar modificato");
      aggiornamenti_bambino = {"ID":IDn,"Email_Genitore1":email_padre,"Email_Genitore2":email_madre,"Avatar":avatar};
    }
    axios.put("http://127.0.0.1:8000/singolo_bambino",aggiornamenti_bambino)
    .then(response => {
      console.log(response.data);
     
      if(response.data == "Aggiornato con successo"){
        Swal.fire({
          title:'Aggiornamento riuscito!',
          icon:'success',
          color: '#00FFFF',
      })
      }else{
        Swal.fire({
          title:'Aggiornamento non riuscito!',
          text:"Se non hai modificato nessun campo, non verrà apportata alcuna modifica.",
          icon:'error',
          
      })
      }
    });*/
  
  
  });

  $(document).on('click', '#removeButton', function(){ 
    Swal.fire({
      title: '<div style="background-color:#fff">Vuoi veramente eliminare il bambino?</div>',
      showDenyButton: true,
      denyButtonText: `Elimina`,
      confirmButtonText: 'Annulla',
      background:'url("../media_resources/alert_resources/alert_background.jpg")'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        Swal.fire({
          title:'<div style="background-color:#fff">Il bambino rimarrà registrato nel sistema!</div>', 
          icon:'success',
          //background:'url("../media_resources/alert_resources/alert_background.jpg")'
		  });
      } else if (result.isDenied) {

        Swal.fire({
          title:'<div style="background-color:#fff">Inserisci la password.</div>', 
          icon:'info',
          input:'password',
          //background:'url("../media_resources/alert_resources/alert_background.jpg")',
          preConfirm:(password)=>{

        Swal.fire({
          title:"Caricamento in corso",
          imageUrl:"../media_resources/loader_resources/cat_loader.gif",
          didOpen: function(){
            axios({
              method:"post",
              url:consts.DOMAIN+"/verifica_password",
              data:{"password":password},
              headers:{"Authorization":"Token " + sessionStorage.getItem("key")}
          }).then(response=>{
            if(response.data=="Password verificata"){
              axios({method:"delete",url:consts.DOMAIN+'/singolo_bambino/'+IDn,headers:{"Authorization":"Token "+sessionStorage.getItem("key")}})
              .then(response => {
                console.log(response)
                if(response.data == "Bambino eliminato con successo"){
                  swalAlert(1,"Operazione avvenuta con successo");
                  setTimeout(function(){
                    location.reload()
                  },800);
                }
                swalAlert(0,response.data);
                return;
              
              }).catch(function(err){
                swalAlertCONN_REF();
                return;
              });
              return;
            }
            swalAlert(0,response.data);
            return;
          }).catch(function(err){
            swalAlertCONN_REF();
            return;
          })



            
          }})}});
      }
    })
   /* swal({
        title: "Sei sicuro?",
        text: "Una volta eliminato, il bambino non sarà più recuperabile",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://127.0.0.1:8000/singolo_bambino/'+IDn)
          .then(response => {
            console.log(response)
            if(response.data == "Bambino eliminato con successo"){
              swal("Poof! Il bambino è stato cancellato!", {
                icon: "success",
              });
              setTimeout(function(){
                location.reload()
              },800);
            }else{
              swal("Errore con l'eliminazione del bambino, riprovare", {
                icon: "error",
              });
            }
          
          });
          
        } else {
          swal("Il bambino rimane registrato nel sistema");
        }
      });*/
});

$(document).ready(function(){
$('#imageinput').change(function() {
  var myFile = $('#imageinput').prop('files');
  //const deepai = require(['deepai']); 
  $('#defaultAvatar').attr("src", "../media_resources/loader_resources/cat_loader.gif");
deepai.setApiKey('e80958c5-b1f3-476b-9fac-3ca7ce06e858');
console.log("QUA");
$('#confirmButton').prop("disabled", true);
(async function() {
  try{
    var resp = await deepai.callStandardApi("toonify", {
            
            image: document.getElementById('imageinput'),
    });
    $('#defaultAvatar').attr("src", resp['output_url']);
    console.log(resp['output_url']);
    console.log("SONO QUA");
    avatar = resp['output_url']+"";
    avatarModificato=true;
    console.log("AVATAR_MODIFICATO",avatarModificato);
    $('#confirmButton').prop("disabled", false);
  }catch(err){
    console.log("ERRORE");
    avatar = "default-avatar";
    $('#defaultAvatar').attr("src", "../media_resources/error_resources/error_image_input.png");
    $('#formatimg').fadeIn();
  }
})()
});

});

$(document).on('click', '#formatimg', function(){ 
  $('#defaultAvatar').attr("src", imagePrePut);
  $('#confirmButton').prop("disabled", false);
  avatar = "default-avatar";
  $('#formatimg').fadeOut();
});