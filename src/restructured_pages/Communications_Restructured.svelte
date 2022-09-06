<script lang="ts">
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    import {Container,Card,CardHeader,CardTitle,CardBody,FormGroup,Label,Input,Alert,InputGroup,Button,Row,Col,FormText} from 'sveltestrap';
    import '../lib/scripts/comunicazioni.ts';
</script>

<Navbar_Restructured/>
<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle>Invia comunicazione importante</CardTitle> 
    </CardHeader>
    <CardBody>
        <Col>
            <Row id="row">
                <Label for="sezione-select">SEZIONE: </Label>
                <Input type="select" name="sezione-select" id="sezione-select" value="SEZIONE">
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

            <Row id="hidden-row">
                <Alert color="warning">
                    <Input type="checkbox" id="solo-rappresentante" label="Invia solo al rappresentante della sezione"/>
                </Alert>
            </Row>
            <Row id="row">
                <FormGroup floating>
                    <Input type="text" id="oggetto" placeholder="Inserisci un valore"/>
                    <div slot="label" id="label">
                        OGGETTO DELLA COMUNICAZIONE:
                    </div>
                </FormGroup>
            </Row>
            <Row id="row">
                <FormText muted>Inserisci qua il messaggio desiderato</FormText>
            </Row>
            <Row id="row-2">
                <Input type="textarea" name="text" id="messaggio"/>
            </Row>
            <Row>
                <button style="display:block;margin:auto;max-width:180px" id="send-btn" class="hd-button">Invia comunicazione <i class="fa fa-envelope" aria-hidden="true"></i></button>
            </Row>
        </Col>
    </CardBody>
</Card>

<svelte:head>
    <!--<script type="module" src="/specific_page_js/comunicazioni.js"></script>-->
    <link rel="stylesheet" href="/restructured_css/card.css">
    <link rel="stylesheet" href="/specific_page_css/comunicazioni.css">
</svelte:head>