<script lang="ts">
    import Hidden from './nested_components/Hidden.svelte';
    import Navbar_Restructured from '../../restructured_components/Navbar_Restructured.svelte';
    import ProvaTable from './nested_components/nested_table/ProvaTable.svelte';
    import {onMount} from 'svelte';
    import '../../lib/scripts/tabgestionebambini.ts';
    let child;

    import {
      Image,
      Card,
      CardBody,
      CardHeader,
      CardTitle,
      Container,Row,Col,
      Input
  } from 'sveltestrap';

export let usertype;

onMount(async () => {
  console.log(sessionStorage.getItem("bloccato"));
  if(sessionStorage.getItem("bloccato")){
    console.log("R");
    document.getElementById("lockunlockbtn").innerHTML='<i class="fa fa-unlock" aria-hidden="true"></i>SBLOCCA';
    for(let i=1;i<=6;i++){
      document.getElementById("checkbox"+i).disabled=true;
	  console.log(sessionStorage.getItem("sezione"+i));
      if(sessionStorage.getItem("sezione"+i) != "checked"){
        if(document.getElementById("checkbox"+i)!=null){
          
          document.getElementById("checkbox"+i).checked=false;
          if(document.getElementById("s"+i)!=null)
          document.getElementById("s"+i).style.display="none";
        }
      }
        
    }
  }
})
	
	
</script>

<main>
  {#if usertype == "Maestra"}
	<Navbar_Restructured/>
{/if}

  <Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
      <CardTitle id="card-title">Gestione bambini per sezione</CardTitle>
    </CardHeader>
    <CardBody>
  <Row>
    <Col>
      <Container class="main0">
        <Row>
          <Col>
          <Input id="checkbox1" type="checkbox" label="Cuccioli" checked/>
          </Col>
        </Row>
        <Row>
          <Col>
          <Input id="checkbox2" type="checkbox" label="Coccinelle" checked/>
          </Col>
        </Row>
        <Row>
          <Col>
          <Input id="checkbox3" type="checkbox" label="Orsetti" checked/>
          </Col>
        </Row>
        <hr class="rounded">
        <Row>
          <Col>
            <Input id="checkbox4" type="checkbox" label="Prima" checked/>
            </Col>
        </Row>
        <Row>
          <Col>
          <Input id="checkbox5" type="checkbox" label="Seconda" checked/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input id="checkbox6" type="checkbox" label="Terza" checked/>
            </Col>
        </Row>
        <Row>
          <button class="hd-button" id="lockunlockbtn"><i class="fa fa-lock" aria-hidden="true"></i>BLOCCA</button>
        </Row>
        
        
            
          
          
      </Container>
    </Col>

      <Col>
        <Container class="main2">
          <Col>
              <Row class="s1" id="s1">
      <Hidden id="hidden" name={"CUCCIOLI"}  bind:this={child} on:show={e => child.shown = e.detail}>
        <ProvaTable sezione={"Cuccioli"}/>
        
      </Hidden>
      </Row>
      <Row class="s2" id="s2">
      <Hidden name={"COCCINELLE"} bind:this={child} on:show={e => child.shown = e.detail}>
        <ProvaTable sezione={"Coccinelle"}/>
       </Hidden>
      </Row>
      <Row class="s3" id="s3">
       <Hidden name={"ORSETTI"} bind:this={child} on:show={e => child.shown = e.detail}>
        <ProvaTable sezione={"Orsetti"}/>
       </Hidden>
      </Row>
      <Row>
        <hr class="rounded">
      </Row>
      <Row class="s4" id="s4">
        <Hidden name={"PRIMA"} bind:this={child} on:show={e => child.shown = e.detail}>
          <ProvaTable sezione={"Prima"}/>
        </Hidden>
       </Row>
       <Row class="s5" id="s5">
        <Hidden name={"SECONDA"} bind:this={child} on:show={e => child.shown = e.detail}>
          <ProvaTable sezione={"Seconda"}/>
        </Hidden>
       </Row>
       <Row class="s6" id="s6">
        <Hidden name={"TERZA"} bind:this={child} on:show={e => child.shown = e.detail}>
          <ProvaTable sezione={"Terza"}/>
        </Hidden>
       </Row>
      </Col>
      </Container>
      </Col>
  </Row>

</CardBody>
</Card>
</main>
<svelte:head>
    <script>
$("#checkbox1").change(function() {
    if(this.checked) {
        $( ".s1" ).show();
        console.log("Unchecked");
    }else{
        $( ".s1" ).hide();
    }
});
$("#checkbox2").change(function() {
    if(this.checked) {
        $( ".s2" ).show();
        console.log("Unchecked");
    }else{
        $( ".s2" ).hide();
    }
});
$("#checkbox3").change(function() {
    if(this.checked) {
        $( ".s3" ).show();
        console.log("Unchecked");
    }else{
        $( ".s3" ).hide();
    }
});
$("#checkbox4").change(function() {
    if(this.checked) {
        $( ".s4" ).show();
        console.log("Unchecked");
    }else{
        $( ".s4" ).hide();
    }
});
$("#checkbox5").change(function() {
    if(this.checked) {
        $( ".s5" ).show();
        console.log("Unchecked");
    }else{
        $( ".s5" ).hide();
    }
});
$("#checkbox6").change(function() {
    if(this.checked) {
        $( ".s6" ).show();
        console.log("Unchecked");
    }else{
        $( ".s6" ).hide();
    }
});

    </script>
    
    <style>
      /*input[type=checkbox] {
        border: dashed 3px #41403e;
    outline: none;
    box-shadow: 20px 38px 34px -26px rgba(0, 0, 0, 0.2);
    color: #41403e;
    transition: all 0.5s ease;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}*/
.defaultAvatar {
  border-radius: 50%;
  width:50px;
  height:50px;
}
      .lastRow{
        display:block;
        margin:auto;
      }
      .cardHandleSection{
        display:block;
        margin-left:auto;
        margin-right:auto;
        max-width:1140px;
      }
      .mb-3{
        display:block;
        margin-left:auto;
        margin-right:auto;
      }
      .main1{
        display:block;
            margin-left:auto;
            margin-right:auto;
            max-width:800px;
            margin-top:20px;
      }
      .s1,.s2,.s3,.s4,.s5,.s6{
        margin:20px;
      }
     
      
    </style>
    <!--<script src="/specific_page_js/tabgestionebambini.js"></script>-->
    <link rel="stylesheet" href="/restructured_css/card.css">
</svelte:head>