// Puerto (hexagonal): contrato que debe cumplir cualquier adaptador de persistencia
// de usuarios (JSON en archivo, base de datos, etc.). La capa de aplicación depende
// de esta abstracción, nunca de una implementación concreta (Dependency Inversion).
export class RepositorioUsuarios {
  async buscarPorId (_usuarioId) {
    throw new Error('RepositorioUsuarios.buscarPorId: método no implementado')
  }
}
