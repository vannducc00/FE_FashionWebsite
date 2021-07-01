import axios from 'axios'
import React, { Component } from 'react'

export default class Detail extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props)
        axios({
            method: "GET",
            url: "http://10.144.14.125:8080/detail?product=" + this.props.match.params.idpro
        }).then(res => {

            console.log(res.data)
        }
        )
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
