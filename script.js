const musicas = [
  { titulo: "Nobody", arquivo: "nobody.mp3" },
  { titulo: "Treat You Better", arquivo: "treat-you-better.mp3" },
  { titulo: "Industry Baby", arquivo: "industry-baby.mp3" },
  { titulo: "I Gotta Feeling", arquivo: "i-gotta-feeling.mp3" },
  { titulo: "Rude", arquivo: "rude.mp3" },
  { titulo: "Believer", arquivo: "believer.mp3" },
  { titulo: "Eenie Meenie", arquivo: "eenie-meenie.mp3" },
  { titulo: "As It Was", arquivo: "as-it-was.mp3" },
  { titulo: "My Way", arquivo: "my-way.mp3" },
  { titulo: "The Nights", arquivo: "the-nights.mp3" },
  { titulo: "Ho Hey", arquivo: "ho-hey.mp3" },
  { titulo: "One On One", arquivo: "one-on-one.mp3" },
  { titulo: "Blinding", arquivo: "blinding.mp3" },
  { titulo: "Rather Be", arquivo: "rather-be.mp3" },
  { titulo: "Sunflower", arquivo: "sunflower.mp3" },
  { titulo: "Hear Me Now", arquivo: "hear-me-now.mp3" },
  { titulo: "Never Let Me Go", arquivo: "never-let-me-go.mp3" },
  { titulo: "Ocean", arquivo: "ocean.mp3" },
  { titulo: "Work", arquivo: "work.mp3" },
  { titulo: "ABCDEFU", arquivo: "abcdefu.mp3" },
  { titulo: "Viva La Vida", arquivo: "viva-la-vida.mp3" },
  { titulo: "Snap", arquivo: "snap.mp3" },
  { titulo: "Story Of My Life", arquivo: "story-of-my-life.mp3" },
  { titulo: "Stitches", arquivo: "stitches.mp3" },
  { titulo: "Love Nwantiti", arquivo: "love-nwantiti.mp3" }
];

const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista");

const progresso = document.getElementById("progresso");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");

let atual = 0;

function carregar(indice) {

    audio.src = musicas[indice].arquivo;

    titulo.textContent = musicas[indice].titulo;

    document.querySelectorAll("#lista li").forEach(item => {
        item.classList.remove("ativa");
    });

    const itemAtual = document.querySelectorAll("#lista li")[indice];

    if(itemAtual){
        itemAtual.classList.add("ativa");
    }
}

function tocar() {
    audio.play();
}

function pausar() {
    audio.pause();
}

function proxima() {

    atual++;

    if(atual >= musicas.length){
        atual = 0;
    }

    carregar(atual);

    tocar();
}

function anterior() {

    atual--;

    if(atual < 0){
        atual = musicas.length - 1;
    }

    carregar(atual);

    tocar();
}

musicas.forEach((musica, index) => {

    const li = document.createElement("li");

    li.textContent = musica.titulo;

    li.addEventListener("click", () => {

        atual = index;

        carregar(index);

        tocar();

    });

    lista.appendChild(li);

});

audio.addEventListener("ended", () => {

    proxima();

});

audio.addEventListener("loadedmetadata", () => {

    tempoTotal.textContent =
        formatarTempo(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    const porcentagem =
        (audio.currentTime / audio.duration) * 100;

    progresso.value = porcentagem || 0;

    tempoAtual.textContent =
        formatarTempo(audio.currentTime);

});

progresso.addEventListener("input", () => {

    const tempo =
        (progresso.value / 100) * audio.duration;

    audio.currentTime = tempo;

});

function formatarTempo(segundos){

    const min = Math.floor(segundos / 60);

    const seg = Math.floor(segundos % 60);

    return `${min}:${seg < 10 ? "0" : ""}${seg}`;
}

carregar(0);