import { Sectores } from './sectores.enum'
export class Proyecto {
        public nombre: string
        public empresa: string
        public capital_total: number
        public capital_restante: number
        public fecha_fin: Date
        public descripcion: string
        public img_url: string
        public id: number
        public sector: Sectores
 

  // constructor(public nombre: string,public empresa: string,public capital_total: number,public fecha_fin: Date,public descripcion: string,public img_url: string,public sector: string){ }
}