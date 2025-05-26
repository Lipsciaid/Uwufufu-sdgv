let filmInGioco = JSON.parse(localStorage.getItem("filmInGioco")) || [];
let cartellaImmagini = localStorage.getItem("cartellaImmagini") || 'images/';
let estensione = localStorage.getItem("estensione") || '.jpg';
let vincitoriRound = [];
let numeroFilm = parseInt(localStorage.getItem("numeroFilm"));
let nFilm = numeroFilm;
let matchNumero = 1;
let clickAbilitato = true; // Flag per controllare i click



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    shuffleArray(filmInGioco);
    mostraSfida();
}

function mostraSfida() {
    clickAbilitato = true; // Riabilita i click all'inizio di ogni nuovo match
    
    let infoRound = document.getElementById("infoRound");
    if (infoRound) {
        infoRound.textContent = "Round " + nFilm + " Match " + matchNumero;
    }

    // Caso finale: un solo vincitore
    if (filmInGioco.length === 0 && vincitoriRound.length === 1) {
        mostraVincitoreFinale(vincitoriRound[0]);
        return;
    }

    // Fine round ma più vincitori
    if (filmInGioco.length === 0 && vincitoriRound.length > 1) {
        preparaNuovoRound();
        return;
    }

    // Mostra i due film corrente
    mostraFilmCorrenti();
}

function mostraVincitoreFinale(vincitore) {
    let film1d = document.getElementById("film1");
    let film2d = document.getElementById("film2");
    let versusText = document.querySelector(".versus");
    let x = document.querySelector(".btn-close");

    film2d.style.display = "none";
    versusText.style.display = "none";
    document.getElementById("infoRound").textContent = "";
    x.style.display = "none";

    film1d.innerHTML = "";
    film2d.innerHTML = "";

    let imgVincitore = document.createElement('img');
    imgVincitore.src = cartellaImmagini + vincitore[2] + estensione;
    imgVincitore.classList.add("imgVinci");

    let titoloVincitore = document.createElement('h2');
    titoloVincitore.textContent = "Il vincitore è: \n" + vincitore[0];
    titoloVincitore.classList.add('titolo-vincitore');

    let bottoneHome = document.createElement('button');
    bottoneHome.classList.add("bottoneHome");
    bottoneHome.textContent = "Torna alla Home";
    bottoneHome.onclick = function() {
        window.location.href = "Scelta.html";
    };

    let containerVincitore = document.createElement('div');
    containerVincitore.classList.add("container-vincitore");

    containerVincitore.appendChild(titoloVincitore);
    containerVincitore.appendChild(imgVincitore);
    containerVincitore.appendChild(bottoneHome);
    document.body.appendChild(containerVincitore);
}

function preparaNuovoRound() {
    filmInGioco = vincitoriRound;
    vincitoriRound = [];
    nFilm = nFilm / 2;
    matchNumero = 1;
    shuffleArray(filmInGioco);
    mostraSfida();
}

function mostraFilmCorrenti() {
    let film1 = filmInGioco[0];
    let film2 = filmInGioco[1];

    let film1d = document.getElementById("film1");
    let film2d = document.getElementById("film2");

    // Animazione fade-out
    film1d.style.opacity = "0";
    film2d.style.opacity = "0";

    setTimeout(() => {
        film1d.innerHTML = "";
        film2d.innerHTML = "";

        let img1 = document.createElement('img');
        img1.src = cartellaImmagini + film1[2] + estensione;

        let img2 = document.createElement('img');
        img2.src = cartellaImmagini + film2[2] + estensione;

        let titoloImg1 = document.createElement('div');
        titoloImg1.textContent = film1[0];
        titoloImg1.style.paddingTop = "15px";
        titoloImg1.style.textAlign = 'center';

        let titoloImg2 = document.createElement('div');
        titoloImg2.textContent = film2[0];
        titoloImg2.style.paddingTop = "15px";
        titoloImg2.style.textAlign = 'center';

        film1d.appendChild(img1);
        film1d.appendChild(titoloImg1);

        film2d.appendChild(img2);
        film2d.appendChild(titoloImg2);

        film1d.style.opacity = "1";
        film2d.style.opacity = "1";

        img1.onclick = function() {
            if (!clickAbilitato) return;
            clickAbilitato = false;
            gestisciClick(img2, film1);
        };

        img2.onclick = function() {
            if (!clickAbilitato) return;
            clickAbilitato = false;
            gestisciClick(img1, film2);
        };

    }, 50);
}

function gestisciClick(imgAvversario, filmVincitore) {
    vincitoriRound.push(filmVincitore);
    imgAvversario.classList.add("fade-out");

    setTimeout(() => {
        filmInGioco.shift();
        filmInGioco.shift();
        matchNumero++;
        mostraSfida();
    }, 500);
}

// Avvia il gioco
startGame();
