<script lang="ts">
    import {Container,Col,Row,Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardTitle,Image,Badge,Form,FormGroup,Input,InputGroup,InputGroupText,Label,Button} from 'sveltestrap';
    import '../../lib/scripts/tabregistrastaff.ts';
    let radioGroup;

</script>

<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle id="hd-card-title">Registra nuovo membro dello staff</CardTitle>
        <CardSubtitle>Dati inerenti al nuovo membro:</CardSubtitle>
    </CardHeader>
    <CardBody>
        <Image id="default-avatar" class="default-avatar" alt="default-avatar" src="../media_resources/loader_resources/cat_loader.gif"/>
        <Col>
            <Row id="row">
                <FormGroup floating>
                    <Input name="nome" id="nome" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Nome <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                      </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input name="cognome" id="cognome" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Cognome <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                      </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input type="email" name="email" id="email" placeholder="Inserisci un valore:"/>
                    <div slot="label" id="label" >
                        Email <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                    </div>
                </FormGroup>
            </Row>
            <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
            <Row id="row">
                
                <FormGroup floating>
                <InputGroup>
                    <InputGroupText>
                      <Input
              id="r1"
              type="radio"
              bind:group={radioGroup}
              value="Amministratore"
              name="permessi"
              label="AMMINISTRATORE"
            />
                    </InputGroupText>
                
                   
                    <InputGroupText>
                      <Input
                      id="r2"
                      type="radio"
                      name="permessi"
                      bind:group={radioGroup}
                      value="Maestra"
                      label="MAESTRA"
                    />
                      </InputGroupText>
                  
                      
                  </InputGroup>
                </FormGroup>
            </Row>
            
            <Row id="hidden-row">
                <Badge class="badgeEmails" pill color="#c00">Tutti i dati anagrafici sono obbligatori <br> </Badge>
            </Row>
            <Row id="row">
                <button style="display:block;margin:auto;max-width:180px" class="hd-button" id="registra-btn">Registra staff <i class="fa fa-check" aria-hidden="true"></i></button>
            </Row>
            
        </Col>
    </CardBody>
</Card>

<svelte:head>
    <!--<script type="module" src="/specific_page_js/tabregistrastaff.js"></script>-->
    <link rel="stylesheet" href="/restructured_css/button.css">
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/specific_page_css/tabregistrabambino.css">
   
  
</svelte:head>