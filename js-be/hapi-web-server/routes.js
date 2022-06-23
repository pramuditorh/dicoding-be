const { handler } = require("@hapi/hapi/lib/cors");

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const data = {
                msg: "Homepage"
            }
            
            return h.response(data).code(200);
        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            const data = {
                msg: "Halaman tidak dapat diakses dengan method tersebut"
            }
            
            return h.response(data).code(404);
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            const data = {
                msg: "About page"
            }
            
            return h.response(data).code(200);
        }
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            const data = {
                msg: "Halaman tidak dapat diakses dengan method tersebut"
            }
            
            return h.response(data).code(404);
        }
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const username = request.params.name ? request.params.name : 'stranger';
            const lang = request.query.lang;
            let message = '';

            if(lang === 'id') {
                message = `Halo, ${username}`;
            } else {
                message = `Hello, ${username}`;
            }

            const data = {
                msg: message
            }

            return h.response(data).code(202);
        }
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            const data = {
                msg: "Halaman tidak ditemukan"
            }
            
            return h.response(data).code(404);
        }
    }
]

module.exports = routes;