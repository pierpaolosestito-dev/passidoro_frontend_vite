<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from '../../store';
    
    onMount(async () => {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
      .then(response => response.json())
      .then(data => {
            console.log(data);
        apiData.set(data);
      }).catch(error => {
        console.log(error);
        return [];
      });
    });
    </script>
    
    <main>
        <h1>Whiskey Drinks Menu</h1>
        <ul>
        {#each $drinkNames as drinkName}
            <li>{drinkName}</li>
        {/each}
        </ul>
    </main>
    
    <style>
    
    </style>