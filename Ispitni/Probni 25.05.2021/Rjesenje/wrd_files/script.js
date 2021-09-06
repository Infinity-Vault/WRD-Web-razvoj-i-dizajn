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
            regex:/^[A-Za-z ]+[A-Za-z]+$/
        },
        Adresa:
        {
            required:true,
            regex:/^[A-Za-z]+$/
        },
        Grad:
        {
            required:true,
            regex:/^[A-Za-z]+$/
        },
        Telefon:
        {
            required:true,
            regex:/^\+\d{3}-\d{2}-\d{3}-\d{4}$/
        },
        brojIndexa:
        {
            required:true,
            regex:/^\d{6}$/
        },
    },
    messages:
    {
        Ime:
        {
            required:"Ovo polje je obavezno",
            regex:"Tekstualni podaci, dvije rijeci, prva velika slova u svakoj rijeci"
        },
        Adresa:
        {
            required:"Ovo polje je obavezno",
            regex:"Samo tekstualni podaci"
        },
        Grad:
        {
            required:"Ovo polje je obavezno",
            regex:"Samo tekstualni podaci"
        },
        Telefon:
        {
            required:"Ovo polje je obavezno",
            regex:"format: +111-11-111-1111"
        },
        brojIndexa:
        {
            required:"Ovo polje je obavezno",
            regex: "numericki, 6 cifara"
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
ucitajSlike=()=>
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
najviseLajkova=()=>
{
    
   var najveci=0;
   let naziv;
   for(let i=0; i<sviProizvodi.length; i++)
   {
       if(najveci<sviProizvodi[i].likeCounter)
       {
           najveci=sviProizvodi[i].likeCounter;
           naziv=sviProizvodi[i].naziv;
       }
   }
   alert("Naziv: "+naziv+ " broj lajkova: "+najveci);
}
najjeftinijiProizvod=()=>
{
   let najjeftiniji=1000000;
   let naziv;
   for(let i=0; i<sviProizvodi.length; i++)
   {
       if(najjeftiniji>sviProizvodi[i].cijenaPoKvadratu)
       {
           najjeftiniji=sviProizvodi[i].cijenaPoKvadratu;
           naziv=sviProizvodi[i].naziv;
       }
   }
   alert("Cijena najjeftinijeg: "+najjeftiniji+", a naziv: "+naziv);
}
$("#prijava").on("click",function(){

    var posaljiPodatke={
        Ime:$("#dostavaIme").val(),
        Adresa:$("#dostavaAdresa").val(),
        Grad:$("#dostavaGrad").val(),
        Telefon:$("#dostavaTelefon").val(),
        brojIndexa:$("#dostavaIndex").val(),

    }
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj";
    fetch(adresa,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json', 
        },
        body:JSON.stringify(posaljiPodatke),
    }).then((response)=>{
        if(response.status!==200)
        {
            alert("Server javlja gresku: "+response.status);
            return;
        }
        response.json().then(x=>{
            console.log("Uspjenso",x);
            popuniNarudzbe(x);
            $("#forma")[0].reset();
        });
    }).catch((error)=>{
        console.error('Error: ',error);
    });

    

});
