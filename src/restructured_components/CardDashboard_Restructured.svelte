<script lang="ts">
    import { get_all_dirty_from_scope } from 'svelte/internal';
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
        <CardSubtitle> Impostazioni profilo </CardSubtitle>
        <CardText>Da questa sezione sarà possibile cambiare le proprie credenziali d'accesso.</CardText>
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
        <CardSubtitle> Gestisci bambini </CardSubtitle>
        <CardText>Da questa sezione sarà possibile cambiare le proprie credenziali d'accesso.</CardText>
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
        <CardSubtitle> Gestisci sezioni </CardSubtitle>
        <CardText>Da questa sezione sarà possibile gestire le sezioni dell'asilo nido e l'email dei rispettivi rappresentanti.</CardText>
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
        <CardSubtitle> Gestisci staff </CardSubtitle>
        <CardText>Da questa sezione sarà possibile gestire lo staff dell'asilo nido.</CardText>
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
        <CardSubtitle> Comunicazione ai genitori </CardSubtitle>
        <CardText>Da questa sezione sarà possibile cambiare le proprie credenziali d'accesso.</CardText>
    </CardBody>
    <CardFooter id="hd-card-footer">
        <a href="maestra/comunicazioni"><button class="hd-button">Invia comunicazione</button></a>
    </CardFooter >
</Card>
{/if}

<svelte:head>
    <link rel="stylesheet" href="../restructured_css/button.css">
    <link rel="stylesheet" href="../restructured_css/card.css">
    <link rel="stylesheet" href="../restructured_css/card_dashboard.css">
</svelte:head>