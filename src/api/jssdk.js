import request from '@/utils/request'

export function getConfig(url, params) {
    return request({
        url: '/api/jssdk/config',
        method: 'post',
        data: {
            api: params,
            url
        }
    })
}


export function pay(price) {
    return request({
        url: '/api/spa-pay',
        method: 'get',
        params: {
           price
        }
    })
}


