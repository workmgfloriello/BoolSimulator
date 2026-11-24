import { Gate } from "../src/index";
import AND from "./AND";

const AND3 = new Gate("AND3");

AND3.setInput("A", false);
AND3.setInput("B", false);
AND3.setInput("C", false);

const and1 = AND.createGate();
const and2 = AND.createGate();

AND3.setFunction((inputs, gate) => {

    // Prima AND: A AND B
    and1.changeInput("A", gate.getInput("A"));
    and1.changeInput("B", gate.getInput("B"));

    const result1 = and1.execute();

    // Seconda AND: risultato AND C
    and2.changeInput("A", result1);
    and2.changeInput("B", gate.getInput("C"));

    return and2.execute();
});

export default AND3;