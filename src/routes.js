import path from 'path';
import { Database } from './database.js';
import { randomUUID } from 'crypto';
import { buildRoutePath } from './utils/biuld-route-path.js';

const database = new Database();

export const router =
[
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handle: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        nome: search,
        email: search,
      } : null)

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handle: (req, res) => {
      const { nome, email } = req.body;

      const user = {
          id: randomUUID(),
          nome,
          email,
      }

      database.insert('users', user)

      return res.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handle: (req, res) =>{
      const id = req.params.id

      database.delete('users', id)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handle: (req, res) =>{
      const id = req.params.id

      const { nome, email } = req.body

      database.update('users', id, {
        nome,
        email,
      })

      return res.writeHead(204).end()
    },
  }
]