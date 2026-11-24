import { Gate} from "../src/index";
import AND from "./AND";

const AND4 = new Gate("AND4");
AND4.setInput("A",false);
AND4.setInput("B",false);
AND4.setInput("C",false);
AND4.setInput("D",false);

const and1 = AND.createGate();
const and2 = AND.createGate();
const and3 = AND.createGate();

AND4.setFunction((inputs, gate)=>{
    and1.changeInput("A",gate.getInput("A"));
    and1.changeInput("B",gate.getInput("B"));
    and2.changeInput("A",gate.getInput("C"));
    and2.changeInput("B",gate.getInput("D"));
    and3.changeInput("A",and1.execute());
    and3.changeInput("B",and2.execute());
    return and3.execute();
})
export default AND4;