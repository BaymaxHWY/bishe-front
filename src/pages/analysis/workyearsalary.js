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

      refworkYearSalaryChart = (node) => this.workYearSalaryChart = node
    
      render() {
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
              总体看来，大部分企业对应聘者的工作资历要求都在1-5年，且工作资历在3-5年的更有可能获得高薪资30K以上，平均职位数量也最多。而工作资历在1-3年的，薪资主要分布于6K-25K，平均职位数量也相对较多，只比工作资历在3-5年的少一丢丢呢。工作资历在5年以上的招聘数量较少，可能是因为大部分企业不会有如此高的资历限制或很多的专家需求。而工作资历低于一年的求职者与应届毕业生因为工作经验不足，所以企业的认可度可能相对较低，招聘数量也比较少。
              </View>
            </View>
          </View>
        )
      }
}