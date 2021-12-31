const baseUrl ='http://localhost:3000';
let pokemonAdded = [];


const homeLink = document.getElementById('home-page-link');
const viewFavPokemonLink = document.getElementById('view-fav-pokemon');
const inputPokemonLink = document.getElementById("input-link");
const mainDiv = document.getElementById('main');
const nameInput = document.getElementById('name')
const numberInput = document.getElementById('number')
const regionInput = document.getElementById('region')


const homePageLinkEvent = () => {
    homeLink.addEventListener('click', () => {
        renderHomePage();
    })
}

const viewFavPokemonLinkEvent = () => {
    viewFavPokemonLink.addEventListener('click', () => {
        viewPokemon();
    })
}

const inputFavPokemonLinkEvent = () => {
    inputPokemonLink.addEventListener('click', () => {
        loadPokemonForm();

    })
}

const submitFormEvent = e => {
    e.preventDefault()
    fetch(baseUrl + '/favorites', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            number: numberInput.value,
            region: regionInput.value
        })
    })
    .then(resp => resp.json())
    .then(pokemon => {
        viewPokemon();
    })
        
    
}

//Renders favorite Pokemon
const viewPokemon =  async () => {
    await fetchPokemon();
    mainDiv.innerHTML = '';
    const h1 = document.createElement('h1')
    h1.innerText = "Favorite Pokemon: "
    mainDiv.appendChild(h1)
    pokemonAdded.forEach(pokemon => {
        const h4 = document.createElement('h4')
        h4.innerText = `${pokemon.name}`
        mainDiv.appendChild(h4)
    })

    
}

//Load Pokemon Form 
const loadPokemonForm = () => {
    mainDiv.innerHTML = ''
    const h1 = document.createElement('h1')
    const form = document.createElement('form')
    const nameDiv = document.createElement('div')
    const nameInput = document.createElement('input')
    const nameLabel = document.createElement('label')
    const numberDiv = document.createElement('div')
    const numberInput = document.createElement('input')
    const numberLabel = document.createElement('label')
    const regionDiv = document.createElement('div')
    const regionInput = document.createElement('input')
    const regionLabel = document.createElement('label')
    const submitButton = document.createElement('input')

    h1.className = 'center-align';
    nameDiv.className = 'input-field';
    numberDiv.className = 'input-field';
    regionDiv.className = 'input-field';
    submitButton.className = 'waves-effect waves-light btn';

    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('type', 'text');
    nameLabel.setAttribute('for', 'name');

    numberInput.setAttribute('id', 'number');
    numberInput.setAttribute('type', 'text');
    numberLabel.setAttribute('for', 'number');

    regionInput.setAttribute('id', 'region');
    regionInput.setAttribute('type', 'text');
    regionLabel.setAttribute('for', 'region');

    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('value', "Submit Pokemon")

    h1.innerText = "Enter Pokemon Info: ";
    nameLabel.innerText = "Name: ";
    numberLabel.innerText = "Number: ";
    regionLabel.innerText = "Region: ";

    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(nameLabel);
    numberDiv.appendChild(numberInput);
    numberDiv.appendChild(numberLabel);
    regionDiv.appendChild(regionInput);
    regionDiv.appendChild(regionLabel);

    form.appendChild(nameDiv);
    form.appendChild(numberDiv);
    form.appendChild(regionDiv);
    form.appendChild(submitButton);

    form.addEventListener('submit', submitFormEvent);

    mainDiv.appendChild(h1);
    mainDiv.appendChild(form);





}



const fetchPokemon =  async () => {
    const resp = await fetch(baseUrl + '/favorites');
    const data = await resp.json();
    pokemonAdded = data;
    
}


//Renders Home Page
const renderHomePage= () => {
    mainDiv.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.classList.add('center-align');
    h1.innerText = "What are your favorite Pokemon?";
    mainDiv.appendChild(h1);
}

//When the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage(); // removing this line makes the "What are your 3 favorite Pokemon? disappear"
    homePageLinkEvent();
    viewFavPokemonLinkEvent();
    inputFavPokemonLinkEvent();
    
    
    
})