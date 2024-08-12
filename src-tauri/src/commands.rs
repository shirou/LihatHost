use crate::execute;
use once_cell::sync::Lazy;
use std::str;

static NETWORK_INTERFACE: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/network_interface.ps1"));
#[tauri::command]
pub async fn network_interface(interface_index: String) -> Result<String, String> {

   if interface_index == "" {
      let code = substitute_placeholders(&NETWORK_INTERFACE, &["$null".to_string()]).map_err(|e| e.to_string())?;
      execute::powershell(&code)
   }else{
      is_numeric(&interface_index).then(|| ()).ok_or("Interface index must be a number".to_string())?;

      let code = substitute_placeholders(&NETWORK_INTERFACE, &[interface_index]).map_err(|e| e.to_string())?;
      execute::powershell(&code)
   }
}

static NETWORK_SCAN: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/network_scan.ps1"));
#[tauri::command]
pub async fn network_scan(ip_address: String, prefix_length: String) -> Result<String, String> {
   is_ipv4_address_lazy(&ip_address).then(|| ()).ok_or("ip_address must be an IPv4 address".to_string())?;
   is_numeric(&prefix_length).then(|| ()).ok_or("prefix_length must be a number".to_string())?;

   let code = substitute_placeholders(&NETWORK_SCAN, &[ip_address, prefix_length]).map_err(|e| e.to_string())?;
   execute::powershell_spawn(&code).await
}

static NETWORK_IP: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/network_ip.ps1"));
#[tauri::command]
pub async fn network_ip() -> Result<String, String> {
   let code = substitute_placeholders(&NETWORK_IP, &[]).map_err(|e| e.to_string())?;
   execute::powershell(&code)
}

static NETWORK_ARP: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/network_arp.ps1"));
#[tauri::command]
pub async fn network_arp(interface_index: String) -> Result<String, String> {
   is_numeric(&interface_index).then(|| ()).ok_or("Interface index must be a number".to_string())?;

   let code = substitute_placeholders(&NETWORK_ARP, &[interface_index]).map_err(|e| e.to_string())?;
   execute::powershell(&code)
}


static HOST_SYSTEM: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/host_system.ps1"));
#[tauri::command]
pub async fn host_system() -> Result<String, String> {
   let code = substitute_placeholders(&HOST_SYSTEM, &[]).map_err(|e| e.to_string())?;
   execute::powershell(&code)
}

static HOST_PROCESSOR: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/host_processor.ps1"));
#[tauri::command]
pub async fn host_processor() -> Result<String, String> {
   let code = substitute_placeholders(&HOST_PROCESSOR, &[]).map_err(|e| e.to_string())?;
   execute::powershell(&code)
}

static HOST_OPERATINGSYSTEM: Lazy<&[u8]> = Lazy::new(|| include_bytes!("ps/host_operatingsystem.ps1"));
#[tauri::command]
pub async fn host_operatingsystem() -> Result<String, String> {
   let code = substitute_placeholders(&HOST_OPERATINGSYSTEM, &[]).map_err(|e| e.to_string())?;
   execute::powershell(&code)
}

fn is_numeric(s: &String) -> bool {
   s.chars().all(|c| c.is_digit(10))
}
fn is_ipv4_address_lazy(s: &String) -> bool {
   s.matches('.').count() == 3
}

fn substitute_placeholders(template: &[u8], replacements: &[String]) -> Result<String, String> {
   // Convert the &[u8] to a String
   let template_str = str::from_utf8(template).map_err(|e| e.to_string())?;

   // Initialize the result string
   let mut result = template_str.to_string();

   // Replace $1, $2, etc. with corresponding replacements
   for (i, replacement) in replacements.iter().enumerate() {
       let placeholder = format!("${}", i + 1); // Create the placeholder like "$1", "$2", ...
       result = result.replace(&placeholder, replacement);
   }

   Ok(result)
}
