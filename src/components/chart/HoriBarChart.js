import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData(chart, data) {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
    },
    color: ['#3398DB'],
    grid: {
      left: '1%',
      right: '5%',
      bottom: '6%',
      top: '10%',
      containLabel: true
    },
    xAxis : [
      {
        type: 'value',
        boundaryGap: [0, 0.01],
      }
    ],
    yAxis : [
      {
        type : 'category',
        data: [],
      }
    ],
    series : []
  };
  if (data && data.dimensions && data.measures) {
    option.yAxis[0].data = data.dimensions.data
    option.series = data.measures.map(item => {
      return {
        ...item,
        type:'bar',
      }
    })
  }
  chart.setOption(option);
}

export default class PieChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id="mychart-area"
        ec={this.state.ec}
      />
    );
  }
}
