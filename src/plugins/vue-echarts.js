import Vue from 'vue'
import ECharts from 'vue-echarts'

//按需引入
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataset'
import 'echarts/lib/component/title'

Vue.component('v-chart', ECharts)