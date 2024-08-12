import { invoke, type InvokeArgs } from "@tauri-apps/api/tauri";

export async function executeCommand(command: string, args?: InvokeArgs) {
	return invoke<string>(command, args);
}
