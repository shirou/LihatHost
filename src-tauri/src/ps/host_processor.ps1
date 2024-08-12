[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

$jsonOutput = Get-CimInstance -ClassName Win32_Processor | Select-Object -ExcludeProperty "Cim*" | ConvertTo-CSV | ConvertFrom-Csv | ConvertTo-JSON

Write-Output $jsonOutput
