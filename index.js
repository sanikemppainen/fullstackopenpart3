const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token("mdata", function(req, res){
    //const {body}=req
    return JSON.stringify(req.body)
})

//app.use(morgan('tiny '+':mdata'))
app.use(morgan(":method :url :status :res[content-length] :mdata"))
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    }, {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-32131"
    }, {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-12321"
    }, {
        id: 4,
        name: "Marie Poppendick",
        number: "39-23-23123"
    },
]

//juureen tuleciin pyyntlihin palvelin vastaa sendillä html
app.get('/', (req, res)=> {
    res.send('<h1>Hello<h1/>')
})
//tähän urliin
app.get('/api/persons', (req, res)=>{
    res.json(persons)
})
//pyynnön tekohetki ja montako persons
app.get('/info', (req, res)=>{
    const montako=persons.length
    const moneltako=new Date()
    res.send(`Phonebook has info on: ${montako} people, time: ${moneltako}`)
})
//yksittäinen puhnumero id perusteella
app.get('/api/persons/:id', (req, res)=>{
    //muista vaihtaa id numeroksi muuten vertailu ei onnistu
    const id= Number(req.params.id)
    const person= persons.find(person=>person.id===id)
    //jos ei löydy
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})
//poista id perusteella
app.delete('/api/persons/:id', (req, res)=>{
    const id= Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    res.status(204).end()
})

const makeId=()=>{
    const newId= Math.floor(Math.random()*500)
    console.log(newId)
    return newId
}

//lisää person http post pyynnöllä ja luo sille random id
app.post('/api/persons', (req, res)=>{
    const body=req.body
    console.log(body)

    //varmistetaan että body name tai number ei ole tyhjä
    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }
    const exists = persons.find(n=>n.name===body.name)
    if(exists){
        return res.status(400).json({
            error: 'name already in the system'
        })
    }
    const newPerson={
        id: makeId(),
        name: body.name,
        number: body.number
    }
    persons=persons.concat(newPerson)
    res.json(newPerson)
})



//const PORT=3001
//tällä herokuun tai jos ei siellä niin sitten 3001 porttiin
const PORT= process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
