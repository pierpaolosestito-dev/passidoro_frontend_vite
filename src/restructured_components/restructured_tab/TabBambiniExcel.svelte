<script lang="ts">


    import {Card,CardHeader,CardTitle,CardBody,Image,CardText,Input,Fade,Button} from 'sveltestrap';
    let isOpen = false;
</script>

<Card class="mb-3" id="hd-card-3">
    <CardHeader id="hd-card-header-3">
        <CardTitle id="card-title">Importa lista bambini da file Excel</CardTitle>
    </CardHeader>
    <CardBody>
        <Image alt="excel-icon" class="img-excel" src="/media_resources/dashboard_resources/excel.PNG"/>
        <CardText>
            Da questa sezione sarà possibile...
        </CardText>
        <span height=50px></span>
        <Input type="file" placeholder="Inserisci file Excel" id="excelfile-input" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        <button style="display:block;margin:auto" on:click={() => (isOpen = !isOpen)} class="hd-button">
            Come funziona? <i class="fa fa-question-circle" aria-hidden="true"></i>
        </button>
          <Fade {isOpen}>
            <Card body>
                
                    
                        <li class="listFade">Se hai un file Excel contenente le informazioni dei bambini puoi fare l'upload direttamente da qui sopra e permettere al sistema che registri ogni singolo bambino.<br> Cosa succede se alcuni bambini sono già inseriti?</li>
                        <li class="listFade2">Il sistema cerca di ignorare i bambini già esistenti confrontando alcune informazioni (es:Nome,Cognome,Sezione,Data di nascita ed una delle due email registrate). Se le informazioni risultano uguali, il sistema ignorerà quel bambino.</li>
                        <li class="listFade3">Nota bene: puoi usare questa feature se devi registrare più bambini al posto di eseguire l'operazione singolarmente per ognuno di essi.</li>
                        <li class="listFade3">Importante: se modifichi un dato del bambino, in particolare quelli sopra elencati, per far sì che il sistema funzioni correttamente bisogna apportare le modifiche anche sul foglio Excel, alla riga relativa al bambino soggetto a modifiche.</li>
                        <li class="listFade3">Altrimenti: genera un nuovo foglio Excel con i dati giusti direttamente dal sistema cliccando su "Scarica foglio Excel"</li>
                        <li class="listFade">PUOI ANCHE INSERIRE UN FOGLIO EXCEL CONTENENTE TUTTI I BAMBINI, NON DIVISI PER SEZIONE, IL SISTEMA LI SMISTERA' NEL MODO CORRETTO.</li>
              
                
            </Card>
          </Fade>
    </CardBody>
</Card>

<svelte:head>
    <style>
        .listFade::marker,.listFade2::marker{
            content:'👶';
            font-size:20px;
        }
        .listFade3::marker{
            content:'💡';
        }
        .listFade2,.listFade3{
            margin-left:10px;
        }
    </style>
    <link rel="stylesheet" href="../restructured_css/card.css"/>
    <link rel="stylesheet" href="../tab_css/tab_excel.css"/>
    <!--Da aggiungere lo script-->
    <script src="https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js"></script>
    <script type="module" src="../specific_page_js/tabbambiniexcel.js"></script>
</svelte:head>