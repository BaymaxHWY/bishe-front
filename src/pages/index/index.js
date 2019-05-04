import Taro, { Component } from '@tarojs/taro'
import { View, Picker  } from '@tarojs/components'
import { AtButton, AtTabBar  } from 'taro-ui'
import Panle from '../../components/panle'
import api from '../../service/api'
import PieChart from "../../components/chart/PieChart"

import './index.scss'


class Index extends Component {

  constructor() {
    super()
    this.state = {
      position: ['Golang', 'PHP', 'C++'],
      selectorChecked: 'Golang',
      data: '',
      dataSum: 0,
      current: 0,
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
      let position = [], dataSum = 0, data = res.data.data

      for(let i = 0; i < data.length; i++){
        position[i] = data[i].Name
        dataSum += data[i].Num
      }

      that.setState({
        position: position,
        selectorChecked: position[0],
        data: data,
        dataSum: dataSum,
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

  handleClickRe(url, event) {
    console.log(url)
      Taro.redirectTo({
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
    let url = '/pages/selection/index' + `?position=` + this.state.selectorChecked
    let compareUrl = '/pages/compare/index'
    return (
      <View className='page-section'>
            <Panle title='语言选择'/>
            <Picker mode='selector' range={this.state.position} onChange={this.onChange}>
            <View className='picker'>
                  <Text>当前选择：</Text>
                  <Text>{this.state.selectorChecked}</Text>
            </View>
            </Picker>
            <AtButton onClick={(e)=> this.handleClick(url, e)} circle={true} className='bt-sure'>确定</AtButton>
            <Panle title='总览'/>
            <View className="pie-chart">
              <PieChart ref={this.refPieChart} />
            </View>
            <Panle title='参考数据量'/>
            <View className='picker'>
                  <Text>已爬取数据：</Text>
                  <Text>{dataSum}条</Text>
            </View>
            <AtTabBar
              fixed
              tabList={[
                { title: '数据展示', iconType: 'home' },
                { title: '数据比较', iconType: 'list' },
                // { title: '文件夹', iconType: 'folder', text: '100', max: '99' }
              ]}
              onClick={(e)=> this.handleClickRe(compareUrl, e)}
              current={this.state.current}
            />
      </View>
    )
  }
}

export default Index
