import Taro, { Component } from '@tarojs/taro'
import { View, Picker  } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import { AtButton } from 'taro-ui'

import './index.scss'
import { func } from 'prop-types';


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  constructor() {
    super()
    this.state = {
      position: ['Golang', 'PHP', 'C++'],
      selectorChecked: 'Golang'
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
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
    return (
      <View className='page-section'>
            <Text className='page-title'>语言选择</Text>
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
