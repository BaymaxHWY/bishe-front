import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import TowBarChart from '../../components/chart/TowBarChart'
import Panle from '../../components/panle'
import api from '../../service/api'
import { AtButton, AtTabBar, AtToast  } from 'taro-ui'
import '@tarojs/async-await'
import './index.scss'

export default class Compare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            mutiLanguage: [
                ['Golang', 'PHP', 'Node.js', 'Java', 'C++', 'C#', 'Python', 'Ruby'],
                ['Golang', 'PHP', 'Node.js', 'Java', 'C++', 'C#', 'Python', 'Ruby']
            ],
            languageChecked1: 'PHP',
            languageChecked2: 'Golang',
            compareType: ['城市', '工资'],
            tyepChecked: '城市',
            isHidden: true,
            compare1: '',
            compare2: '',
            fetchCount: 0,
            errorText: '',
            errorShow: false,
        }
    }
    config = {
        navigationBarTitleText: "数据对比"
    }

    componentDidMount() {
        
    }
    componentDidUpdate() {
        if(this.state.fetchCount == 2){
            this.setMoveChart(this.state.compare1, this.state.compare2, this.CompareChart)
            this.setState({
                fetchCount: 0
            })
        }
    }

    handleClick(url, event) {
        console.log(url)
          Taro.redirectTo({
            url: url
        })
    }

    onChangeLanguage = e => {
        // console.log(e.detail)
        this.setState({
            languageChecked1: this.state.mutiLanguage[0][e.detail.value[0]],
            languageChecked2: this.state.mutiLanguage[1][e.detail.value[1]],
        }) 
    }

    onChangeType = e => {
        // console.log(e.detail)
        this.setState({
            tyepChecked: this.state.compareType[e.detail.value]
        }) 
    }

    handleClickShow() {
        if(this.state.languageChecked1 == this.state.languageChecked2) {
            console.log('show', this.state.languageChecked1, this.state.languageChecked2)
            this.setState({
                errorShow: true,
                errorText: '请选择不同语言'
            })
            return
        }
        this.setState({
            isHidden: false
        }, ()=>{
            let language = [this.state.languageChecked1, this.state.languageChecked2]
            let type = this.state.tyepChecked == '城市' ? 'city/' : 'salary/'
            this.getData(language, type)
        })
    }

    getData(language, type) {
        let that = this
        let url1 = type + language[0]
        let url2 = type + language[1]
        api.get(url1).then((res) => {
            that.setState({
                compare1: res.data.data
            })
            that.state.fetchCount++
        })
        api.get(url2).then((res) => {
            that.setState({
                compare2: res.data.data
            })
            that.state.fetchCount++
        })
    }

    setMoveChart(data1, data2, chart, maxint = 20) {

        let Name = [], Num1 = [], Num2 = []
        for(let i = 0; i < data1.length && i < maxint; i++) {
          Name[i] = data1[i].Name
        }
        for(let i = 0; i < data1.length && i < maxint; i++) {
          Num1[i] = data1[i].Num
        }
        for(let i = 0; i < data2.length && i < maxint; i++) {
          Num2[i] = data2[i].Num
        }

        const chartData = {
          dimensions: {
            data: Name
          },
          measures: [{
            data: Num1,
            name: this.state.languageChecked1
          },
          {
            data: Num2,
            name: this.state.languageChecked2
          }],
          legend: {
            data: [this.state.languageChecked1, this.state.languageChecked2]
          },
        }
        // console.log(chartData)
        chart.refresh(chartData)
    }

    refCompareChart = (node) => this.CompareChart = node

    render() {
        let indexUrl = '/pages/index/index'
        return (
            <View className='container'>
            <Panle title='语言选择'/>
            <Picker mode='multiSelector' range={this.state.mutiLanguage} onChange={this.onChangeLanguage} >
            <View className='picker'>
                  <Text>当前选择：</Text>
                  <Text>{this.state.languageChecked1}&{this.state.languageChecked2}</Text>
            </View>
            </Picker>
            <Panle title='类型选择'/>
            <Picker mode='selector' range={this.state.compareType} onChange={this.onChangeType}>
            <View className='picker'>
                  <Text>当前选择：</Text>
                  <Text>{this.state.tyepChecked}</Text>
            </View>
            </Picker>
            <AtButton onClick={()=> this.handleClickShow()} circle={true} className='bt-sure'>确定</AtButton>
            <AtToast isOpened={this.state.errorShow} text={this.state.errorText} icon="close-circle" hasMask={true} status='error' onClose={()=>{            this.setState({
                errorShow: false,
            })}}></AtToast>
            <View className="move-chart" hidden={this.state.isHidden}>
              <Panle title='对比展示'/>
              <TowBarChart ref={this.refCompareChart} />
            </View>
            <AtTabBar
              fixed
              tabList={[
                { title: '数据展示', iconType: 'home' },
                { title: '数据比较', iconType: 'list' },
                // { title: '文件夹', iconType: 'folder', text: '100', max: '99' }
              ]}
              onClick={(e)=> this.handleClick(indexUrl, e)}
              current={this.state.current}
            />
            </View>
        )
    }
}