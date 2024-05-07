import * as Loader from "./loader";
import * as Checker from "./checker";
import type { CatchReturnType } from "./utils";
import type { ILoaderError, ILoaderValue } from "./type";

declare global {
  namespace Naily {
    namespace DynamicLoader {
      export namespace AutoLoader {}
    }
  }
}

export async function load<T>(
  id: string,
  _filename: string
): Promise<CatchReturnType<ILoaderValue<T>, ILoaderError>> {
  if (Checker.checkRequire()) return Loader.loadRequire(id);
  else if (Checker.checkImport()) return Loader.loadImport(id);
  else if (Checker.checkWebpack()) return Loader.loadWebpack(id);
  else return Loader.loadJiti(id, _filename);
}
