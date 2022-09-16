import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage:Storage) {
    this.storage.create();
  }

  ngOnInit(){
    this.atualizaLista();
  }
  variavel_lista = [];
  texto: string = "";
  aux = 0;
  valor: number;
  soma: number = 0;
  variavel_n = [];

  async adiciona() {
    if (!(this.texto == "" || this.valor == 0)) {
      //this.variavel_lista.push("0", this.texto);
      this.variavel_lista.forEach(item => {
        if(parseInt(item[0]) > this.aux) {
          this.aux = parseInt(item[0]);
        }
      })
      this.aux = this.aux + 1;
      await this.storage.set(this.aux.toString(),[ this.texto, this.valor]);
      this.atualizaLista();
      this.texto = "";
      this.valor = undefined;
    }
    //----------------------------------------------------------
    
      /*
    if (this.texto == "") {

    } else{
      this.variavel_lista.push(this.texto);
      this.texto = "";
    }*/

  }
  somar (preco){
      
      this.soma = (+this.soma) + (+preco); 

    
  }

  atualizaLista() {
    this.variavel_lista = [];
    this.variavel_n = [];
    this.soma = 0;
    this.storage.forEach((value, key, index) => {
      this.variavel_lista.push([key, value]);
      this.somar(value[1]);
      
      //this.variavel_n.push([key, value[1]]);
    })
  }

  async remove(indice) {
    //this.variavel_lista.splice(indice, 1)
    await this.storage.remove(indice);
    this.atualizaLista();

  }
 
  

  //*ngFor = "let elemento_da_lista of minhaLista" no item
  //[(ngModel)]="texto" no input

}