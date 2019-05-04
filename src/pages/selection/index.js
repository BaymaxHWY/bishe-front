import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtButton} from 'taro-ui'
import Panle from '../../components/panle'
import api from '../../service/api'

import './index.scss'


export default class Selection extends Component {

  constructor(props) {
    super(props)
    this.state = {
        language: this.$router.params.position,
      }
  }

  config = {
    navigationBarTitleText: "数据分析选择"
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(url) {
    console.log(url)
      Taro.navigateTo({
        url: url
      })
  }

  render () {
      let url1 = '/pages/analysis/citycompany' + `?language=` + this.state.language
      let url2 = '/pages/analysis/workyearsalary' + `?language=` + this.state.language
      let url3 = '/pages/analysis/financesalary' + `?language=` + this.state.language
    return (
      <View className='page-section'>
            <Panle title='分析选择'/>
            <AtButton onClick={()=> this.handleClick(url1)} circle={true} className='bt-sure'>城市分布分析</AtButton>
            <AtButton onClick={()=> this.handleClick(url2)} circle={true} className='bt-sure'>工作经历与薪资分布分析</AtButton>
            <AtButton onClick={()=> this.handleClick(url3)} circle={true} className='bt-sure'>公司融资与薪资分布分析</AtButton>
      </View>
    )
  }
}
