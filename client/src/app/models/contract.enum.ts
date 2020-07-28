export enum Contract {
        indefinido = "Indefinido",
        temporal = "Temporal",
        formacion = "Formación",
        practicas = "Prácticas",
}
export type Contracts = keyof typeof Contract
