import { Server } from '@hapi/hapi'
import { summary } from '../controllers/api.controllers'

export const api = (server : Server ) => {
    server.route([
        {
            path: '/summary',
            method: 'GET',
            handler: summary
        }
    ])
}