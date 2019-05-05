import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TowBarChart from '../../components/chart/TowBarChart'
import Panle from '../../components/panle'
import api from '../../service/api'
import './index.scss'

export default class WorkYearSalary extends Component {
      constructor(props) {
        super(props)
        this.state = {
          language: this.$router.params.language,
          workYearSalary: '',
        }
      }
      config = {
          navigationBarTitleText: '工作经历与薪资分布分析'
      }

      componentDidMount() {
        this.fetchWorkYearSalary()
      }
      componentDidUpdate() {
        this.setMoveChart(this.state.workYearSalary, this.workYearSalaryChart)
      }

      fetchWorkYearSalary() {
        let that = this
        let url = 'workyearsalary/' + this.state.language
        api.get(url).then((res) => {
          that.setState({
            workYearSalary: res.data.data
          })
        })
      }

      setMoveChart(data, chart) {
        let Name = [], measures = [], legend = []
        
        for(let i = 0; i < data[0].Data.length; i++) {
          Name[i] = data[0].Data[i].Name
        }
        for(let i = 0; i < data.length; i++) {
          legend[i] = data[i].Name
          measures[i] = {
              name: '',
              data: [],
          }
          measures[i].name = data[i].Name
          let d = []
          for(let j = 0; j < data[i].Data.length; j++) {
            d[j] = data[i].Data[j].Num
          }
          measures[i].data = d
        }
        const chartData = {
          legend: {
            data: legend
          },
          dimensions: {
            data: Name
          },
          measures: measures
        }
        chart.refresh(chartData)
      }

      getMaxWorkYear(data) {
        let workYear = [], list = []
        for(let i = 0; i < data[0].Data.length; i++) {
          list[i] = data[0].Data[i].Name
          workYear[i] = 0
        }
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < data[i].Data.length; j++) {
            workYear[j] += data[i].Data[j].Num
          }
        }
        let res = list[0], num = workYear[0]
        for(let i = 1; i < workYear.length; i++) {
          if(workYear[i] > num) {
            num = workYear[i]
            res = list[i]
          }
        }
        return res
      }

      refworkYearSalaryChart = (node) => this.workYearSalaryChart = node
    
      render() {
        let maxWorkyear, highSalary
        if(this.state.workYearSalary != '') {
          let data = this.state.workYearSalary
          maxWorkyear = this.getMaxWorkYear(data)
          let num = data[2].Data[0].Num
          highSalary = data[2].Data[0].Name
          for(let i = 0; i < data[2].Data.length; i++) {
            if(num < data[2].Data[i].Num) {
              num = data[2].Data[i].Num
              highSalary = data[2].Data[i].Name
            }
          }
        }
        return (
          <View className='container'>
            {loading}
            <View className="move-chart">
              <Panle title='工作经历与薪资分布'/>
              <TowBarChart ref={this.refworkYearSalaryChart} />
            </View>
            <View className="at-article">
              <Panle title='数据描述'/>
              <View className='at-article__p'>
              总体看来，大部分企业对应聘者的工作资历要求都在{maxWorkyear}，且工作资历在{highSalary}的更有可能获得高薪资20k以上。
              </View>
            </View>
          </View>
        )
      }
}