import { Gate, NAND } from "../src/index";
import NOT from "./NOT";

const OR = new Gate("OR");
OR.setInput("A",false);
OR.setInput("B",false);

const nand = NAND.createGate();
const not1 = NOT.createGate();
const not2 = NOT.createGate();

OR.setFunction((inputs, gate) => {

    not1.changeInput("IN",gate.getInput("A"));
    not2.changeInput("IN",gate.getInput("B"));

    nand.changeInput("A",not1.execute());
    nand.changeInput("B", not2.execute());

    return nand.execute()
});

export default OR;