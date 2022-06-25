import { Component, OnInit } from '@angular/core';
import { RequestService } from 'app/services/request.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  idPokemon:any;

  pokemonName: any;
  pokemonImg: any;
  pokemonAttack: any;
  pokemonDefense: any;

  singlePokemon: any = [];

  showNew:boolean = false;

  edit:boolean = false;
  editId: any;

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemons(){
    const response: any = await this.requestService.getAll();
    if(response[0]){
      this.requestService.pokemon = response[1];
    }

  }

  async getPokemonsById(){
    
    this.requestService.pokemon = [];
    this.singlePokemon = [];

    const response:any  = await this.requestService.getPokemonById(this.idPokemon);
    
    if(response[0]){

      if(response[1]!=null || response[1]!=undefined){
        this.singlePokemon.push(response[1]);
        this.requestService.pokemon = this.singlePokemon
      }else{
        console.log("No se encontro el pokemon solicitado");
      }
    }
  }

  async crearPokemon(){


    let data = {
      name: this.pokemonName,
      image: this.pokemonImg,
      attack: this.pokemonAttack,
      defense: this.pokemonDefense,
      hp: 15,
      type: "Fuego",
      idAuthor: 1
    }

    if(this.edit){

      const response: any = await this.requestService.editarPokemon(this.editId, data);

      if(response[0]){
        
        if(response[1]!=null || response[1]!=undefined){
          this.resetValues();
          this.requestService.pokemon = [];
          this.getPokemons();
        }else{
          console.log("No se pudo editar el pokemon solicitado");
        }
      }
      

    }else{

      const response: any = await this.requestService.crearPokemon(data);

      if(response[0]){
        if(response[1]!=null || response[1]!=undefined){
          this.resetValues();
          this.requestService.pokemon = [];
          this.getPokemons();
        }else{
          console.log("No se pudo guardar el pokemon");
        }
      }
    }

  }

  async deletePokemonById(id:any){
    const response: any = await this.requestService.deletePokemonById(id);

    if(response[0]){
      
      if(response[1]!=null || response[1]!=undefined){
        this.requestService.pokemon = [];
        this.getPokemons();
      }else{
        console.log("No se pudo eliminar el pokemon solicitado");
      }
    }
  }

  async editPokemonById(id: any){

    this.edit = true;

    this.showNewForm();

    const response:any  = await this.requestService.getPokemonById(id);

    if(response[0]){
      this.fillForm(response[1]);
      this.editId = id;
    }

  }

  showNewForm(){
    this.resetValues();
    this.showNew = true;

  }

  cancelForm(){
    this.showNew = false;
    this.resetValues();
    this.edit = false;
  }

  resetValues(){
    this.pokemonName = "";
    this.pokemonImg = "";
    this.pokemonAttack = "";
    this.pokemonDefense = "";
  }

  fillForm(pokemon:any){
    this.pokemonName = pokemon.name;
    this.pokemonImg = pokemon.image;
    this.pokemonAttack = pokemon.attack;
    this.pokemonDefense = pokemon.defense;
  }

  resetSearch(){
    if(this.idPokemon == ""){
      this.getPokemons();
    }
  }
}
