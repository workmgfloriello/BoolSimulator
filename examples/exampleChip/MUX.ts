import { Chip } from "../../src/index";
import AND from "../../gate/AND";
import NOT from "../../gate/NOT";
import OR from "../../gate/OR";

const MUX = new Chip("MUX");

MUX.setInput("A", false);
MUX.setInput("B", false);
MUX.setInput("SEL", false);

MUX.setOutput("Y", false);

const and1 = AND.createGate();
const and2 = AND.createGate();
const not = NOT.createGate();
const or = OR.createGate();

MUX.setFunction((inputs, outputs, gate) => {
    not.changeInput("IN", gate.getInput("SEL"));
    const notSel = not.execute();

    and1.changeInput("A", gate.getInput("A"));
    and1.changeInput("B", notSel);

    and2.changeInput("A", gate.getInput("B"));
    and2.changeInput("B", gate.getInput("SEL"));

    or.changeInput("A", and1.execute());
    or.changeInput("B", and2.execute());

    gate.changeOutput("Y", or.execute());

    return outputs;
});

export default MUX;
