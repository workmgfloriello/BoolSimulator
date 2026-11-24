import { NAND, Gate } from "../src/index";

const NOT = new Gate("NOT");
NOT.setInput("IN", false);

NOT.setFunction((inputs, gate) => {
    const value = gate.getInput("IN");

    NAND.changeInput("A", value);
    NAND.changeInput("B", value);

    return NAND.execute();
});

export default NOT;