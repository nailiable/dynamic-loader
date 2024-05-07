/* prettier-ignore */

/* eslint-disable */
declare module "ex" {
    export const a: "world";
}
declare module "test" {
  namespace _default {
    export let hello: string;
    export { a };
  }
  export default _default;
  import { a } from "ex.mjs";
}
