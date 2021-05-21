@setlocal
@echo on

@REM compile.bat --out D:\ASTUTE\BASE_CODE\Production-CloudApp\cloudapp-receiver-mobile\outdir --versionCode 177 --versionName 1.0.177 -android

@REM This script is intended for Jenkins calls and distribution used to compile `cloudapp-receiver-mobile`.
@REM To use it to build alternative releases, you should clone this file
@REM and modify the following three parameters.

set OLDDIR=%CD%
set D=%~dp0

set ZIP="C:\Program Files\7-Zip\7z.exe"

CD %D%

SET UNIAPP_PROJECT_PATH=%D%\source

SET PLATFORM_PATH=%D%\platform
SET OUT_DIR=%D%\OutDir
SET BUILD_ANDROID=
SET VERSION_NAME=
SET VERSION_CODE=


:CheckOpts
@REM Options with no parameters
if "%1" EQU "-h" goto Help
if "%1" EQU "-android" (set BUILD_ANDROID=1) && shift && goto CheckOpts
@REM Options that have parameters
if "%1" EQU "-o" (set OUT_DIR=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--out" (set OUT_DIR=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--versionCode" (set VERSION_CODE=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--versionName" (set VERSION_NAME=%~2) && shift && shift && goto CheckOpts


IF [%VERSION_CODE%] == [] GOTO Help
IF [%VERSION_NAME%] == [] GOTO Help


if defined BUILD_ANDROID (

    ECHO ©³©¥ Start BUILD_ANDROID ©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥
    ECHO.
    ECHO    OUT_DIR %OUT_DIR%
    ECHO    VERSION_CODE %VERSION_CODE%
    ECHO    VERSION_NAME %VERSION_NAME%
    ECHO ©»©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥

    if not exist %OUT_DIR% ( md %OUT_DIR%) else (rd /s /Q %OUT_DIR% && md %OUT_DIR%)

    call %UNIAPP_PROJECT_PATH%\compile.bat --platform app-plus --out %OUT_DIR%\uniapp --versionCode %VERSION_CODE% --versionName %VERSION_NAME%
    call %PLATFORM_PATH%\Android\compile.bat --out %OUT_DIR%\Android --webdir %OUT_DIR%\uniapp --versionCode %VERSION_CODE% --versionName %VERSION_NAME%

    %ZIP% a -tzip %OUT_DIR%\uniapp-app-plus.zip %OUT_DIR%\uniapp\**
    rd /s /Q %OUT_DIR%\uniapp
)

CD %OLDDIR%
GOTO EXIT

:Help
echo compile.bat [--out DIR] [-android] [-h] [-versionCode]
echo.
echo    -h                  Display this help information
echo    -android            Run tests for Android installers
echo    --out (-o)          Specify an additional output directory for installers
echo    --versionCode       For example, --versionCode 177
echo    --versionName       For example, --versionName 1.0.177
echo.
echo.

:EXIT