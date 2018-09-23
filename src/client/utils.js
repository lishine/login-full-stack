import { default as lodashSome } from 'lodash/fp/some'

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
	reduce((acc, value) => Object.assign(acc, func(value)), {})(array)

export const Map = ({ collection, children }) => <>{map(children)(collection)}</>

export function print(json) {
	JSON.stringify(json, null, 2)
}
