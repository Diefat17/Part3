const express = require('express')
//const morgan = require('morgan')
const app = express()
//const cors = require('cors')

//app.use(cors)
//try

//morgan.token('body', function (req, res) {return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())
app.use(express.json())
//try


app.get('/', (req, res) => {
  
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  res.json(req.body)
})


app.get('/info', (req, res) => {
  const date = new Date(Date.now())
  res.send(`<p>Phonebook has info for ${persons.length} peopple</p><br> <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    console.log('x')
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})