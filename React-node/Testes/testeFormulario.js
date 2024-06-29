const { Builder, By, Key, until } = require('selenium-webdriver');
//require ("chromedriver");


(async function teste2() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000/'); 

    
    await driver.findElement(By.name('nome')).sendKeys('João da Silva');
    await driver.findElement(By.name('email')).sendKeys('joao@example.com');
    await driver.findElement(By.name('fone')).sendKeys('19982335566');
    await driver.findElement(By.name('data_nascimento')).sendKeys('01/01/2000');

    
    let submitButton = await driver.findElement(By.css('button'));
    await submitButton.click();

    

    console.log('Teste de preenchimento de formulário concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante a execução do teste:', error);
  } finally {
    await driver.quit();
  }
})();

