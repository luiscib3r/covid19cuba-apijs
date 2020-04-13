import { Server } from "@hapi/hapi"
import { centros_aislamiento } from './routes/centros_aislamiento.routes'
import { centros_diagnostico } from './routes/centros_diagnostico.routes'
import { resumen_dia } from './routes/resumen_dia.routes'
import { casos } from './routes/casos.routes';

export const init = async () => {
    const server: Server = new Server({
        port: process.env.PORT || 3000,
    })

    centros_aislamiento(server)
    centros_diagnostico(server)
    resumen_dia(server)
    casos(server)

    await server.start()
    console.log('Server runing on %s', server.info.uri);
}