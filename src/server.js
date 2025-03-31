import http from 'http';
import { json } from '../middleware/json.js';

const users = [];

const server = http.createServer(async (req, res) => {

    await json(req, res);

    const { url, method } = req;

    if(method == 'GET' && url == '/users') {
        return res
        .end(JSON.stringify(users));
    }

    if(method == 'POST' && url == '/users') {
        const { nome, email } = req.body;

        users.push({
            id: 1,
            nome,
            email,
        })
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();

})

server.listen(3333)
