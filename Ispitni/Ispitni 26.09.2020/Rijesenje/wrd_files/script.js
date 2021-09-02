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
           regex: /^ID[/]\d{3}-\d{3}-[A-Z]{3}$/
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
function napraviRedove(obj)
{
    return `
    <tr>
    <td>${obj.proizvodID}</td>
    <td>${obj.naziv}</td>
    <td>${obj.cijenaPoKvadratu}</td>
    <td><img src="${obj.slikaUrl}"></td>
    <td>${obj.likeCounter}</td>
    </tr>`
}
function ucitajProizvode(obj)
{
    $("#tabelaProizvodi tbody").empty();
    for(var i in obj)
    {
        document.querySelector("#tabelaProizvodi tbody").innerHTML+=napraviRedove(obj[i]);
    }
}
function ucitajPodatke(func)
{
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";

    fetch(adresa).then((r)=>{
        if(r.status!=200)
        {
            alert("Doslo je do greske: "+r.status);
            return;
        }
        r.json().then((x)=>{
            func(x);
        });
    }).catch((error)=>{
        console.log(error);
    });
}
function najvisaCijena(obj)
{
    cijena=[];
    var pozicija=0;
    for(var i in obj)
    {
        cijena+=obj[i].cijenaPoKvadratu;
    }
    for(var i in cijena)
    {
        if(cijena[pozicija]>cijena[i])
        {
            pozicija=i;
        }
    }
    alert("Najskuplji proizvod: "+obj[pozicija].naziv+" "+obj[pozicija].cijenaPoKvadratu);

}
function srednjaCijena(obj)
{
    var prosjek=0;
    var brojac=0;
    for(var i in obj)
    {
        prosjek+=obj[i].cijenaPoKvadratu;
        brojac++;
    }
    prosjek/=brojac;

    alert("Prosjek cijena: "+prosjek);
}

document.getElementById("mojeDugme").onclick = function() {

    const order={
        Ime:$("#Ime").val(),
        Adresa:$("#Adresa").val(),
        Grad:$("#Grad").val(),
        Id:$("#Id").val(),
        Upit:$("#Upit").val(),
    }
    let adresa="http://onlineshop.wrd.app.fit.ba/api/Ispit20210601/Add";
    fetch(adresa,{
        method:'POST',
        mode:'cors',
        headers:{
            cors:'cors',
            'Content-Type': 'application/json', 
        },
        body:JSON.stringify(order),
    }).then((r)=>{
        if(r.status!=200)
        {
            alert("Server javlja gresku: "+r.statusText)
            return;
        }
    }).catch((error)=>
    {
       console.error('Error:',error);
    });
}