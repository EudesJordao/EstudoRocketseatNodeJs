import http from 'http';
import { json } from './middleware/json.js';
import { router } from './routes.js';
import { extractQueryParams } from './utils/extrect-query-params.js';

const server = http.createServer(async (req, res) => {

    await json(req, res);

    const { url, method } = req;

    const route = router.find(route =>{
        return route.method == method && route.path.test(url)
    })


    if (route){
        const routeParms = req.url.match(route.path)

        const { query, ...params } = routeParms.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handle(req,res)
    }

    return res.writeHead(404).end();

})

server.listen(3333)
