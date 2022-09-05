<script lang="ts">
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    import {Card,FormText,Alert,CardBody,Spinner,CardHeader,CardSubtitle,CardTitle,Container,Row,Col,Image,Input,InputGroup,InputGroupText,Label} from 'sveltestrap';
    import ErrorCard from '../restructured_components/404Card.svelte';
    let radioGroup,radioGroup1;
    import axios from 'axios';
  import {onMount} from 'svelte';
import {consts} from '../lib/consts';
import '../lib/scripts/report_form.ts';
  let parameters = new URLSearchParams(window.location.search);
  console.log(parameters.get("ID"));
    let IDn= parameters.get("ID")
    let error404_1=false;
    let error404_2=false;
    let result = []
  onMount(async () => {
    console.log("Mounted");
    try {
        axios.all([
            axios({method:'get',url:consts.DOMAIN+'/singolo_bambino',headers:{'CUSTOM-OPTION':IDn,'Authorization': 'Token ' + sessionStorage.getItem("key")}}).catch(function(err){
                error404_1=true;
            }),
            axios({method:'get',url:consts.DOMAIN+'/report_giornaliero',headers:{'CUSTOM-OPTION':IDn,'Authorization': 'Token ' + sessionStorage.getItem("key")}}).catch(function(err){
                error404_2=true;
            })
            
 ])
 .then(axios.spread((data1, data2) => {
    console.log("error404_1",error404_1);
    console.log("error404_2",error404_2);
   // output of req.
   console.log('data1', data1.data, 'data2', data2.data);
   result=data1.data;
   if(data1.data != "Il bambino non esiste" && data2.data != "Il report non esiste" ){
    console.log("SUCCESS");
    
    
    
   document.getElementById('nome-bambino').innerHTML = data1.data[0].Nome;
   document.getElementById('cognome-bambino').innerHTML = data1.data[0].Cognome;
   //document.getElementById('pasto').value = data2.data[0].Pasto;
   if(data2.data[0].Ha_dormito == false){
    document.getElementById('r4').checked = true;
   }else{
    document.getElementById('r3').checked = true;
   }
   document.getElementById('pasto').value = data2.data[0].Pasto;
   var regexBisogni = /SI/;
   if(regexBisogni.test(data2.data[0].Bisogni_fisiologici)){
    document.getElementById('r1').checked = true;
    document.getElementById("info-aggiuntive").style.display = "block";
    document.getElementById('info-aggiuntive-text').value = data2.data[0].Bisogni_fisiologici;
   }else{
    document.getElementById('r2').checked = true;
   }
   document.getElementById('promemoria').value = data2.data[0].Promemoria_genitori;
   if(data2.data[0].Inviato){
    document.getElementById("invia-report").disabled = true;
    document.getElementById("invia-report").innerText = "REPORT GIA INVIATO";
    document.getElementById("conferma-modifiche").style.display = "none";
    //document.getElementById("conferma-modifiche").innerText = "REPORT GIA INVIATO";
   }}
   console.log("RESULT",result);
 }));
            /*const res = await axios.get('http://127.0.0.1:8000/singolo_bambino/'+IDn);
            console.log(res.data);*/
        } catch (e) {
            console.log("errore");
            console.log(e);
        }
    });

    const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark'
  ];
  
</script>

<Navbar_Restructured/>
<!--{#if result.length == 0 && !error404_1 && !error404_2}
<p>Loading</p>
{:else}-->
{#if result == "Il bambino non esiste" || error404_1 || error404_2}
<ErrorCard/>
{:else}
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle>Report giornaliero</CardTitle>
        <CardSubtitle> Situazione giornaliera bambino: </CardSubtitle>
    </CardHeader>
    <CardBody>
        
       
        <Alert>
            <h4 id="nome-bambino" class="alert-heading">Nome bambino</h4>
           
        </Alert>
        <Alert>
            <h4 id="cognome-bambino" class="alert-heading">Cognome bambino</h4>
            
        </Alert>
        <Alert color="warning">
            <h4 class="alert-heading">Info da aggiungere:</h4>

            <Label for="exampleSelect">PASTO:</Label>
            <Input id="pasto">
                <option>1</option>
            </Input>
            
            <Row>
                <Col>
                    <Label for="exampleSelect">HA DORMITO</Label>
                </Col>
                <Col>
                    <Input id="r3" type="radio" bind:group={radioGroup} value="SI " label="SI"/>
                    <Input id="r4" type="radio" bind:group={radioGroup} value="NO " label="NO"/>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Label for="exampleSelect">BISOGNI FIOSOLOGICI:</Label>
                </Col>
                <Col>
                    
                    <Input id="r1" type="radio" bind:group={radioGroup1} value="SI " label="SI"/>
                    <Input id="r2" type="radio" bind:group={radioGroup1} value="NO " label="NO"/>
                </Col>
            </Row>
            <Alert color="dark" id="info-aggiuntive">
                <Col>
                    <Row>
                        <FormText> Aggiungi informazioni in più per i genitori(facoltative):</FormText>
                    </Row>
                    <Row>
                        <Input type="textarea" name="text" id="info-aggiuntive-text"/>
                    </Row>
                </Col>
            </Alert>
            <Col>
                <Row>
                    <FormText color="muted">
                        MAMMA RICORDATI (INFORMAZIONI AGGIUNTIVE):
                    </FormText>
                </Row>
                <Row>
                    <Input type="textarea" name="text" id="promemoria"/>
                </Row>
                <Row>
                    <button class="hd-button" id="conferma-modifiche">Conferma modifiche senza inviare <i class="fa fa-refresh" aria-hidden="true"></i></button>
                    <button class="hd-button" id="invia-report">Invia report ai genitori <i class="fa fa-envelope" aria-hidden="true"></i></button>
                </Row>
            </Col>
        </Alert>
    </CardBody>
    
</Card>
{/if}
<!--{/if}-->
<svelte:head>
    <style>
        #conferma-modifiche,#invia-report{
            max-width:800px;
            margin-top:10px;
        }
    </style>
    
    <link rel="stylesheet" href="/restructured_css/card.css"/>
    <link rel="stylesheet" href="/specific_page_css/report_form.css"/>
    <!--<script type="module" src="/specific_page_js/report_form.js"></script>-->
</svelte:head>