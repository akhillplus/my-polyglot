copy /Y build\index.html build\index.blade.php
rem powershell -Command "(gc build\index.blade.php) -replace '<title>React App</title>', '<meta name=\"csrf-token\" content=\"{{ csrf_token() }}\"><title>{{ config(\"app.name\", \"Laravel\") }}</title>' | Out-File build\index.blade.php -Encoding ASCII"
REM powershell -Command "(gc build\index.blade.php) -replace '<title>React App</title>', '<title>{{ config(\"app.name\", \"Laravel\") }}</title>' | Out-File build\index.blade.php -Encoding ASCII"
powershell -Command "(gc build\index.blade.php) -replace '<title>React App</title>', '<title>Megaglot</title>' | Out-File build\index.blade.php -Encoding ASCII"
REM powershell -Command "(gc build\index.blade.php) -replace 'sidx=-1' , 'sidx=-1;saction=\"{{ Route::currentRouteName() }}\";' | Out-File build\index.blade.php -Encoding ASCII"
copy build\index.blade.php d:\Users\Akhill\code\megaglot\public\index.txt
copy build\index.blade.php D:\Users\Akhill\code\megaglot\resources\views\reactapp.blade.php
copy /Y build\favicon.ico D:\Users\Akhill\code\megaglot\public\favicon.ico
copy /Y build\manifest.json D:\Users\Akhill\code\megaglot\public\manifest.json
del /Q D:\Users\Akhill\code\megaglot\public\precache-manifest.*.js 
copy /Y build\precache-manifest.*.js D:\Users\Akhill\code\megaglot\public\precache-manifest.*.js
copy /Y build\service-worker.js D:\Users\Akhill\code\megaglot\public\service-worker.js
del /Q D:\Users\Akhill\code\megaglot\public\static\js\*.*
del /Q D:\Users\Akhill\code\megaglot\public\static\css\main.*.chunk.*
del /Q D:\Users\Akhill\code\megaglot\public\static\media\*.*
xcopy build\static D:\Users\Akhill\code\megaglot\public\static /Y /S /C /D
