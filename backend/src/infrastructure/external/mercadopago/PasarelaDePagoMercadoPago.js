import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PasarelaDePago } from '../../../application/ports/PasarelaDePago.js'

function capitalizar (texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// Adaptador de infraestructura (hexagonal): implementa el puerto PasarelaDePago
// usando el SDK oficial de Mercado Pago (Checkout Pro). Las credenciales nunca
// se hardcodean: llegan por inyección de dependencias desde variables de entorno.
export class PasarelaDePagoMercadoPago extends PasarelaDePago {
  constructor ({ accessToken, frontendUrl }) {
    super()
    const cliente = new MercadoPagoConfig({ accessToken })
    this.preference = new Preference(cliente)
    this.frontendUrl = frontendUrl
  }

  async crearPreferenciaPago ({ visitantes, email }) {
    const items = visitantes.map((visitante, indice) => ({
      title: `Entrada ${capitalizar(visitante.tipoPase)} #${indice + 1}`,
      quantity: 1,
      unit_price: visitante.calcularPrecio(),
      currency_id: 'ARS'
    }))

    const respuesta = await this.preference.create({
      body: {
        items,
        payer: { email },
        back_urls: {
          success: `${this.frontendUrl}/pago-exitoso`,
          failure: `${this.frontendUrl}/pago-fallido`,
          pending: `${this.frontendUrl}/pago-pendiente`
        },
        auto_return: 'approved'
      }
    })

    return {
      initPoint: respuesta.init_point,
      sandboxInitPoint: respuesta.sandbox_init_point
    }
  }
}
