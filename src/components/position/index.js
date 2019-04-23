import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'

const h = 'hello world 1111'

export default class PositionTab extends Component {
    render() {
        return (
            <View>
                {h}
            </View>
        )
    }
}