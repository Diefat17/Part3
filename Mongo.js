const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]


const url =
  `mongodb+srv://diegordo17:${password}@cluster0.ku17xwi.mongodb.net/personsApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Persons = mongoose.model('persons', personsSchema)

const person = new Persons({
    name: name,
    phone: phone,
  })
  
if(!phone && !name){
    Persons.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(persons => {
          console.log(persons.name, persons.phone)
        })
        mongoose.connection.close()
      })

} else {
    person.save().then(result => {
        console.log(`added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
      })
}



/*

persons.find({important: true}).then(result => {
  result.forEach(persons => {
    console.log(persons)
  })
  mongoose.connection.close()
})*/



