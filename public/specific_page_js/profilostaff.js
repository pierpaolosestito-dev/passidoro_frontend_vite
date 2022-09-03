
import {consts} from "../../src/lib/consts";

/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})*/

let parameters = new URLSearchParams(window.location.search);
console.log(parameters.get("ID"));
let IDn= parameters.get("ID")

$(document).on('click', '#editButton', function(){   
    $('#email-staff-input').show();
    $('#hiddenRow3').hide();
    $('#hiddenRow2').show();
});
$(document).on('click', '#confirmButton', function(){   
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email_staff=$("#email-staff").text();
    if($("#email-staff-input").val() != ""){
        if(!regex.test($("#email-staff-input").val())){
            swalAlert(0,"L'email inserita non è valida.");
            return;
        }}
        

        Swal.fire({
          title:"Caricamento in corso",
          imageUrl:"../media_resources/loader_resources/cat_loader.gif",
          didOpen: function(){
            var email_staff=$("#email-staff-input").val();
            const aggiornamento = {'id':IDn,'email':email_staff}
            axios({method:"put",url:consts.DOMAIN+"/singolo_staff",data:aggiornamento,headers:{"Authorization":"Token " + sessionStorage.getItem("key")}}).then(response=>{
                if(response.data == "OK"){
                    swalAlert(1,"Operazione avvenuta con successo.<br> Se non hai apportato alcuna modifica, i dati rimarranno integri.");
                    setTimeout(function(){
                        location.href="/admin/gestioneStaff"
                    },1300);
                    return;
                }else{
                  swalAlert(0,"L'operazione non è andata a buon fine.");
                }
            }).catch(err=>{
              swalAlertCONN_REF();
              return;
            })
          }});
       
    }
);

$(document).on('click', '#removeButton', function(){
  
  Swal.fire({
    title: '<div style="background-color:#fff">Vuoi veramente eliminare il membro dello staff?</div>',
    showDenyButton: true,
    denyButtonText: `Elimina`,
    confirmButtonText: 'Annulla',
    background:'url("../media_resources/alert_resources/alert_background.jpg")'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        title:'<div style="background-color:#fff">Il membro dello staff rimarrà registrato nel sistema!</div>', 
        icon:'success',
        background:'url("../media_resources/alert_resources/alert_background.jpg")'});
    } else if (result.isDenied) {
      Swal.fire({
        title:"Caricamento in corso",
        imageUrl:"../media_resources/loader_resources/cat_loader.gif",
        didOpen: function(){
          axios({method:"delete",url:consts.DOMAIN+'/singolo_staff/'+IDn,headers:{"Authorization":"Token " + sessionStorage.getItem("key")}})
          .then(response => {
            console.log(response)
            if(response.data == "Utente eliminato con successo"){
              swalAlert(1,"Operazione avvenuta con successo");
              setTimeout(function(){
                location.reload()
              },1200);
            }else{
              swalAlert(0,"L'operazione non è andata a buon fine");
              return;
              //Prima non usavo la funzione ma scrivevo swal.fire({})
            }
          
          }).catch(function(err){
            swalAlertCONN_REF();
            return;
          });
        }});
    }
  })
    /*swal({
        title: "Sei sicuro?",
        text: "Una volta eliminato, il bambino non sarà più recuperabile",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://127.0.0.1:8000/staff/'+IDn)
          .then(response => {
            console.log(response)
            if(response.data == "Utente eliminato con successo"){
              swal("Poof! L'utente è stato cancellato!", {
                icon: "success",
              });
              setTimeout(function(){
                location.reload()
              },1200);
            }else{
              swal("Errore con l'eliminazione dell'utente, riprovare", {
                icon: "error",
              });
            }
          
          });
          
        } else {
          swal("Il bambino rimane registrato nel sistema");
        }
      });*/
});