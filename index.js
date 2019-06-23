const express = require('express')
const app = express()
const bodyParser = require('body-parser')

phonebook = [
    {
        name: "Arto Hellas", 
        number: "040-123456", 
        id: 1
    }, 
    {
        name: "Ada Lovelace", 
        number: "39-44-5323423", 
        id: 2
    }, 
    {
        name: "Dan Abramov", 
        number: "12-43-234345", 
        id: 3
    }, 
    {
        name: "Mary Poppendieck", 
        number: "39-23-6423122", 
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
    
}) 

app.get('/info', (req, res) => {
    let date = new Date()
    let info = `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`
    
    res.send(info)
    
}) 

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.find(person => person.id !== id)

    res.status(204).end()
})
app.use(bodyParser.json())
app.post('/api/persons', (req, res) => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    const person = req.body
    person.id = maxId + 1
    phonebook = phonebook.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})