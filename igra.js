

const izbaranoSlovo = document.querySelector('#izabrano-slovo');
const btnSlovo = document.querySelector('#btn-slovo');
const formaIgra = document.querySelector('#forma-igra');
const inputDrzava = document.querySelector('#drzava');
const inputGrad = document.querySelector('#grad');
const inputReka = document.querySelector('#reka');
const inputPlanina = document.querySelector('#planina');
const inputZivotinja = document.querySelector('zivotinja');
const inputBiljka = document.querySelector('#biljka');
const inputPredmet = document.querySelector('#predmet');
const kompRezultat = document.querySelector('#komp-rezultat');
const divTimer = document.querySelector('#timer');
const helpText = document.querySelector('#help-text');

let baza = db.collection('pojmovi');


//ovo treba da se sredi jer vec postoji ista u app.js
function formatPojam(pojam) {
    return pojam
    .replace(/\s/g, '')
    .replace(/[^a-zđščžć]+/gi, '')
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()))
    ;
  }

//timer

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        divTimer.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            divTimer.innerHTML = "Vreme je isteklo!!!";
        }
    }, 1000);
}

btnSlovo.onclick = function () {
    var fewMinutes = 60 + 30,
        display = divTimer;
      startTimer(fewMinutes, display);
      helpText.innerHTML = "";
};


//izabrano slovo
let nizSlova = ["A", "B", "V", "G", "D", "Đ", "E", "Ž","Z", "I", "J", "K","L","Lj","M","N","Nj","O","P","R","S","T","Ć","U","F","H","C","Č","Dž","Š"];



btnSlovo.addEventListener('click', ()=>{
    let i = Math.round(Math.random()*29);
    let slovo = nizSlova[i];
    izbaranoSlovo.style.display = "block";
    izbaranoSlovo.innerHTML = slovo;

    //igra komp
    
    let verovatnoca = Math.round(Math.random()*100);

    let niz = [];

    if(verovatnoca < 80){
        baza
        .where(`pocetnoSlovo`, '==', `${slovo}`)
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                niz.push(doc.data());})
                
                for(let i = 0; i <niz.length; i++)
                {
                    if(niz[i].kategorija == 'drzava')
                    {
                        console.log(niz[i].pojam);
                    }
    
                    
                }

                

                /*
                kompRezultat.innerHTML = `
                    <li>Drzava : ${}
                    </li>
                `;
                */
                
            })
            
    .catch(error => {
    console.error("Cannot get documents from collection: ", error);
    });
    }
})


//provera podataka igraca
formaIgra.addEventListener('click', () => {

    let drzava  = formatPojam(inputDrzava.value);
    let grad = formatPojam(inputGrad.value);
    let reka = formatPojam(inputReka.value);
    let planina = formatPojam(inputPlanina.value);
    let zivotinja = formatPojam(inputZivotinja.value);
    let biljka = formatPojam(inputBiljka.value);
    let predmet = formatPojam(inputPredmet.value);
 

    /*
    baza
        .where(`kategorija`, '==', `${drzava}`)
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                ;})
                
            })
            
            .catch(error => {
            console.error("Cannot get documents from collection: ", error);
            })*/
        })
