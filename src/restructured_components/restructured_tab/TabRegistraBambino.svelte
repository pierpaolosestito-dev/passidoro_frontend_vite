<script lang="ts">
    import {Container,Col,Row,Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardTitle,Image,Badge,Form,FormGroup,Input,InputGroup,InputGroupText,Label,Button} from 'sveltestrap';
   
    let radioGroup;

</script>

<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle id="hd-card-title">Registra nuovo bambino</CardTitle>
        <CardSubtitle>Dati inerenti al nuovo bambino:</CardSubtitle>
    </CardHeader>
    <CardBody>
        <!--Default avatar nel progetto Django in images-->
        <Image id="default-avatar" class="default-avatar" alt="default-avatar" src="/default-avatar.jpg"/>
        <Col>
            <Row id="row">
                <FormGroup floating>
                    <Input name="nome-bambino" id="nome-bambino" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Nome del bambino <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                      </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input name="cognome-bambino" id="cognome-bambino" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Cognome del bambino <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                      </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input type="date" name="data-bambino" id="data-bambino" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Data di nascita <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                      </div>
                </FormGroup>
            </Row>
            
            
            <Row id="row">
                <FormGroup floating>
                    <Input type="email" name="email-padre" id="email-padre" placeholder="Inserisci un valore:"/>
                    <div slot="label" id="label" >
                        Email del padre: <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                    </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input type="email" name="email-madre" id="email-madre" placeholder="Inserisci un valore:"/>
                    <div slot="label" id="label">
                        Email della madre: <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge>
                    </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input type="time" name="orario-bambino" id="orario-bambino" value="19:00" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label" >
                        Orario di uscita
                      </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <Label for="seleziona-sezione">SEZIONE: <Badge color="info" id="yl-badge">OBBLIGATORIO</Badge> </Label>
                <Input type="select" name="sezione" id="sezione">
                    <option>Cuccioli</option>
                    <option>Coccinelle</option>
                    <option>Orsetti</option>
                    <option disabled>_________</option>
                    <!--<option disabled><hr class="rounded"></option>-->
                    <option>Prima</option>
                    <option>Seconda</option>
                    <option>Terza</option>
                  </Input>
            </Row>
            <Row id="row">
                <Input type="file" placeholder="Inserisci un immagine del bambino" id="imageinput"/>
                <button class="hd-button" id="formatimg"><i class="fa fa-refresh" aria-hidden="true"></i>Reimposta avatar di default</button>
            </Row>
            <Row id="hidden-row">
                <Badge class="badgeEmails" pill color="#c00">Tutti i dati anagrafici sono obbligatori <br> Assicurati anche di aver inserito almeno una delle due e-mail</Badge>
            </Row>
            <Row id="row">
                <button style="display:block;margin:auto;max-width:180px" class="hd-button" id="registra-btn">Registra bambino <i class="fa fa-check" aria-hidden="true"></i></button>
            </Row>
            
        </Col>
    </CardBody>
</Card>

<svelte:head>
    <script type="module" src="/specific_page_js/tabregistrabambino.js"></script>
   
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/specific_page_css/tabregistrabambino.css">
 
    <script>
        console.log(document.getElementById('email-padre').validity.valid);
    </script>
</svelte:head>