const express = require('express')
const app = express()
const port = 3000
let books = []
let bookId = 1

app.use(express.json())
app.use(express.static('public'))

app.get('/api/items', (req, res) => {
    res.json(books)
})

app.post('/api/items', (req, res) => {
    const bookObj = {
        id: bookId++,
        title: req.body.title
    }
    books.push(bookObj)
    res.status(201).json(bookObj)
})

app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }

    book.title = req.body.title
    res.json(book)
})

app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex(book => book.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" })
    }
    const deletedBook = books.splice(index, 1)
    res.json({
        message: "Book deleted",
        book: deletedBook
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})