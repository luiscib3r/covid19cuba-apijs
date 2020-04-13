import { Server } from '@hapi/hapi'

import { getSummaryDays, getSummaryDay, getSummaryToday } from '../controllers/resumen_dia.constroller'

export const resumen_dia = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/resumen_dia',
        handler: getSummaryDays
    })

    server.route({
        method: 'GET',
        path: '/resumen_dia/{id}',
        handler: getSummaryDay
    })

    server.route({
        method: 'GET',
        path: '/resumen_hoy',
        handler: getSummaryToday
    })
}