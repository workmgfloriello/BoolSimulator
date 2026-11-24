import { Chip } from "../chip/chip";
import { Gate } from "../gate/gate";

export type GateFunction = (inputs: Wire[], gate: Gate) => boolean;
export type ChipFunction = (inputs: Wire[],outputs: Wire[], gate: Chip) => Wire[];

export type Wire = {
  name: string;
  value: boolean;
};

export type ReturnValue = {
  value: boolean;
  message: string;
};
