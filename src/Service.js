import axios from "axios"
const ip = "10.144.14.125"
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