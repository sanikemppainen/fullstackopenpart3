const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url).then(() => {
  console.log('connected to mongodb')
}).catch((error) => {
  console.log('error connecting to mongodb: ', error.message)
})
const validators=[{
  validator: (number) => {
    return /^\d{2,3}-\d{8}/.test(number)
  }, message:'invalid number, first part need to be 2-3 numbers and second part 8',
},]

const personSchema= new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    required: true
  },
  number:{
    type: String,
    required: true,
    validate: validators
  }
})



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports=mongoose.model('Person', personSchema)
