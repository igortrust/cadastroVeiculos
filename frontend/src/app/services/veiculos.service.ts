import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VeiculosService {
    private apiUrl = 'http://localhost:3000/veiculos'; // URL da API backend

    constructor(private http: HttpClient) { }

    getVeiculos(): Observable<any[]> { // Usando um array genérico como exemplo
        return this.http.get<any[]>(this.apiUrl);
    }
}
