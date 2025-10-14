# Video Compression Script for Celestial Chronicle (PowerShell)
# Compresses videos for optimal web delivery

param(
    [Parameter(Mandatory=$false)]
    [string]$InputPath = "public\videos\animations",
    [string]$OutputSuffix = "-compressed"
)

Write-Host "`n🎬 Celestial Chronicle Video Compressor`n" -ForegroundColor Cyan

# Check for ffmpeg
$ffmpegPath = $null
try {
    $ffmpegPath = Get-Command ffmpeg -ErrorAction Stop
    Write-Host "✅ FFmpeg found: $($ffmpegPath.Source)`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FFmpeg not found in PATH`n" -ForegroundColor Red
    Write-Host "📥 To install FFmpeg:" -ForegroundColor Yellow
    Write-Host "   1. Download from: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    Write-Host "   2. Extract to C:\ffmpeg"
    Write-Host "   3. Add C:\ffmpeg\bin to your PATH"
    Write-Host "`n   OR use Chocolatey: choco install ffmpeg"
    Write-Host "   OR use Scoop: scoop install ffmpeg`n"

    Write-Host "📋 Alternative: Use online compression tools:" -ForegroundColor Yellow
    Write-Host "   • CloudConvert: https://cloudconvert.com/mp4-compress"
    Write-Host "   • FreeConvert: https://www.freeconvert.com/video-compressor"
    Write-Host "   • Clipchamp: https://clipchamp.com/en/video-compressor/`n"

    Write-Host "Settings to use:"
    Write-Host "   - Resolution: 1280x720 (720p)"
    Write-Host "   - Quality: Medium/High compression"
    Write-Host "   - Remove audio: Yes"
    Write-Host "   - Target: 1-2MB per 2-3 second video`n"

    exit 1
}

# Compression settings
$crf = 30
$scale = "1280:720"
$fps = 24
$preset = "slow"

function Get-FileSizeMB {
    param([string]$Path)
    return [math]::Round((Get-Item $Path).Length / 1MB, 2)
}

function Compress-Video {
    param(
        [string]$Input,
        [string]$Output
    )

    Write-Host "📹 Compressing: $(Split-Path $Input -Leaf)" -ForegroundColor Cyan

    $originalSize = Get-FileSizeMB $Input
    Write-Host "   Original size: $originalSize MB"

    $ffmpegCmd = "ffmpeg -i `"$Input`" -c:v libx264 -crf $crf -preset $preset -vf `"scale=$scale,fps=$fps`" -an -movflags +faststart -y `"$Output`""

    try {
        Write-Host "   Compressing..." -NoNewline

        # Run ffmpeg silently
        Invoke-Expression $ffmpegCmd 2>&1 | Out-Null

        $newSize = Get-FileSizeMB $Output
        $savings = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)

        Write-Host " ✅" -ForegroundColor Green
        Write-Host "   Compressed size: $newSize MB ($savings% smaller)" -ForegroundColor Green
        Write-Host "   Saved to: $Output`n"

        return $true
    } catch {
        Write-Host " ❌" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)`n" -ForegroundColor Red
        return $false
    }
}

# Main logic
if (-not (Test-Path $InputPath)) {
    Write-Host "❌ Path not found: $InputPath" -ForegroundColor Red
    exit 1
}

if ((Get-Item $InputPath).PSIsContainer) {
    # Directory - compress all videos
    $videos = Get-ChildItem -Path $InputPath -Include *.mp4,*.mov,*.avi,*.mkv -File

    if ($videos.Count -eq 0) {
        Write-Host "No video files found in: $InputPath" -ForegroundColor Yellow
        exit 0
    }

    Write-Host "Found $($videos.Count) video(s) to compress`n" -ForegroundColor Cyan

    $successCount = 0
    foreach ($video in $videos) {
        $ext = $video.Extension
        $basename = $video.BaseName
        $outputPath = Join-Path $video.DirectoryName "$basename$OutputSuffix$ext"

        if (Compress-Video -Input $video.FullName -Output $outputPath) {
            $successCount++
        }
    }

    Write-Host "✨ Compressed $successCount/$($videos.Count) videos successfully" -ForegroundColor Green
} else {
    # Single file
    $ext = [System.IO.Path]::GetExtension($InputPath)
    $basename = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $dir = [System.IO.Path]::GetDirectoryName($InputPath)
    $outputPath = Join-Path $dir "$basename$OutputSuffix$ext"

    Compress-Video -Input $InputPath -Output $outputPath
}

Write-Host "`n✅ Done! Replace original files if satisfied with quality`n" -ForegroundColor Green
