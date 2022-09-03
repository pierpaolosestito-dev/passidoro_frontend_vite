<script lang="ts">
    import {Card,CardHeader,CardTitle,CardSubtitle,CardBody,CardFooter,Image} from 'sveltestrap';
    export let type;
</script>


{#if type=="pagina"}
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle>Awwwww....</CardTitle>
      <CardSubtitle>Accesso negato!</CardSubtitle>
    </CardHeader>
    <CardBody id="special-card-body">
        <Image id="special-404" src="../media_resources/error_resources/904_error.jpg"/>
        
    </CardBody>
    <CardFooter id="hd-card-footer-3">
        <button id="indietrobtn" class="hd-button">Torna indietro</button>
    </CardFooter>
</Card>
{:else}
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle>Awwwww....</CardTitle>
      <CardSubtitle>Sembra mancare qualcosa!</CardSubtitle>
    </CardHeader>
    <CardBody id="special-card-body">
        <Image id="special-404" src="../../404_errorcard.png"/>
        
    </CardBody>
</Card>
{/if}
<svelte:head>
    <script src="./specific_page_js/404errorpage.js"></script>
    <script src="../specific_page_js/404errorpage.js"></script>
    <style>
        /*#special-card-body{
             background-image: url("../media_resources/error_resources/904_error.jpg");
            background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
        }*/
        #special-404{
            max-width: 100%;
    max-height: 100%;
    display:block;
    margin:auto;
    
            
        }
        .hd-button{
            display:block;
            margin:auto;
        }
    </style>
</svelte:head>