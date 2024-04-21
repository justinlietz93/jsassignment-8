
const router = require('express').Router()
const { getCollection, ObjectId } = require('../todos-db')

// GET /api/v1/todos
router.get('/todos', async (req, res) => {
	const collection = await getCollection('todo-api', 'todos')
	const todos = await collection.find().toArray()
	res.json(todos)
})

// GET ONE /api/v1/todos/id
router.get('/todos/:id', async (request, response) => {
	const { id } = request.params
    const collection = await getCollection('todo-api', 'todos')
	const todo = await collection.findOne({ "_id": new ObjectId(id) })
	response.json(todo[id])
})

// POST /api/v1/todos
router.post('/todos', async (request, response) => {
	const { item, complete } = request.body
    const collection = await getCollection('todo-api', 'todos')
	const todos = await collection.insertOne({ item, complete})
	response.json(todos)
})

// PUT /api/v1/todos/:id
router.put('/todos/:id', async (request, response) => {
	const { id } = request.params
	const collection = await getCollection('todo-api', 'todos')
	const todo = await collection.findOne({ _id: new ObjectId(id) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
	
	response.json(result)
})

module.exports = router