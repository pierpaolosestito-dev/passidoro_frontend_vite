$(document).on('click', '#logout', function(){ 
    /**/
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
                url:"http://127.0.0.1:8000/auth/logout/",
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