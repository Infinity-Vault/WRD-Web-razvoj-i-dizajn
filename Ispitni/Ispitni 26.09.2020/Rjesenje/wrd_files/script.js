$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);
$(".zaFormu").validate({
    rules:
    {
       Ime:
       {
           required:true,
           regex:/^[A-Z][A-z]+\s[A-Z][A-z]+$/
       },
       Adresa: 
       {
        required:true,
        regex: /^[A-z]+$/
       },
       Grad:
       {
           required:true,
           regex:/^[A-Za-z]+$/
       },
       Id:
       {
           required:true,
           regex:/^ID[/]\d{3}-\d{3}-[A-Z]{3}$/
       } 

    },
    messages:
    {
        Ime:
        {
            required:"Ovo polje je obavezno!",
            regex:"Moraju biti tekstualni podaci, dvije rijeci, prva velika slova u svakoj rijeci"
        },
        Adresa: 
        {
            required: "Ovo polje je obavezno!",
            regex: "Jedna ili vise rijeci, razmak"
        },
        Grad:
        {
            required:"Ovo polje je obavezno!",
            regex:"Tekstualni podaci"
        },
        Id:
        {
            required:"Ovo polje je obavezno!",
            regex:"Format: ID/111-222-ABC"
        }

    }
});
var sviProizvodi;
napraviRedove=(podaci)=>
{
    return`
    <tr>
    <th>ID</th>
    <th>Naziv</th>
    <th>Cijena</th>
    <th>Slika</th>
    <th>Broj like</th>
    </tr>
    `
   
}
ucitajProzore=()=>
{
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";
    fetch(adresa).then((response)=>{
        if(response.status!==200)
        {
            alert("Doslo je do greske "+response.status);
            return;
        }
        else
        {
            response.json().then((proizvodi)=>{
                napraviRedove(proizvodi);
                sviProizvodi=proizvodi;
                for(const proizvod of proizvodi)
                {
                    var noviRed=
                    `<tr>
                    <td>${proizvod.proizvodID}</td>
                    <td>${proizvod.naziv}</td>
                    <td>${proizvod.cijenaPoKvadratu}</td>
                    <td><img src="${proizvod.slikaUrl}"></td>
                    <td>${proizvod.likeCounter}</td>
                    </tr>`;
                    document.getElementById("tabelaProizvodi").innerHTML+=noviRed;
                }
            });
        }
    }).catch((error)=>{
        alert("Doslo je do greske: "+error);
    });
};
najskupljiProizvod=()=>
{
    var najskuplji=0;
    let naziv;
    for(let i=0;i<sviProizvodi.length; i++)
    {
        if(najskuplji<sviProizvodi[i].cijenaPoKvadratu)
        {
            najskuplji=sviProizvodi[i].cijenaPoKvadratu;
            naziv=sviProizvodi[i].naziv;
        }
    }
    alert("Naziv proizvoda: "+naziv+" cijena je "+najskuplji);
}
srednjaCijena=()=>
{
    var prosjekCijena=0;
    let naziv;
    for(var i=0; i<sviProizvodi.length; i++)
    {
        prosjekCijena+=sviProizvodi[i].cijenaPoKvadratu;
    }
    if(sviProizvodi.length>0)
    {
        prosjekCijena=prosjekCijena/sviProizvodi.length;
    }
    alert("Prosjecna cijena svih proizvoda iznosi: "+prosjekCijena+" KM");
}
$("#posalji").on("click",function(){
    
    var saljiPoruku={
        Ime:$("#Ime").val(),
        Adresa:$("#Adresa").val(),
        Grad:$("#Grad").val(),
        LicniBrojKupca:$("#LicniBrojKupca").val(),
    }
    let adresa="https://onlineshop.wrd.app.fit.ba/s/api/ispit20190622/Narudzba/Dodaj";
    fetch(adresa,{
        method:'POST',
        headers:
        {
            'Content-Type': 'application/json', 
        },
        body:JSON.stringify(saljiPoruku)
    }).then((response)=>{
        if(response.status!==200)
        {
            alert("Server javlja gresku "+ response.statusText);
            return;
        }
        response.json().then(x=>{
            popuniPodatke(x);
        });
    }).catch((error)=>{
        console.error('Error',error);
    });
})