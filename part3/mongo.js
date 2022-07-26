const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://fullstack:${password}@cluster.zzjple6.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if( process.argv.length == 3) {
    console.log('phonebook:');
    mongoose
        .connect(url)
        .then( res => {
            Person.find({}).then(result => {
                result.forEach(person => {
                  console.log(`${person.name} ${person.number}`)
                })
                return mongoose.connection.close()
              })
        })
} else {
    mongoose
  .connect(url)
  .then((result) => {

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

