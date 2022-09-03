<script lang="ts">
    import {Card,CardBody,CardHeader,CardTitle,CardSubtitle,Alert,Col,Row,Image,Badge,Button} from 'sveltestrap';
   
    let radioGroup;
    let selected = "Ciao";
    let submitted = false;
    let isSuccessVisible = false;
    function handleSubmit(e) {
		isSuccessVisible = true;

    console.log(selected);
		setTimeout(function(){
			isSuccessVisible = false;
		}, 4000);
	}
  import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
</script>

<main>
<Navbar_Restructured/>
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle>Profilo</CardTitle>
      <CardSubtitle>Dati inerenti al nuovo bambino</CardSubtitle>
    </CardHeader>
    <CardBody>
        <Image id="defaultAvatar" class="defaultAvatar" alt="defaultAvatar" src="https://t3.ftcdn.net/jpg/01/28/56/34/360_F_128563455_bGrVZnfDCL0PxH1sU33NpOhGcCc1M7qo.jpg"/>
        <Alert color='warning'>
        <Col>
            <Row>
                <p>Nome Bambino</p>
            </Row>
            <Row>
                <p>Cognome Bambino</p>
            </Row>
            <Row>
                
                <Col>
                   <p>Orario d'uscita</p>
            </Col>
                <Col>
                
                    <input  id="time" type="time" name="time" value="22:00" disabled />
            
        </Col>
    
            </Row>
            <Row>
                <Badge id="badge" style="display:none;">Ora puoi modificare le e-mail e l'orario di uscita</Badge>
            </Row>
            <Row>
                
                <Col>
                    
                   <p id="editableEmailPadre">Email padre</p>
            </Col>
                <Col>
                
                    
            
        </Col>
    
            </Row>
            <Row>
                
                <Col>
                    
                   <p id="editableEmailMadre">Email madre</p>
            </Col>
                <Col>
                
                    
            
        </Col>
    
            </Row>
            <Row id ="hiddenRow" style="display:none;">
                <input type="file"/>
            </Row>
            <Row>
                <button class="hd-button" id="editButton">Modifica</button>
            </Row>
           <Row id="hiddenRow2" style="display:none;">
            <button class="hd-button" id="confirmButton">Conferma</button>
           </Row>
        </Col>
    </Alert>

    </CardBody>
 
  </Card>

</main>


<svelte:head>

    <script src="../specific_page_js/profilo_bambino.js"></script>

 <link rel="stylesheet" href="../restructured_css/card.css">
 <link rel="stylesheet" href="../restructured_css/button.css">
 <link rel="stylesheet" href="../specific_page_css/profilo_bambino.css">
  </svelte:head>