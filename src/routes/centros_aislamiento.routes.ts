import { Server } from '@hapi/hapi'

import { getCentros, getCentro } from '../controllers/centros_aislamiento.controller';

export const centros_aislamiento = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/centros_aislamiento',
        handler: getCentros
    })

    server.route({
        method: 'GET',
        path: '/centros_aislamiento/{id}',
        handler: getCentro
    })
}