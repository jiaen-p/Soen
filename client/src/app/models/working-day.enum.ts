export enum WorkingDay {
    completa = 'Completa',
    parcialMañana = 'Parcial-Mañana',
    indiferente = 'Indiferente',
}
export type WorkingDays = keyof typeof WorkingDay;
