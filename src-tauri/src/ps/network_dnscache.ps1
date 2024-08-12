[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

Write-Output Get-DNSClientCache | ConvertTo-Json
