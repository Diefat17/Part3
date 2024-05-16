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

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  
  next(error)
}
app.use(errorHandler)
//try


app.get('/', (req, res) => {
  
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    console.log(person[0].id)
    res.json(person)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
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

app.delete('/api/persons/:id', (req, res) => {
  console.log(req.params.id)
  
  Person.findByIdAndDelete(req.params.id)
  .then(result => {
      console.log('colaciones')
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