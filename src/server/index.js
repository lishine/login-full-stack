import massive from 'massive'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import './config'

import { dropQuery, createQuery } from './data/users'
import * as auth from './lib/auth'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/auth/signin', auth.signIn)
app.post('/auth/signup', auth.signUp)
app.post('/auth/registerconfirm', (req, res, next) => auth.registrationConfirm(req, res, next))
app.post('/auth/forgotpassword', (req, res, next) => auth.forgotPassword(req, res, next))
app.post('/auth/newpassword', (req, res, next) => auth.newPassword(req, res, next))
app.use('/api/*', auth.validateTokenMid)

app.get('/api1/check', (req, res) =>
	res.json({ sucess: true, check: true, secret: process.env.JWT_SECRET })
)

app.get('/api1/create', (req, res) => {
	console.log('here')
	const db = req.app.get('db')
	db.query(createQuery)
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db created and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

app.get('/api1/drop', (req, res) => {
	const db = req.app.get('db')
	db.query(dropQuery)
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db dropped and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

app.get('/api1/insert', (req, res) => {
	const db = req.app.get('db')
	db.users
		.insert({ name: 1, email: 2 * Math.random() * 10, password: 3 })
		.then(user => res.json({ user, success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

// app.get('/api1/send-email', (req, res) => {
// 	email
// 		.sendRegistrationEmail(res)
// 		.then(info => res.status(200).json({ info }))
// 		.catch(err => res.status(500).json({ error: 'email not sent', err }))
// })

app.use(express.static('dist'))

app.use((req, res) => {
	res.sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

app.use(function(err, req, res, next) {
	res.status(500).json({ sucess: false, err })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)

const config = process.env.DATABASE_URL || {
	host: 'localhost',
	port: 5432,
	database: 'barcode',
	user: 'admin',
	password: '',
	ssl: false,
	poolSize: 10,
}

massive(config)
	.then(instance => {
		app.set('db', instance)
		const c = app.get('db').listTables()
	})
	.catch(err => console.log('err', err))

console.log({
	send: process.env.NODE_ENV === 'production',
	preview: process.env.NODE_ENV === 'development',
})
