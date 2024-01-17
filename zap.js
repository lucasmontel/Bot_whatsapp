const puppeteer = require("puppeteer");
//Aqui ficará nossos cookies e etc
const cache = __dirname + "/cache";
const url = "https://web.whatsapp.com/";
//Input de messagem
const editor = "div[class='_3Uu1_']";
//Contato
const contactName = "Nome da Pessoa";
//Pesquisa
const search = "div[tabindex='3']";
const messagem = `Olá, Tudo bem?`;
const quantidade_msg = 1;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: cache,
  });
  console.log("Browser Iniciado!");

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  /*Assim o navegador informa ao servidor web, o navegador do usuário, o sistema operacional,
  dando detalhes de cada um deles, o simula uma pessoa/usuário comum, ficando dificil para sermos
  identificados como bot
  */

  await page.goto(url);

  //Antes de tomar qualquer ação, carregue toda a página
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  console.log("Leia o QR Code");

  //Espere mais um pouco por garantia.
  console.log("Carregando...");
  await page.waitForTimeout(10000);
  console.log("Bot Iniciado :]");
  //Insira na Pesquisa o contato e com delay = 100;
  await page.type(search, contactName, { delay: 100 });

  //Clique no contato(E ele será clicado quando aparecer, após a pesquisa)
  await page.click(`span[title='${contactName}']`);

  for (let i = 0; i < quantidade_msg; i++) {
    //Com o evaluate podemos manipular o DOM, no contexto da página(Contexto:"Estamos no Input")
    await page.type(editor, messagem, { delay: 100 });
    await page.keyboard.press("Enter");
  }
})();
