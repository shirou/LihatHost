[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

$interfaceIndex = $1

$result = Get-NetNeighbor -InterfaceIndex $interfaceIndex | Select-Object InterfaceIndex,LinkLayerAddress,State,IPAddress,AddressFamily

$result | ConvertTo-Csv | ConvertFrom-Csv | ConvertTo-Json
