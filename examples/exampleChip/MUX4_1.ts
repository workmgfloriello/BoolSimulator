
import { Chip } from "../../src/index";
import MUX from "./MUX";

const MUX4_1 = new Chip("MUX4_1");

MUX4_1.setInput("I0", false);
MUX4_1.setInput("I1", false);
MUX4_1.setInput("I2", false);
MUX4_1.setInput("I3", false);

MUX4_1.setInput("S0", false);
MUX4_1.setInput("S1", false);

MUX4_1.setOutput("Y", false);

// Creiamo i 3 MUX 2:1
const mux1 = MUX.createChip("mux1");
const mux2 = MUX.createChip("mux2");
const mux3 = MUX.createChip("mux3");

MUX4_1.setFunction((inputs, outputs, gate) => {

    // Primo MUX: I0 oppure I1
    mux1.changeInput("A", gate.getInput("I0"));
    mux1.changeInput("B", gate.getInput("I1"));
    mux1.changeInput("SEL", gate.getInput("S0"));

    const out1 = mux1.execute();

    // Secondo MUX: I2 oppure I3
    mux2.changeInput("A", gate.getInput("I2"));
    mux2.changeInput("B", gate.getInput("I3"));
    mux2.changeInput("SEL", gate.getInput("S0"));

    const out2 = mux2.execute();

    // Terzo MUX: sceglie tra i risultati
    mux3.changeInput("A", out1.find(x => x.name === "Y")!.value);
    mux3.changeInput("B", out2.find(x => x.name === "Y")!.value);
    mux3.changeInput("SEL", gate.getInput("S1"));

    const result = mux3.execute();

    gate.changeOutput(
        "Y",
        result.find(x => x.name === "Y")!.value
    );

    return outputs;
});

export default MUX4_1;
