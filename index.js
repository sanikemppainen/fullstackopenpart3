require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person= require('./models/person')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
//app.use(requestLogger)

//const url=`mongodb+srv://sanikemppainen:${password}@cluster0.nue9tcy.mongodb.net/phonebook?retryWrites=true&w=majority`

// eslint-disable-next-line no-unused-vars
morgan.token('mdata', function(req, res){
  //const {body}=req
  return JSON.stringify(req.body)
})

//app.use(morgan('tiny '+':mdata'))
app.use(morgan(':method :url :status :res[content-length] :mdata'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  }, {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-32131'
  }, {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-12321'
  }, {
    id: 4,
    name: 'Marie Poppendick',
    number: '39-23-23123'
  },
]

//juureen tuleciin pyyntlihin palvelin vastaa sendillä html
app.get('/', (req, res) => {
  res.send('<h1>Hello<h1/>')
})
//tähän urliin
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})
//pyynnön tekohetki ja montako persons
app.get('/info', (req, res) => {
  /*const montako=persons.length
    const moneltako=new Date()
    res.send(`Phonebook has info on: ${montako} people, time: ${moneltako}`)
    */
  const moneltako=new Date()
  Person.count({}).then(count => {
    res.send(`Phonebook has info on: ${count} people, time: ${moneltako}`)
  })
})
//yksittäinen puhnumero id perusteella
app.get('/api/persons/:id', (req, res, next) => {
  //muista vaihtaa id numeroksi muuten vertailu ei onnistu
  /*const id = Number(req.params.id)
    const person = persons.find(person=>person.id===id)*/
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }else{
        res.status(404).end()
      }
    }).catch(error => next(error))
    /*//jos ei löydy
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }*/
})
//poista id perusteella
app.delete('/api/persons/:id', (req, res, next) => {
  /*const id= Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    res.status(204).end()*/

  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const makeId=() => {
  const newId= Math.floor(Math.random()*500)
  console.log(newId)
  return newId
}

//lisää person http post pyynnöllä ja luo sille random id
app.post('/api/persons', (req, res, next) => {
  const body=req.body
  console.log(body)

  //varmistetaan että body name tai number ei ole tyhjä
  if(body.name === undefined){
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if(body.number === undefined){
    return res.status(400).json({
      error: 'number missing'
    })
  }
  //const exists = persons.find(n => n.name===body.name)
  /*if(exists){
        return res.status(400).json({
            error: 'name already in the system'
        })
    }*/
  const person= new Person({
    id: makeId(),
    name: body.name,
    number: body.number
  })
  persons=persons.concat(person)
  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
//    persons=persons.concat(newPerson)
//    res.json(newPerson)
})

//päivitys tietoihin
app.put('/api/persons/:id', (req, res, next) => {
  const updated={
    name: req.body.name,
    number: req.body.number
  }
  Person.findByIdAndUpdate(req.params.id, updated, { new:true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(error => next(error))
})

const unknownEndpoint=(req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler=(error, req, res, next) => {
  console.log(error.message)
  if(error.name==='CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  } else if(error.name==='ValidationError'){
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

//const PORT=3001
//tällä herokuun tai jos ei siellä niin sitten 3001 porttiin
// eslint-disable-next-line no-undef
const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
