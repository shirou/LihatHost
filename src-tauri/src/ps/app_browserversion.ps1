# Microsoft Edge Version
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-Not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

if (Test-Path $edgePath) {
    $edgeVersion = (Get-Item $edgePath).VersionInfo.ProductVersion
} else {
    $edgeVersion = "not installed"
}

# Google Chrome Version
$chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if (-Not (Test-Path $chromePath)) {
    $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
}

if (Test-Path $chromePath) {
    $chromeVersion = (Get-Item $chromePath).VersionInfo.ProductVersion
} else {
    $chromeVersion = "not installed"
}

# Firefox Version
$firefoxPath = "C:\Program Files\Mozilla Firefox\firefox.exe"
if (-Not (Test-Path $firefoxPath)) {
    $firefoxPath = "C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
}

if (Test-Path $firefoxPath) {
    $firefoxVersion = (Get-Item $firefoxPath).VersionInfo.ProductVersion
} else {
    $firefoxVersion = "not installed"
}

Write-Output @{Edge=$edgeVersion;Chrome=$chromeVersion;Firefox=$firefoxVersion} | ConvertTo-JSON

