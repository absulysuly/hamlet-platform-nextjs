# Smoke Test Script for Hamlet Frontend-Backend Integration
# This script verifies that the backend API is responding correctly
# and that the frontend can connect to it without errors.

param(
    [string]$BackendUrl = "http://localhost:4001",
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host "🧪 Hamlet API Smoke Test" -ForegroundColor Cyan
Write-Host "Backend URL: $BackendUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "$BackendUrl/health" -Method GET -TimeoutSec 10
    if ($healthResponse.status -eq "ok") {
        Write-Host "   ✅ Health check passed" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Health check failed - unexpected response" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Health check failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: API Root
Write-Host "2. Testing API root..." -ForegroundColor Yellow
try {
    $rootResponse = Invoke-RestMethod -Uri "$BackendUrl/" -Method GET -TimeoutSec 10
    if ($rootResponse.status -eq "online") {
        Write-Host "   ✅ API root accessible" -ForegroundColor Green
        if ($Verbose) {
            Write-Host "   📊 Service: $($rootResponse.service)" -ForegroundColor Gray
            Write-Host "   📊 Version: $($rootResponse.version)" -ForegroundColor Gray
            Write-Host "   📊 Database: $($rootResponse.database)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ❌ API root failed - unexpected response" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ API root failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Candidates Endpoint
Write-Host "3. Testing candidates endpoint..." -ForegroundColor Yellow
try {
    $candidatesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/candidates?limit=3" -Method GET -TimeoutSec 10
    if ($candidatesResponse.success -eq $true -and $candidatesResponse.data) {
        $candidateCount = $candidatesResponse.data.Count
        Write-Host "   ✅ Candidates endpoint working - $candidateCount candidates returned" -ForegroundColor Green
        if ($Verbose -and $candidateCount -gt 0) {
            $firstCandidate = $candidatesResponse.data[0]
            Write-Host "   📊 Sample candidate: $($firstCandidate.fullNameArabic)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ❌ Candidates endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Candidates endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 4: Stats Endpoint
Write-Host "4. Testing stats endpoint..." -ForegroundColor Yellow
try {
    $statsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/stats" -Method GET -TimeoutSec 10
    if ($statsResponse.success -eq $true -and $statsResponse.data) {
        $totalCandidates = $statsResponse.data.total
        Write-Host "   ✅ Stats endpoint working - $totalCandidates total candidates" -ForegroundColor Green
        if ($Verbose) {
            $maleCount = $statsResponse.data.byGender.male
            $femaleCount = $statsResponse.data.byGender.female
            Write-Host "   📊 Male: $maleCount, Female: $femaleCount" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ❌ Stats endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Stats endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 5: Governorates Endpoint
Write-Host "5. Testing governorates endpoint..." -ForegroundColor Yellow
try {
    $governoratesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/governorates" -Method GET -TimeoutSec 10
    if ($governoratesResponse.success -eq $true -and $governoratesResponse.data) {
        $governorateCount = $governoratesResponse.data.Count
        Write-Host "   ✅ Governorates endpoint working - $governorateCount governorates" -ForegroundColor Green
        if ($Verbose -and $governorateCount -gt 0) {
            $firstGov = $governoratesResponse.data[0]
            Write-Host "   📊 Sample governorate: $($firstGov.name) ($($firstGov.count) candidates)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ❌ Governorates endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Governorates endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 6: Trending Endpoint
Write-Host "6. Testing trending endpoint..." -ForegroundColor Yellow
try {
    $trendingResponse = Invoke-RestMethod -Uri "$BackendUrl/api/trending" -Method GET -TimeoutSec 10
    if ($trendingResponse.success -eq $true -and $trendingResponse.data) {
        $trendingCount = $trendingResponse.data.Count
        Write-Host "   ✅ Trending endpoint working - $trendingCount trending candidates" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Trending endpoint failed - unexpected response format" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Trending endpoint failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 All smoke tests passed!" -ForegroundColor Green
Write-Host "The backend API is ready for frontend integration." -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the frontend: npm run dev" -ForegroundColor White
Write-Host "2. Verify frontend loads without runtime errors" -ForegroundColor White
Write-Host "3. Check that candidate cards and stats display correctly" -ForegroundColor White
