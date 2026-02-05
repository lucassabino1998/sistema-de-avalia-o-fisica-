@echo off
title Sistema Avaliacao Fisica (Final)
color 0A

echo.
echo  =======================================================
echo   INICIANDO SISTEMA (JAVA + REACT)
echo  =======================================================
echo.

:: ----------------------------------------------------------
:: 1. INICIAR O BACKEND (JAVA)
:: ----------------------------------------------------------
echo  [1/4] Procurando o Backend...

:: Tenta primeiro o modo DEV (para pegar alteracoes de codigo)
if exist "pom.xml" (
    echo        Encontrado projeto Java. Iniciando em modo DEV...
    start "JAVA BACKEND" /min cmd /k "mvn spring-boot:run"
) else (
    :: Se nao achar o pom.xml, tenta rodar o JAR que voce ja criou
    echo        Modo DEV nao disponivel. Procurando arquivo .jar...
    if exist "target\avaliacao-0.0.1-SNAPSHOT.jar" (
        echo        Arquivo JAR encontrado! Rodando versao compilada...
        start "JAVA BACKEND" /min java -jar target/avaliacao-0.0.1-SNAPSHOT.jar
    ) else (
        echo  [ERRO] Nao encontrei nem o 'pom.xml' nem o arquivo '.jar' na pasta target.
        echo  Verifique se voce salvou este arquivo na pasta:
        echo  C:\Users\lucas\Downloads\avaliacao\avaliacao
        pause
        exit
    )
)

:: ----------------------------------------------------------
:: 2. INICIAR O FRONTEND (REACT)
:: ----------------------------------------------------------
echo  [2/4] Acessando a pasta FrontEnd...

if exist "FrontEnd" (
    cd FrontEnd
    echo        Iniciando servidor React...
    start "REACT FRONTEND" /min cmd /k "npm run dev"
    cd ..
) else (
    echo  [ERRO] A pasta 'FrontEnd' nao foi encontrada aqui!
    echo  Confira se o nome da pasta eh exatamente 'FrontEnd'.
    pause
    exit
)

:: ----------------------------------------------------------
:: 3. AGUARDAR E ABRIR
:: ----------------------------------------------------------
echo  [3/4] Aguardando 15 segundos para o servidor subir...
timeout /t 15 >nul

echo  [4/4] Abrindo navegador...
start http://localhost:5173

echo.
echo  =======================================================
echo   SISTEMA INICIADO!
echo   Minimize esta janela se quiser, mas nao feche.
echo   Para desligar tudo, feche as janelas pretas menores.
echo  =======================================================
pause