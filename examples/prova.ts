import { clock } from "../src/index";
import AND from "../gate/AND"

function Circuito(){
    const and = AND.createGate();
    and.setInput("A",true);
    const val = Boolean(clock.step());
    and.setInput("B",val);
    console.log(and.execute());
}

clock.start(Circuito);

