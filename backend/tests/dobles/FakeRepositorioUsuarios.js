import { RepositorioUsuarios } from '../../src/application/ports/RepositorioUsuarios.js'

export class FakeRepositorioUsuarios extends RepositorioUsuarios {
  constructor (usuarios = []) {
    super()
    this.usuarios = usuarios
  }

  async buscarPorId (usuarioId) {
    return this.usuarios.find(usuario => usuario.id === usuarioId) ?? null
  }
}
