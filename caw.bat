echo on
set "var=%cd%"
cd ..\cors-anywhere
start node corsAnywhereServer.js
echo %var%
cd %var%

