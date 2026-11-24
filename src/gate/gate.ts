import { GateFunction, ReturnValue, Wire } from "../types/types";

export class Gate {
  private inputs: Wire[] = [];
  private output = false;
  private gateFunction: GateFunction = () => false;
  private name = "";
  
  //copie valori originali
  private originalInput: Wire[] = [];

  constructor(name: string) {
    this.name = name;
  }

  //SETTER - CHANGE
  public setInput(key: string, value: boolean): ReturnValue {
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

    this.inputs.push({name:key, value:value});
    //copia valori nell'originale
    this.originalInput.push({name:key, value:value});
    return {
            value: true,
            message: "Cavo inserito con successo"
        };
  }

  public setFunction(gateFunction: GateFunction): void {
    this.gateFunction = gateFunction;
  }

  public changeInput(key: string, value: boolean){
    const find = this.inputs.find((elem) => elem.name == key);
    if(find == undefined){
      return {value: false, message:"Variabile non trovata"};
    }
    find.value = value;
    return {value: true, message:"Cambio effettuato con successo"};
  }

  public createGate(): Gate {
    const gate = new Gate(this.name);
    gate.output = false;
    this.originalInput.forEach(origin => {
      gate.setInput(origin.name,origin.value);
    });
    gate.setFunction(this.gateFunction);
    return gate;
  }

  //GETTER
  public getInput(key: string): boolean {
    const input = this.inputs.find(el => el.name === key);
    return input ? input.value : false;
  }

  public execute(): boolean {
    this.output = this.gateFunction(this.inputs, this);
    return this.output;
  }

  //PRINTER
  public printGateInfo(fun: boolean = false): void {
    console.log("\n========== GATE INFO ==========");
    console.log(`Nome porta: ${this.name}`);

    console.log("\n--- INPUTS ---");

    this.inputs.forEach((wire) => {
        console.log(`${wire.name}: ${Number(wire.value)}`);
    });

    console.log("\n--- OUTPUT ---");
    console.log(`OUT: ${Number(this.output)}`);

    if(fun){
      console.log("\n--- FUNCTION ---");
      console.log(this.gateFunction.toString())
    }
    console.log("===============================\n");
  }

  public printTable(): void {
    const combinations = Math.pow(2, this.inputs.length);

    // Header
    console.log(
        [...this.inputs.map(wire => wire.name), "OUT"].join(" | ")
    );

    console.log("-------------------------");

    // Generazione combinazioni
    for (let i = 0; i < combinations; i++) {

        for (let j = 0; j < this.inputs.length; j++) {
            const value = Boolean((i >> (this.inputs.length - 1 - j)) & 1);

            this.changeInput(this.inputs[j].name, value);
        }

        const output = this.execute();

        const row = [
            ...this.inputs.map(wire => Number(wire.value)),
            Number(output)
        ];

        console.log(row.join(" | "));
    }
}
}

export const NAND = new Gate("NAND");
NAND.setInput("A" ,false);
NAND.setInput("B",false);
NAND.setFunction(inputs => !(inputs[0].value && inputs[1].value));
