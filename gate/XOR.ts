import {Gate} from "../src/index"
import AND from "../gate/AND"
import NOT from "../gate/NOT"
import OR from "../gate/OR"

const XOR = new Gate("XOR");
XOR.setInput("A",false);
XOR.setInput("B",false);

const and1 = AND.createGate();
const and2 = AND.createGate();
const or = OR.createGate();
const nota = NOT.createGate();
const notb = NOT.createGate();

XOR.setFunction((inputs, gate)=>{
    nota.changeInput("IN",gate.getInput("A"));
    notb.changeInput("IN",gate.getInput("B"));
    and1.changeInput("A",nota.execute());
    and1.changeInput("B",gate.getInput("B"));
    and2.changeInput("A",notb.execute());
    and2.changeInput("B",gate.getInput("A"));
    or.changeInput("A",and1.execute());
    or.changeInput("B",and2.execute());
    return or.execute();
})

export default XOR;