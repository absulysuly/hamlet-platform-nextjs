# Export all candidates from the API
$allCandidates = @()
$page = 1
$totalPages = 0

Write-Host "Starting candidate export..."

do {
    $response = Invoke-RestMethod -Uri "http://localhost:4001/api/candidates?page=$page&limit=100"
    $allCandidates += $response.data
    $totalPages = [Math]::Ceiling($response.pagination.total / $response.pagination.limit)
    Write-Host "Page $page loaded: $($response.data.Count) candidates (Total so far: $($allCandidates.Count))"
    $page++
} while ($page -le $totalPages)

$export = @{
    success = $true
    data = $allCandidates
    total = $allCandidates.Count
    exported_at = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
}

$export | ConvertTo-Json -Depth 10 | Out-File -FilePath "E:\HamletUnified\exports\candidates_full.json" -Encoding UTF8

Write-Host "Export complete!"
Write-Host "Total candidates exported: $($allCandidates.Count)"
Write-Host "File saved to: E:\HamletUnified\exports\candidates_full.json"


