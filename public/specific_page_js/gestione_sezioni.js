window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
	document.head.appendChild(jQueryScript);
    
})

let counter = 0;

$(document).on('click', '#edit-btn', function(){ 
  
    if(counter == 0){
    $('#email-rappresentante-attuale').text("EMAIL ATTUALE: " + $('#email-rappresentante-attuale').text());
    $('#hidden-row').show();
    //$('#editableEmail').focus();
     
    
  $('#confirm-btn').show();
    }
    counter+=1;
   
  });

  //DA AGGIUSTARE
  $(document).on('click', '#confirm-btn', function(){ 
    var inputvalues = $('#nuova-email').val();   
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
    if(!regex.test(inputvalues)){    
      swal({
        title: "Errore!",
        text: "Risulta esserci un errore nella digitazione della nuova e-mail!",
        icon: "https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141001053/32210371-error-icon.jpg",
      });
      return;  
  }  
  counter=0;
  
  });