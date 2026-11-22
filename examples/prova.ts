import { nandGate } from "../src/index";

const NOT = {
  execute(inputs: [boolean]) {
    return nandGate([inputs[0], inputs[0]]);
  },
};

const AND = {
  execute(inputs: [boolean, boolean]) {
    const n = nandGate(inputs);
    return NOT.execute([n]);
  },
};

const OR = {
    execute(inputs: [boolean, boolean]){
        const n1 = NOT.execute([inputs[0]]);
        const n2 = NOT.execute([inputs[1]]);
        return nandGate([n1, n2]);
    }

}

console.log(OR.execute([true, false])); // Output: true
