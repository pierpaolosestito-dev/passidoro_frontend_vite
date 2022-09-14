import {consts} from "../consts";
import $ from 'jquery';


/*  _                             _                     _   _ _                 _            
 (_)                           | |                   | | (_) |               | |           
 _ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
 | '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
 | |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
 | .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
 | |               | |                                                                           
 |_|               |_|                                                                           
 */
$(document).on('click', '#edit-btn', function(){
   
    const table = document.getElementById("mytab");  

    
    const size = 12;
    const arraydatioff = []
   // let first_iteration=false;
    for(let i=0;(i+i+1)<size;i++){
        var k=i;
		
        var oggetto = {'Nome':table.getElementsByTagName("td")[i+i].innerText,"Email_Rappresentante":table.getElementsByTagName("td")[i+i+1].innerText}
        arraydatioff.push(oggetto);
        console.log("Nome",i+i);
        console.log("Email",i+i+1)
    }
    
    Swal.fire({
        title:"Caricamento in corso",
        imageUrl:"../media_resources/loader_resources/cat_loader.gif",
        didOpen: function(){
            axios({
                method:"put",
                url:consts.DOMAIN+"/sezione",
                data:arraydatioff,
                headers:{"Authorization":"Token " + sessionStorage.getItem("key")}
            }).then(response=>{
                console.log(response.data)
                if(response.data == "OK"){
                    swalAlert(1,"Operazione avvenuta con successo.<br> Se non hai apportato alcuna modifica, i dati rimarranno integri.");
                    setTimeout(function(){
                        location.reload()
                    },2000);
                    return;
                }else{
                    swalAlert(0,"L'operazione non è andata a buon fine.");
                }
            }).catch(function(err){
                swalAlertCONN_REF();
                return;
            });
        }});
    
   
    
    
    

});