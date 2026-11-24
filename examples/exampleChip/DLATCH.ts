
import { Chip } from "../../src/index";

const DLATCH = new Chip("DLATCH");

DLATCH.setInput("D", false);
DLATCH.setInput("EN", false);

DLATCH.setOutput("Q", false);
DLATCH.setOutput("Q_NOT", true);

// Stato interno della memoria
let state = false;

DLATCH.setFunction((inputs, outputs, gate) => {

    const D = gate.getInput("D");
    const EN = gate.getInput("EN");

    // Quando Enable è attivo, memorizza D
    if (EN) {
        state = D;
    }

    gate.changeOutput("Q", state);
    gate.changeOutput("Q_NOT", !state);

    return outputs;
});

export default DLATCH;
