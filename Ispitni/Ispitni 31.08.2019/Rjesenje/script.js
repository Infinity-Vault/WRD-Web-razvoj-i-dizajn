$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Provjerite svoj unos !"
);
$("#forma").validate({
  rules: {
    ime: {
      required: true,
      regex: /^[A-Z][A-Za-z ]+[A-Z][A-Za-z ]+$/,
    },
    adresa: {
      required: true,
      regex: /^[A-Za-z ]+$/,
    },
    postanskiBroj: {
      required: true,
      regex: /^[A-Za-z]+$/,
    },
    telefon: {
      required: true,
      regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/,
    },
  },
  messages: {
    ime: {
      required: "Ovo polje je obavezno !",
      regex: "Velika prva slova !",
    },
    adresa: {
      required: "Ovo polje je obavezno !",
      regex: "Bez brojeva !",
    },
    postanskiBroj: {
      required: "Ovo polje je obavezno !",
      regex: "Samo slova !",
    },
    telefon: {
      required: "Ovo polje je obavezno !",
      regex: "Format: +111-11-111-1111 !",
    },
  },
});
obrisiPrijasnjeProizvode = () => {
  document.getElementById("tabelaID").innerHTML =
    "<tr>" +
    "<th>" +
    "Id Proizvod" +
    "</th>" +
    "<th>" +
    "Naziv" +
    "</th>" +
    "<th>" +
    "Cijena" +
    "</th>" +
    "<th>" +
    "Jedinica mjere" +
    "</th>" +
    "<th>" +
    "Like Counter" +
    "</th>" +
    "<th>" +
    "Like" +
    "</th>" +
    "<th>" +
    "Odaberi" +
    "</th>" +
    "</tr>";
};
getAllProizvodi = () => {
  let url =
    "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll";
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        alert("Doslo je do greske na servisu " + response.status);
        return;
      } else {
        response.json().then((proizvodi) => {
          obrisiPrijasnjeProizvode();
          for (const proizvod of proizvodi) {
            var noviRed =
              "<tr>" +
              "<th>" +
              proizvod.proizvodID +
              "</th>" +
              "<th>" +
              proizvod.naziv +
              "</th>" +
              "<th>" +
              proizvod.cijena +
              "</th>" +
              "<th>" +
              proizvod.jedinicaMjere +
              "</th>" +
              "<th>" +
              proizvod.likeCounter +
              "</th>" +
              "<th>" +
              "<button onclick='lajkajProizvod(" +
              proizvod.proizvodID +
              ")'>Like</button>" +
              "</th>" +
              "<th>" +
              "<button onclick='odaberiProizvod(" +
              proizvod.proizvodID +
              ")'>Odaberi</button>" +
              "</th>" +
              "</tr>";
            document.getElementById("tabelaID").innerHTML += noviRed;
          }
        });
      }
    })
    .catch((error) => {
      alert("Doslo je do greske:" + error);
    });
};
getAllProizvodi();
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
          getAllProizvodi(); //Radi refresha podataka
          alert("Lajkali ste proizvod " + lajk.proizvodId + " " + lajk.poruka);
        });
      }
    })
    .catch((error) => {
      alert("Doslo je do greske: " + error);
    });
};
odaberiProizvod = (id) => {
  document.getElementById("proizvodID").value = id;
};
NaruciProizvod = () => {
  if (!$("#forma").valid()) return;
  var temp = new Object();
  temp.dostavaGrad = document.getElementById("dostavaGrad").value;
  temp.dostavaAdresa = document.getElementById("dostavaAdresa").value;
  temp.dostavaIme = document.getElementById("dostavaIme").value;
  temp.dostavaTelefon = parseInt(document.getElementById("dostavaTelefon").value);
  temp.proizvodId = parseInt(document.getElementById("proizvodID").value);
  temp.kolicina = parseInt(document.getElementById("kolicina").value);
  console.log(temp);
  var naruci = JSON.stringify(temp);
  let url ="https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj";
  fetch(url, {
    method: "POST",
    mode: "no-cors",//Posto su serveri zakljucani  ova funkcija ne radi, kada server proradi samo maknuti ovu liniju koda;
    headers: { "Content-Type": "application/json" },
    body: naruci,
  })
    .then((response) => {
      if (response.status !== 200) {
        alert("Doslo je do greske na serveru: " + response.status);
        return;
      } else {
        response.json().then((dodaniProizvod) => {
          alert("Uspjesno dodan proizvod " + dodaniProizvod.proizvodId);
        });
      }
    })
    .catch((error) => {
      alert("Doslo je do nepoznate greske " + error);
    });
};
obrisiPrijasneNarudzbe = () => {
  document.getElementById("narudzbe").innerHTML =
    "<tr>" +
    "<th>" +
    "ID" +
    "</th>" +
    "<th>" +
    "Naziv" +
    "</th>" +
    "<th>" +
    "Cijena" +
    "</th>" +
    "<th>" +
    "Kolicina" +
    "</th>" +
    "<th>" +
    "Dostava Ime" +
    "</th>" +
    "<th>" +
    "Dostava Adresa" +
    "</th>" +
    "<th>" +
    "Telefon" +
    "</th>" +
    "</tr>";
};
getAllNarudzbe = () => {
  let url =
    "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll";
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        alert("Doslo je do greske na serveru: " + response.status);
        return;
      } else {
        response.json().then((narudzbe) => {
          obrisiPrijasneNarudzbe();
          for (const narudzba of narudzbe) {
            var noviRed =
              "<tr>" +
              "<th>" +
              narudzba.proizvodID +
              "</th>" +
              "<th>" +
              narudzba.naziv +
              "</th>" +
              "<th>" +
              narudzba.cijena +
              "</th>" +
              "<th>" +
              narudzba.kolicina +
              "</th>" +
              "<th>" +
              narudzba.dostavaIme +
              "</th>" +
              "<th>" +
              narudzba.dostavaAdresa +
              "</th>" +
              "<th>" +
              narudzba.dostavaTelefon +
              "</th>" +
              "</tr>";
            document.getElementById("narudzbe").innerHTML += noviRed;
          }
        });
      }
    })
    .catch((error) => {
      alert("Doslo je do greske:" + error);
    });
};
getAllNarudzbe();
var filtrirajNarudzbe = document.getElementById("filtiranje2");
filtrirajNarudzbe.oninput = () => {
  var key = document.getElementById("filtiranje2").value;
  let url =
    "https://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Find?name=" +
    key;
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        alert("Doslo je do greske na serveru: " + response.status);
        return;
      } else {
        response.json().then((narudzbe) => {
          obrisiPrijasneNarudzbe();
          for (const narudzba of narudzbe) {
            console.log(narudzba);
            var noviRed =
            //Neke propertije sam druge uzimao jer nije na serveru bilo onij koji su nam trebali ovdje, do servera je;
              "<tr>" +
              "<th>" +
              narudzba.narudzbaId +
              "</th>" +
              "<th>" +
              narudzba.dostavaIme +
              "</th>" +
              "<th>" +
              narudzba.iznosNarudzbe +
              "</th>" +
              "<th>" +
              narudzba.likeCounter +
              "</th>" +
              "<th>" +
              narudzba.dostavaIme +
              "</th>" +
              "<th>" +
              narudzba.dostavaAdresa +
              "</th>" +
              "<th>" +
              narudzba.dostavaTelefon +
              "</th>" +
              "</tr>";
            document.getElementById("narudzbe").innerHTML += noviRed;
          }
        });
      }
    })
    .catch((error) => {
      alert("Doslo je do greske:" + error);
    });
};
