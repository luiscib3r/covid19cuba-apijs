import { Server } from '@hapi/hapi'

import { getCasos, getCaso } from '../controllers/casos.controller';

export const casos = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/casos',
        handler: getCasos
    })

    server.route({
        method: 'GET',
        path: '/casos/{id}',
        handler: getCaso
    })
}