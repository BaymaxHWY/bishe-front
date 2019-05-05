import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TowBarChart from '../../components/chart/TowBarChart'
import Panle from '../../components/panle'
import api from '../../service/api'
import './index.scss'

export default class FinanceSalary extends Component {
      constructor(props) {
        super(props)
        this.state = {
          language: this.$router.params.language,
          financeSalary: '',
        }
      }
      config = {
          navigationBarTitleText: '公司融资与薪资分布分析'
      }

      componentDidMount() {
        this.fetchFinanceSalary()
      }
      componentDidUpdate() {
        this.setMoveChart(this.state.financeSalary, this.financeSalaryChart)
      }

      fetchFinanceSalary() {
        let that = this
        let url = 'financesalary/' + this.state.language
        api.get(url).then((res) => {
          that.setState({
            financeSalary: res.data.data
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

      financeSort(data) {
        let finance = [], list = []
        for(let i = 0; i < data[0].Data.length; i++) {
          list[i] = data[0].Data[i].Name
          finance[i] = 0
        }
        // console.log('list:', list)
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < data[i].Data.length; j++) {
            finance[j] += data[i].Data[j].Num
          }
        }
        let res = []
        for(let i = 0; i < finance.length; i++) {
          res [i] = {
            name: list[i],
            value: finance[i],
          }
        }
        res.sort((a, b) => a.value - b.value)
        console.log(res)
        return res
      }

      reffinanceSalaryChart = (node) => this.financeSalaryChart = node
    
      render() {
        let maxFinance1, maxFinance2, maxFinance3, minFinance1, minFinance2
        if(this.state.financeSalary != '') {
          let financeSort = this.financeSort(this.state.financeSalary)
          let len = financeSort.length
          maxFinance1 = financeSort[len-1].name
          maxFinance2 = financeSort[len-2].name
          maxFinance3 = financeSort[len-3].name
          minFinance1 = financeSort[0].name
          minFinance2 = financeSort[1].name
        }

        return (
          <View className='container'>
            {loading}
            <View className="move-chart">
              <Panle title='公司融资与薪资分布'/>
              <TowBarChart ref={this.reffinanceSalaryChart} />
            </View>
            <View className="at-article">
              <Panle title='数据描述'/>
              <View className='at-article__p'>
                从图中可以看出。[{maxFinance1}、{maxFinance2}、{maxFinance3}] 等情况的公司招聘需要较高。相较之下[{minFinance1}、{minFinance2}]中的公司招聘需求较低。
              </View>
            </View>
          </View>
        )
      }
}