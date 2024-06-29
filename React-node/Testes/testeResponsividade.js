const { Builder, By, Key, until } = require('selenium-webdriver');

async function testarResponsividade(url, tamanhoDaJanela) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().setSize(tamanhoDaJanela.width, tamanhoDaJanela.height);
        await driver.get(url);
        
        console.log(`Teste de responsividade para ${url} (${tamanhoDaJanela.width}x${tamanhoDaJanela.height}) concluído.`);
    } catch (error) {
        console.error('Erro durante o teste de responsividade:', error);
    } finally {
        await driver.quit();
    }
}

async function realizarTestesDeResponsividade() {
    
    const urls = [
        'http://localhost:3000',
        
    ];

    
    const tamanhosDaJanela = [
        { width: 320, height: 480 }, // Exemplo: iPhone SE
        { width: 768, height: 1024 }, // Exemplo: iPad
        { width: 1024, height: 768 }, // Exemplo: Tablet
        { width: 1440, height: 900 }, // Exemplo: Laptop
        { width: 1920, height: 1080 }, // Exemplo: Desktop
        
    ];

    for (let url of urls) {
        for (let tamanhoDaJanela of tamanhosDaJanela) {
            await testarResponsividade(url, tamanhoDaJanela);
        }
    }
}

realizarTestesDeResponsividade();
