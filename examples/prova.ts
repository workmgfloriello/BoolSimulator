
import DLATCH from "./exampleChip/DLATCH";

const sequence = [
    { D: true, EN: true },
    { D: false, EN: false },
    { D: true, EN: false },
    { D: false, EN: true },
    { D: true, EN: false },
    { D: true, EN: true },
];

console.log("D | EN | Q | Q_NOT");
console.log("------------------");

const latch = DLATCH.createChip("latch");

for (const input of sequence) {

    latch.changeInput("D", input.D);
    latch.changeInput("EN", input.EN);

    const result = latch.execute();

    const Q = result.find(x => x.name === "Q")?.value;
    const Q_NOT = result.find(x => x.name === "Q_NOT")?.value;

    console.log(
        `${Number(input.D)} |  ${Number(input.EN)} | ${Number(Q)} |   ${Number(Q_NOT)}`
    );
}
