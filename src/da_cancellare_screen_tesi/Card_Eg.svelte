<script lang="ts">
    import {Card,CardHeader,CardTitle,CardBody,CardFooter,Image} from 'sveltestrap';
    import List from './nested_components/List.svelte';
    import List_CallsAPI from './nested_components/List_CallsAPI.svelte';
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
</script>
<Card id="example-card">
    <CardHeader style="background-color:white">
      <Image id="badge" src="../../favicon.png"></Image>
    </CardHeader>
    <CardBody>
        Svelte è un compilatore front-end gratuito e open source creato da Rich Harris e gestito dai membri del core team di Svelte
    </CardBody>
    <CardFooter style="background-color:white"><a id="link" href="pierpaolosestito.com">Voglio saperne di più</a></CardFooter>
  </Card>
<!--<Card id="example-card" class="mb-3">
    <CardHeader>
      <CardTitle>ESEMPIO CARD CON SVELTE</CardTitle>
    </CardHeader>
    <CardBody>
        
        <CardText>Tecnologie usate (FE-BE)</CardText>
            {#each used_technologies as ut}
                <li>{ut}</li>
            {/each}
           
        <CardText>Linguaggi di programmazione e di scripting</CardText> 
            {#each used_languages as ul}
                <li>{ul}</li>
            {/each}
            
        <CardText>Animazioni e librerie CSS</CardText> 
            {#each about_styling_n_animations as asna}
                <li>{asna}</li>
            {/each}
            
    </CardBody>
    <CardFooter>Sestito Pierpaolo</CardFooter>
  </Card>-->

<svelte:head>
  <style>
    #link{
        display:block;
margin-left:70px;
margin-right:auto;

    }
    #badge{
display:block;
margin-left:auto;
margin-right:auto;
vertical-align:middle;
width:100px;
height:100px;
border-radius:40%;
border-style:solid;
border-color:gray;
}
    #example-card{
display:block;
margin-left:auto;
margin-right:auto;
width:300px;
height:300px;
border-radius:10px 10px 10px 10px;
-webkit-box-shadow: 0 0 5px 2px #9fd0f7;
-moz-box-shadow: 0 0 5px 2px #9fd0f7;
box-shadow: 0 0 5px 2px #9fd0f7;
}
    li::marker{
        content : '💻';
    }
  </style>
</svelte:head>