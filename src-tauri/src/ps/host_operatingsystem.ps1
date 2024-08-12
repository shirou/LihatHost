[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

$jsonOutput = Get-CimInstance -ClassName Win32_OperatingSystem  | Select-Object -ExcludeProperty "Cim*" | ConvertTo-CSV | ConvertFrom-Csv | ConvertTo-Json

Write-Output $jsonOutput
