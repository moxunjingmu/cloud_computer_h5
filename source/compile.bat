@setlocal enabledelayedexpansion 
@echo on

set OLDDIR=%CD%
set D=%~dp0
cd %D%

SET OUT_DIR=%D%\OutDir

SET VERSION_NAME=
SET VERSION_CODE=
SET PLATFORM=

:CheckOpts
@REM Options with no parameters
if "%1" EQU "-h" goto Help
@REM Options that have parameters
if "%1" EQU "-o" (set OUT_DIR=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--out" (set OUT_DIR=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--platform" (set PLATFORM=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--versionCode" (set VERSION_CODE=%~2) && shift && shift && goto CheckOpts
if "%1" EQU "--versionName" (set VERSION_NAME=%~2) && shift && shift && goto CheckOpts


IF [%PLATFORM%] == [] ECHO "NOT PLATFORM" && GOTO Help
IF [%VERSION_CODE%] == [] ECHO "NOT VERSION_CODE" && GOTO Help
IF [%VERSION_NAME%] == [] ECHO "NOT VERSION_NAME" && GOTO Help

SET UNIAPP_BUILD_PATH=%D%dist\build\%PLATFORM%

ECHO ©³©¥ Start Compile ©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥
ECHO ©§
ECHO ©§   Compile Uni-app to ^(%PLATFORM%^) ...
ECHO ©§
ECHO ©§   Build Version Code = %VERSION_CODE%
ECHO ©§   Build Version Name = %VERSION_NAME%
ECHO ©§   UNIAPP_BUILD_PATH = !UNIAPP_BUILD_PATH!
ECHO ©»©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥


@echo on
CALL npm --version
CALL yarn --version

CALL yarn config set registry "https://registry.npm.taobao.org"
CALL yarn config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"

CALL yarn install

CALL yarn run build:%PLATFORM%
@echo off

@REM Create a folder if it doesn't exist, empty it if it already does
if not exist %OUT_DIR% ( md %OUT_DIR%) else (rd /s /Q %OUT_DIR% && md %OUT_DIR%)

XCOPY !UNIAPP_BUILD_PATH! %OUT_DIR%  /s /e /y


CD %OLDDIR%
GOTO EXIT

:Help
echo.
echo compile.bat [--out DIR] [-android] [-h] [-versionCode] [-versionName]
echo.
echo    -h                  Display this help information
echo    --platform          Compile the corresponding platform,`yarn run build:platform`.
echo                        example:    app-plus
echo                                    custom
echo                                    h5
echo                                    mp-360
echo                                    mp-alipay
echo                                    mp-baidu
echo                                    mp-kuaishou
echo                                    mp-qq
echo                                    mp-toutiao
echo                                    mp-weixin
echo                                    quickapp-native
echo                                    quickapp-webview
echo                                    quickapp-webview-huawei
echo                                    quickapp-webview-union
echo.
echo    --out (-o)          Specify an additional output directory for installers
echo    --versionCode       For example, --versionCode 177
echo    --versionName       For example, --versionName 1.0.177
echo.
echo.

:EXIT