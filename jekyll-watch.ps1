#this is the jekyll-watch.ps1 file
# Set your project directory
$global:projectDir = "C:\Users\bposey\Local Project Files\GitHub\RiverTournaments\RiverTournament"

# Command to run Jekyll serve
$global:jekyllCommand = "bundle exec jekyll serve"

# Run bundle install silently
Write-Host "Running bundle install..."
Start-Process powershell -WindowStyle Hidden -ArgumentList "-Command", "cd '$global:projectDir'; bundle install" -Wait
Write-Host "bundle install completed."

# Global variable to hold the Jekyll process object
$global:jekyllProcess = Start-Process powershell -WindowStyle Hidden -ArgumentList "-Command", "cd '$global:projectDir'; $global:jekyllCommand" -PassThru

# Watch for changes in key files
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $global:projectDir
$watcher.IncludeSubdirectories = $true
$watcher.Filter = "*.*"
$watcher.NotifyFilter = [System.IO.NotifyFilters]'LastWrite'

# Action on change
$action = {
  Write-Host "Change detected. Restarting Jekyll..."

  # Stop the current Jekyll process
  Stop-Process -Id $global:jekyllProcess.Id -Force

  # Wait briefly to ensure it's stopped
  Start-Sleep -Seconds 2

  # Restart Jekyll hidden
  $global:jekyllProcess = Start-Process powershell -WindowStyle Hidden -ArgumentList "-Command", "cd '$global:projectDir'; $global:jekyllCommand" -PassThru
}

# Register event
Register-ObjectEvent $watcher "Changed" -Action $action

# Start watching
$watcher.EnableRaisingEvents = $true

Write-Host "Watcher started (hidden Jekyll & silent bundle install). Press Ctrl+C to stop."
while ($true) { Start-Sleep -Seconds 1 }
