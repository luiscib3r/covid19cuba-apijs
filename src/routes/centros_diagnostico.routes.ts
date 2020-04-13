import { Server } from '@hapi/hapi'

import { getCentros, getCentro } from '../controllers/centros_diagnostico.controller';

export const centros_diagnostico = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/centros_diagnostico',
        handler: getCentros
    })

    server.route({
        method: 'GET',
        path: '/centros_diagnostico/{id}',
        handler: getCentro
    })
}