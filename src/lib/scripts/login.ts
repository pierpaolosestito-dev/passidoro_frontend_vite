import $ from 'jquery';



import {consts} from "../consts.js";

/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
   
	document.head.appendChild(jQueryScript);
    
})*/
$(document).keypress(
  function(event){
    if (event.which == '13') {
     
      $("#enter-btn").click();
    }
});
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
$(document).on('click', '#enter-btn', function(){ 
    if(!regex.test($('#email').val()) && $('#password').val().length == 0 ){
      swalAlert(0,"Tutti i campi devono essere riempiti.");
      return;
    }
    if(!regex.test($('#email').val())){
        swalAlert(0,"L'email inserita non è valida.");
        return;
    }
    if($('#password').val().length == 0){
      Swal.fire({ 
        imageUrl:"https://icons-for-free.com/download-icon-drawn+sad+smiley+icon-1320184383798869476_512.png",
        imageWidth:150,
        imageHeight:150,
        title:"<div style='background-color:#fff;'><strong style='color:red'>Devi inserire una password.</strong></div>",
        confirmButtonText:'<i class="fa fa-thumbs-down"></i> Riprova',
        confirmButtonColor:'red',
        background:'url("https://i.ibb.co/zsyXVXp/background.jpg")'
  
  });
            return;
    }
    console.log($('#password').val());
    console.log("CIao");
  
    Swal.fire({
      title:"Caricamento in corso",
      imageUrl:"../media_resources/loader_resources/cat_loader.gif",
      didOpen: function(){
        console.log(consts.DOMAIN);
        const login_data = {'email':$('#email').val(),"password":$('#password').val()}
        axios.post(consts.DOMAIN+"/auth/login/", login_data)
        .then(response => {
          console.log(response.data);
          console.log(response.data.key);
          console.log(response.data.user.is_superuser);
          
          
          sessionStorage.setItem('email',$('#email').val()+"");
          sessionStorage.setItem('key',response.data.key);
          sessionStorage.setItem("tentativiCambio",3);
          
          if(response.data.user.is_superuser){
            sessionStorage.setItem("user","admin");
            location.href="/admin";
          }else{
            sessionStorage.setItem("user","maestra");
            location.href="/maestra";
          }
          /*if(response.data == "Errore"){
            swalAlert(0,"L'utente non risulta registrato nel sistema.");
              
              return;
            
          }else{
            localStorage.setItem('email',$('#email').val()+"");
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("access_token",response.data.access_token)
            //email.set($('#email').val()+"");
            if(response.data.is_superuser){
                localStorage.setItem("user","admin");
                location.href="/admin"
                
               
            }else{
                localStorage.setItem("user","maestra");
                location.href="/maestra";
                
            }
          }*/
          
        }).catch(function(err){
            console.log(err.response.status);
            if(err.response.status == 400){
              swalAlert(0,"L'utente non risulta registrato nel sistema.");
              
              return;
            }
            swalAlertCONN_REF();
            return;
        });
      }});
    
});

