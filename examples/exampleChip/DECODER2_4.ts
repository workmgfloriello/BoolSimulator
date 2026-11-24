import { Chip } from "../../src/index";
import AND from "../../gate/AND";
import NOT from "../../gate/NOT";

const DECODER = new Chip("DECODER2_4");

DECODER.setInput("A", false);
DECODER.setInput("B", false);

DECODER.setOutput("Y0", false);
DECODER.setOutput("Y1", false);
DECODER.setOutput("Y2", false);
DECODER.setOutput("Y3", false);

const notA = NOT.createGate();
const notB = NOT.createGate();

const and0 = AND.createGate();
const and1 = AND.createGate();
const and2 = AND.createGate();
const and3 = AND.createGate();

DECODER.setFunction((inputs, outputs, gate) => {

    const A = gate.getInput("A");
    const B = gate.getInput("B");

    notA.changeInput("IN", A);
    notB.changeInput("IN", B);

    const nA = notA.execute();
    const nB = notB.execute();

    // Y0 = NOT A AND NOT B
    and0.changeInput("A", nA);
    and0.changeInput("B", nB);

    // Y1 = NOT A AND B
    and1.changeInput("A", nA);
    and1.changeInput("B", B);

    // Y2 = A AND NOT B
    and2.changeInput("A", A);
    and2.changeInput("B", nB);

    // Y3 = A AND B
    and3.changeInput("A", A);
    and3.changeInput("B", B);

    gate.changeOutput("Y0", and0.execute());
    gate.changeOutput("Y1", and1.execute());
    gate.changeOutput("Y2", and2.execute());
    gate.changeOutput("Y3", and3.execute());

    return outputs;
});

export default DECODER;
