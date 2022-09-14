<script lang="ts">
    import {Badge,Row,Col} from 'sveltestrap';
    export let infoO=[];

    console.log("info",infoO);
</script>

<Col>
    <Row><Badge color="warning">REPORT MODIFICATI E INVIATI {infoO[0]} / {infoO[1]}:</Badge><progress id="file" value="{infoO[0]}" max="{infoO[1]}"> 32% </progress> </Row>
  </Col>

