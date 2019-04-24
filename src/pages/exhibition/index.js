import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MoveChart from '../../components/chart/MoveChart'
import LineChart from '../../components/chart/LineChart'
import Panle from '../../components/panle'
import './index.scss'

export default class Exhibition extends Component {
    config = {
        navigationBarTitleText: "可移动图表示例"
      };
      componentDidMount() {
        const chartData = {
          dimensions: {
            data: ['北京', '上海', '深圳', '广州', '武汉', '厦门', '海南','成都', '长沙', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          measures: [{
            data: [10, 52, 200, 334, 390, 330, 220, 334, 390, 330, 220, 10, 52, 510]
          }]
        }
        this.moveChart.refresh(chartData);
        this.lineChart.refresh(chartData);
      }
      refMoveChart = (node) => this.moveChart = node
    
      refLineChart = (node) => this.lineChart = node
    
      render() {
        return (
          <View className='container'>
            <View className="move-chart">
              <Panle title='城市分布'/>
              <MoveChart ref={this.refMoveChart} />
            </View>
            <View className="move-chart">
              <Panle title='工资分布'/>
              <LineChart ref={this.refLineChart} />
            </View>
          </View>
        );
      }
}