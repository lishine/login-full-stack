import routesMap from './routesMap'

export const alert = state => state.location.payload.alert

export const page = state => state.location.type

export const payload = state => state.location.payload
export const tokenFromUrl = state => state.location.payload.token

export const domain = state => routesMap[state.location.type].domain
