const express = require('express')
const app = express()

app.use(express.json())


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

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log('eliminado')
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  console.log(req.body)
  const newPerson = {
    content: req.body.content,
    important: Boolean(req.body.important) || false,
    id: Math.floor(Math.random() * 100)
  }
  persons = persons.concat(newPerson)
  res.send(req.body)
})


  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })