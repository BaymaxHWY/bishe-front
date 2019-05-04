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

      reffinanceSalaryChart = (node) => this.financeSalaryChart = node
    
      render() {
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
              一眼望去，上市公司作为行业的领头羊，对数据分析岗位的需求数量与薪资水平要明显高于其他发展阶段公司，职位数量差不多是成熟型（D轮及以上）的2倍。成长型（B轮）与成熟型（不需要融资）对数据分析岗位的需求数量与薪资水平相差无几。紧随其后的成长型（不需要融资）、成长型（A轮）、初创型（未融资）与成熟型（C轮）都有着相差不多的岗位数量需求。而初创型（天使轮）与初创型（不需要融资）对数据分析岗位的需求数量与薪资水平就要相对较低了。不过我们可以发现，在互联网企业，薪资高于30K也算是一个相对普遍的现象了，怪不得有人说20K是白菜价呢（偷笑）。而且成长型公司对数据分析岗位的需求数量还是蛮多的，给出的薪资也很不错呢！
              </View>
            </View>
          </View>
        )
      }
}