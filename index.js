const express = require('express')
//const morgan = require('morgan')
const app = express()

app.use(express.json())
//morgan.token('body', function (req, res) {return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
app.use(express.static('dist'))

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



//try


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
  const newPerson = {
    id: Math.floor(Math.random() * 100),
    name: req.body.name,
    number: req.body.number
  }

  if(!req.body.name || !req.body.number){
    const temp = !req.body.name
      ? 'name'
      : 'number'

    res.send({error: `${temp} cannot be null`})
    return 
  }

  
  if(persons.some(temp => temp.name === req.body.name)){
    res.send({ error: 'name must be unique' })
    return
  }
  persons = persons.concat(newPerson)
  res.send(req.body)
})



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })