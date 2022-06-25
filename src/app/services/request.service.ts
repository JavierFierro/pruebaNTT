import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseApiUrl = "https://bp-pokemons.herokuapp.com";

  pokemon: any = [];

  constructor(
    private http: HttpClient
  ) { }

  async getAll() {
    return new Promise((resolve) => {
      this.http
        .get(`${this.baseApiUrl}/?idAuthor=1`,)
        .subscribe(
          (response: any) => {
            resolve([true, response]);
          },
          (error: any) => {
            resolve([false, "Error al consultar pokemons"]);
          }
        );
    });
  }

  async getPokemonById(idPokemon: any) {
    return new Promise((resolve) => {
      this.http
        .get(`${this.baseApiUrl}/${idPokemon}`,)
        .subscribe(
          (response: any) => {
            resolve([true, response]);
          },
          (error: any) => {
            // resolve([false, "Error al consultar pokemon "]);
            console.log("No se encontro al pokemon solicitado")
          }
        );
    });
  }

  async editarPokemon(idPokemon: any, data: any) {
    return new Promise((resolve) => {
      this.http
        .put(`${this.baseApiUrl}/${idPokemon}`, data)
        .subscribe(
          (response: any) => {
            resolve([true, response]);
          },
          (error: any) => {
            resolve([false, "Error al editar pokemon"]);
          }
        );
    });
  }

  async crearPokemon(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(`${this.baseApiUrl}/?idAuthor=1`, data)
        .subscribe(
          (response: any) => {
            resolve([true, response]);
          },
          (error: any) => {
            resolve([false, "Error al crear pokemon"]);
          }
        );
    });
  }

  async deletePokemonById(idPokemon: any) {
    return new Promise((resolve) => {
      this.http
        .delete(`${this.baseApiUrl}/${idPokemon}`,)
        .subscribe(
          (response: any) => {
            resolve([true, response]);
          },
          (error: any) => {
            resolve([false, "Error al eliminar pokemon "]);
          }
        );
    });
  }
}
