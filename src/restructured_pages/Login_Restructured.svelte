<script lang="ts">
    import Navbar_Restructured from "../restructured_components/Navbar_Restructured.svelte"
    import {Container,Row,Card,CardBody,CardFooter,CardHeader,Alert,CardTitle,FormText,InputGroup,Input,InputGroupText,Image,Form,} from 'sveltestrap';
    //import '../lib/scripts/login.ts';
</script>

<Navbar_Restructured/>

<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3"><Image src="/media_resources/dashboard_resources/login_icon.PNG" class="badgeIcon"></Image></CardHeader>
    <CardBody>
        
           <Row id="row">
              <InputGroup class="ciao">
                  <InputGroupText style="max-height:38px;"><i class="fa-solid fa-envelope"></i></InputGroupText>
                  <Input id="email" type="email" placeholder="email"/>
                </InputGroup>
              </Row>
          <Row id="row">
            <InputGroup>
                <InputGroupText style="max-height:38px;"><i class="fa-solid fa-key"></i></InputGroupText>
                <Input id="password" type="password" placeholder="password"/>
              </InputGroup>
              <FormText id="togglePassword2"><i class="fa-solid fa-eye-slash" id="icon2"></i> Clicca qua per vedere la password in chiaro</FormText>
            </Row>
        <Row id="row">
          <button id="enter-btn" class="hd-button">ENTRA <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        </Row>
     
    </CardBody>
    <CardFooter id="hd-card-footer-3"><Alert color='warning'>Se hai smarrito la password, o non riesci ad entrare nel sistema <a href="recuperapassword">clicca qua <i class="fas fa-hand-point-left"></i></a> </Alert></CardFooter>
</Card>

<svelte:head>
    
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/specific_page_css/login.css">
    <script type="module" src="/specific_page_js/login.js"></script>
    <style>
        .ciao{
            border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        }
    </style>
    <script>
        const togglePassword2 = document.querySelector("#togglePassword2");
        const icon = document.querySelector("#icon2");
        const password = document.querySelector("#password");
  
        togglePassword2.addEventListener("click", function () {
           
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            
            if(type=="text"){
                icon.className = "fa-solid fa-eye";
            }else{
                icon.className = "fa-solid fa-eye-slash";
            }
           
            
        });
    </script>
</svelte:head>