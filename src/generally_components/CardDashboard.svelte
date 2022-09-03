<script lang="ts">
    import {Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardText,CardTitle,Button,Image} from 'sveltestrap';
    export let usertype;
</script>

<main>
    {#if usertype == "User settings"}
    <Card class="mb-3">
        <CardHeader>
            <Image alt="icon" class="cardIcon" src="/dashboard_resources/dashboard_usersettings.png"/>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Impostazioni profilo</CardSubtitle>
        <CardText>
            Da questa sezione sarà possibile cambiare le proprie credenziali d'accesso.
          </CardText>
        </CardBody>
        <CardFooter>
            <Button class="btnDashboardCard">Impostazioni</Button>
        </CardFooter>
      </Card>
      {:else if usertype =="Section handler"}
      <Card class="mb-3">
        <CardHeader>
            <Image alt="icon" class="cardIcon" src="/dashboard_resources/child_add.png"/>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Gestione sezioni</CardSubtitle>
        <CardText>
          Da qui è possibile gestire i bambini già iscritti, rimuoverli o aggiornare la lista.
          </CardText>
        </CardBody>
        <CardFooter>
            <Button class="btnDashboardCard">Gestisci sezioni</Button>
        </CardFooter>
      </Card>
      {:else if usertype == "Children list"}
      <Card class="mb-3">
        <CardHeader>
            <Image alt="icon" class="cardIcon" src="/dashboard_resources/dashboard_usersettings.png"/>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Gestione bambini</CardSubtitle>
        <CardText>
            Da qui è possibile gestire i bambini già iscritti, rimuoverli o aggiornare la lista.
          </CardText>
        </CardBody>
        <CardFooter>
            <Button class="btnDashboardCard">Gestisci bambini</Button>
        </CardFooter>
      </Card>
      {:else if usertype == "Communication to parents"}
      <Card class="mb-3">
        <CardHeader>
            <Image alt="icon" class="cardIcon" src="/dashboard_resources/dashboard_usersettings.png"/>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Comunicazione ai genitori</CardSubtitle>
        <CardText>
            Da questa sezione sarà possibile mandare comunicazioni ai genitori.
          </CardText>
        </CardBody>
        <CardFooter>
            <Button class="btnDashboardCard">Invia comunicazione</Button>
        </CardFooter>
      </Card>
      {:else}
      <Card class="mb-3">
        <CardHeader>
            <Image alt="icon" class="cardIcon" src="/dashboard_resources/dashboard_usersettings.png"/>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Status figli</CardSubtitle>
        <CardText>
            Da questa sezione sarà possibile visualizzare lo status dei propri figli.
          </CardText>
        </CardBody>
        <CardFooter>
            <Button class="btnDashboardCard">Invia comunicazione</Button>
        </CardFooter>
      </Card>
    {/if}
</main>

<svelte:head>
  <style>
    .btnDashboardCard{
      background-color:#ffd700;
      color:#000000;
      font-weight:bold;

    }
  </style>
</svelte:head>