import { Server } from '@hapi/hapi'

import { getCasos, getCaso, getCasoByProvince, getCasoByProvinceSummary } from '../controllers/casos.controller';

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

    server.route({
        method: 'GET',
        path: '/casos_provincias',
        handler: getCasoByProvinceSummary
    })

    server.route({
        method: 'GET',
        path: '/casos_provincias/{pcode}',
        handler: getCasoByProvince
    })
}