const express = require('express')

const app = express()
const port = 3000

app.get('/students', (req, res) => {
	res.send([
		{"name": "Quentin Lurkin", "grade": 15},
		{"name": "André Lorge", "grade": 18}
	])
})

app.use(express.static('./public'))

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})