<script lang="ts">
    import {Badge,Row,Col} from 'sveltestrap';
    export let infoO=[];

    console.log("info",infoO);
</script>

<Col>
    <Row><Badge color="warning">INVIATI:</Badge><progress id="file" value="{infoO[0]}" max="{infoO[1]}"> 32% </progress> </Row>
  </Col>

