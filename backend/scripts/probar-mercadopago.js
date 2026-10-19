// Prueba manual (no es parte de la suite de tests): crea una preferencia real de
// Checkout Pro usando el adaptador del proyecto y las credenciales del .env.
// Uso: node scripts/probar-mercadopago.js
import 'dotenv/config'
import { PasarelaDePagoMercadoPago } from '../src/infrastructure/external/mercadopago/PasarelaDePagoMercadoPago.js'
import { Visitante } from '../src/domain/entities/Visitante.js'

if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.error('Falta MERCADOPAGO_ACCESS_TOKEN en backend/.env')
  process.exit(1)
}

const pasarela = new PasarelaDePagoMercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  frontendUrl: process.env.FRONTEND_URL
})

try {
  const pago = await pasarela.crearPreferenciaPago({
    visitantes: [Visitante.crear({ edad: 30, tipoPase: 'regular' })],
    email: 'comprador@example.com'
  })
  console.log('Preferencia creada OK')
  console.log('initPoint:', pago.initPoint)
} catch (error) {
  // Mostramos el error crudo de Mercado Pago (el caso de uso lo oculta como PagoRechazadoError)
  console.error('Mercado Pago respondió con error:')
  console.error(error?.cause ?? error)
}
