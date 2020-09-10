export enum TipoPerfil {
    empresa = 'empresa',
    inversor = 'inversor'
}
export type Perfil = keyof typeof TipoPerfil;
