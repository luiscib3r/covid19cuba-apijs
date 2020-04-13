import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CentroAislamiento from '../models/CentroAislamiento'

export const getCentros = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const centros = await CentroAislamiento.find()

        return h.response(centros)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}

export const getCentro = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const centro = await CentroAislamiento.findOne({id: request.params.id})

        if(centro) {
            return h.response(centro)
        }

        return h.response().code(404)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}