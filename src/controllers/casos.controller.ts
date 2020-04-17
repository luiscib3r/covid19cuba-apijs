import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CasoDetectado from '../models/CasoDetectado'

export const getCasos = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const casos = await CasoDetectado.find()

        return h.response({
            "total" : casos.length,
            "casos" : casos
        })
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

import pcodes from '../data/province_code'

export const getCasoByProvinceSummary = async (request: Request, h : ResponseToolkit):
Promise<ResponseObject> => {

    return h.response(pcodes)
}

export const getCasoByProvince = async (request: Request, h : ResponseToolkit):
Promise<ResponseObject> => {
    try {
        let provincia = (pcodes as any)[request.params.pcode]
        const casos = await CasoDetectado.find({'provincia_detección': provincia})

        return h.response({
            "provincia": provincia,
            "total": casos.length,
            "casos": casos
        })
    }
    catch {
        return h.response().code(404)
    }
}