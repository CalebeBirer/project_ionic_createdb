import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db : SQLiteObject | undefined;

  constructor() { 
    this.createDataBase();
  }

  private createDataBase(){
    SQLite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      this.db=db;
      this.createTables()
    }).catch(error=>console.error("Errou", error));
  }

  private createTables(){

    if(this.db){
      this.db.executeSql("CREATE TABLE IF NOT EXIST cliente" +
                        "(id INTEGER PRIMARY AUTOINCREMENT, " +
                        " name TEXT)", [])
      .then(()=>console.log("Tabela cliente criada!"))
      .catch(error=>console.error("Erro ao criar", error));
    }else{
      console.log("Bando de dados não encontrado")
    }
  }

  insertData(name:String):Promise<void>{

    if(this.db){
      return this.db.executeSql("INSERT INTO cliente(name)" +
                                "VALUES(?)",[name])
            .then(()=>console.log("Registro incluido!"))
            .catch(error=>console.error("Erro/inclusão", error));
    }else{
      console.log("Banco de dados não encontrado");
      return Promise.reject("Banco de dados não encontrado")
    }
  }

  updateData(id:number, name:String):Promise<void>{

    if(this.db){
      return this.db.executeSql("UPDATE cliente" +
                              "SET name=?" +
                              "WHERE id=?", [name,id])
            .then(()=>console.log("Registro alterado!"))
            .catch(error=>console.error("Erro/inclusão", error));
    }else{
      console.log("Banco de dados não encontrado");
      return Promise.reject("Banco de dados não encontrado")
    }
  }

  deleteData(id:number, name:String):Promise<void>{
    
    if(this.db){
      return this.db.executeSql("DELETE FROM cliente" +
                                "WHERE id=?",[id])
            .then(()=>console.log("Registro excluido!"))
            .catch(error=>console.error("Erro/inclusão", error));
    }else{
      console.log("Banco de dados não encontrado");
      return Promise.reject("Banco de dados não encontrado")
    }
  }

}
