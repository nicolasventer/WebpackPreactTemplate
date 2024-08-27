#!/usr/bin/sh

ln -s Server/src/Common Client/src/Common

cd Server
bun install

cd ../Client
bun install
bun run build

cd ../../scripts
