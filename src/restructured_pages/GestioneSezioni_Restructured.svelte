<script lang="ts">
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    import {Spinner,Card,CardHeader,CardTitle,CardBody,Row,Col,Table} from 'sveltestrap';
    import CardSezioneRestructured from '../restructured_components/CardSezione_Restructured.svelte';
    import ErrorCard from '../restructured_components/404Card.svelte';
    import { onMount , afterUpdate} from 'svelte';
	import {Column, Icon } from 'sveltestrap';
	import axios, { Axios} from 'axios';
  import {consts} from "../lib/consts";


    let search = undefined;
  let users=[]
  let error404=false;
	$: visibleUsers = search ?
		users.filter(user => {
			return user.Nome.match(`${search}.*`) || user.Cognome.match(`${search}.*`)
		}) : users;

    const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark'
  ];
	onMount(async () => {
    try{
		const resp = await axios({
      method:'get',
      url:consts.DOMAIN+'/sezione',
      headers:{"Authorization":"Token " + sessionStorage.getItem("key")}
    });
		
		users = resp.data;
    
    console.log(users);
  }catch(err){
    error404=true;
    console.log("errore");
  }

    
	});


</script>
<Navbar_Restructured/>
{#if users.length == 0 && !error404}
<Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
{:else}
{#if error404}
<ErrorCard/>
{:else}

<Card class="mb-3" id="hd-card-2">
    <CardHeader id="hd-card-header-2">
        <CardTitle id="card-title">Gestione sezioni</CardTitle>
    </CardHeader>
    <CardBody>
      
        <Table responsive striped rows={visibleUsers} let:row={user} id="mytab">
              <Column header="NOME">
                
                {user.Nome}
              </Column>
              
              <Column header="EMAIL RAPPRESENTANTE ">
                <Row>
                <i contenteditable=false class="icon-pencil-22 "></i><p contenteditable>{user.Email_Rappresentante}</p>
              </Row>
              </Column>
             
          </Table>
<!--<Table hover id="mytab">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td><div contenteditable>Mark</div></td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>-->
  <button class="hd-button" id="edit-btn">Conferma modifiche <i class="fa fa-refresh" aria-hidden="true"></i></button>
        <!--<CardSezioneRestructured sezione={"Coccinelle"}/>
        <CardSezioneRestructured sezione={"Lupacchiotti"}/>-->
        
        <!--<Card class="mb-3" id="hd-card">
            <CardHeader id="hd-card-header">
                <CardTitle id="card-title">Nome sezione</CardTitle>
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
        </Card>-->

    </CardBody>
</Card>
{/if}
{/if}
<svelte:head>
    
    <link rel="stylesheet" href="/restructured_css/card.css"/>
    <link rel="stylesheet" href="/restructured_css/button.css"/>
    <link rel="stylesheet" href="/specific_page_css/gestione_sezioni.css"/>
    <script type="module" src="/specific_page_js/gestionesezioni.js"></script>
    
</svelte:head>
