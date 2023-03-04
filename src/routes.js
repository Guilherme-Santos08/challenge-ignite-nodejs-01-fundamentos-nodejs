import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    },
  },

  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: false,
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    },
  },
]
