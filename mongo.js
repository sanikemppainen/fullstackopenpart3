/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url=`mongodb+srv://sanikemppainen:${password}@cluster0.nue9tcy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema= new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    required: true
  },
  number:{
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

if (name !== undefined && number !== undefined){
  const person= new Person({
    name: name,
    number: number
  })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // eslint-disable-next-line no-unused-vars
  const person= new Person({
    name: 'nimi',
    number: '325523'
  })
  //{} sisään tulisi mahd hakuparametrir
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

}
