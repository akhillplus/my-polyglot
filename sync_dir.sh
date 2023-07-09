projectName=${PWD##*/}  # to assign to a variable
projectName=${projectName:-/}     # to correct for the case where PWD=/

rsync -a ../$projectName /mnt/g/work/PHP/ --exclude='/.git' --filter="dir-merge,- .gitignore" --progress