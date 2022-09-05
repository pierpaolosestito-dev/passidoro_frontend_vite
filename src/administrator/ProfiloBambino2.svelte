<script lang="ts">
    import {Spinner,Card,CardBody,CardHeader,CardTitle,CardSubtitle,Alert,Col,Row,Image,Badge,Button} from 'sveltestrap';
    import {consts} from "../lib/consts";
    //import '../lib/scripts/profilo_bambino2.ts';
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
  import ErrorCard from '../restructured_components/404Card.svelte';

  import axios from 'axios';
  import {onMount} from 'svelte';
  
  let parameters = new URLSearchParams(window.location.search);
  
    let IDn= parameters.get("ID")
    let result = "";
    let error404=false;
    const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark'
  ];
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  onMount(async () => {
    try {
        
            const res = await axios({method:'get',url:consts.DOMAIN+'/singolo_bambino',headers:{'CUSTOM-OPTION':IDn,'Authorization':'Token ' + sessionStorage.getItem('key')}}).then(response=>{
                console.log(response.data);
                result = response.data;
                if(response.data != "Il bambino non esiste"){
                    console.log("SONO QUA");
                    if(document.getElementById('nome-bambino')!=null)
                    document.getElementById('nome-bambino').innerText = response.data[0].Nome;
                    if(document.getElementById('cognome-bambino')!=null)
                    document.getElementById('cognome-bambino').innerText = response.data[0].Cognome;
                    if(document.getElementById('datanascita')!=null){
                        
                    document.getElementById('datanascita').value = formatDate(response.data[0].Data_di_nascita);
                    }
                    if(document.getElementById('time')!=null)
                    document.getElementById('time').value = response.data[0].Orario_uscita;
                    if(document.getElementById('email-padre')!=null)
                    document.getElementById('email-padre').innerText = response.data[0].Email_Genitore1;
                    if(document.getElementById('email-madre')!=null)
                    document.getElementById('email-madre').innerText = response.data[0].Email_Genitore2;
                    if(document.getElementById('defaultAvatar')!=null)
                    document.getElementById('defaultAvatar').src = "http://127.0.0.1:8000/filestorage/"+response.data[0].Avatar+"/"+sessionStorage.getItem("key");
                }
                
            });
            
            
        } catch (e) {
            error404=true;
            console.log("errore");
            console.log(e);
        }
    });
</script>

<main>
<Navbar_Restructured/>
<!--{#if  result.length == 0 && !error404}
<Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
{:else}-->

{#if result == "Il bambino non esiste" || error404}
<ErrorCard/>
{:else}
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle>Profilo</CardTitle>
      <CardSubtitle>Dati inerenti al bambino</CardSubtitle>
    </CardHeader>
    <CardBody>
        <Image id="defaultAvatar" class="defaultAvatar" alt="defaultAvatar" src="http://127.0.0.1:8000/filestorage/default-avatar"/>
        <Alert color='warning'>
        <Col>
            <Row>
                <p id="nome-bambino">Nome Bambino</p>
            </Row>
            <Row>
                <p id="cognome-bambino">Cognome Bambino</p>
            </Row>
            <Row>
                
                <Col>
                   <p>Data di nascita</p>
            </Col>
                <Col>
                
                    <input  id="datanascita" type="date" name="time" disabled />
            
        </Col>
    
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
                    
                   <p id="email-padre">Email padre</p>
                   <input type="email" id="emailPadre" placeholder="INSERISCI NUOVA EMAIL"/>
            </Col>
                <Col>
                
                    
            
        </Col>
    
            </Row>
            <Row>
                
                <Col>
                    
                   <p id="email-madre">Email madreEEE</p>
                   <input type="email" id="emailMadre" placeholder="INSERISCI NUOVA EMAIL"/>
            </Col>
                <Col>
                
                    
            
        </Col>
    
            </Row>
            <Row id ="hiddenRow" style="display:none;">
                <input type="file" placeholder="Modifica l'immagine del bambino" id="imageinput"/>
                <button class="hd-button" id="formatimg"><i class="fa fa-refresh" aria-hidden="true"></i>Reimposta avatar di default</button>
            </Row>
            {#if sessionStorage.getItem("user") == "admin"}
            <Row>
                <button class="hd-button" id="removeButton">Elimina <i class="fa fa-trash" aria-hidden="true"></i></button>
            </Row>
            <Row id="hiddenRow3">
                <button class="hd-button" id="editButton">Modifica <i class="fa fa-refresh" aria-hidden="true"></i></button>
            </Row>
           <Row id="hiddenRow2" style="display:none;">
            <button class="hd-button" id="confirmButton">Conferma <i class="fa fa-check" aria-hidden="true"></i></button>
           </Row>
           {/if}
        </Col>
    </Alert>

    </CardBody>
 
  </Card>
  {/if}
  
</main>


<svelte:head>
    <style>
        .hd-button{
            max-width:800px;
        }
    </style>
    <script type="module" src="/specific_page_js/profilo_bambino2.js"></script>

 <link rel="stylesheet" href="/restructured_css/card.css">
 <link rel="stylesheet" href="/restructured_css/button.css">
 <link rel="stylesheet" href="/specific_page_css/profilo_bambino.css">
  </svelte:head>