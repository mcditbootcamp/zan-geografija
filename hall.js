const rezultat = document.querySelector('#rezultat');

window.addEventListener('load', () => {    
    let niz =[];  

    db.collection('pojmovi')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        niz.push(doc.data())
                    })

                    //brojanje korisnika
                    const result = [...niz.reduce( (mp, o) => {
                        if (!mp.has(o.korisnik)) mp.set(o.korisnik, { ...o, count: 0 });
                        mp.get(o.korisnik).count++;
                        return mp;
                    }, new Map).values()];

                    //sortiranje
                    result.sort(function(a, b) { 
                        return (b.count - a.count) || a.korisnik.localeCompare(b.korisnik);})
                
                    //prikaz
                    for(let i = 0; i < result.length; i++){
            
                        rezultat.innerHTML += `
                        <li> 
                        <span>${result[i].korisnik}</span>-->
                        <span>${result[i].count}</span>
                        </li>`;
                    }})
                .catch(error => {
                    console.error("Error getting documents: ", error);
                });})