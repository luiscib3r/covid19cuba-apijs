import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CasoDetectado from '../models/CasoDetectado'

export const getCasos = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const casos = await CasoDetectado.find()

        return h.response(casos)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}

export const getCaso = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const caso = await CasoDetectado.findOne({id: request.params.id})

        if(caso) {
            return h.response(caso)
        }

        return h.response().code(404)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}