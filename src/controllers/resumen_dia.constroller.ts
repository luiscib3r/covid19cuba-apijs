import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import ResumenDia from '../models/ResumenDia'

import Status from '../models/Status'

export const getSummaryDays = async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const dias = await ResumenDia.find()

        return h.response(dias)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}

export const getSummaryDay= async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const dia = await ResumenDia.findOne({id: request.params.id})

        if(dia) {
            return h.response(dia)
        }

        return h.response().code(404)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}

export const getSummaryToday= async (request: Request, h : ResponseToolkit): 
Promise<ResponseObject> => {
    try {
        const status = await Status.findOne({ id: 0 })

        var today

        if(status)
            today = await ResumenDia.findOne({id: status.lastday})

        if(today) {
            return h.response(today)
        }

        return h.response().code(404)
    } catch (error) {
        console.error(error)
        return h.response(error).code(500)
    }
}