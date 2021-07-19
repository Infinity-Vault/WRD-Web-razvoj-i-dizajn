var meni = document.getElementById("Izbornik");
var nav = document.getElementById("nav");
var content = document.getElementById("wrapper");
var otvoren = false;
openClose = () => {
  if (otvoren == false) {
    meni.style.display = "block";
    nav.style.height = "35%";
    content.style.top = "35%";
    nav.style.transition = "1s";
    otvoren = true;
  } else {
    meni.style.display = "none";
    nav.style.height = "10%";
    content.style.top = "10%";
    nav.style.transition = "0s";
    otvoren = false;
  }
};
odaberiSliku = (key) => {
  if (key == 1) document.getElementById("Slika").value = "Villa Mostar";
  if (key == 2) document.getElementById("Slika").value = "Villa Buna ";
  if (key == 3) document.getElementById("Slika").value = "Villa Vlašić";
  if (key == 1)
    document.getElementById("CijenaPoDanu").value = parseInt("100KM");
  if (key == 2)
    document.getElementById("CijenaPoDanu").value = parseInt("120KM");
  if (key == 3)
    document.getElementById("CijenaPoDanu").value = parseInt("130KM");
};
Racun = () => {
  document.getElementById("racun").value =
    document.getElementById("BrojDana").value *
    document.getElementById("CijenaPoDanu").value;
};
