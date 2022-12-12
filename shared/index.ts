import { readAll } from "https://deno.land/std@0.167.0/streams/read_all.ts";

export const readFile = async (path: string): Promise<string> => {
    const file = await Deno.open(path, { read: true });
    const decoder = new TextDecoder();
    const fileContent = decoder.decode(await readAll(file));
    file.close();

    return fileContent;
}