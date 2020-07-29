import { Perfil } from './tipo-perfil.enum'
export class Usuario {
    constructor(public id: number, public username:string, public profile_img_url:string, public tipo_perfil:Perfil, public new_message:boolean){}
}
