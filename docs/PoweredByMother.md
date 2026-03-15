<script setup>
import PoweredByMotherItem from '../../components/PoweredByMother/PoweredByMotherItem.vue'
import PoweredByMotherGrids from '../../components/PoweredByMother/PoweredByMotherGrids.js'
</script>

# Powered By Mother

This section showcases some of the best grids that utilize the Mother OS script to run their operations. If you are using Mother OS, show it off by completing this [short questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?usp=dialog).
<br>
<br>

<div style="display: flex; flex-wrap: wrap; gap: 1rem; flex-direction: column;">
    <PoweredByMotherItem v-for="(grid, index) in PoweredByMotherGrids" :key="index" :item="grid"/>
</div>

<!-- <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?embedded=true" height="1225" frameborder="0" marginheight="0" marginwidth="0" style="width: 100%">Loading…</iframe> -->
