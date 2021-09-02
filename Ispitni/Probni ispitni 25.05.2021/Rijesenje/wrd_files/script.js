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
            regex:/^[A-Z][A-Za-z ]+[A-Za-z ]+$/
        },
        Telefon:
        {
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/ 
        },
        brIndexa:
        {
            required:true,
            regex:/^[0-9]{6}$/
        }
    },
    messages:
    {
        Ime:
        {
            required:"Ovo polje je obavezno",
            regex:"Prvo veliko slovo"
        },
        Telefon:
        {
            required:"Ovo polje je obavezno",
            regex:"Broj telefona samo u formatu:+387-61-222-2222"
        },
        brIndexa:
        {
            required:"Ovo polje je obavezno",
            regex:"6 brojava npr: 100200"
        }

    }
});

function napraviRedove(obj)
{
    return`
    <tr>
    <td>${obj.proizvodID}</td>
    <td>${obj.naziv}</td>
    <td>${obj.cijenaPoKvadratu}</td>
    <td><img src="${obj.slikaUrl}"></td>
    <td>${obj.likeCounter}<input type="button" value="Like" onclick="Like(${obj.proizvodID})"></td>
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
function posaljiProizvode(func)
{
    let adresa="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";

    fetch(adresa).then((r)=>{
        if(r.status!=200)
        {
            alert("Server javlja gresku: "+r.statusText);
            return
        }
        r.json().then((x)=>{
            return Promise.resolve(func(x));
        });
    }).catch((error)=>{
       console.log(error);
    });
}
function Like(id)
{
    url_Like= `http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId=${id}`;

    fetch(url_Like).then((r)=>{
        if(r.status!=200){
            alert("Server javlja gresku: "+r.statusText);
            return;
        }
        r.json().then((x)=>{
            x.likeCounter++;
            posaljiProizvode(ucitajProizvode);

        });
    }).catch((error)=>{
         console.log(error);
    });
}
function NajLike(obj)
{
    likes = [];//like niz oznacimo ga da je prazan
    var index = 0;//pozicija na kojoj se nalazi nas proizvod sa najvise like oznacimo sa 0  i onda prolazimo kroz petlju

    for (var i in obj) {
        likes[i] = obj[i].likeCounter;
    }

    for (var i in likes) {
        if (likes[index] < likes[i]) {
            index = i;
        }
    }

    return alert("Najveci broj like-ova: " + obj[index].naziv + " " + obj[index].cijenaPoKvadratu);
}
function najjeftinijiProizvod(obj)
{
    prices = [];
    var index = 0;

    for (var i in obj) {
        prices[i] = obj[i].cijenaPoKvadratu;
    }

    for (var i in prices) {
        if (prices[index] > prices[i]) {
            index = i;
        }
    }

    return alert("Najjeftiniji proizvod: " + obj[index].naziv + " " + obj[index].cijenaPoKvadratu);

}