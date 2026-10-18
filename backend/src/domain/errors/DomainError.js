// Error base del dominio. Permite distinguir errores de negocio (esperados,
// se traducen a 4xx en el borde HTTP) de errores de programación/infraestructura.
export class DomainError extends Error {
  constructor (mensaje) {
    super(mensaje)
    this.name = this.constructor.name
  }
}

export class FechaVisitaInvalidaError extends DomainError {}
export class CantidadEntradasInvalidaError extends DomainError {}
export class VisitanteInvalidoError extends DomainError {}
export class FormaPagoInvalidaError extends DomainError {}
export class UsuarioNoRegistradoError extends DomainError {}
export class PagoRechazadoError extends DomainError {}
export class EmailInvalidoError extends DomainError {}
