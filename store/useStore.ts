import { create } from "zustand";
import { ProductSlice } from "./slices/createProductSlice";
import {
  createProductSlice,
  createStepSlice,
  createSubmitFormSlice,

} from "./slices";
import { StepSlice } from "./slices/createStepSlice";
import { SubmitFormSlice } from "./slices/createSubmitFormSlice";

const useStore = create<

ProductSlice &
    StepSlice &
    SubmitFormSlice
>()((...a) => ({
  ...createProductSlice(...a),
  ...createStepSlice(...a),
  ...createSubmitFormSlice(...a),
}));

export default useStore;
