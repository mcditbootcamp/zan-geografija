const forma =document.querySelector('#forma');
const inputSlovo = document.querySelector('#slovo');
const inputKategorija = document.querySelector('#kategorija');
const inputPojam = document.querySelector('#pojam');
const inputIme = document.querySelector('#ime');
const poruka = document.querySelector('#poruka');

//funkcija za pocetno slovo
function slovo(rec){
    let str = rec.slice(0,1);
    return str;
}

//funkcija za promenu pojma(uvek prvo slovo veliko ostala mala) za upis u bazu 
export function formatPojam(pojam) {
    return pojam
    .replace(/\s/g, '')
    .replace(/[^a-zđščžć]+/gi, '')
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()))
    ;
  }

  //funkcija za proveru upisa
  function sadrziPojam(pojam, kategorija, lista) {
    return lista.some(elem => elem.pojam === pojam && elem.kategorija === kategorija);
  }

forma.addEventListener('submit', event => {
    event.preventDefault();

    
    let kategorija = inputKategorija.value;
    let pojam = formatPojam(inputPojam.value);
    let korisnik = localStorage.getItem('user');
    let date = new Date();
    let pocetnoSlovo = slovo(pojam);

    const provera = db.collection('pojmovi');
    
    let niz =[];

    provera.get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    niz.push(doc.data())
                })
                //provera da li isti pojam iz iste kategorije postoji u bazi
                let postoji = sadrziPojam(pojam, kategorija, niz);

                if(!postoji){
                    provera.doc().set({
                        pocetnoSlovo: pocetnoSlovo,
                        kategorija: kategorija,
                        pojam: pojam,
                        korisnik: korisnik,
                        vreme: firebase.firestore.Timestamp.fromDate(date)
                    })
                    .then(() => {
                        poruka.innerHTML = `Pojam <b>${pojam}</b> na slovo <b>${pocetnoSlovo}</b> iz kategorije <b>${kategorija}</b> je dodat u bazu!`;
                    })
                    .catch(error => {
                        poruka.innerHTML = `Greska prilikom dodavanja: ${error}`;
                    });
                }
                else{
                    poruka.innerHTML = `Pojam <b>${pojam}</b> iz kategorije <b>${kategorija}</b> vec postoji u bazi!`;
                }
                })
    .catch(error => {
        console.error("Cannot get documents from collection: ", error);
    });
    forma.reset();
});



