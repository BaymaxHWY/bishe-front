import Taro, { Component } from "@tarojs/taro"
import {Text} from '@tarojs/components'

import './index.scss'

export default class Panle extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Text className='page-title'>{this.props.title}</Text>
        )
    }
}