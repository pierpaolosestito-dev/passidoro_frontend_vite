import {consts} from "../../src/lib/consts";



/*window.addEventListener("load",function(){
	var jQueryScript = document.createElement('script');
	jQueryScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
    jQueryScript.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11');
	document.head.appendChild(jQueryScript);
    
})*/

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