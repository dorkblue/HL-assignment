import qs from 'qs'

export const parse = (string) => qs.parse(string, { ignoreQueryPrefix: true, allowDots: true, encode: false })

export const stringify = (obj) => qs.stringify(obj, { addQueryPrefix: true, allowDots: true, encode: false })