const { Builder, By, Key, until } = require('selenium-webdriver');

async function medirTempoDeCarregamento(url) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const inicio = Date.now();
        await driver.get(url);
        await driver.wait(until.elementLocated(By.tagName('body')), 10000); 
        const fim = Date.now();
        const tempoCarregamento = fim - inicio;
        console.log(`O tempo de carregamento para ${url} foi de ${tempoCarregamento} ms.`);
    } catch (error) {
        console.error('Erro durante a medição de tempo de carregamento:', error);
    } finally {
        await driver.quit();
    }
}

async function realizarTestesDeDesempenho() {
  
    const urls = [
        'http://localhost:3000/page1',
        'http://localhost:8800/page2',
      
    ];

    for (let url of urls) {
        await medirTempoDeCarregamento(url);
    }
}


realizarTestesDeDesempenho();
