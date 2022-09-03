<script lang="ts">
    
    let open = false;
    const toggle = () => (open = !open);
    import {Card,CardHeader,CardTitle,CardBody,Button,Row,Col} from 'sveltestrap';

  
</script>
<main>
   
    <Card class="mainCard">
        <CardHeader><CardTitle>Gestione sezioni</CardTitle></CardHeader>
        <CardBody>
            <Card class ="sezione">
              <CardHeader>
                <CardTitle>Nome sezione</CardTitle>
              </CardHeader>
                <CardBody>
                  <Col>
                    <Row>
                  <p id="editableEmail">Email Rappresentante</p>
                </Row>
                <Row>
                  <p id="oldEditableEmail"></p>
                </Row>
                <Row>
                  <Button id="editButton" color="warning">Modifica</Button>
                </Row>
                <Row>
                  <Button id="confirmButton" color="primary" style="display:none;">Conferma</Button>
                </Row>
              </Col>
                </CardBody>
              
            </Card>
        </CardBody>
    </Card>
</main>

<svelte:head>
    <style>
        .badgeImg{
              width:25px;
              height:25px;
          }
        h5{
            text-align:center;
        }
        .mb-3{
            display:block;
            margin-left:auto;
            margin-right:auto;
        }
        .mainCard{
            margin-top:20px;
            display:block;
            margin-left:auto;
            margin-right:auto;
            max-width:600px;
        }
        #confirmButton{
          margin-top:10px;
        }
    </style>
    <script type="text/javascript">
$(document).on('click', '#editButton', function(){ 
  
  $('#oldEditableEmail').text("VECCHIA EMAIL: " + $('#editableEmail').text());
  $('#editableEmail').attr('contenteditable','true');
  $('#editableEmail').focus();
  $('#oldEditableEmail').css('color', 'black'); 
  
$('#confirmButton').show();
 
});

$(document).on('click', '#confirmButton', function(){ 
  var inputvalues = $('#editableEmail').text();   
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
  if(!regex.test(inputvalues)){    
alert("invalid email id");
$('#editableEmail').css('color', 'red');    
return;    
}  
$('#editableEmail').attr('contenteditable','false');
$('#oldEditableEmail').text("EMAIL CONFERMATA");
$('#editableEmail').css('color', 'black'); 
$('#oldEditableEmail').css('color', 'green'); 
$('#confirmButton').hide();

});
    </script>
</svelte:head>