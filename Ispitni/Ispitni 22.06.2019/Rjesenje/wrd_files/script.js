var meni=document.getElementById("Izbornik");
var otvoren=false;
OpenClose=()=>{
    if(otvoren==false){
        meni.style.display="block";
        otvoren=true;
    }
    else{
        meni.style.display="none";
        otvoren=false;
    }
}

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjerite Vas unos !"
);

$("#formaID").validate({
    rules:{
        ime:{
            required:true,
            regex:/^[A-Za-z]+$/
        },
        adresa:{
            required:true,
            regex:/^[A-Za-z]+$/
        },
        pbroj:{
            required:true,
            regex:/^[0-9]{5}$/
        },
        telefon:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages:{
        ime:{
            required:"Ovo polje je obavezno !",
            regex:"Koristite slova a ne brojeve"
        },
        adresa:{
            required:"Ovo polje je obavezno !",
            regex:"Koristite slova a ne brojeve"
        },
        pbroj:{
            required:"Ovo polje je obavezno !",
            regex:"Maximalno i minimalno 5 cifri "
        },
        telefon:{
            required:"Ovo polje je obavezno !",
            regex:"Format +111-11-111-1111 "
        }
    }
})
ValidirajFormu=()=>{
    if(!$("#formaID").valid())
      //alert("Nepravilno uneseni podaci !");
      return false;
    return true;
}
ocistiPrijasnje=()=>{
    document.getElementById("tabelaID").innerHTML=
    "<tr>"+
    "<th>"+"Id Kupca"+"</th>"+
    "<th>"+"Datum"+"</th>"+
    "<th>"+"Ime"+"</th>"+
    "<th>"+"Adresa"+"</th>"+
    "<th>"+"Poštanski broj"+"</th>"+
    "<th>"+"Telefon"+"</th>"+
    "<th>"+"Napomena"+"</th>"+
    "</tr>"
}
ucitajSve=()=>{
    let url="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll";
    fetch(url).then(
        response=>{
            if(response.status!==200){
                alert("Doslo je do greske na servisu: " + response.status);
                return; 
            }
            else{
                response.json().then(
                    narudjbe=>{
                        ocistiPrijasnje();
                        for (const narudjba of narudjbe) {
                            var noviRed=(
                                "<tr>"+
                                "<th>"+narudjba.narudzbaId+"</th>"+
                                "<th>"+new Date(narudjba.datumNarudzbe).toLocaleDateString()+"</th>"+
                                "<th>"+narudjba.dostavaIme+"</th>"+
                                "<th>"+narudjba.dostavaAdresa+"</th>"+
                                "<th>"+narudjba.dostavaPostanskiBroj+"</th>"+
                                "<th>"+narudjba.dostavaTelefon+"</th>"+
                                "<th>"+narudjba.napomena+"</th>"+
                                "</tr>"
                            );
                            document.getElementById("tabelaID").innerHTML+=noviRed;
                        }
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske" +error);
        }
    )
}
dodajKupcaa=()=>{
    if(!ValidirajFormu())
       return;
    var tempNarudba=new Object();
    tempNarudba.dostavaOpstinaID=15;
    tempNarudba.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    tempNarudba.dostavaIme=document.getElementById("dostavaIme").value;
    tempNarudba.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
    tempNarudba.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    tempNarudba.napomena=document.getElementById("napomena").value;
    var SendNarudzba=JSON.stringify(tempNarudba);
    let url="o	http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";
    fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},body:SendNarudzba}).then(
        response=>{
            //Serveri ne rade kako treba tako da treba se maci 'no-cors' i onda kada ih otkljucaju raditi ce i ova funkcija;
            if(response.status!==200){
                alert("Doslo je do greske na servisu: " + response.status);
                return; 
            }
            else{
                response.json().then(
                    narudzba=>{
                        alert("Dodana je nova narudzba: "+narudzba.narudzbaId);
                        ucitajSve();                        
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske " +error);
        }
    )
}
var filter=document.getElementById("filtiranje");
filter.oninput=()=>{
    let ime=document.getElementById("filtiranje").value;
    let url="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Find?name="+ime;
    fetch(url).then(
        response=>{
            if(response.status!==200){
                alert("Doslo je do greske na servisu: " + response.status);
                return; 
            }
            else{
                response.json().then(
                    narudjbe=>{
                        ocistiPrijasnje();
                        for (const narudjba of narudjbe) {
                            var noviRed=(
                                "<tr>"+
                                "<th>"+narudjba.narudzbaId+"</th>"+
                                "<th>"+new Date(narudjba.datumNarudzbe).toLocaleDateString()+"</th>"+
                                "<th>"+narudjba.dostavaIme+"</th>"+
                                "<th>"+narudjba.dostavaAdresa+"</th>"+
                                "<th>"+narudjba.dostavaPostanskiBroj+"</th>"+
                                "<th>"+narudjba.dostavaTelefon+"</th>"+
                                "<th>"+narudjba.napomena+"</th>"+
                                "</tr>"
                            );
                            document.getElementById("tabelaID").innerHTML+=noviRed;
                        }
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske" +error);
        }
    )
}
