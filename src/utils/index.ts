import { log } from "console";

export const debugLog = (debug: boolean, message: string) => {
  if (debug) {
    log(message);
  }
};
