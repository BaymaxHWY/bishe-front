import Taro, { Component } from '@tarojs/taro'
import { View, Picker  } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Panle from '../../components/panle'
import api from '../../service/api'

import './index.scss'


class Index extends Component {

  constructor() {
    super()
    this.state = {
      position: ['Golang', 'PHP', 'C++'],
      selectorChecked: 'Golang'
    }
  }

  componentDidMount() {
    this.fetchPosition()
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
        selectorChecked: position[0]
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

  render () {
    let url = '/pages/exhibition/index' + `?position=` + this.state.selectorChecked
    let title = '语言选择'
    return (
      <View className='page-section'>
            <Panle title={title}/>
            <Picker mode='selector' range={this.state.position} onChange={this.onChange}>
            <View className='picker'>
                  <Text>当前选择：</Text>
                  <Text>{this.state.selectorChecked}</Text>
            </View>
            </Picker>
            <AtButton onClick={(e)=> this.handleClick(url, e)} circle={true} className='bt-sure'>确定</AtButton>
      </View>
    )
  }
}

export default Index
