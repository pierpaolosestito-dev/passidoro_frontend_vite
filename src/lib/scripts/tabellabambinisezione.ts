import {consts} from "../consts";
import $ from 'jquery';
/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
  jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
	document.head.appendChild(jQueryScript);
  
    
})*/
$(document).on('click', '#excel-btn', function(){
    axios({method:"get",url:consts.DOMAIN+"/bambini",headers:{"CUSTOM-OPTION":$('#tabellabambini').attr('name'),"Authorization":"Token " + sessionStorage.getItem("key")}}).then(response=>{
        console.log(response.data);
        var arrayofjsonmodified = []
        for(let i=0;i<response.data.length;i++){
            var object = {"NOME":response.data[i]['Nome'],"COGNOME":response.data[i]['Cognome'],"EMAIL_GENITORE1":response.data[i]['Email_Genitore1'],"EMAIL_GENITORE2":response.data[i]['Email_Genitore2'],"DATA_DI_NASCITA":response.data[i]['Data_di_nascita'],"NOME_SEZIONE":response.data[i]['NomeSezione']}
            arrayofjsonmodified.push(object);
        }
        var wb=XLSX.utils.book_new();
        var today = new Date();
        wb.Props = {
            Title:$('#tabellabambini').attr('name')+" il "+today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear(),
            Subject:$('#tabellabambini').attr('name')+" il "+today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear(),
            Author:"Passi d'oro",
            CreatedDate:new Date()
        };
        wb.SheetNames.push("FOGLIO1");
        var ws_data = [['NOME','COGNOME',"EMAIL_GENITORE1","EMAIL_GENITORE2","DATA_DI_NASCITA","NOME_SEZIONE"]]
        //var ws = XLSX.utils.aoa_to_sheet(ws_data);
        var ws2 = XLSX.utils.json_to_sheet(arrayofjsonmodified);
        var wscols=[{
            wpx:150
        }]
        console.log(ws2);
        
        //wb.Sheets["FOGLIO1"]=ws;
        wb.Sheets["FOGLIO1"]=ws2;
        wb['Sheets']["FOGLIO1"]["!cols"]=[{wpx:149},{wpx:149},{wpx:149},{wpx:149},{wpx:149},{wpx:149}];
        var wbout = XLSX.write(wb,{bookType:'xlsx',type:'binary'});

        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),$('#tabellabambini').attr('name')+"-"+today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear()+".xlsx");
    })
})
function s2ab(s){
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for(var i=0;i<s.length;i++)view[i]=s.charCodeAt(i) & 0xFF;
    return buf;
}
$(document).on('click', '#remove-btn', function(){

    Swal.fire({
        title: '<div style="background-color:#fff">Vuoi veramente eliminare tutti i bambini?</div>',
        showDenyButton: true,
        denyButtonText: `Elimina`,
        confirmButtonText: 'Annulla',
        background:'url("../media_resources/alert_resources/alert_background.jpg")'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title:'<div style="background-color:#fff">Nessun bambino verr?? eliminato!</div>', 
            icon:'success',
            background:'url("../media_resources/alert_resources/alert_background.jpg")'});
        } else if (result.isDenied) {
            
            Swal.fire({
                title:'<div style="background-color:#fff">Inserisci la password.</div>', 
                icon:'info',
                input:'password',
                background:'url("../media_resources/alert_resources/alert_background.jpg")',
                preConfirm:(password)=>{
                    Swal.fire({
                        title:"Caricamento in corso",
                        imageUrl:"../media_resources/loader_resources/cat_loader.gif",
                        didOpen: function(){
                            axios({
                                method:"post",
                                url:consts.DOMAIN+"/verifica_password",
                                data:{"password":password},
                                headers:{"Authorization":"Token " + sessionStorage.getItem("key")}
                            }).then(response=>{
                                if(response.data == "Password verificata"){
                                    axios({
                                        method:"delete",
                                        url:consts.DOMAIN+"/bambini/"+$('#tabellabambini').attr('name').toLowerCase(),
                                        headers:{"Authorization": "Token " + sessionStorage.getItem("key")}
                                    }).then(response=>{
                                        if(response.data == "Bambini eliminati con successo"){
                                            swalAlert(1,"Operazione avvenuta con successo.");
                                            setTimeout(function(){
                                                location.reload();
                                            },1200);
                                            return;
                                        }else{
                                        swalAlert(0,response.data);
                                        }
                                        return;
                                    }).catch(function(err){
                                        swalAlertCONN_REF();
                                        return;
                                    })
                                }
                                swalAlert(0,response.data);
                                return;

                            }).catch(function(err){
                                swalAlertCONN_REF();
                                return;
                            })




                    
                }})
                },
                background:'url("../media_resources/alert_resources/alert_background.jpg")'});
              
            
  
            
              }
            });
    /**/








//FINE ONCLICK
 });
 $(document).on('click', '#send-all-updated', function(){
    Swal.fire({
        title: '<div style="background-color:#fff">Sei sicuro di voler inviare tutti i report, senza prima dargli una occhiata?</div>',
        showDenyButton: true,
        denyButtonText: `Invia`,
        denyButtonColor:"green",
        confirmButtonText: 'Annulla',
        background:'url("../media_resources/alert_resources/alert_background.jpg")'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title:'<div style="background-color:#fff">Rimani loggato nel sistema!</div>', 
            icon:'success',
            background:'url("../media_resources/alert_resources/alert_background.jpg")'});
        } else if (result.isDenied) {
            console.log("Clicked");
            axios({
                method:"post",
                url:consts.DOMAIN+"/invia_tutti_report/",
                headers:{"Authorization":"Token " + sessionStorage.getItem("key"),"CUSTOM-OPTION":$('#tabellabambini').attr('name')}
            }).then(response=>{
                console.log(response);
                if(response.data == "OK"){
                    swalAlert(1,"Tutti i report sono stati inviati correttamente.");
                    setTimeout(function(){
                        location.reload();
                    },1200);
                    return;
                }
                if(response.data=="NO"){
                    swalAlert(0,"Non ci sono report modificati da inviare.");
                    return;
                }
            }).catch(function(err){
                swalAlertCONN_REF();
                return;
            })
              
              
            
  
            
              }
            });
 });
 /*  _                             _                     _   _ _                 _            
 (_)                           | |                   | | (_) |               | |           
 _ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
 | '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
 | |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
 | .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
 | |               | |                                                                           
 |_|               |_|                                                                           
 */