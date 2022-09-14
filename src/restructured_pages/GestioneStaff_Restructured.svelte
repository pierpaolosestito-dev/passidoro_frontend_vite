<script lang="ts">
    import Navbar_Restructured from '../restructured_components/Navbar_Restructured.svelte';
    import TabRegistraStaff from '../restructured_components/restructured_tab/TabRegistraStaff.svelte';
    import {TabContent,TabPane} from 'sveltestrap';
    
    import TabListaStaff from '../restructured_components/restructured_tab/TabListaStaff.svelte';
</script>

<Navbar_Restructured/>
<TabContent>
    <TabPane id="li" tabId="childrenList"  active>
      <span slot="tab" id="tab">
        Lista staff
      </span>
    <TabListaStaff/>

    </TabPane>
    
    <TabPane id="li" class="tabPane" tabId="addChild" >
      <span slot="tab" id="tab">
        Aggiungi membro dello staff 
      </span>
      
      <TabRegistraStaff/>

    </TabPane>
  </TabContent>

<svelte:head>
    <link rel="stylesheet" href="/specific_page_css/gestione_staff.css"/>
</svelte:head>

<!-- 

_                             _                     _   _ _                 _            
(_)                           | |                   | | (_) |               | |           
_ __  _  ___ _ __ _ __   __ _  ___ | | ___  ___  ___  ___| |_ _| |_ ___ ______ __| | _____   __
| '_ \| |/ _ \ '__| '_ \ / _` |/ _ \| |/ _ \/ __|/ _ \/ __| __| | __/ _ \______/ _` |/ _ \ \ / /
| |_) | |  __/ |  | |_) | (_| | (_) | | (_) \__ \  __/\__ \ |_| | || (_) |    | (_| |  __/\ V / 
| .__/|_|\___|_|  | .__/ \__,_|\___/|_|\___/|___/\___||___/\__|_|\__\___/      \__,_|\___| \_/  
| |               | |                                                                           
|_|               |_|                                                                           
 -->