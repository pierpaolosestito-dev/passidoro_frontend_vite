<script lang="ts">
    export let sezione;
    import {Container,Card,CardHeader,CardTitle,CardBody,Row,Col} from 'sveltestrap';
    import ErrorCard from '../restructured_components/404Card.svelte';
    import {onMount} from 'svelte';
import axios from 'axios';
  let result;
  onMount(async () => {
    try {
        
            axios({method:"get",url:"http://127.0.0.1:8000/sezione",headers:{'CUSTOM-OPTION':sezione}}).then(response=>{
                result = response.data;
                console.log(response.data);
                if(response.data != "La sezione da lei desiderata non esiste"){
                
                console.log(response.data[0].Nome);
                document.getElementById('card-title-2').innerHTML=response.data[0].Nome;
                document.getElementById('email-rappresentante-attuale').innerHTML=response.data[0].Email_Rappresentante;
    }
});
        } catch (e) {
            console.log(e);
        }
    });
</script>
{#if result == "La sezione da lei desiderata non esiste"}
<ErrorCard/>
{:else}
<Card class="mb-3" id="hd-card">
    <CardHeader id="hd-card-header">
        <CardTitle id="card-title-2">Nome sezione</CardTitle>
    </CardHeader>
    <CardBody>
        <Col>
            <Row>
          <p id="email-rappresentante-attuale">Email Rappresentante</p>
        </Row>
        <Row id="hidden-row">
          <input type="email" id="nuova-email" placeholder="Nuova e-mail" >
        </Row>
        <Row id="row">
          <Container id="container-btn"><button class="hd-button" id="edit-btn" >Modifica</button></Container>
        </Row>
        <Row id="row">
            <Container id="container-btn"><button class="hd-button" id="confirm-btn" >Conferma</button></Container>
        </Row>
      </Col>
    </CardBody>
</Card>
{/if}
<svelte:head>
    <script src="/specific_page_js/gestione_sezioni.js"></script>
    <link rel="stylesheet" href="/restructured_css/card.css"/>
    <link rel="stylesheet" href="/restructured_css/button.css"/>
    <link rel="stylesheet" href="/specific_page_css/gestione_sezioni.css"/>
</svelte:head>