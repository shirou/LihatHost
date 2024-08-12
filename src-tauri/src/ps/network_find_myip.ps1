$response = Invoke-WebRequest -Uri "http://whatismyip.akamai.com/"

$ipAddress = $response.Content.Trim()

Write-Output @{IPAddress=$ipAddress} | ConvertTo-JSON
