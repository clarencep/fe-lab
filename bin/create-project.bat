@echo off

set PROJECT_NAME=%1

if "%PROJECT_NAME%" == "" (
    echo "Project name should not be empty!"
    goto :end
)

set TPL_PROJECT=%2

if "%TPL_PROJECT%" == "" (
    set TPL_PROJECT=basic
)

cd %~dp0\..

echo Copying template to "%PROJECT_NAME%"...
cp -r "project-templates/%TPL_PROJECT%" "%PROJECT_NAME%"

cd "%PROJECT_NAME%"

echo Installing packages...
cnpm install -d

:end:

