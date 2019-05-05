import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TowBarChart from '../../components/chart/TowBarChart'
import Panle from '../../components/panle'
import api from '../../service/api'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

export default class CityCompany extends Component {
      constructor(props) {
        super(props)
        this.state = {
          language: this.$router.params.language,
          cityCompany: '',
          cityOrder: '',
        }
      }
      config = {
          navigationBarTitleText: '城市分布分析'
      }

      componentDidMount() {
        this.fetchCityCompany()
      }
      componentDidUpdate() {
        this.setMoveChart(this.state.cityCompany, this.cityCompanyChart)
      }

      fetchCityCompany() {
        let that = this
        let url = 'citycompany/' + this.state.language
        api.get(url).then((res) => {
          let citySort = this.citySort(res.data.data)
          that.setState({
            cityCompany: res.data.data,
            cityOrder: citySort,
          })
        })
      }

      citySort(data) {
        let cityOrder = []
        for(let i = 0; i < data.length; i++) {
          cityOrder[i] = {
            name: data[i].Name,
            value: data[i].Num1
          }
        }
        cityOrder.sort((a, b) => a.value - b.value)
        return cityOrder
      }

      setMoveChart(data, chart) {
        let legend1 = this.state.language + ' 工程师职位个数'
        let legend2 = '招聘 ' + this.state.language + ' 工程师的公司个数'
        let Name = [], Num1 = [], Num2 = []
        for(let i = 0; i < data.length; i++) {
          Name[i] = data[i].Name
        }
        for(let i = 0; i < data.length; i++) {
          Num1[i] = data[i].Num1
        }
        for(let i = 0; i < data.length; i++) {
          Num2[i] = data[i].Num2
        }
        const chartData = {
          legend: {
            data: [legend1, legend2]
          },
          dimensions: {
            data: Name
          },
          measures: [{
            data: Num1,
            name: legend1
          },
          {
            data: Num2,
            name: legend2
          }]
        }
        //console.log(chartData)
        chart.refresh(chartData)
      }

      refcityCompanyChart = (node) => this.cityCompanyChart = node
    
      render() {
        let maxcity1, maxcity2, maxcity3, mincity1, mincity2, maxInAll, lessStea
        if(this.state.cityOrder != '') {
          let len = this.state.cityOrder.length
          let a = 0, b = this.state.cityOrder[len-1].value + this.state.cityOrder[len-2].value + this.state.cityOrder[len-3].value
          for(let i = 0; i < len; i++) {
            a += this.state.cityOrder[i].value
          }
          maxInAll = (b / a) * 100
          maxInAll = maxInAll.toFixed(2) 
          maxcity1 = this.state.cityOrder[len-1].name
          maxcity2 = this.state.cityOrder[len-2].name
          maxcity3 = this.state.cityOrder[len-3].name
          mincity1 = this.state.cityOrder[0].name
          mincity2 = this.state.cityOrder[1].name
          if(this.state.cityOrder[0].value <= 100 && this.state.cityOrder[1].value <= 100) {
            lessStea = '招聘岗位数量较少的城市：' + mincity1 + '、' + mincity2
          }
        }
        
        return (
          <View className='container'>
            {loading}
            <View className="move-chart">
              <Panle title='城市分布'/>
              <TowBarChart ref={this.refcityCompanyChart}  className='an-chart'/>
            </View>
            <View className="at-article">
              <Panle title='数据描述'/>
              <View className='at-article__h3'>
                从图中可以看出。
              </View>
              <View className='at-article__h3'>
                招聘岗位数量较多的城市: {maxcity1}、{maxcity2}、{maxcity3}，占职位总数的{maxInAll}%。
              </View>
              <View className='at-article__h3'>
                {lessStea}
              </View>
            </View>
          </View>
        )
      }
}