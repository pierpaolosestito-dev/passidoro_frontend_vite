<script lang="ts">
    import { Image, Col, Container, Row , Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardText,CardTitle,Button} from 'sveltestrap';
    import CardDashboard from './CardDashboard.svelte';
    
    export let usertype;
</script>


<main>
    
      <Container class ="container">
        <Row>
            {#if usertype == "Amministratore"}
          <Col>
            <CardDashboard usertype={"Children list"}/>
          </Col>
          <Col>
            <CardDashboard usertype={"Section handler"}/>
        </Col>
          <Col>
            <CardDashboard usertype={"User settings"}/>
        </Col>
    {:else if usertype == "Maestra"}
    <Col>
        <CardDashboard usertype={"Children list"}/>
      </Col>
      <Col>
        <CardDashboard usertype={"Communication to parents"}/>
    </Col>
      <Col>
        <CardDashboard usertype={"User settings"}/>
    </Col>
    {:else}
    <Col>
      <CardDashboard usertype={"A"}/>
    </Col>
    <Col>
      <CardDashboard usertype={"User settings"}/>
    </Col>
        {/if} 
        </Row>
</Container>
</main>
<svelte:head>
    <style>
        .container{

            margin-top:100px;
            background-color:#1a9dc5;
        }
        .cardIcon{
          display:block;
          margin-left:auto;
          margin-right:auto;
          vertical-align:middle;
          width:50px;
          height:50px;
          border-radius:50%;
        }

    </style>
</svelte:head>