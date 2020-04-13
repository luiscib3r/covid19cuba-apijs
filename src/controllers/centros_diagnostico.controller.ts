import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CentroDiagnostico from '../models/CentroDiagnostico'

export const getCentros = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const centros = await CentroDiagnostico.find()

        return h.response(centros)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}

export const getCentro = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const centro = await CentroDiagnostico.findOne({id: request.params.id})

        if(centro) {
            return h.response(centro)
        }

        return h.response().code(404)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}