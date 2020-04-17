import { Server } from '@hapi/hapi'
import { summary, evolution, sexo, modo, casos_extranjeros, nacionalidad, edad, tests } from '../controllers/api.controllers'

export const api = (server : Server ) => {
    server.route([
        {
            path: '/summary',
            method: 'GET',
            handler: summary
        },
        {
            path: '/evolution',
            method: 'GET',
            handler: evolution
        },
        {
            path: '/sexo',
            method: 'GET',
            handler: sexo
        },
        {
            path: '/modo',
            method: 'GET',
            handler: modo
        },
        {
            path: '/casos_extranjeros',
            method: 'GET',
            handler: casos_extranjeros
        },
        {
            path: '/nacionalidad',
            method: 'GET',
            handler: nacionalidad
        },
        {
            path: '/edad',
            method: 'GET',
            handler: edad
        },
        {
            path: '/tests',
            method: 'GET',
            handler: tests
        },
    ])
}