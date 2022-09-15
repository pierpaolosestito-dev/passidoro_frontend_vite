<script lang="ts">
import {Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardText,CardTitle,Button,Image} from 'sveltestrap';
    export let usertype;

</script>
<!--IMPOSTAZIONI PROFILO CARD-->
{#if usertype == "Impostazioni profilo"}
<Card class="mb-3" id="hd-card">
    <CardHeader id="hd-card-header">
        <Image alt="icon" class="dashboard-icon" src="/media_resources/dashboard_resources/dashboard_usersettings_new2.PNG"/>
    </CardHeader>
    <CardBody>
        <CardSubtitle> <b>Impostazioni profilo </b> </CardSubtitle>
        <CardText><p align="center">Entra qui cambiare le credenziali d'accesso.</p></CardText>
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="impostazioniprofilo"><button class="hd-button">Impostazioni</button></a>
    </CardFooter>
</Card>
<!--GESTIONE BAMBINI CARD-->
{:else if usertype == "Gestione bambini"}
<Card class="mb-3" id="hd-card">
    <CardHeader id="hd-card-header">
        <Image alt="icon" class="dashboard-icon" src="/media_resources/dashboard_resources/dashboard_childrenhandler.PNG"/>
    </CardHeader>
    <CardBody>
        <CardSubtitle><b>Gestisci bambini</b></CardSubtitle>
        {#if sessionStorage.getItem("user") == "admin"}
        <CardText><p align="center">Entra qui per iscrivere e disiscrivere bambini, per visualizzare i rispettivi dati anagrafici, modificare ed inviare i loro report.</p></CardText>
        {:else}
        <CardText><p align="center">Entra qui per visualizzare i dati anagrafici dei bambini, modificare ed inviare i loro report.</p></CardText>
        {/if}
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="{sessionStorage.getItem("user")}/gestioneBambini"><button class="hd-button">Gestisci</button></a>
    </CardFooter>
</Card>

<!--AMMINISTRATORE CARD-->
<!--GESTIONE SEZIONI CARD-->
{:else if usertype == "Gestione sezioni"}
<Card class="mb-3" id="hd-card">
    <CardHeader id ="hd-card-header">
        <Image alt="icon" class="dashboard-icon" src="/media_resources/dashboard_resources/dashboard_sectionhandler.PNG"/>
    </CardHeader>
    <CardBody>
        <CardSubtitle><b>Gestisci sezioni</b></CardSubtitle>
        <CardText><p align="center">Entra qui per visualizzare e modificare i rappresentanti di ogni sezione.</p></CardText>
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="admin/gestioneSezioni2"><button class="hd-button">Gestisci</button></a>
    </CardFooter>
</Card>
{:else if usertype == "Gestione staff"}
<Card class="mb-3" id="hd-card">
    <CardHeader id ="hd-card-header">
        <Image alt="icon" class="dashboard-icon" src="/media_resources/dashboard_resources/dashboard_sectionhandler.PNG"/>
    </CardHeader>
    <CardBody>
        <CardSubtitle><b>Gestisci staff</b></CardSubtitle>
        <CardText><p align="center">Entra qui per gestire i dipendenti del polo d'infanzia.</p></CardText>
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="admin/gestioneStaff"><button class="hd-button">Gestisci</button></a>
    </CardFooter>
</Card>


<!--MAESTRA CARD-->
{:else if usertype == "Comunicazione ai genitori"}
<Card class="mb-3" id="hd-card">
    <CardHeader id="hd-card-header">
        <Image alt="icon" class="dashboard-icon" src="/media_resources/dashboard_resources/dashboard_email_icon_2.PNG"/>
    </CardHeader>
    <CardBody>
        <CardSubtitle><b>Comunicazione ai genitori</b></CardSubtitle>
        <CardText><p align="center">Entra qui per inviare una comunicazione ai genitori di una sezione o semplicemente al rappresentante.</p></CardText>
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="maestra/comunicazioni"><button class="hd-button">Invia comunicazione</button></a>
    </CardFooter >
</Card>
{/if}

<svelte:head>
    <link rel="stylesheet" href="/restructured_css/button.css">
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/restructured_css/card_dashboard.css">
</svelte:head>