<script>
import VueCharts from 'vue-chartjs';
import { HorizontalBar, mixins } from 'vue-chartjs';

export default {
  extends: HorizontalBar,
  props: ['chartData', 'options'],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
