import { Sectores } from './sectores.enum'
export class Proyecto {
        public project_name: string
        public description: string
        public total_amount: number
        public remaining_abount: number
        public end_date: Date 
        public project_img_url: string
        public sector: Sectores
        public update: string
 

}