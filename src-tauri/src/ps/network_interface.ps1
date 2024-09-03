$intefaceIndex = $1

[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

# Get network adapters information
if ($intefaceIndex) {
    $networkAdapters = Get-NetAdapter -IncludeHidden -InterfaceIndex $intefaceIndex
} else {
    $networkAdapters = Get-NetAdapter -IncludeHidden
}

# Convert the data to JSON format with EnumStringValues
$jsonOutput = $networkAdapters | ConvertTo-Csv | ConvertFrom-Csv | ConvertTo-Json
# Output the JSON to the console
Write-Output $jsonOutput
