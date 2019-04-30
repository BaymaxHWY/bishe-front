import Taro, { Component } from '@tarojs/taro'
import { View, Picker  } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Panle from '../../components/panle'
import api from '../../service/api'
import PieChart from "../../components/chart/PieChart";

import './index.scss'


class Index extends Component {

  constructor() {
    super()
    this.state = {
      position: ['Golang', 'PHP', 'C++'],
      selectorChecked: 'Golang',
      data: '',
    }
  }

  config = {
    navigationBarTitleText: "首页"
  }

  componentDidMount() {
    this.fetchPosition()
  }

  componentDidUpdate() {
    let chartData = []
    let data = this.state.data
    for(let i = 0; i < data.length; i++){
      chartData[i] = {
        name: data[i].Name,
        value: data[i].Num,
      }
    }
    this.pieChart.refresh(chartData)
  }

  fetchPosition() {
    let that = this
    let url = 'language'
    api.get(url).then((res) => {
      let position = [], data = res.data.data
      for(let i = 0; i < data.length; i++){
        position[i] = data[i].Name
      }
      that.setState({
        position: position,
        selectorChecked: position[0],
        data: data
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(url, event) {
    console.log(url)
      Taro.navigateTo({
        url: url
      })
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.position[e.detail.value]
    })
  }

  refPieChart = (node) => this.pieChart = node

  render () {
    let url = '/pages/exhibition/index' + `?position=` + this.state.selectorChecked
    let title1 = '语言选择', title2 = '总览', title3 = '参考数据量', dataSum = 6149
    return (
      <View className='page-section'>
            <Panle title={title1}/>
            <Picker mode='selector' range={this.state.position} onChange={this.onChange}>
            <View className='picker'>
                  <Text>当前选择：</Text>
                  <Text>{this.state.selectorChecked}</Text>
            </View>
            </Picker>
            <AtButton onClick={(e)=> this.handleClick(url, e)} circle={true} className='bt-sure'>确定</AtButton>
            <Panle title={title2}/>
            <View className="pie-chart">
              <PieChart ref={this.refPieChart} />
            </View>
            <Panle title={title3}/>
            <View className='picker'>
                  <Text>已爬取数据：</Text>
                  <Text>{dataSum}条</Text>
            </View>
      </View>
    )
  }
}

export default Index
