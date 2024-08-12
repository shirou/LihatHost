// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod execute;
mod commands;

fn main() {
	tauri::Builder::default()
        .invoke_handler(tauri::generate_handler!
		[
			commands::network_interface,
			commands::network_scan,
			commands::network_ip,
			commands::network_arp,
			commands::host_system,
			commands::host_processor,
			commands::host_operatingsystem,
		])
    	.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

