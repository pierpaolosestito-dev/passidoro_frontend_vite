<script lang="ts">
    import {Card,CardBody,CardHeader,CardTitle,CardSubtitle,Alert,Col,Row,Image,Badge,Button} from 'sveltestrap';
    import {consts} from "../lib/consts";
    import "../lib/scripts/profilostaff.ts";
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
    let result;
    let error404=false;
  onMount(async () => {
    try {
        
            const res = await axios({method:'get',url:consts.DOMAIN+'/singolo_staff',headers:{'CUSTOM-OPTION':IDn,'Authorization':'Token ' + sessionStorage.getItem("key")}});
            console.log(res.data);
            if(res.data != "Il profilo non esiste"){
                document.getElementById('nome-staff').innerText = res.data.first_name;
                document.getElementById('cognome-staff').innerText = res.data.last_name;
                document.getElementById('email-staff').innerText = res.data.email;
                document.getElementById('subtitle-staff').innerText = "Dati membro staff: " + res.data.username;
				if(res.data.is_superuser)
					document.getElementById('defaultAvatar').src="/media_resources/staff_resources/staff_admin.png";
				else
					document.getElementById('defaultAvatar').src="/media_resources/staff_resources/staff_teacher.png";
            }
            result = res.data;
        } catch (e) {
            console.log("ERRORE");
            error404=true;
            console.log(e);
        }
    });
</script>
<!-- 

_                             _                     _   _ _                 _            
(_)                           | |                   | | (_) |               | |           
_ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
| '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
| |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
| .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
| |               | |                                                                           
|_|               |_|                                                                           
 -->
<main>
<Navbar_Restructured/>
{#if result == "Il profilo non esiste" || error404}
<ErrorCard/>
{:else}
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle>Profilo</CardTitle>
      <CardSubtitle id="subtitle-staff">Dati membro staff: username</CardSubtitle>
    </CardHeader>
    <CardBody>
		<Image id="defaultAvatar" class="defaultAvatar" alt="defaultAvatar" src="../media_resources/loader_resources/cat_loader.gif"/>
        <Col>
            <Row>
                <p id="nome-staff">Nome</p>
            </Row>
            <Row>
                <p id="cognome-staff">Cognome</p>
            </Row>
            <Row>
                    
                <p id="email-staff">Email</p>
                <input type="email" id="email-staff-input" placeholder="INSERISCI NUOVA EMAIL"/>
            </Row>
            <Row>
                <button class="hd-button" id="removeButtonn">Elimina <i class="fa fa-trash" aria-hidden="true"></i></button>
            </Row>
            <Row id="hiddenRow3">
                <button class="hd-button" id="editButton">Modifica <i class="fa fa-refresh" aria-hidden="true"></i></button>
               
            </Row>
           <Row id="hiddenRow2" style="display:none;">
            <button class="hd-button" id="confirmButton">Conferma <i class="fa fa-check" aria-hidden="true"></i></button>
           </Row>
        </Col>
    

    </CardBody>
 
  </Card>
  {/if}
</main>


<svelte:head>
    
    <!--<script type="module" src="/specific_page_js/profilostaff.js"></script>-->

 <link rel="stylesheet" href="/restructured_css/card.css">
 <link rel="stylesheet" href="/specific_page_css/profilo_bambino.css">
  </svelte:head>