bun install
python3 fix_dependency.py
bun run build
mkdir dist\resources
mkdir dist\screenshots
XCOPY resources dist\resources /S /Y
XCOPY screenshots dist\screenshots /S /Y
echo sexe