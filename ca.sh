function htmlEscape () {
    local s
    s=${1//&/&amp;}
    s=${s//</&lt;}
    s=${s//>/&gt;}
    s=${s//'"'/&quot;}
 #   s=${s/'"'"'/\&#39;}
    printf -- %s "$s"
}
#copy /Y build\index.html build\index.blade.php
cp build/index.html build/index.blade.php
KEY="<title>React App</title>"
SUB_KEY="<title>Megaglot</title>"
# KEY=$(htmlEscape "$KEY")
# SUB_KEY=$(htmlEscape "$SUB_KEY")
echo $KEY $SUB_KEY
#powershell -Command "(gc build\index.blade.php) -replace '<title>React App</title>', '<title>Megaglot</title>' | Out-File build\index.blade.php -Encoding ASCII"
sed -i -e "s|$KEY|$SUB_KEY|" build/index.blade.php
# copy build\index.blade.php d:\Users\Akhill\code\megaglot\public\index.txt
cp build/index.blade.php ../../public/index.txt
# copy build\index.blade.php D:\Users\Akhill\code\megaglot\resources\views\reactapp.blade.php
cp build/index.blade.php ../views/reactapp.blade.php
# copy /Y build\favicon.ico D:\Users\Akhill\code\megaglot\public\favicon.ico
cp build/favicon.ico ../../public/favicon.ico
# copy /Y build\manifest.json D:\Users\Akhill\code\megaglot\public\manifest.json
cp build/manifest.json ../../public/manifest.json
# del /Q D:\Users\Akhill\code\megaglot\public\precache-manifest.*.js 
rm ../../public/precache-manifest.*.js
# copy /Y build\precache-manifest.*.js D:\Users\Akhill\code\megaglot\public\precache-manifest.*.js
cp build/precache-manifest.*.js ../../public/precache-manifest.*.js
# copy /Y build\service-worker.js D:\Users\Akhill\code\megaglot\public\service-worker.js
cp build/service-worker.js ../../public/service-worker.js
# del /Q D:\Users\Akhill\code\megaglot\public\static\js\*.*
rm ../../public/static/js/*.*
# del /Q D:\Users\Akhill\code\megaglot\public\static\css\main.*.chunk.*
rm ../../public/static/css/main.*.chunk.*
# del /Q D:\Users\Akhill\code\megaglot\public\static\media\*.*
rm ../../public/static/media/*.*
# xcopy build\static D:\Users\Akhill\code\megaglot\public\static /Y /S /C /D
cp -a build/static/. ../../public/static/