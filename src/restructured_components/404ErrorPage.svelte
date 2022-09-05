<script>
    import ErrorCard from './404Card.svelte';
    import Navbar from './Navbar_Restructured.svelte';

</script>

<Navbar/>
<ErrorCard type={"pagina"}/>

<svelte:head>
    <link rel="stylesheet" href="/restructured_css/card.css">
</svelte:head>