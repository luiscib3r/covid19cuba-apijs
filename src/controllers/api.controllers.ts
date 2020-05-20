import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import CasoDetectado from '../models/CasoDetectado'
import ResumenDia from '../models/ResumenDia'

export const summary = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        // let casos = await CasoDetectado.find()
        let summary_days = await ResumenDia.find()

        let diagnosticados: Array<number> = []
       
        for (var i = 0; i < summary_days.length; i++) {
            diagnosticados[i] = summary_days[i].diagnosticados_numero || 0
        }

        let diagnosticados_acc: Array<number> = [diagnosticados[0],]

        for (var i = 1; i < summary_days.length; i++) {
            diagnosticados_acc[i] = diagnosticados_acc[i - 1] + diagnosticados[i]
        }

        let total_diagnosticados = diagnosticados_acc[diagnosticados_acc.length-1]
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

        let recuperacion = Number((total_recuperados * 100 / total_diagnosticados).toFixed(2))

        let total_ingresados = summary_days[summary_days.length - 1].sujetos_riesgo

        let mortalidad = Number((total_fallecidos * 100 / total_diagnosticados).toFixed(2))

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

export const evolution = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        let summary_days = await ResumenDia.find()

        let diagnosticados: Array<number> = []
        let fallecidos: Array<number> = []
        let recuperados: Array<number> = []
        let activos: Array<number> = []

        for (var i = 0; i < summary_days.length; i++) {
            diagnosticados[i] = summary_days[i].diagnosticados_numero || 0
            fallecidos[i] = summary_days[i].muertes_numero || 0
            recuperados[i] = summary_days[i].recuperados_numero || 0
            let evacuados = summary_days[i].evacuados_numero || 0

            activos[i] = diagnosticados[i] - fallecidos[i] - recuperados[i] - evacuados
        }

        let diagnosticados_acc: Array<number> = [diagnosticados[0],]
        let fallecidos_acc: Array<number> = [fallecidos[0],]
        let recuperados_acc: Array<number> = [recuperados[0],]
        let activos_acc: Array<number> = [activos[0],]

        for (var i = 1; i < summary_days.length; i++) {
            diagnosticados_acc[i] = diagnosticados_acc[i - 1] + diagnosticados[i]
            fallecidos_acc[i] = fallecidos_acc[i - 1] + fallecidos[i]
            recuperados_acc[i] = recuperados_acc[i - 1] + recuperados[i]
            activos_acc[i] = activos_acc[i - 1] + activos[i]
        }

        return h.response({
            diagnosticados,
            diagnosticados_acc,
            fallecidos,
            fallecidos_acc,
            recuperados,
            recuperados_acc,
            activos,
            activos_acc
        })
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const sexo = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        let mujeres = await CasoDetectado.find({ sexo: "mujer" }).count()
        let hombres = await CasoDetectado.find({ sexo: "hombre" }).count()
        let desconocido = (await CasoDetectado.find().count()) - hombres - mujeres

        return h.response({
            mujeres,
            hombres,
            desconocido
        })
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const modo = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        let modos = {}

        let casos = await CasoDetectado.find()

        casos.forEach((c) => {
            if (c.contagio) {
                let t: number = (modos as any)[c.contagio] || 0;
                (modos as any)[c.contagio] = t + 1
            }
            else {
                let t: number = (modos as any)['desconocido'] || 0;
                (modos as any)['desconocido'] = t + 1
            }
        })

        return h.response(modos)
    }
    catch (err) {
        return h.response().code(500)
    }
}
export const casos_extranjeros = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {

        let paises = {}

        let casos = await CasoDetectado.find()

        casos.forEach((c) => {
            if (c.pais) {
                if (c.pais != "cu") {
                    let t: number = (paises as any)[c.pais] || 0;
                    (paises as any)[c.pais] = t + 1
                }
            }
            else {
                let t: number = (paises as any)['desconocido'] || 0;
                (paises as any)['desconocido'] = t + 1
            }
        })

        return h.response(paises)
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const nacionalidad = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {

        let cubanos = await CasoDetectado.find({ pais: "cu" }).count()
        let extranjeros = (await CasoDetectado.find().count()) - cubanos

        return h.response({
            cubanos,
            extranjeros
        })
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const edad = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {

        let edades = { '0-4': 0, '5-9': 0, '10-18': 0, '19-40': 0, '41-60': 0, '61-80': 0, '+81': 0, 'Desconocido': 0 }

        let casos = await CasoDetectado.find()

        casos.forEach((c) => {
            if (c.edad) {
                if (c.edad >= 0 && c.edad <= 4) edades['0-4']++
                if (c.edad >= 5 && c.edad <= 9) edades['5-9']++
                if (c.edad >= 10 && c.edad <= 18) edades['10-18']++
                if (c.edad >= 19 && c.edad <= 40) edades['19-40']++
                if (c.edad >= 41 && c.edad <= 60) edades['41-60']++
                if (c.edad >= 61 && c.edad <= 80) edades['61-80']++
                if (c.edad >= 81) edades['+81']++
            }
            else {
                edades['Desconocido']++
            }
        })

        return h.response(edades)
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const tests = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        let summary_days = await ResumenDia.find()

        let diagnosticados: Array<number> = []

        for (var i = 0; i < summary_days.length; i++) {
            diagnosticados[i] = summary_days[i].diagnosticados_numero || 0
        }

        let diagnosticados_acc: Array<number> = [diagnosticados[0],]

        for (var i = 1; i < summary_days.length; i++) {
            diagnosticados_acc[i] = diagnosticados_acc[i - 1] + diagnosticados[i]
        }


        let tests: Array<number> = []
        let detectados: Array<number> = []
        let proporcion: Array<number> = []

        for (var i = 12; i < summary_days.length; i++) {
            tests[i - 12] = summary_days[i].tests_total
            detectados[i - 12] = diagnosticados_acc[i]
            proporcion[i - 12] = Number(((detectados[i - 12] / tests[i - 12]) * 100).toFixed(2))
        }

        return h.response({
            tests,
            detectados,
            proporcion
        })
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const provincias = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        let casos = await CasoDetectado.find()

        let provincias = {}

        casos.forEach((c) => {
            let t = (provincias as any)[c.provincia_detección] || 0;
            (provincias as any)[c.provincia_detección] = t + 1
        })

        return h.response(provincias)
    }
    catch (err) {
        return h.response().code(500)
    }
}

export const municipios = async (req: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {

        let casos = await CasoDetectado.find()

        let municipios = {}

        casos.forEach((c) => {
            let label = c.municipio_detección + 
            ' (' + 
                c.provincia_detección.replace(/[^A-Z]/g, '') 
            + ')'

            let t = (municipios as any)[label] || 0;
            (municipios as any)[label] = t + 1
        })

        return h.response(municipios)
    }
    catch (err) {
        return h.response().code(500)
    }
}