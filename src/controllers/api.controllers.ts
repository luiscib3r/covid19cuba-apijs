import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CasoDetectado from '../models/CasoDetectado'
import ResumenDia from '../models/ResumenDia'

export const summary = async (req : Request, h : ResponseToolkit):
Promise<ResponseObject> => {
    try {
        let casos = await CasoDetectado.find()
        let summary_days = await ResumenDia.find()
        
        let total_diagnosticados = casos.length
        let diagnosticados_hoy = summary_days[summary_days.length - 1].diagnosticados_numero
        let diferencia_ayer = diagnosticados_hoy - summary_days[summary_days.length - 2].diagnosticados_numero

        var total_recuperados = 0
        var total_evacuados = 0
        var total_fallecidos = 0

        summary_days.forEach((s) => {
            total_recuperados += s.recuperados_numero
            total_evacuados += s.evacuados_numero
            total_fallecidos += s.muertes_numero
        })

        let activos = total_diagnosticados - total_evacuados - total_recuperados - total_fallecidos

        let recuperacion = (total_recuperados * 100 / activos).toFixed(2)

        let total_ingresados = summary_days[summary_days.length - 1].sujetos_riesgo

        let mortalidad = (total_fallecidos * 100 / activos).toFixed(2)

        let fecha = summary_days[summary_days.length - 1].fecha

        return h.response({
            total_diagnosticados,
            diagnosticados_hoy,
            diferencia_ayer,
            activos,
            total_recuperados,
            recuperacion,
            total_evacuados,
            total_fallecidos,
            total_ingresados,
            mortalidad,
            fecha
        })
    }
    catch (err) {
            return h.response().code(500)
    }
}