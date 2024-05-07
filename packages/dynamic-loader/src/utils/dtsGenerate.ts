import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { type CompilerOptions, ModuleKind, createProgram } from "typescript";

export function dtsGenerate(
  inputPath: string,
  outputPath: string,
  addIgnoreComment: boolean = true
): void {
  // 准备编译选项
  const options: CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    allowJs: true,
    module: ModuleKind.CommonJS, // 默认生成CommonJS模块类型的.d.ts
  };

  // 创建一个程序实例
  const program = createProgram([inputPath], options);

  // 生成.d.ts文件
  program.emit(undefined, (fileName, data) => {
    // 确保输出目录存在
    if (!existsSync(outputPath)) mkdirSync(outputPath, { recursive: true });

    if (addIgnoreComment) {
      data = `/* eslint-disable */\n${data}`;
      data = `/* eslint-disable eslint-comments/no-unlimited-disable */\n${data}`;
      data = `/* prettier-ignore */\n${data}`;
    }

    // 计算写入路径并写入文件
    const writePath = resolve(outputPath, basename(fileName));
    writeFileSync(writePath, data);
  });
}
