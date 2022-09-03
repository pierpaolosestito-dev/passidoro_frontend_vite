<script lang="ts">
    import Hidden from './nested_components/Hidden.svelte';
    import Navbar_Restructured from '../../restructured_components/Navbar_Restructured.svelte';
    import ProvaTable from './nested_components/nested_table/ProvaTable.svelte';
    let child;

    import {
      Image,
      Card,
      CardBody,
      CardHeader,
      CardTitle,
      Container,Row,Col,
      Input
  } from 'sveltestrap';

export let usertype;

import { onMount} from 'svelte';
	import {Table, Column, Badge } from 'sveltestrap';
  import SezioneStatistica from './nested_components/SezioneStatistica.svelte';
	import axios from 'axios';
	let search = undefined;
  let users=[]
	/*$: visibleUsers = search ?
		users.filter(user => {
			return user.Nome.match(`${search}.*`) || user.Cognome.match(`${search}.*`)
		}) : users;*/
    $: visibleUsers = search ?
		users.filter(user => {
			return user.Nome.match(`${search}.*`) || user.Cognome.match(`${search}.*`)
		}) : users;
    let modificati  = 0;
    let inviati = 0;
    let modificatinoninviati = 0;
	onMount(async () => {
    /*const resp = await fetch('https://randomuser.me/api?results=25')
		const data = await resp.json();
		users = data.results;
		console.log(users);*/
		const resp = await axios({
      method:'get',
      url:'http://127.0.0.1:8000/bambinixreportsezione',
    headers:{"CUSTOM-OPTION":"Coccinelle"}});
		
		users = resp.data;
    
    for(let i=0;i<users.length;i++){
      console.log(i,users[i]["Modificato"])
      if(users[i]["Modificato"] == 1)
        modificati+=1;
      if(users[i]["Inviato"]==1)
        inviati+=1;
      if(users[i]["Modificato"] == 1 && users[i]["Inviato"]==0)
        modificatinoninviati+=1;
    }
    console.log(users);

    
	});

  function deleteRow(rowToBeDeleted) {
   console.log(rowToBeDeleted.name.first);
	
    users = users.filter(row => row != rowToBeDeleted);
}


	
</script>

<main>
  {#if usertype == "Maestra"}
	<Navbar_Restructured/>
{/if}

  <Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle id="card-title">Gestione bambini per sezione</CardTitle>
    </CardHeader>
    <CardBody>
  <Row>
    <Col>
      <Container class="main0">
        <Row>
          <Col>
          <Input id="checkbox1" type="checkbox" label="1" checked/>
          </Col>
          <Col>
          <Input id="checkbox2" type="checkbox" label="2" checked/>
          </Col>
        </Row>
        <Row>
          <Col>
          <Input id="checkbox3" type="checkbox" label="3" checked/>
          </Col>
          <Col>
            <Input id="checkbox4" type="checkbox" label="4" checked/>
            </Col>
        </Row>
        <Row>
          <Col>
          <Input id="checkbox5" type="checkbox" label="5" checked/>
          </Col>
          <Col>
            <Input id="checkbox6" type="checkbox" label="6" checked/>
            </Col>
        </Row>
        
        
            
          
          
      </Container>
    </Col>

      <Col>
        <Container class="main2">
          <Col>
              <Row class="s1">
      <Hidden id="hidden" name={"SEZIONE 1"}  bind:this={child} on:show={e => child.shown = e.detail}>
        <Card>
          <CardHeader>
            <Input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" />
          </CardHeader>
          <CardBody>
            <Table responsive striped rows={visibleUsers} let:row={user}>
              <Column header="Avatar">
                <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile/{user.Avatar}"/>
              </Column>
                <Column header="Nome">
                  {user.Nome}
                </Column>
                <Column header="Cognome">
                  {user.Cognome}
                </Column>
               
                <Column header="Profilo">
                  <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
                </Column>
                <Column header="Report">
                  <button class="hd-button">=></button>
                </Column>
                <Column header="Inviato">
                  {#if user.Inviato == true}
                  <Input type="checkbox" checked disabled/>
                  {:else}
                  <Input type="checkbox" disabled/>
                  {/if}
                </Column>
                <Column header="Modificato">
                  {#if user.Modificato == true}
                  <Input type="checkbox" checked disabled/>
                  {:else}
                  <Input type="checkbox" disabled/>
                  {/if}
                </Column>
            </Table>
          </CardBody>
        </Card>  
        <!--<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>-->
          <!--<Card>
            <CardHeader>
              <Input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Nome o cognome" />
            </CardHeader>
            <CardBody>
              
              
              <Table responsive striped rows={visibleUsers} let:row={user}>
                <Column header="Avatar">
                  <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile/{user.Avatar}"/>
                </Column>
                  <Column header="Nome">
                    {user.Nome}
                  </Column>
                  <Column header="Cognome">
                    {user.Cognome}
                  </Column>
                 
                  <Column header="Profilo">
                    <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
                  </Column>
                  <Column header="Report">
                    <button class="hd-button">=></button>
                  </Column>
                  <Column header="Inviato">
                    {#if user.Inviato == true}
                    <Input type="checkbox" checked disabled/>
                    {:else}
                    <Input type="checkbox" disabled/>
                    {/if}
                  </Column>
                  <Column header="Modificato">
                    {#if user.Modificato == true}
                    <Input type="checkbox" checked disabled/>
                    {:else}
                    <Input type="checkbox" disabled/>
                    {/if}
                  </Column>
              </Table>
              <SezioneStatistica infoO={[inviati,modificati,modificatinoninviati,users.length]}/>
              
            </CardBody>
          </Card>-->
      </Hidden>
      </Row>
      <Row class="s2">
      <Hidden name={"SEZIONE 2"} bind:this={child} on:show={e => child.shown = e.detail}>
        <Table responsive striped rows={visibleUsers} let:row={user}>
          <Column header="Avatar">
            <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile"/>
          </Column>
            <Column header="Nome">
              {user.Nome}
            </Column>
            <Column header="Cognome">
              {user.Cognome}
            </Column>
           
            <Column header="Profilo">
              <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
            </Column>
            <Column header="Report">
              <button class="hd-button">=></button>
            </Column>
            <Column header="Inviato">
              {#if user.Inviato == true}
              <Input type="checkbox" checked disabled/>
              {:else}
              <Input type="checkbox" disabled/>
              {/if}
            </Column>
            <Column header="Modificato">
              {#if user.Modificato == true}
              <Input type="checkbox" checked disabled/>
              {:else}
              <Input type="checkbox" disabled/>
              {/if}
            </Column>
        </Table>
       </Hidden>
      </Row>
      <Row class="s3">
       <Hidden name={"SEZIONE 3"} bind:this={child} on:show={e => child.shown = e.detail}>
        <Table responsive striped rows={visibleUsers} let:row={user}>
          <Column header="Avatar">
            <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile"/>
          </Column>
            <Column header="Nome">
              {user.Nome}
            </Column>
            <Column header="Cognome">
              {user.Cognome}
            </Column>
           
            <Column header="Profilo">
              <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
            </Column>
            <Column header="Report">
              <button class="hd-button">=></button>
            </Column>
            <Column header="Inviato">
              {#if user.Inviato == true}
              <Input type="checkbox" checked disabled/>
              {:else}
              <Input type="checkbox" disabled/>
              {/if}
            </Column>
            <Column header="Modificato">
              {#if user.Modificato == true}
              <Input type="checkbox" checked disabled/>
              {:else}
              <Input type="checkbox" disabled/>
              {/if}
            </Column>
        </Table>
       </Hidden>
      </Row>
      <Row class="s4">
        <Hidden name={"SEZIONE 4"} bind:this={child} on:show={e => child.shown = e.detail}>
          <Table responsive striped rows={visibleUsers} let:row={user}>
            <Column header="Avatar">
              <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile"/>
            </Column>
              <Column header="Nome">
                {user.Nome}
              </Column>
              <Column header="Cognome">
                {user.Cognome}
              </Column>
             
              <Column header="Profilo">
                <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
              </Column>
              <Column header="Report">
                <button class="hd-button">=></button>
              </Column>
              <Column header="Inviato">
                {#if user.Inviato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
              <Column header="Modificato">
                {#if user.Modificato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
          </Table>
        </Hidden>
       </Row>
       <Row class="s5">
        <Hidden name={"SEZIONE 5"} bind:this={child} on:show={e => child.shown = e.detail}>
          <Table responsive striped rows={visibleUsers} let:row={user}>
            <Column header="Avatar">
              <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile"/>
            </Column>
              <Column header="Nome">
                {user.Nome}
              </Column>
              <Column header="Cognome">
                {user.Cognome}
              </Column>
             
              <Column header="Profilo">
                <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
              </Column>
              <Column header="Report">
                <button class="hd-button">=></button>
              </Column>
              <Column header="Inviato">
                {#if user.Inviato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
              <Column header="Modificato">
                {#if user.Modificato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
          </Table>
        </Hidden>
       </Row>
       <Row class="s6">
        <Hidden name={"SEZIONE 6"} bind:this={child} on:show={e => child.shown = e.detail}>
          <Table responsive striped rows={visibleUsers} let:row={user}>
            <Column header="Avatar">
              <Image id="defaultAvatar" class="defaultAvatar" src="http://127.0.0.1:8000/testingfile"/>
            </Column>
              <Column header="Nome">
                {user.Nome}
              </Column>
              <Column header="Cognome">
                {user.Cognome}
              </Column>
             
              <Column header="Profilo">
                <a href="/profiloBambino2?ID={user.ID}"> <button class="hd-button">=></button></a>
              </Column>
              <Column header="Report">
                <button class="hd-button">=></button>
              </Column>
              <Column header="Inviato">
                {#if user.Inviato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
              <Column header="Modificato">
                {#if user.Modificato == true}
                <Input type="checkbox" checked disabled/>
                {:else}
                <Input type="checkbox" disabled/>
                {/if}
              </Column>
          </Table>
        </Hidden>
       </Row>
      </Col>
      </Container>
      </Col>
  </Row>
  
 <!--- <Card class="cardHandleSection">
    <CardHeader>
  <Button color="primary" on:click={() => (isOpen = !isOpen)} class="mb-3">
    Gestisci sezioni:
  </Button>
</CardHeader>-->
  
 <!--<Fade {isOpen}> 
    <CardBody>-->
      

<!--</CardBody> 
</Fade>
</Card>-->
</CardBody>
</Card>
</main>
<svelte:head>
    <script>
$("#checkbox1").change(function() {
    if(this.checked) {
        $( ".s1" ).show();
        console.log("Unchecked");
    }else{
        $( ".s1" ).hide();
    }
});
$("#checkbox2").change(function() {
    if(this.checked) {
        $( ".s2" ).show();
        console.log("Unchecked");
    }else{
        $( ".s2" ).hide();
    }
});
$("#checkbox3").change(function() {
    if(this.checked) {
        $( ".s3" ).show();
        console.log("Unchecked");
    }else{
        $( ".s3" ).hide();
    }
});
$("#checkbox4").change(function() {
    if(this.checked) {
        $( ".s4" ).show();
        console.log("Unchecked");
    }else{
        $( ".s4" ).hide();
    }
});
$("#checkbox5").change(function() {
    if(this.checked) {
        $( ".s5" ).show();
        console.log("Unchecked");
    }else{
        $( ".s5" ).hide();
    }
});
$("#checkbox6").change(function() {
    if(this.checked) {
        $( ".s6" ).show();
        console.log("Unchecked");
    }else{
        $( ".s6" ).hide();
    }
});

    </script>
    
    <style>
      /*input[type=checkbox] {
        border: dashed 3px #41403e;
    outline: none;
    box-shadow: 20px 38px 34px -26px rgba(0, 0, 0, 0.2);
    color: #41403e;
    transition: all 0.5s ease;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}*/
.defaultAvatar {
  border-radius: 50%;
  width:50px;
  height:50px;
}
      .lastRow{
        display:block;
        margin:auto;
      }
      .cardHandleSection{
        display:block;
        margin-left:auto;
        margin-right:auto;
        max-width:1140px;
      }
      .mb-3{
        display:block;
        margin-left:auto;
        margin-right:auto;
      }
      .main1{
        display:block;
            margin-left:auto;
            margin-right:auto;
            max-width:800px;
            margin-top:20px;
      }
      .s1,.s2,.s3,.s4,.s5,.s6{
        margin:20px;
      }
     
      
    </style>
    
    <link rel="stylesheet" href="../restructured_css/card.css">
</svelte:head>