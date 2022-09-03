<script>
    //import {array} from 'store.js';
    import {Container,Row,Col,Button,Image} from 'sveltestrap';
let array = [
    {name:'Pierpaolo',surname:'Sestito',age:14,emailPadre:'example@email.com'},
    {name:'Mario',surname:'Alviano',age:14,emailPadre:'example@email.com'},
    {name:'Pierpaolo',surname:'Sestito',age:14,emailPadre:'example@email.com'}];
</script>


<main>
    {#each array as item}
    <Container class="childCard">
    <Row>
    <Col><Image id="defaultAvatar" class="defaultAvatar" alt="defaultAvatar" src="https://t3.ftcdn.net/jpg/01/28/56/34/360_F_128563455_bGrVZnfDCL0PxH1sU33NpOhGcCc1M7qo.jpg"/></Col>
    <Col><p class="paragraph">{item.name}</p></Col>
    <Col><p class="paragraph">{item.surname}</p></Col>
    <Col><p class="paragraph">{item.age}</p></Col>
    <Col><p class="paragraph">{item.emailPadre}</p></Col>
    <Col><Button class="btn">ELIMINA</Button></Col>
    <Col><Button class="btn">MODIFICA</Button></Col>
    </Row> 
    </Container>
{/each}
</main>

<svelte:head>
    <style>
        .paragraph{
            margin-top:10px;
        }
        .defaultAvatar{
          display:block;
          margin-left:auto;
          margin-right:auto;
          vertical-align:middle;
          width:50px;
          height:50px;
          border-radius:50%;
      }
        .childCard{
            margin-top:10px;
            border-style:solid;
            border-radius:10px;
            border-color:#ffd700;
            background-color:#1a9dc5;
        }
        .btn{
              margin-top:8px;
              background-color:#1a9dc5;
              border-style:solid;
              border-color:#ffd700;
              font-weight:bold;
              color:#ffd700;
          }
          .btn:hover{
              background-color:#c00;
          }
    </style>
</svelte:head>