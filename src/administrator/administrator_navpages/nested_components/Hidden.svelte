<script>
    import { createEventDispatcher } from 'svelte';

let shown = false;
    export let name = "Sezione";
    let dispatch = createEventDispatcher();

  export function show() {
    shown = !shown;
            dispatch('show', shown);
    }

</script>

<svelte:options accessors={true}/>

<button on:click={show}>{name}</button>

{#if shown}
<slot/>
{/if}