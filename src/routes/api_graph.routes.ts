import { Server } from '@hapi/hapi'
import { 
    summary, 
    evolution, 
    evolution_recuperados,
    evolution_fallecidos,
    sexo, 
    modo, 
    casos_extranjeros, 
    nacionalidad, 
    edad, 
    tests, 
    provincias, 
    municipios 
} from '../controllers/api_graph.controllers'

export const api_graph = (server : Server ) => {
    server.route([
        {
            path: '/summary_graph',
            method: 'GET',
            handler: summary
        },
        {
            path: '/evolution_graph',
            method: 'GET',
            handler: evolution
        },
        {
            path: '/evolution_recuperados_graph',
            method: 'GET',
            handler: evolution_recuperados
        },
        {
            path: '/evolution_fallecidos_graph',
            method: 'GET',
            handler: evolution_fallecidos
        },
        {
            path: '/sexo_graph',
            method: 'GET',
            handler: sexo
        },
        {
            path: '/modo_graph',
            method: 'GET',
            handler: modo
        },
        {
            path: '/casos_extranjeros_graph',
            method: 'GET',
            handler: casos_extranjeros
        },
        {
            path: '/nacionalidad_graph',
            method: 'GET',
            handler: nacionalidad
        },
        {
            path: '/edad_graph',
            method: 'GET',
            handler: edad
        },
        {
            path: '/tests_graph',
            method: 'GET',
            handler: tests
        },
        {
            path: '/provincias_graph',
            method: 'GET',
            handler: provincias
        },
        {
            path: '/municipios_graph',
            method: 'GET',
            handler: municipios
        },
    ])
}