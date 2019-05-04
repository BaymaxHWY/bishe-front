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
          that.setState({
            cityCompany: res.data.data
          })
        })
      }

      setMoveChart(data, chart) {
        let legend1 = this.state.language + '工程师职位个数'
        let legend2 = '招聘' + this.state.language + '工程师的公司个数'
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
        return (
          <View className='container'>
            {loading}
            <View className="move-chart">
              <Panle title='城市分布'/>
              <TowBarChart ref={this.refcityCompanyChart}  className='an-chart'/>
            </View>
            <View className="at-article">
              <Panle title='数据描述'/>
              <View className='at-article__p'>
                从图中可以看出，招聘岗位数量最多的前五名分别为北京、上海、深圳、杭州、广州（排名分先后），占职位总数的83%。其中，北京在xxx岗位开放的职位数量和公司数量都远远多于其他城市，职位数量差不多是上海的2倍，深圳的3倍，杭州、广州的5倍，公司数量差不多是上海的2倍，深圳的3倍，杭州、广州的4倍。杭州和广州在数据分析岗位开放的职位数量和公司数量基本持平。
              </View>
            </View>
          </View>
        )
      }
}