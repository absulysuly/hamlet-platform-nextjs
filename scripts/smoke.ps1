# Smoke Test Script for Hamlet Frontend-Backend Integration
# This script verifies that the backend API is responding correctly
# and that the frontend can connect to it without errors.

param(
    [string]$BackendUrl = "http://localhost:4001",
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host "Hamlet API Smoke Test" -ForegroundColor Cyan
Write-Host "Backend URL: $BackendUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Root Endpoint Check
Write-Host "1. Testing root endpoint..." -ForegroundColor Yellow
try {
    $rootResponse = Invoke-RestMethod -Uri "$BackendUrl/" -Method GET -TimeoutSec 10
    if ($rootResponse.status -eq "online") {
        Write-Host "   [OK] Root endpoint check passed" -ForegroundColor Green
    } else {
        Write-Host "   [FAIL] Root endpoint check failed - unexpected response" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [FAIL] Root endpoint check failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Candidates Endpoint
Write-Host "2. Testing candidates endpoint..." -ForegroundColor Yellow
try {
    $candidatesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/candidates?limit=3" -Method GET -TimeoutSec 10
    if ($candidatesResponse.success -eq $true -and $candidatesResponse.data) {
        $candidateCount = $candidatesResponse.data.Count
        Write-Host "   [OK] Candidates endpoint working - $candidateCount candidates returned" -ForegroundColor Green
        if ($Verbose -and $candidateCount -gt 0) {
            $firstCandidate = $candidatesResponse.data[0]
            Write-Host "   [INFO] Sample candidate: $($firstCandidate.fullNameArabic)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   [FAIL] Candidates endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [FAIL] Candidates endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Stats Endpoint
Write-Host "3. Testing stats endpoint..." -ForegroundColor Yellow
try {
    $statsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/stats" -Method GET -TimeoutSec 10
    if ($statsResponse.success -eq $true -and $statsResponse.data) {
        $totalCandidates = $statsResponse.data.total
        Write-Host "   [OK] Stats endpoint working - $totalCandidates total candidates" -ForegroundColor Green
        if ($Verbose) {
            $maleCount = $statsResponse.data.byGender.male
            $femaleCount = $statsResponse.data.byGender.female
            Write-Host "   [INFO] Male: $maleCount, Female: $femaleCount" -ForegroundColor Gray
        }
    } else {
        Write-Host "   [FAIL] Stats endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [FAIL] Stats endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 4: Governorates Endpoint
Write-Host "4. Testing governorates endpoint..." -ForegroundColor Yellow
try {
    $governoratesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/governorates" -Method GET -TimeoutSec 10
    if ($governoratesResponse.success -eq $true -and $governoratesResponse.data) {
        $governorateCount = $governoratesResponse.data.Count
        Write-Host "   [OK] Governorates endpoint working - $governorateCount governorates" -ForegroundColor Green
        if ($Verbose -and $governorateCount -gt 0) {
            $firstGov = $governoratesResponse.data[0]
            Write-Host "   [INFO] Sample governorate: $($firstGov.name) ($($firstGov.count) candidates)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   [FAIL] Governorates endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [FAIL] Governorates endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 5: Trending Endpoint
Write-Host "5. Testing trending endpoint..." -ForegroundColor Yellow
try {
    $trendingResponse = Invoke-RestMethod -Uri "$BackendUrl/api/trending" -Method GET -TimeoutSec 10
    if ($trendingResponse.success -eq $true -and $trendingResponse.data) {
        $trendingCount = $trendingResponse.data.Count
        Write-Host "   [OK] Trending endpoint working - $trendingCount trending candidates" -ForegroundColor Green
    } else {
        Write-Host "   [FAIL] Trending endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [FAIL] Trending endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "All smoke tests passed!" -ForegroundColor Green
Write-Host "The backend API is ready for frontend integration." -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the frontend: npm run dev" -ForegroundColor White
Write-Host "2. Verify frontend loads without runtime errors" -ForegroundColor White
Write-Host "3. Check that candidate cards and stats display correctly" -ForegroundColor White