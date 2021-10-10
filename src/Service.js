import axios from "axios"
const ip = "192.168.2.105"
const port = "8080"
const url = "http://" + ip + ":" + port


export const getDetailproduct = (params) => {
    return axios({
        method: "GET",
        url: url + '/detail?product=' + params
    })
}

export const relatedProduct = (params) => {
    return axios({
        method: "GET",
        url: url + '/relatedProductList?relate=' + params
    })
}

export const productHandbag = () => {
    return axios({
        method: "GET",
        url: url + '/handbag'
    })
}

export const Mensellection = () => {
    return axios({
        method: "GET",
        url: url + '/Mensellection'
    })
}

export const Signup = (data) => {
    return axios({
        method: "POST",
        url: url + '/signup',
        data
    })
}

export const productmen = () => {
    return axios({
        method: "GET",
        url: url + '/productmen'
    })
}

export const productwomen = () => {
    return axios({
        method: "GET",
        url: url + '/productwomen'
    })
}

export const handbag = () => {
    return axios({
        method: "GET",
        url: url + '/handbag'
    })
}

export const checksignup = (data) => {
    return axios({
        method: "POST",
        url: url + '/checksignup',
        data
    })
}

export const checksignin = (data) => {
    return axios({
        method: "POST",
        url: url + '/checksignin',
        data
    })
}

export const addtocart = (data) => {
    return axios({
        method: "POST",
        url: url + '/addtocart',
        data
    })
}

export const searchProducts = (params) => {
    return axios({
        method: "GET",
        url: url + '/searchproduct?namePro=' + params
    })
}

export const showcart = (params) => {
    return axios({
        method: "GET",
        url: url + '/showcart?customer_id=' + params
    })
}

export const remoteproductcart = (data) => {
    return axios({
        method: "POST",
        url: url + '/remoteproductcart',
        data
    })
}

export const countcart = (data) => {
    return axios({
        method: "POST",
        url: url + '/countcart',
        data
    })
}

export const payment = (data) => {
    return axios({
        method: "POST",
        url: url + '/payment',
        data
    })
}

export const allproduct = () => {
    return axios({
        method: "POST",
        url: url + '/allproduct'
    })
}

export const checkpermissions = (data) => {
    return axios({
        method: "POST",
        url: url + '/checkpermissions',
        data
    })
}

export const revenuebymonth = () => {
    return axios({
        method: "POST",
        url: url + '/revenuebymonth'
    })
}

export const revenuebyproduct = () => {
    return axios({
        method: "POST",
        url: url + '/revenuebyproduct'
    })
}

export const children = () => {
    return axios({
        method: "POST",
        url: url + '/children'
    })
}

export const homecollection = () => {
    return axios({
        method: "POST",
        url: url + '/homecollection'
    })
}

export const jeancouture = () => {
    return axios({
        method: "POST",
        url: url + '/jeancouture'
    })
}

