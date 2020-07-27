import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {

  private url = "http://localhost:4000/jobs"

  constructor(private http: HttpClient) { }

  // Empleos
  getJobs()
  {
    return this.http.get(this.url);
  }

  // Información de un empelo por su id
  getJob(id:Number)
  {
    return this.http.get(this.url + `/${id}`);
  }

   //Jobs por id empresa
   getJobCompany(id:Number)
   {
     return this.http.get(this.url + `/company/${id}`);
   }


}
