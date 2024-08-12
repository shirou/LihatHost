use tauri::api::process::{Command, CommandEvent};

pub fn powershell(script: &String) -> Result<String, String> {
    let result = Command::new("powershell.exe")
        .args(["-NoProfile", "-Command", script])
        .output();
    match result {
        Ok(output) => {
           // Interpret stdout as UTF-8 and convert it to String
            let stdout = String::from_utf8(output.stdout.into())
                .map_err(|e| format!("Failed to parse stdout as UTF-8: {}", e))?;
            
            // If stderr is not empty, interpret it as UTF-8 and return as an error
            if !output.stderr.is_empty() {
                let stderr = String::from_utf8(output.stderr.into())
                    .map_err(|e| format!("Failed to parse stderr as UTF-8: {}", e))?;
                Err(stderr)
            } else {
                Ok(stdout)
            }
        },
        Err(e) => Err(format!("Command execution failed: {}", e)),
    }
}



pub async fn powershell_spawn(script: &String) -> Result<String, String> {
    let (mut rx, mut child) = Command::new("powershell.exe")
        .args(["-NoProfile", "-Command", script])
        .spawn()
        .map_err(|e| format!("Failed to spawn powershell: {}", e))?;

    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            child.write(line.as_bytes()).unwrap();
        }
    }

    Ok("Command executed successfully".to_string())
}
