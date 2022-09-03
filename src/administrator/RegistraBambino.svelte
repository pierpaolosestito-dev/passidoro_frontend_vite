<script lang="ts">
import { loop_guard } from 'svelte/internal';

    import {
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Image,Badge,Form,FormGroup,Input,InputGroup,InputGroupText,Label,ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Button
    } from 'sveltestrap';
   
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
  import NavbarRestructured from '../restructured_components/Navbar_Restructured.svelte'
</script>

<main>

<Card class="mb-5">
    <CardHeader>
      <CardTitle>Registra bambino</CardTitle>
      <CardSubtitle>Dati inerenti al nuovo bambino</CardSubtitle>
    </CardHeader>
    <CardBody>
        <Image id="defaultAvatar" class="defaultAvatar" alt="defaultAvatar" src="https://t3.ftcdn.net/jpg/01/28/56/34/360_F_128563455_bGrVZnfDCL0PxH1sU33NpOhGcCc1M7qo.jpg"/>
      
      <!--FORM-->
      <Form>
        <FormGroup floating>
            <Input
          
          name="nomeBambino"
          id="nomeBambino"
          placeholder="Inserisci un valore"
       required />
            <div slot="label">
              Nome del bambino <Badge>OBBLIGATORIO</Badge>
            </div>
          </FormGroup>
      
        <FormGroup floating>
            <Input
          
          name="cognomeBambino"
          id="cognomeBambino"
          placeholder="Inserisci un valore"
       required />
          <div slot="label">
            Cognome del bambino <Badge>OBBLIGATORIO</Badge>
          </div>
        </FormGroup>
      <FormGroup>
          <InputGroup>
            <InputGroupText>
              <Input
      id="r1"
      type="radio"
      bind:group={radioGroup}
      value="maschio"
      label="MASCHIO"
    />
            </InputGroupText>
        
           
            <InputGroupText>
              <Input
              id="r2"
              type="radio"
              bind:group={radioGroup}
              value="femmina"
              label="FEMMINA"
            />
              </InputGroupText>
          
              
          </InputGroup>
        </FormGroup>
          <FormGroup floating>
            <Input
          type="email"
          name="emailPadre"
          id="emailPadre"
          placeholder="Inserisci un valore"
        />
          <div slot="label">
            Email del padre: 
          </div>
        </FormGroup>
        <FormGroup floating>
            <Input
          type="email"
          name="emailMadre"
          id="emailMadre"
          placeholder="Inserisci un valore"
        />
          <div slot="label">
            Email della madre: 
          </div>
        </FormGroup>
        <FormGroup>
        <Badge class="badgeEmails" pill color="#c00">Almeno uno dei due campi e-mail deve essere riempito.</Badge>
      </FormGroup>
        <FormGroup>
          <FormGroup>
            <Label for="exampleSelect">SEZIONE DEL BAMBINO:</Label>
            <Input type="select" name="sezione" id="sezione">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Input type="file" placeholder="Inserisci un immagine del bambino" id="imageinput"/>
          <div slot="label">
            Inserisci un immagine del bambino: 
          </div>
        </FormGroup>
        <FormGroup>
          <Button color="primary" on:click={() => submitted = true}>REGISTRA BAMBINO</Button>
        </FormGroup>
      </Form>

    </CardBody>
  <CardFooter>Università della Calabria - Passi D'Oro</CardFooter>
  </Card>

</main>


<svelte:head>
  <style>
      .defaultAvatar{
          display:block;
          margin-left:auto;
          margin-right:auto;
          margin-bottom:20px;
          vertical-align:middle;
          width:150px;
          height:150px;
          border-radius:50%;
          
      }
      .badgeEmails{
          background-color: #c00;
          color: rgb(255, 255, 255);
      }
      .mb-5{
        display:block;
        margin-left:auto;
        margin-right:auto;
        margin-top:20px;
        max-width:600px;
      }
  </style>
 <script>
  $('#r1').change(function() {
    $('#defaultAvatar').attr("src", "https://avatarfiles.alphacoders.com/661/66153.jpg");
});
$('#r2').change(function() {
    $('#defaultAvatar').attr("src", "https://www.personality-database.com/profile_images/172432.png");
});
$('#sezione').change(function() {
    console.log($('#sezione').val());
});

$('#imageinput').change(function() {
  var myFile = $('#imageinput').prop('files');
  //const deepai = require(['deepai']); 
  
deepai.setApiKey('e80958c5-b1f3-476b-9fac-3ca7ce06e858');
console.log("QUA");
(async function() {
    var resp = await deepai.callStandardApi("toonify", {
            
            image: "https://i.ibb.co/GngP7RK/IMG-20220331-WA0007.jpg",
    });
    $('#defaultAvatar').attr("src", resp['output_url']);
    console.log(resp['output_url']);
    console.log("NOTHING");
})()
console.log(myFile[0].name);

});
 </script>
  </svelte:head>