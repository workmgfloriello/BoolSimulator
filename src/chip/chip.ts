import { ChipFunction, ReturnValue, Wire } from "../types/types";

export class Chip {
  private name: string = "";
  private outputs: Wire[] = [];
  private inputs: Wire[] = [];
  private chipFunction: ChipFunction = () => [];
  //Original Data
  private originalOutputs: Wire[] = [];
  private originalInput: Wire[] = [];

  constructor(name: string) {
    this.name = name;
  }

  //SETTER - CHANGE
  public setInput(key: string, value: boolean): ReturnValue {
    if (key.trim() === "") {
      return {
        value: false,
        message: "Nome del wire non valido",
      };
    }
    if (value != true && value != false) {
      return {
        value: false,
        message: "Valore del wire non valido",
      };
    }

    this.inputs.push({ name: key, value: value });
    //copia valori nell'originale
    this.originalInput.push({ name: key, value: value });
    return {
      value: true,
      message: "Cavo inserito con successo",
    };
  }

  public setOutput(key: string, value: boolean): ReturnValue{
    if (key.trim() === "") {
        return {
            value: false,
            message: "Nome del wire non valido"
        };
    }
    if(value != true && value != false){
      return {
            value: false,
            message: "Valore del wire non valido"
        };
    }

     this.outputs.push({name:key, value:value});
    //copia valori nell'originale
    this.originalOutputs.push({name:key, value:value});
    return {
            value: true,
            message: "Cavo inserito con successo"
        };
  }

  public setFunction(chipFunction: ChipFunction): void {
    this.chipFunction = chipFunction;
  }

  public changeInput(key: string, value: boolean) {
    const find = this.inputs.find((elem) => elem.name == key);
    if (find == undefined) {
      return { value: false, message: "Variabile non trovata" };
    }
    find.value = value;
    return { value: true, message: "Cambio effettuato con successo" };
  }

  public changeOutput(key: string, value: boolean){
    const find = this.outputs.find((elem) => elem.name === key);
      if(find == undefined){
      return {value: false, message:"Variabile non trovata"};
    }
    find.value = value;
    return {value: true, message:"Cambio effettuato con successo"};
  }
  
  public createChip(name: string): Chip{
    const chip = new Chip(name);
    chip.outputs = this.originalOutputs;
    chip.inputs = this.originalInput;
    chip.setFunction(this.chipFunction);
    return chip;
  }

  //GETTER
  public getInput(key: string): boolean {
    const input = this.inputs.find((el) => el.name === key);
    return input ? input.value : false;
  }

  public getOutputs(key: string){
    const output = this.outputs.find(el => el.name === key);
    return output ? output.value : false;
  }

  public execute(): Wire[] {
    this.outputs = this.chipFunction(this.inputs, this.outputs, this);
    return this.outputs;
  }

}
