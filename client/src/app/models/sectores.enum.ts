export enum Sector {
    fintech = "Fintech",
    transporte = "Transporte",
    inteligenciaArtificial = "Inteligencia artificial",
    turismo = "Turismo",
    medioambiente= "Medioambiente",
    educacion="Educación"
}
export type Sectores = keyof typeof Sector