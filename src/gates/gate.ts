export type GateFunction = (inputs: boolean[]) => boolean

export class Gate {
    private inputs: boolean[] = [];
    private output: boolean = false;
    private gateFunction: GateFunction;
    
  constructor(gateFunction: GateFunction) {
    this.gateFunction = gateFunction;
  }

  public execute(inputs: boolean[]): boolean {
    this.inputs = inputs;
    this.output = this.gateFunction(inputs);
    return this.output;
  }
}

export function nandGate(inputs: boolean[]): boolean {
    if (inputs.length !== 2) {
        throw new Error("NAND gate requires exactly 2 inputs.");
    }
    return !(inputs[0] && inputs[1]);
}