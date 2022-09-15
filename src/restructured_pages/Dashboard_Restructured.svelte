<script lang="ts">
    import {Col,Container,Row,Card,CardHeader,CardBody,CardTitle} from 'sveltestrap';
    import CardDashboard_Restructured from '../restructured_components/CardDashboard_Restructured.svelte';
    
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    export let usertype;
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
    <Card class="mb-3" id="hd-card-2">
        {#if usertype == "Amministratore"}
        <CardHeader id="hd-card-header-2"><CardTitle id="card-title"><b>DASHBOARD AMMINISTRATORE</b></CardTitle></CardHeader>
        {:else}
        <CardHeader id="hd-card-header-2"><CardTitle id="card-title"><b>DASHBOARD MAESTR@</b></CardTitle></CardHeader>
        {/if}
    <CardBody>
        <Row>
            {#if usertype == "Amministratore"}
            <Col>
                <CardDashboard_Restructured usertype={"Gestione bambini"}/>
            </Col>
            <Col>
                <CardDashboard_Restructured usertype={"Gestione sezioni"}/>
            </Col>
            <Col>
                <CardDashboard_Restructured usertype={"Gestione staff"}/>
            </Col>
            <Col>
                <CardDashboard_Restructured usertype={"Impostazioni profilo"}/>
            </Col>
            {:else if usertype == "Maestra"}
            <Col>
                <CardDashboard_Restructured usertype={"Gestione bambini"}/>
            </Col>
            <Col>
                <CardDashboard_Restructured usertype={"Comunicazione ai genitori"}/>
            </Col>
            <Col>
                <CardDashboard_Restructured usertype={"Impostazioni profilo"}/>
            </Col>
            {/if}
        </Row>
    </CardBody>
    </Card>
    
</main>

<svelte:head>
    <link rel="stylesheet" href="/restructured_css/navbar.css">
    <link rel="stylesheet" href="/restructured_css/card.css">
  </svelte:head>