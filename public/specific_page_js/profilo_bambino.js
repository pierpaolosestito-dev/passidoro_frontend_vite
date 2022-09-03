
window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
	document.head.appendChild(jQueryScript);
    
})



$(document).on('click', '#editButton', function(){ 
    $('#hiddenRow').show();
    $('#hiddenRow2').show();
    $('#badge').show();
    
    $('#editableEmailPadre').attr('contenteditable','true');
    $('#editableEmailMadre').attr('contenteditable','true');
    $('#editableEmailMadre').css('color','blue');
    $('#editableEmailPadre').css('color','blue');
    $( "#time" ).prop( "disabled", false );
  });
  
  $(document).on('click', '#confirmButton', function(){ 
      var inputvalues1 = $('#editableEmailPadre').text();
      var inputvalues2 = $('#editableEmailMadre').text(); 
      var errore = false;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
    if(!regex.test(inputvalues1)){    
  
  $('#editableEmailPadre').css('color', 'red');   
  errore= true;
    }
  if(!regex.test(inputvalues2)){    
  
  $('#editableEmailMadre').css('color', 'red');    
  errore=true;
  }
  if(errore)
  {
    swal({
      title: "Errore!",
      text: "Probabilmente le email inserite non sono corrette",
      icon: "https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141001053/32210371-error-icon.jpg",
    });
      return;
  }
  
  
  });