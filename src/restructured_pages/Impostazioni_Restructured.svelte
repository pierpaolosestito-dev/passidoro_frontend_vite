<script lang="ts">
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    import {Container,Card,CardBody,CardHeader,CardTitle,CardSubtitle,FormText,Col,Row,Image,Badge,Button,InputGroup,InputGroupText,Input} from 'sveltestrap';
    import {onMount} from 'svelte';
    //import "../lib/scripts/impostazioni_profilo.ts";

  
 
  onMount(async () => {
    document.getElementById('email-personale').innerHTML=localStorage.getItem('email');
    });
</script>

<Navbar_Restructured/>
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle id="card-title">Impostazioni profilo</CardTitle>
    </CardHeader>
    <CardBody>
        <Col>
            <Row>
                <p id="email-personale">Email personale</p>
            </Row>
            <Row id="hidden-row">
                <InputGroup class="ciao">
                    <InputGroupText style="max-height:38px;"><i class="fa-solid fa-envelope"></i></InputGroupText>
                    <Input id="nuova-email" type="email" placeholder="INSERISCI NUOVA EMAIL" required/>
                  </InputGroup>
            </Row>
            <Row id="row1">
                <InputGroup class="ciao">
                    <InputGroupText style="max-height:38px;"><i class="fa-solid fa-key"></i></InputGroupText>
                    <Input id="vecchia-password" type="password" placeholder="VECCHIA PASSWORD" required/>
                  </InputGroup>
                </Row>
                                     <Row id="row">
                    <InputGroup class="ciao">
                        <InputGroupText style="max-height:38px;"><i class="fa-solid fa-key"></i></InputGroupText>
                        <Input id="nuova-password" type="password" placeholder="NUOVA PASSWORD" required/>
                      </InputGroup>
                    </Row>
                                 <Row id="row">
                        <InputGroup class="ciao">
                            <InputGroupText style="max-height:38px;"><i class="fa-solid fa-key"></i></InputGroupText>
                            <Input id="ripeti-nuova-password" type="password" placeholder="RIPETI NUOVA PASSWORD" required/>
                          </InputGroup>
                          <FormText id="togglePassword2"><i class="fa-solid fa-eye-slash" id="icon2"></i> Clicca qua per vedere la password in chiaro</FormText>
                        </Row>
                                        <!--<Row id="row">
                                           <Container id="container-btn"> <button class="hd-button" id="edit-btn">Modifica e-mail</button></Container>
                                        </Row>-->
                                        <Row id="row">
                                            <Container id="container-btn"><button class="hd-button" id="confirm-btn">Conferma modifiche <i class="fa fa-refresh" aria-hidden="true"></i></button></Container>
                                        </Row>
        </Col>
    </CardBody>
</Card>

<svelte:head>
    <script>
        const togglePassword2 = document.querySelector("#togglePassword2");
        const icon = document.querySelector("#icon2");
        const old_password = document.querySelector("#vecchia-password");
        const password = document.querySelector("#nuova-password");
        const password_repeated = document.querySelector("#ripeti-nuova-password");
  
        togglePassword2.addEventListener("click", function () {
           
            if(password.getAttribute("type") == "password"){
                password.setAttribute("type","text");
                old_password.setAttribute("type","text");
                password_repeated.setAttribute("type","text");
            }else{
                password.setAttribute("type","password");
                old_password.setAttribute("type","password");
                password_repeated.setAttribute("type","password");
            }
            /*const type = password.getAttribute("type") === "password" ? "text" : "password";
            old_password.setAttribute("type", type);
            password.setAttribute("type", type);
            password_repeated.setAttribute("type", type);
            
            console.log(type);*/
            if(password.getAttribute("type")=="text"){
                icon.className = "fa-solid fa-eye";
            }else{
                icon.className = "fa-solid fa-eye-slash";
            }
           
            
        });
    </script>
    <script type="module" src="/specific_page_js/impostazioni_profilo.js"></script>
    <link rel="stylesheet" href="/restructured_css/card.css"/>
    <link rel="stylesheet" href="/specific_page_css/impostazioni.css"/>
</svelte:head>