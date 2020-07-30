import { Sectores } from './sectores.enum'

export class Empleo {
    public job_id: number
    public company_id: number
    public company_name: string
    public title: string
    public sector: Sectores
    public description: string
    public working_day: string
    public contract: string
    public salary: number
    public requirements: string
    public experience: string
    public email: string
    
}
