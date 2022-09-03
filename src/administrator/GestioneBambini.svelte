<script>
    import { TabContent, 
        TabPane,
        Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    FormGroup,
    Input,
Image } from 'sveltestrap';
      import TabBambiniExcel from '../restructured_components/restructured_tab/TabBambiniExcel.svelte';
      import TabRegistraBambino from '../restructured_components/restructured_tab/TabRegistraBambino.svelte';
    import RegistraBambino from './RegistraBambino.svelte';
    import Prova2 from './administrator_navpages/Prova2.svelte';
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';

    
   
	
  </script>

<main>
    <Navbar_Restructured/>
  <TabContent>
    <TabPane id="li" tabId="childrenList"  active>
      <span slot="tab" id="tab">
        Lista bambini
      </span>
      <Prova2/>
    </TabPane>
    <TabPane id="li" class="tabPane" tabId="importListChildren">
      <span slot="tab" id="tab">
        Importa lista bambino
      </span>
      <TabBambiniExcel/>  
      <!--<Card class="mb-3">
            <CardHeader>
              <CardTitle>Importa lista bambini da file Excel</CardTitle>
            </CardHeader>
            <CardBody>
                <Image alt="ExcelIcon" class="imgExcel" src="/excel.PNG" />
              <CardText>
                Da questa sezione sarà possibile importare un file Excel per velocizzare la registrazione di più bambini in una volta.
              </CardText>
              <FormGroup>
                <Input type="file" placeholder="Inserisci file Excel" id="excelfile-input" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                
              </FormGroup>
            </CardBody>
           
          </Card>-->
    </TabPane>
    <TabPane id="li" class="tabPane" tabId="addChild" >
      <span slot="tab" id="tab">
        Aggiungi bambino 
      </span>
      <TabRegistraBambino/>
    </TabPane>
  </TabContent>
</main>

<svelte:head>
    <style>
     #tab{
      font-weight:bold;
     }
        .mb-3{
            display:block;
            margin-left:auto;
            margin-right:auto;
            max-width:500px;
            margin-top:20px;
            
        }
        .imgExcel{
            display:block;
            margin-left:auto;
            margin-right:auto;
            width:130px;
            height:160px;
            
        }
    </style>
    <script src="https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js"></script>
    <link rel="stylesheet" href="../specific_page_css/gestione_bambini.css"/>
    <script>
      var input = document.getElementById("excelfile-input");
      input.addEventListener('change',function(){
        readXlsxFile(input.files[0]).then(function(data){
          console.log(data);
          
        });
      });
    </script>
</svelte:head>
