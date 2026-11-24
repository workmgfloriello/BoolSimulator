import { Gate, NAND } from "../src/index";
import NOT from "./NOT";

const AND = new Gate("AND");
AND.setInput("A", false);
AND.setInput("B", false);
AND.setFunction((inputs, gate) => {
    NAND.changeInput("A", gate.getInput("A"));
    NAND.changeInput("B", gate.getInput("B"));

    NOT.changeInput("IN", NAND.execute());

    return NOT.execute();
});
export default AND;
