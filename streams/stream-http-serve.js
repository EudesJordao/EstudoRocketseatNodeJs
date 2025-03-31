import http from 'http';
import { Transform } from 'stream';


class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transform = (Number(chunk.toString())) * -1;

        callback(null, Buffer.from(String(transform)));
        console.log(transform)
    }
}

const server = http.createServer(async (req, res) => {

    const buffers = []

    for await( const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent)

    // return req.pipe(new InverseNumberStream())
    // .pipe(res);
})

server.listen(3334)
