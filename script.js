const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd0c6cf3b81msh6b833c92b728499p1d237fjsn7203e793019d',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

let carregou = 4;
// Define o elemento pai antes de chamar a função setarValores()
const divPai = document.querySelector('.jogos');

// Chama a função setarValores() passando o elemento pai como parâmetro
setarValores(divPai);

function setarValores(pai) {
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(response => {
    const divs = pai.querySelectorAll('.selecao');
    for (let i = 0; i < divs.length; i++) {
      const divAtual = divs[i];
      const titles = response.map(game => game.title);
        const photos = response.map(game => game.thumbnail);
        const description = response.map(game => game.short_description);
        const url = response.map(game => game.game_url);
        const genre = response.map(game => game.genre);
      divAtual.querySelector('.nomedojogo').textContent = titles[i];
      divAtual.querySelector('.fotodojogo').src = photos[i];
      divAtual.querySelector('.descricao').textContent = description[i];
      divAtual.querySelector('.jogobutton').href = url[i];
      divAtual.querySelector('.genero').textContent = `Genre: ${genre[i]}`;
    }})
	.catch(err => console.error(err));  
  }


document.querySelector('.loadmore').addEventListener('click',carregarapi);

function carregarapi(){
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(response => {
		const titles = response.map(game => game.title);
        const photos = response.map(game => game.thumbnail);
        const description = response.map(game => game.short_description);
        const url = response.map(game => game.game_url);
        const genre = response.map(game => game.genre);
        criarapi(titles,photos,description,url,genre);
	})
	.catch(err => console.error(err));  
}

function criarapi(titles,photos,description,url,genre){
    const divPai = document.querySelector('.jogos');
    const divOriginal = divPai.querySelector('.selecao');
    for (let i = 0; i < 4; i++) {
        const novaDiv = divOriginal.cloneNode(true);
        novaDiv.querySelector('.nomedojogo').textContent = titles[carregou];
        novaDiv.querySelector('.fotodojogo').src = photos[carregou];
        novaDiv.querySelector('.descricao').textContent = description[carregou];
        novaDiv.querySelector('.jogobutton').href = url[carregou];
        novaDiv.querySelector('.genero').textContent = `Genre: ${genre[carregou]}`;
        carregou++;    
        divPai.appendChild(novaDiv);
    }
}