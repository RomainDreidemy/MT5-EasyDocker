import {TCommonBases} from "../../../types/board/drawer/Common.bases";
import {Errors} from "../../../enums/errors";

const CommonBases: TCommonBases = {
  create(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  draw(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },
}

export default CommonBases