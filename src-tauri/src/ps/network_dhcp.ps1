Get-CimInstance -Class Win32_NetworkAdapterConfiguration -Filter IPEnabled=$true | ConvertTo-JSON
