import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MoveChart from '../../components/chart/MoveChart'
import HoriBarChart from '../../components/chart/HoriBarChart'
import Panle from '../../components/panle'
import api from '../../service/api'
import { AtActivityIndicator } from 'taro-ui'
import '@tarojs/async-await'
import './index.scss'

export default class Exhibition extends Component {
      constructor(props) {
        super(props)
        this.state = {
          language: this.$router.params.position,
          isloading: true,
          city: '',
          salary: '',
          company: '',
        }
      }
      config = {
          navigationBarTitleText: "招聘数据"
      }

      componentDidMount() {
        this.fetchCity()
        this.fetchSalary()
        this.fetchCompany()
      }
      componentDidUpdate() {
        this.setMoveChart(this.state.salary, this.SalaryChart)
        this.setMoveChart(this.state.city, this.CityChart)
        this.setMoveChart(this.state.company, this.CompanyChart, 10)
        if(this.state.isloading) {
          this.setState({
            isloading: false,
          })
        }
      }

      fetchCity() {
        let that = this
        let url = 'city/' + this.state.language
        api.get(url).then((res) => {
          that.setState({
            city: res.data.data
          })
        })
      }

      fetchSalary() {
        let that = this
        let url = 'salary/' + this.state.language
        api.get(url).then((res) => {
          let data = res.data.data, k = data.length - 1
          while(data[k--].Num == 0) data.length--
          that.setState({
            salary: data
          })
        })
      }

      fetchCompany() {
        let that = this
        let url = 'company/' + this.state.language
        api.get(url).then((res) => {
          that.setState({
            company: res.data.data
          })
        })
      }

      setMoveChart(data, chart, maxint = 20) {
        let Name = [], Num = []
        for(let i = 0; i < data.length && i < maxint; i++) {
          Name[i] = data[i].Name
        }
        for(let i = 0; i < data.length && i < maxint; i++) {
          Num[i] = data[i].Num
        }
        const chartData = {
          dimensions: {
            data: Name //['北京', '上海', '深圳', '广州', '武汉', '厦门', '海南','成都', '长沙', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          measures: [{
            data: Num
          }]
        }
        //console.log(chartData)
        chart.refresh(chartData)
      }

      refCityChart = (node) => this.CityChart = node
    
      refSalaryChart = (node) => this.SalaryChart = node

      refCompanyChart = (node) => this.CompanyChart = node
    
      render() {
        let loading
        if(this.state.isloading) {
          loading = <View className='loading'>
          <AtActivityIndicator size={50} color='#2d8cf0' content='loading...' />
        </View>
        }
        return (
          <View className='container'>
            {loading}
            <View className="move-chart">
              <Panle title='城市'/>
              <MoveChart ref={this.refCityChart} />
            </View>
            <View className="move-chart">
              <Panle title='工资'/>
              <HoriBarChart ref={this.refSalaryChart} />
            </View>
            <View className="move-chart">
              <Panle title='公司'/>
              <HoriBarChart ref={this.refCompanyChart} />
            </View>
          </View>
        )
      }
}