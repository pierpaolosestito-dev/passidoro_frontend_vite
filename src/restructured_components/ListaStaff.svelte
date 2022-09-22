<script lang="ts">
    export let type;
    import axios from 'axios';
    import {Spinner,ListGroup,ListGroupItem,Row,Col,Image} from 'sveltestrap';
    import {onMount} from 'svelte';
    import ErrorCard from './404Card.svelte';
    import {consts} from "../lib/consts";
    
    let result = []
    let error404=false;
    let calledOnMount = false;
    onMount(async () => {
        axios({method:'get',url:consts.DOMAIN+'/staff',headers:{'CUSTOM-OPTION':type,'Authorization':'Token ' + sessionStorage.getItem("key")}}).then(response=>{
            console.log(response.data);
            result=response.data;
            calledOnMount=true;
        }).catch(function(err){
            error404=true;
        })

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

{#if result.length == 0 && !error404 && !calledOnMount}
<Spinner style="display:block;margin-left:auto;margin-right:auto;vertical-align:middle;margin-top:20px" color="{colors[Math.floor(Math.random()*colors.length)]}" type="grow" />
{:else if error404}
<ErrorCard/>
{:else if result.length == 0 && !error404 && calledOnMount}
<p>Non ci sono utenti</p>
{:else}
{#each result as user}
<ListGroup style="display:block;margin:auto">
    <ListGroupItem color="info">
        <Row>
            {#if type}
            <Image id="badge" src="../media_resources/staff_resources/staff_admin.png"/>
            {:else}
            <Image id="badge" src="../media_resources/staff_resources/staff_teacher.png"/>
            {/if}
            
            <Col>
                {user.first_name}
            </Col>
            <Col>
                {user.last_name}
            </Col>
            
            <Col style="margin-left:5px">
                {#if user.email != sessionStorage.getItem("email")}
                <a href="/admin/profiloStaff?ID={user.id}"> <button class="hd-button">PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {:else}
                <a href="/admin/profiloStaff?ID={user.id}" disabled> <button class="hd-button" disabled>PROFILO <i class="fa fa-user" aria-hidden="true"></i></button></a>
                {/if}
            </Col>
        </Row>
    </ListGroupItem>
    </ListGroup>
{/each}
{/if}