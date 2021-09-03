$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);
$("#forma").validate({
    rules:
    {
        dostavaIme:
        {
            required:true,
            regex:/^[A-Z][A-Za-z ]+[A-Z][A-Za-z]+$/
        },
        dostavaAdresa:
        {
            required:true,
            regex:/^[A-Za-z]+$/
        },
        dostavaTelefon:
        {
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        },
        dostavaGrad:
        {
            required:true,
            regex:/^[A-Za-z]+$/
        },
        kolicina:
        {
            required:true,
            regex:/^[1-9]+$/
        },
    },
    messages:
    {
        dostavaIme:
        {
            required:"Ovo polje je obavezno popuniti",
            regex:"Dvije rijeci, prva velika slova u svakoj rijeci"
        },
        dostavaAdresa:
        {
            required:"Ovo polje je obavezno popuniti",
            regex:"Samo tekstualni podaci"
        },
        dostavaTelefon:
        {
            required:"Ovo polje je obavezno popuniti",
            regex:"+387-61-322-3121"
        },
        dostavaGrad:
        {
            required:"Ovo polje je obavezno popuniti",
            regex:"Samo tekstualni podaci"
        },
        kolicina:
        {
            required:"Ovo polje je obavezno popuniti",
            regex:"Samo brojevi, kolicina mora biti 1 ili veca"
        }
           
    }
});
obrisiProizvod=()=>{
    document.getElementById("proizvodi").innerHTML=
    "<tr>"+
    "<th>"+
    "ID"+
    "</th>"+
    "<th>"+
    "Naziv"+
    "</th>"+
    "<th>"+
    "cijena/m2"+
    "</th>"+
    "<th>"+
    "Slika"+
    "</th>"+
    "<th>"+
    "Likes"+
    "</th>"+
    "<th>"+
    "Like"+
    "</th>"+
    "<th>"+
    "Odaberi"+
    "</th>"+
    "</tr>";


    
};
getAllProizvod=()=>{
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";

    fetch(adresa).then((response)=>{
        if(response.status!==200){
            alert("Doslo je do greske na servisu"+response.status);
        }
        else{
            response.json().then((prozvodi)=>{
                obrisiProizvod();
                for(const proizvod of prozvodi){
                    var noviRed=
                    "<tr>"+
                    "<td>"+
                    proizvod.proizvodID+
                    "</td>"+
                    "<td>"+
                    proizvod.naziv+
                    "</td>"+
                    "<td>"+
                    proizvod.cijenaPoKvadratu+
                    "</td>"+
                    "<td>"+
                    `<img src='${proizvod.slikaUrl}'></img>`+
                    "</td>"+
                    "<td>"+
                    proizvod.likeCounter+
                    "</td>"+
                    "<td>"+
                    "<button onclick='lajkajProizvod("+proizvod.proizvodID+")'>Like</button>"+
                    "</td>"+
                    "<td>"+
                    `<button onclick="odaberiProizvod(${proizvod.proizvodID})">Odaberi</button>`+
                    "</td>"+
                    "</tr>";
                    document.getElementById("proizvodi").innerHTML+=noviRed;


                }
            });
        }
    }).catch((error)=>{
        alert("Doslo je do greske:"+error);
    });
}
getAllProizvod();
lajkajProizvod = (id) => {
    let url =
      "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId=" +
      id;
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          alert("Doslo je do greske na serveru: " + response.status);
          return;
        } else {
          response.json().then((lajk) => {
            getAllProizvod(); //Radi refresha podataka
            alert("Lajkali ste proizvod " + lajk.proizvodId + " " + lajk.poruka);
          });
        }
      })
      .catch((error) => {
        alert("Doslo je do greske: " + error);
      });
  };
  function odaberiProizvod(id)
  {
    document.getElementById("idProizvoda").value=id;
  //  document.getElementById("nazivProizvoda").value=naziv;

    
    //document.getElementById("nazivProizvoda")
    
    
  };

naruciProizvod=()=>{
    if(!$("#forma").valid())
    {
        return;
    }
    var temp=new Object();
    temp.dostavaIme=document.getElementById("dostavaIme").value;
    temp.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    temp.dostavaGrad=document.getElementById("dostavaGrad").value;
    temp.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    temp.idProizvoda=document.getElementById("idProizvoda").value;
    temp.naruciProizvoda=document.getElementById("nazivProizvoda").value;
    temp.kolicina=document.getElementById("kolicina").value;
    console.log(temp);
    var naruci=JSON.stringify(temp);
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj";
    fetch(adresa,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:naruci,
    }).then((response)=>{
        if(response.status!==200)
        {
            alert("Doslo je do greske na serveru:"+response.status);
            return;

        }
        else{
            response.json().then((dodaniProizvod)=>{
                alert("Proizvod ste dodali"+dodaniProizvod.proizvodId);
            });
        }
    }).catch((error)=>{
        alert("Greska na sistemu"+error);
    });
};
obrisiNarudzbe=()=>{
    $("#narudzbe tbody").empty();
}
getAllNarudzbe=()=>{

    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll";
    fetch(adresa).then((response)=>{
        if(response.status!==200)
        {
            alert("Doslo je do greske na serveru:");
            return;
        }
        else
        {
            response.json().then((narudzbe)=>{
                obrisiNarudzbe();
                for(const narudzba of narudzbe){
                    var noviRed=
                    "<tr>"+
                    "<td>"+
                    narudzba.proizvodID+
                    "</td>"+
                    "<td>"+
                    narudzba.naziv+
                    "</td>"+
                    "<td>"+
                    narudzba.cijenaPoKvadratu+
                    "</td>"+
                    "<td>"+
                    narudzba.kolicina+
                    "</td>"+
                    "<td>"+
                    narudzba.dostavaIme+
                    "</td>"+
                    "<td>"+
                    narudzba.dostavaAdresa+
                    "</td>"+
                    "<td>"+
                    narudzba.dostavaGrad+
                    "</td>"+
                    "<td>"+
                    narudzba.dostavaTelefon+
                    "</td>"+
                    "</tr>";
                    document.getElementById("narudzbe").innerHTML+=noviRed
                    
                }
            });
        }
    }).catch((error)=>{
        alert("Doslo je do greske:"+error);
    });
};
getAllNarudzbe();