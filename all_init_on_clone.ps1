New-Item -ItemType Junction -Name "Client/src/Common" -Target "Server/src/Common"

Set-Location Server
call bun install

Set-Location ../Client
call bun install
call bun run build

Set-Location ../../scripts
