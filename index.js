require('dotenv').config()
const express = require('express')
//const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const mongoose = require('mongoose')
const cors = require('cors')
//app.use(cors)
//try
const url = process.env.MONGODB_URI

//done the frontedn

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(cors())
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

app.use(express.json())
//try


app.get('/', (req, res) => {
  
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})


app.get('/info', (req, res) => {
  const date = new Date(Date.now())
  res.send(`<p>Phonebook has info for ${persons.length} peopple</p><br> <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.send(404)
    })
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})