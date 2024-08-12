Get-NetIPConfiguration | Select-object InterfaceDescription -ExpandProperty AllIPAddresses | ConvertTo-CSV | ConvertFrom-CSV | ConvertTo-JSON
