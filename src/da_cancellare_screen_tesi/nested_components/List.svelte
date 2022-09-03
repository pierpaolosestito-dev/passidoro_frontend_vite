<script>
    const used_technologies = [
    'Svelte',
    'Django',
    'MySQL',
  ];
    const used_languages = [
        'JavaScript',
        'Python',
    ]

    const about_styling_n_animations = [
        'Sveltestrap and Sveltekit',
        'SweetAlert',
    ]

    export let list_type;
</script>

{#if list_type == "Tecnologie usate"}
            {#each used_technologies as ut}
                <li>{ut}</li>
            {/each}
{:else if list_type == "Linguaggi usati"}
            {#each used_languages as ul}
                <li>{ul}</li>
            {/each}
{:else if list_type == "Stile"}
            {#each about_styling_n_animations as asna}
                <li>{asna}</li>
            {/each}
{/if}
