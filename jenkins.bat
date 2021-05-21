@REM  //
@REM  //  jenkins.bat
@REM  //
@REM  //  Created by Gao.xiangyang on 2021/02/23
@REM  //  Copyright (C) 2020 Nanjing Astute Software Technology Co., Ltd. All rights reserved.
@REM  //

@REM 如果需要手动指定版本号，请设置环境变量，覆盖以下参数的默认值
@REM     MAJOR_VERSION
@REM     MINOR_VERSION
@REM     REVISION_VERSION
@REM 如果需要手动指定上传位置，覆盖以下参数的默认值
@REM     REMOTE_LOCATION


@setlocal enabledelayedexpansion
@echo ON

IF [%BUILD_NUMBER%] == [] GOTO EXIT
IF [%JOB_NAME%] == [] GOTO EXIT

SET SSH="C:\Program Files\OpenSSH-Win64\ssh.exe"
SET SCP="C:\Program Files\OpenSSH-Win64\scp.exe"
set ZIP="C:\Program Files\7-Zip\7z.exe"

SET OLDDIR=%CD%
SET D=%~dp0
CD %D%

SET BRANCH=master

IF NOT DEFINED MAJOR_VERSION SET MAJOR_VERSION=1
IF NOT DEFINED MINOR_VERSION SET MINOR_VERSION=1
IF NOT DEFINED REVISION_VERSION SET REVISION_VERSION=%BUILD_NUMBER%

@REM fileser保存版本的文件夹位置默认为分支名称，请设置 BRANCH
IF NOT DEFINED REMOTE_LOCATION SET REMOTE_LOCATION=%BRANCH%

SET IDENTITY=fileserver@192.222.1.150
SET FILEDIR=/home/fileserver/files/jenkins/production-cloudapp/%REMOTE_LOCATION%/%JOB_NAME%

SET VERSION_CODE=
CALL:HANDLER_VERSION_NUMBER %MAJOR_VERSION% %MINOR_VERSION% %REVISION_VERSION% VERSION_CODE

SET VERSION_NAME=%MAJOR_VERSION%.%MINOR_VERSION%.%REVISION_VERSION%

ECHO ┏━ Start Jenkins Build ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ECHO ┃
ECHO ┃   Build Project ^(%JOB_NAME%^) ...
ECHO ┃   
ECHO ┃   Build Branch         = %BRANCH%
ECHO ┃   Build Version Number = %VERSION_CODE%
ECHO ┃   Build Version Name   = %VERSION_NAME%
ECHO ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SET OUT_DIR=%D%JenkinsBuild
CALL compile.bat --out %OUT_DIR% --versionCode %VERSION_CODE% --versionName %VERSION_NAME% -android

CALL :COPY %OUT_DIR% %VERSION_NAME%

CD %OLDDIR%

GOTO:EXIT

@REM Get Version Number, Change the version number to an integer
@REM example:
@REM     SET NUM=
@REM     CALL HANDLER_VERSION_NUMBER 1, 2, 77, NUM
@REM     ECHO NUM = 001002077

:HANDLER_VERSION_NUMBER
    echo %~1
    ::SETLOCAL
    SET MAJOR=%1
    SET MINOR=%2
    SET REVISION=%3

    SET "MAJOR=000%MAJOR%" & Set "MAJOR=!MAJOR:~-3!"
    SET "MINOR=000%MINOR%" & Set "MINOR=!MINOR:~-3!"
    SET "REVISION=000%REVISION%" & Set "REVISION=!REVISION:~-3!"

    echo %MAJOR%
    echo %MINOR%
    echo %REVISION%
    @REM RETURN
    SET "%~4=%MAJOR%%MINOR%%REVISION%"
    ::ENDLOCAL
GOTO:EOF

:COPY
  SET TARGET_DIR=%1
  SET REMOTE_DIR=%2
  IF EXIST "%TARGET_DIR%" (
      ( dir /b /a "%TARGET_DIR%" | findstr . ) > nul && (
        echo %TARGET_DIR% non-empty
        echo %FILEDIR%/latest
        echo %FILEDIR%/%REMOTE_DIR%

        %SSH% %IDENTITY% rm -rf %FILEDIR%/latest
        %SSH% %IDENTITY% mkdir -p %FILEDIR%/latest
        %SSH% %IDENTITY% mkdir -p %FILEDIR%/%REMOTE_DIR%

        %SCP% -r %TARGET_DIR% %IDENTITY%:%FILEDIR%/%REMOTE_DIR%/
        %SCP% -r %TARGET_DIR% %IDENTITY%:%FILEDIR%/latest/

      ) || (
        echo %TARGET_DIR% empty
      )
  )
  EXIT /B 0
GOTO:EOF 

:EXIT