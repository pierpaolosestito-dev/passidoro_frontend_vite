<script lang="ts">
  export let sezione;
  import {Fade,Row,Table, Column, Card,CardHeader,CardBody,Input,Image,ListGroup,ListGroupItem,Spinner} from 'sveltestrap';
  import SezioneStatistica from '../SezioneStatistica.svelte';
  import { onMount,beforeUpdate} from 'svelte';
	import axios from 'axios';
  import {consts} from "../../../../lib/consts";
  import "../../../../lib/scripts/tabellabambinisezione.ts";
   


	let search = undefined;
  let users=[]
  let error404=false;
  let probassenti = 0;
  console.log("SEZIONE",sezione);
	/*$: visibleUsers = search ?
		users.filter(user => {
			return user.Nome.match(`${search}.*`) || user.Cognome.match(`${search}.*`)
		}) : users;*/
    $: visibleUsers = search ?
		users.filter(user => {
			return user.Nome.match(`${search}.*`) || user.Cognome.match(`${search}.*`) || user.Cognome.toLowerCase().match(`${search}.*`) || user.Nome.toLowerCase().match(`${search}.*`) || user.Cognome.toUpperCase().match(`${search}.*`) || user.Nome.toUpperCase().match(`${search}.*`) 
		}) : users;
    let modificati  = 0;
    let inviati = 0;
    let modificatinoninviati = 0;
    let uscitienoninviati = 0;
    let modified_users= 0;
      let sended_users = 0;
    var today = new Date();
    console.log(today);
    let bol = true;
    let assenti = sessionStorage.getItem("assenti")+sezione;
    var time = today.getHours() + ":" + today.getMinutes();
    console.log("TIME:",time);
	onMount(async () => {
    console.log("Mounted");
    console.log("BOL",bol);
    try{
		const resp = await axios({
      method:'get',
      url:consts.DOMAIN+'/bambinixreportsezione',
    headers:{"CUSTOM-OPTION":sezione,"Authorization":"Token " + sessionStorage.getItem("key")}});
		
		users = resp.data;
    console.log("USERS",users);
    
   
    
    if(users != "Non ci sono bambini"){
  
    for(let i=0;i<users.length;i++){
      if(users[i]['Modificato'] == 1){
        modified_users +=1;
      }
      if(users[i]["Inviato"] == 1 && users[i]["Modificato"] == 1){
        sended_users+=1;
      }
      console.log("modified_users",modified_users);
      console.log("sended_users",sended_users);
      console.log(i,users[i]["Modificato"])
      if(users[i]['Inviato']==0){
        let orarioSplitted = users[i]['Orario_uscita'].split(":");
        console.log(orarioSplitted[0],orarioSplitted[1]);


        if(orarioSplitted[0] < today.getHours() && orarioSplitted[1] < today.getMinutes() && users[i]['Modificato']==1){
            console.log("Sto contando");
        uscitienoninviati+=1;
        
        }
        if(orarioSplitted[0] < today.getHours() && orarioSplitted[1] < today.getMinutes() && users[i]['Modificato']==0){
            console.log("Sto contando");
        probassenti+=1;
        
        }
      }
      if(users[i]["Inviato"]==1)
        inviati+=1;
      
    }
  }
    console.log("USERS",users);

}catch(err){
    error404 = true;
    console.log("ERRORE");
    console.log("ERRORE",err);
}  
	
  });

let isOpen = false;
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
{#if users.length == 0 && !error404}
<Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
{:else}
{#if error404}
<h3 style="color:red">Si ?? verificato un errore di rete <i class="fa fa-frown-o" aria-hidden="true"></i></h3>
{:else}
{#if users == "Non ci sono bambini"}
<h3>Non ci sono bambini <i class="fa fa-frown-o" aria-hidden="true"></i></h3>
{:else}
<Card id="hd-card">
  <CardHeader id="hd-card-header">
    <!--bind:value={search}-->
    <Input type="search" bind:value={search} placeholder="Nome o cognome" />
  </CardHeader>
  <CardBody>
    <Table id="tabellabambini" name={sezione} responsive striped rows={visibleUsers} let:row={user}>
      <Column  header="Avatar">
        <Image id="defaultAvatar" class="defaultAvatar" src="{consts.DOMAIN}/filestorage/{user.Avatar}/{sessionStorage.getItem("key")}"/>
      </Column>
        <Column header="Nome">
        {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == true}
         <p style="color:red"> {user.Nome}</p>
        {:else if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == false}
      
        <p style="color:orange"> {user.Nome}</p>
        
        {:else}
        {user.Nome}
        {/if}
        </Column>
        <Column header="Cognome">
          {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == true}
         <p style="color:red"> {user.Cognome}</p>
        {:else if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == false }
        <p style="color:orange"> {user.Cognome}</p>
        {:else}
        {user.Cognome}
        {/if}
        </Column>
       
        <Column header="Profilo">
          {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours()}
            <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button"><i class="fa fa-user" aria-hidden="true"></i></button></a>

          {:else}
          <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button" ><i class="fa fa-user" aria-hidden="true"></i></button></a>
          {/if}
        </Column>
        <Column header="Report">
          {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours()}
            <a href="/reportform?ID={user.ID}"> <button class="hd-button" ><i class="fa fa-file" aria-hidden="true"></i></button></a>

          {:else}
          <a href="/reportform?ID={user.ID}"> <button class="hd-button"><i class="fa fa-file" aria-hidden="true"></i></button></a>
          {/if}
        </Column>
        <Column header="Modificato">
          {#if user.Modificato == true}
          <Input type="checkbox" checked disabled/>
          {:else}
          {#if user.Orario_uscita.split(":")[0] < today.getHours() && user.Inviato == 0 && user.Modificato == true}
          <Input style="outline:1px solid red" type="checkbox" disabled/>
          {:else if user.Orario_uscita.split(":")[0] < today.getHours() && user.Inviato == 0 && user.Modificato == false}
          <Input style="outline:1px solid orange" type="checkbox" disabled/>
          {:else}
          <Input type="checkbox" disabled/>
          {/if}
          {/if}
          
        </Column>
        <Column header="Inviato">
          
          {#if user.Inviato == true}
          <Input type="checkbox" checked disabled/>
          {:else}
          {#if user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == true}
          <Input style="outline:1px solid red" type="checkbox" disabled/>
          {:else if user.Orario_uscita.split(":")[0] < today.getHours() && user.Modificato == false }
          <Input style="outline:1px solid orange" type="checkbox" disabled/>
          {:else}
          <Input type="checkbox" disabled/>
          {/if}
          {/if}
          
        </Column>
        
    </Table>
    {#if sessionStorage.getItem("user") == "admin"}
    <button style="display:block;margin:auto" class="hd-button" on:click={() => (isOpen = !isOpen)}>
      Opzioni e statistiche<i class="fa fa-dashboard"></i>
    </button>
    <Fade {isOpen}>
      <Card id="hd-card-2" body>
        <Row style="margin-bottom:10px">
          <button id="excel-btn"  class="hd-button">Scarica foglio Excel <i class="fa fa-file-excel" aria-hidden="true"></i></button>
              </Row>
              {#if sended_users!=users.length}
              <Row style="margin-bottom:10px">
                <button id="send-all-updated"  class="hd-button">Invia tutti i report modificati</button>
                    </Row>
                    {/if}
        <Row style="margin-bottom:10px">
    <button id="remove-btn"  class="hd-button">Elimina tutti</button>
        </Row>
        
        {#if uscitienoninviati > 0}
        <ListGroup style="margin-bottom:5px">
          <ListGroupItem color="danger">
                {#if uscitienoninviati != 1}
                <p>Ci sono {uscitienoninviati} bambini PRESENTI con il report MODIFICATO e NON INVIATO, il cui orario di uscita ?? stato superato. E' probabile che abbia lasciato l'aula</p>
                {:else}
                <p>C'?? {uscitienoninviati} bambino PRESENTE con il report MODIFICATO e NON INVIATO, il cui orario di uscita ?? stato superato. E' probabile che abbia lasciato l'aula</p>
                {/if}
              </ListGroupItem>
          
        </ListGroup>
        {/if}
        <!--
        {#if probassenti > 0 && !assenti}
        <ListGroup style="margin-bottom:5px">
          <ListGroupItem color="warning">
            <Row>
              
                {#if probassenti != 1}
                <p>Ci sono {probassenti} probabilmente ASSENTI , i rispettivi report non sono stati n?? MODIFICATI e n?? INVIATI, il cui orario di uscita ?? stato superato. Se ?? assente, clicca la spunta sotto (NON VERRA' PIU VISUALIZZATO IL MESSAGGIO); altrimenti controlla i rispettivi report  e inviali</p>
                {:else}
                <p>C'?? {probassenti} bambino probabilmente ASSENTE, il cui report non ?? stato n?? MODIFICATO e n?? INVIATO, il cui orario di uscita ?? stato superato. Se ?? assente, clicca la spunta sotto (NON VERRA' PIU VISUALIZZATO IL MESSAGGIO); altrimenti controlla il suo report e invialo</p>
                {/if}
              
              </Row>
              <Row>
                <button id="assenti" style="margin:auto;display:block;max-width:50px;max-height:50px" class="hd-button"><i class="fa fa-check" aria-hidden="true"></i></button>
              </Row>
              </ListGroupItem>
          
        </ListGroup>
        {/if}
        -->
        {#if modified_users!=sended_users}
        <SezioneStatistica infoO={[sended_users,modified_users]}/>
        {:else if modified_users == sended_users && sended_users!=0}
        <ListGroup style="margin-top:5px">
          <ListGroupItem color="success">
            {#if sended_users != users.length}
            Tutti i report MODIFICATI risultano esser stati consegnati correttamente ai rispettivi genitori.<br> Controlla tra i presenti i report ancora da MODIFICARE e INVIARE.
            {:else}
            <p align="center">Lavoro completato</p>
            {/if}          
          </ListGroupItem>
          
        </ListGroup>
      
        {/if}
      </Card>
    </Fade>
    {:else}
    {#if sended_users != users.length}
    <Row style="margin-bottom:10px">
      <button id="send-all-updated" class="hd-button">Invia tutti i report modificati</button>
          </Row>
          {/if}
    {#if uscitienoninviati > 0}
        <ListGroup style="margin-bottom:5px">
          <ListGroupItem color="danger">
                {#if uscitienoninviati != 1}
                <p>Ci sono {uscitienoninviati} bambini PRESENTI con il report MODIFICATO e NON INVIATO, il cui orario di uscita ?? stato superato. E' probabile che abbia lasciato l'aula</p>
                {:else}
                <p>C'?? {uscitienoninviati} bambino PRESENTE con il report MODIFICATO e NON INVIATO, il cui orario di uscita ?? stato superato. E' probabile che abbia lasciato l'aula</p>
                {/if}
              </ListGroupItem>
          
        </ListGroup>
        {/if}
    {#if modified_users!=sended_users}
    <SezioneStatistica infoO={[sended_users,modified_users]}/>
    {:else if modified_users == sended_users && sended_users!=0}
    <ListGroup style="margin-top:5px">
      <ListGroupItem color="success">
        {#if sended_users != users.length}
        Tutti i report MODIFICATI risultano esser stati consegnati correttamente ai rispettivi genitori.<br> Controlla tra i presenti i report ancora da MODIFICARE e INVIARE.
        {:else}
        <p align="center">Lavoro completato</p>
        {/if}
      </ListGroupItem>
      
    </ListGroup>
  
    {/if}
    {/if}
    

  </CardBody>
  
</Card>  

  

{/if}
{/if}
{/if}
<svelte:head>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <link rel="stylesheet" href="/specific_page_css/tabellasezione.css"/>
  <!--<script type="module" src="/specific_page_js/tabellabambinisezione.js"></script>-->
  
</svelte:head>