<script lang="ts">
    import {Container,Spinner,Card,CardHeader,CardTitle,CardBody,ListGroup,ListGroupItem,Row,Col,Image} from 'sveltestrap'
    import ListaStaff from '../ListaStaff.svelte';
    import Hidden from '../../administrator/administrator_navpages/nested_components/Hidden.svelte';
    let child;
    /*import axios from 'axios';
    import {onMount} from 'svelte';
    import ErrorCard from '../404Card.svelte';
    let result_superuser = [];
    let result_user = []
    let superaticatch = false;
    let error404_1 = false;
    let error404_2 = false;
    let mountedIsCalled = false;
    setTimeout(() => {
            
        }, 5);
    onMount(async () => {
        mountedIsCalled=true;
        
        try {
            console.log("I'm trying")
        
        
        axios.all([ 
            
            axios({method:'get',url:'http://127.0.0.1:8000/staff',headers:{'CUSTOM-OPTION':true,'Authorization':'Token ' + sessionStorage.getItem("key")}}).catch(function(err){
                console.log("AAAA");
                error404_1=true;
            }),
            
            axios({method:'get',url:'http://127.0.0.1:8000/staff',headers:{'CUSTOM-OPTION':false,'Authorization':'Token ' + sessionStorage.getItem("key")}}).catch(function(err){
                error404_2=true;
                console.log("BBB");
            })
 ])
 .then(axios.spread((data1, data2) => {
   // output of req.
   
   console.log('data1', data1.data, 'data2', data2.data);
   result_superuser = data1.data;
   result_user = data2.data;
   console.log(result_superuser.length);
   superaticatch=true;
   console.log(result_user.length);
   console.log(superaticatch);
   console.log(error404_1);
   console.log("mountedisCalledinMount",mountedIsCalled)
 }));
        } catch (e) {
            console.log("errore",e);
            
        }
    });
    
    console.log("mountedisCalled",mountedIsCalled)
    const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark'
  ];
  */
</script>
<Card class="mb-3" id="hd-card">
    <CardHeader id="hd-card-header">
        <CardTitle id="hd-card-title">Lista staff</CardTitle>

    </CardHeader>
    <CardBody>
        <Row style="margin:auto;display:block;margin-right:30px;margin-left:10px">
        <Hidden style="margin-left:10" name={"Amministratori"} bind:this={child} on:show={e => child.shown = e.detail}>
            <Card id="hd-card-2">
            <ListaStaff type={true}/>
        </Card>
          </Hidden>
        </Row>
    <!--{#if result_superuser.length==0 && !error404_1 && !superaticatch}
    <Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
    {:else if error404_1}
    <ErrorCard/>
    {:else}
    {#if result_superuser.length == 0 && superaticatch && !error404_1}
    <p>Non ci sono amministratori <i class="fa fa-frown-o" aria-hidden="true"></i></p>
    {:else}
    {#each result_superuser as su}
    <ListGroup>
    <ListGroupItem color="info">
        <Row>
            
            <Image id="badge" src="../media_resources/staff_resources/staff_admin.png"/>
            
            <Col>
                {su.first_name}
            </Col>
            <Col>
                {su.last_name}
            </Col>
            
            <Col style="margin-left:5px">
                {#if su.email != sessionStorage.getItem("email")}
                <a href="/admin/profiloStaff?ID={su.id}"> <button class="hd-button">PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {:else}
                <a href="/admin/profiloStaff?ID={su.id}" disabled> <button class="hd-button">PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {/if}
            </Col>
        </Row>
    </ListGroupItem>
    </ListGroup>
    {/each}
{/if}
{/if}-->
    <hr class="rounded">
    <Row style="margin:auto;display:block;margin-right:30px;margin-left:10px">

    <Hidden name={"Maestr@"} bind:this={child} on:show={e => child.shown = e.detail}>
        <Card id="hd-card-2">
        <ListaStaff type={false}/>
        </Card>
      </Hidden>
    </Row>
   <!--{#if result_user.length==0 && !error404_1 && !superaticatch}
    <Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
    {:else if error404_1}
    <ErrorCard/>
    {:else}
    {#if result_user.length == 0 && superaticatch && !error404_1}
    <p>Non ci sono maestre <i class="fa fa-frown-o" aria-hidden="true"></i></p>
    {:else}
    {#each result_user as u}
    <ListGroup>
    <ListGroupItem color="warning">
        <Row>
            
            <Image id="badge" src="../media_resources/staff_resources/staff_teacher.PNG"/>
            
            <Col>
                {u.first_name}
            </Col>
            <Col>
                {u.last_name}
            </Col>
            
            <Col style="margin-left:5px">
                {#if u.email != sessionStorage.getItem("email")}
                <a href="/admin/profiloStaff?ID={u.id}"> <button class="hd-button">PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {:else}
                <a href="/admin/profiloStaff?ID={u.id}" disabled> <button class="hd-button" disabled>PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {/if}
            </Col>
        </Row>
    </ListGroupItem>
    </ListGroup>
    {/each}
    {/if}
    {/if}-->
    </CardBody>
</Card>

<svelte:head>
    <style>
        li{
            list-style-image : url("../../favicon.png");
        }
        li::marker{
            font-size: 10.5rem;
        }
        #badge{
            max-width:80px;
            max-height:80px;
            border-radius:50%;
        }
        hr.rounded {
            border-top: 8px solid #bbb;
            border-radius: 5px;
        }
    </style>
   
    <link rel="stylesheet" href="/restructured_css/button.css">
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/specific_page_css/tabregistrabambino.css">
 </svelte:head>
  
