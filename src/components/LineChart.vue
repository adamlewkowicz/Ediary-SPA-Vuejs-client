<script>
import VueCharts from 'vue-chartjs';
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartData', 'options'],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>

