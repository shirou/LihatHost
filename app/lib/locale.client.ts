import { locale } from "@tauri-apps/api/os";

export async function getLocale() {
	return await locale();
}
