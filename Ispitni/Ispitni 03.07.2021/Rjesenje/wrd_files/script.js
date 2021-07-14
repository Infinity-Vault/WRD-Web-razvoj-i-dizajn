var meni=document.getElementById("Izbornik");
var otvoreno=false;
otvoriZatvori=()=>{
    if(otvoreno==false){
        meni.style.display="block";
        otvoreno=true;
    }
    else{
        meni.style.display="none";
        otvoreno=false;
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
$("#forma").validate({
    rules:{
        naslov:{
            required:true,
            regex:/^[A-Z][A-Za-z ]+[A-Za-z ]+$/
        },
        tel:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages:{
        naslov:{
            required:"Ovo polje je obavezno !",
            regex:"Prvo slovo veliko !"
        },
        tel:{
            required:"Ovo polje je obavezno !",
            regex:"Format +111-11-111-1111 !"
        }
    }
})
var naslov=document.getElementById("naslov");
var telefon=document.getElementById("telefon");
Validiraj=()=>{
    if(!$("#forma").valid())
       return;
}
naslov.onfocusout=()=>{
    Validiraj();
}
telefon.onfocusout=()=>{
    Validiraj();
}
getAllUposlenici=()=>{
    let url="https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta";
    fetch(url).then(
        response=>{
            if(response.status!==200){
                alert("Doslo je do greske na serveru " + response.status);
                return;
            }
            else{
                response.json().then(
                    uposlenici=>{
                        for (const uposlenik of uposlenici) {
                            var noviDiv=(
                                "<div class='radnik'>"+
                                "<img src='"+uposlenik.slikaPutanja+"'>"+
                                "<div class='text'>"+
                                "<h3>"+ uposlenik.imePrezime+"</h3>"+
                                "<p>"+uposlenik.opis+"</p>"+
                                "<button onclick='upisiIme("+uposlenik.id+")'>Piši poruku</button>"
                                 +"</div>"+
                                "</div>"
                            );
                            document.getElementById("teamKontejner").innerHTML+=noviDiv;
                        }
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske "+ error);
        }
    )
}
getAllUposlenici();
upisiIme=(id)=>{
    let url="https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta";
    fetch(url).then(
        response=>{
            if(response.status!==200){
                alert("Doslo je do greske na serveru: "+response.status);
                return;
            }
            else{
                response.json().then(
                    uposlenici=>{
                        for (const uposlenik of uposlenici) {
                            if(uposlenik.id==id)
                              document.getElementById("primaoc").value=uposlenik.imePrezime;
                        }
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske: " + error);
        }
    )
}
posaljiPoruku=()=>{
    let url="https://restapiexample.wrd.app.fit.ba/Ispit20210702/Add";
    var temp=new Object();
    temp.imePrezime=document.getElementById("primaoc").value;
    temp.naslov=document.getElementById("naslov").value;
    temp.telefon=document.getElementById("telefon").value;
    temp.poruka=document.getElementById("poruka").value;
    var sendPoruka=JSON.stringify(temp);
   // console.log(temp);
    fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},body:sendPoruka}).then(
        response=>{
            if(response.status!==200){
                alert("Doslo je do greske na serveru: " +response.status);
                return;
            }
            else{
                response.json().then(
                    poslanaPoruka=>{
                        alert("Poruka uspjesno poslana: " +poslanaPoruka.imePrezime);
                    }
                );
            }
        }
    ).catch(
        error=>{
            alert("Doslo je do greske: " + error);
        }
    )
}