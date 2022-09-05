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
    var today = new Date();
    console.log(today);
    let bol = true;
    
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
      console.log(i,users[i]["Modificato"])
      if(users[i]['Inviato']==0){
        let orarioSplitted = users[i]['Orario_uscita'].split(":");
        console.log(orarioSplitted[0],orarioSplitted[1]);


        if(orarioSplitted[0] < today.getHours() && orarioSplitted[1] < today.getMinutes()){
            console.log("Sto contando");
        uscitienoninviati+=1;
        }
      }
      if(users[i]["Modificato"] == 1)
        modificati+=1;
      if(users[i]["Inviato"]==1)
        inviati+=1;
      if(users[i]["Modificato"] == 1 && users[i]["Inviato"]==0)
        modificatinoninviati+=1;
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
{#if users.length == 0 && !error404}
<Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
{:else}
{#if error404}
<h3 style="color:red">Si è verificato un errore di rete <i class="fa fa-frown-o" aria-hidden="true"></i></h3>
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
        <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/filestorage/{user.Avatar}/{sessionStorage.getItem("key")}"/>
      </Column>
        <Column header="Nome">
        {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours()}
         <p style="color:red"> {user.Nome}</p>
        {:else}
        {user.Nome}
        {/if}
        </Column>
        <Column header="Cognome">
          {#if user.Inviato == 0 && user.Orario_uscita.split(":")[0] < today.getHours()}
         <p style="color:red"> {user.Cognome}</p>
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
        <Column header="Inviato">
          
          {#if user.Inviato == true}
          <Input type="checkbox" checked disabled/>
          {:else}
          {#if user.Orario_uscita.split(":")[0] < today.getHours()}
          <Input style="outline:1px solid red" type="checkbox" disabled/>
          {:else}
          <Input type="checkbox" disabled/>
          {/if}
          {/if}
          
        </Column>
        <Column header="Modificato">
          {#if user.Modificato == true}
          <Input type="checkbox" checked disabled/>
          {:else}
          {#if user.Orario_uscita.split(":")[0] < today.getHours() && user.Inviato == 0}
          <Input style="outline:1px solid red" type="checkbox" disabled/>
          {:else}
          <Input type="checkbox" disabled/>
          {/if}
          {/if}
          
        </Column>
    </Table>
    <button style="display:block;margin:auto" class="hd-button" on:click={() => (isOpen = !isOpen)}>
      Opzioni e statistiche<i class="fa fa-dashboard"></i>
    </button>
    <Fade {isOpen}>
      <Card id="hd-card-2" body>
        <Row style="margin-bottom:10px">
          <button id="excel-btn" style="margin:auto;display:block;max-width:160px" class="hd-button">Scarica foglio Excel <i class="fa fa-file-excel" aria-hidden="true"></i></button>
              </Row>
        <Row style="margin-bottom:10px">
    <button id="remove-btn" style="margin:auto;display:block;max-width:160px" class="hd-button">Elimina tutti</button>
        </Row>
        {#if uscitienoninviati > 0}
        <ListGroup style="margin-bottom:5px">
          <ListGroupItem color="danger">
                {#if uscitienoninviati != 1}
                <p>Ci sono {uscitienoninviati} bambini, il cui solito orario d'uscita è stato superato, probabilmente hanno lasciato l'aula e non è stato inviato il report.</p>
                {:else}
                <p>C'è {uscitienoninviati} bambino, il cui solito orario d'uscita è stato superato, probabilmente hanno lasciato l'aula e non è stato inviato il report.</p>
                {/if}
              </ListGroupItem>
          
        </ListGroup>
        {/if}
        {#if inviati<users.length}
        <SezioneStatistica infoO={[inviati,users.length]}/>
        {:else}
        <ListGroup style="margin-top:5px">
          <ListGroupItem color="success">
                Tutti i report risultano esser stati consegnati correttamente ai rispettivi genitori.
          </ListGroupItem>
          
        </ListGroup>
      
        {/if}
      </Card>
    </Fade>
    

  </CardBody>
  
</Card>  

  

{/if}
{/if}
{/if}
<svelte:head>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <!--<script type="module" src="/specific_page_js/tabellabambinisezione.js"></script>-->
  <style>
    #remove-btn{
    border: solid 7px red /* #41403e;*/
}
#remove-btn:hover{
    box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
    background-color:red;
    color: white;
}
    .defaultAvatar {
  border-radius: 50%;
  width:50px;
  height:50px;
}
  </style>
</svelte:head>