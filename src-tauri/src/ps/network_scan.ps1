$ipAddress = $1
$prefixLength = $2

[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')
$ErrorActionPreference = "Stop"

# Function to calculate the network address from the given IP address and prefix length
function Get-NetworkAddress {
    param (
        [string]$ipAddress,
        [int]$prefixLength
    )

    $ipBytes = [System.Net.IPAddress]::Parse($ipAddress).GetAddressBytes()
    $maskBytes = [System.Net.IPAddress]::Parse((0..3 | ForEach-Object {
        $byteValue = if ($prefixLength -ge 8) {
            $prefixLength -= 8
            255
        } elseif ($prefixLength -gt 0) {
            $value = [math]::Pow(2, $prefixLength) - 1
            $prefixLength = 0
            [byte](($value -band 255) -bxor 255)
        } else {
            0
        }
        [Convert]::ToString($byteValue, 10)
    }) -join ".").GetAddressBytes()

    for ($i = 0; $i -lt $ipBytes.Length; $i++) {
        $ipBytes[$i] = $ipBytes[$i] -band $maskBytes[$i]
    }

    return [System.Net.IPAddress]::Parse(($ipBytes -join '.')).ToString()
}

# Function to calculate all IP addresses in the network
function Get-AllIPAddressesInNetwork {
    param (
        [string]$networkAddress,
        [int]$prefixLength
    )

    $networkAddressBytes = [System.Net.IPAddress]::Parse($networkAddress).GetAddressBytes()
    $hostBits = 32 - $prefixLength
    $numHosts = [math]::Pow(2, $hostBits) - 2

    $ipAddresses = @()
    for ($i = 1; $i -le $numHosts; $i++) {
        $ipBytes = $networkAddressBytes.Clone()
        $hostPart = [BitConverter]::GetBytes([System.Net.IPAddress]::HostToNetworkOrder($i))
        for ($j = 0; $j -lt $hostPart.Length; $j++) {
            $ipBytes[$ipBytes.Length - $j - 1] = $ipBytes[$ipBytes.Length - $j - 1] -bor $hostPart[$hostPart.Length - $j - 1]
        }
        $ipAddresses += [System.Net.IPAddress]::Parse(($ipBytes -join '.')).ToString()
    }

    return $ipAddresses
}

# Function to check connectivity for all IP addresses in the network
function Test-NetworkConnectivity {
    param (
        [string]$ipAddress,
        [int]$prefixLength
    )

    $networkAddress = Get-NetworkAddress -ipAddress $ipAddress -prefixLength $prefixLength
    $allIPAddresses = Get-AllIPAddressesInNetwork -networkAddress $networkAddress -prefixLength $prefixLength

    foreach ($ip in $allIPAddresses) {
        $result = Test-Connection -ComputerName $ip -Count 1 -Quiet
        @{IPAddress=$ip;Reachable=$result} | ConvertTo-Json -Compress
    }
}

Test-NetworkConnectivity -ipAddress $ipAddress -prefixLength $prefixLength

