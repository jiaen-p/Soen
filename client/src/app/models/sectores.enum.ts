export enum Sector {
    fintech = "fintech",
    transporte = "transporte",
    inteligenciaArtificial = "inteligencia artificial"
}
export type Sectores = keyof typeof Sector