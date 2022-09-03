window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
  jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})
function swalAlert(type,text){
    if(type){
        Swal.fire({ 
            imageUrl:"../media_resources/alert_resources/alert_success.PNG",
            imageWidth:150,
            imageHeight:150,
            title:'<div style="background-color:#fff"><strong>'+text+'</strong></div>',
            confirmButtonText:'<i class="fa fa-thumbs-up"></i> Perfetto!',
            confirmButtonColor:'green',  
            background:'url("../media_resources/alert_resources/alert_background.jpg")'
  });
    }else{
        Swal.fire({ 
            imageUrl:"../media_resources/alert_resources/alert_fail.PNG",
            imageWidth:150,
            imageHeight:150,
            title:"<div style='background-color:#fff;'><strong style='color:red'>"+text+"</strong></div>",
            confirmButtonText:'<i class="fa fa-thumbs-down"></i> Riprova',
            confirmButtonColor:'red',
            background:'url("../media_resources/alert_resources/alert_background.jpg")'
      
      });
    }
}

function swalAlertCONN_REF(){
  Swal.fire({ 
    imageUrl:"../media_resources/alert_resources/alert_connection_refused.png",
    imageWidth:350,
    imageHeight:250,
    title:"<div style='background-color:#fff;'><strong style='color:red'>Errore, connessione rifiutata.</strong></div>",
    confirmButtonText:'<i class="fa fa-thumbs-down"></i> Riprova',
    confirmButtonColor:'red',
    background:'url("../media_resources/alert_resources/alert_background.jpg")'

});
}

//consts.js -> const endpoint_base_url = netlify.toml.endpoint_backend
//