const slcSuunta = document.getElementById("slcSuunta");
const btnMuunna = document.getElementById("btnMuunna");

slcSuunta.addEventListener("change", etuYksikko);
btnMuunna.addEventListener("click", muunna);

etuYksikko();

function etuYksikko() {
    const merkki = document.getElementById("slcSuunta").value.charAt(0);
    document.getElementById("yksikko").textContent = yksikko(merkki);
}

function muunna(event) {
    try {
        event.preventDefault();
        virheBox.style.display = "none";
        const suunta = document.getElementById("slcSuunta").value;
        if (document.getElementById("inputLampotila").value == "") {
            throw new Error("Lämpötilaa ei syötetty!");
        }
        const lampo = Number(document.getElementById("inputLampotila").value);
        const muunnos = muunin([suunta, desimaali(), lampo]);

        if (isNaN(muunnos[0])) {
            throw new Error("Syötetty lämpötila ei ole numero!")
        }
        else {
            if (((muunnos[0] < -459.67) && (suunta == "ktof")) || ((muunnos[0] < -273.15) && (suunta != "ktof"))) {
                throw new Error("Lämpötila on pienempi kuin absoluuttinen nollapiste (-273,15 \u00B0C)");
            }
            else {
                naytaMuunnos(muunnos[0] + " " + muunnos[1]);
            }
        }
    } catch (error) {
        virhe(error.message);
        console.error(error)
    }
}

function naytaMuunnos(viesti) {
    document.getElementsByClassName("sisaltoOikea")[0].style.display = "flex";
    document.getElementById("tulos").textContent = viesti;
}

function virhe(viesti) {
    document.getElementById("tulos").textContent = "";
    document.getElementsByClassName("sisaltoOikea")[0].style.display = "none";
    document.getElementById("virheViesti").textContent = viesti;
    document.getElementById("virheBox").style.display = "block";

    setTimeout(() => {
        document.getElementById("virheBox").style.display = "none";
    }, 3000);
}

function desimaali() {
    const radioDesimaalit = document.getElementsByName("desimaali");

    if (radioDesimaalit[0].checked) {
        return 1;
    }
    if (radioDesimaalit[1].checked) {
        return 2;
    }
    if (radioDesimaalit[2].checked) {
        return 3;
    }
}

function yksikko(merkki) {
    switch (merkki) {
        case "c":
            return "\u00B0C";
        case "f":
            return "\u00B0F";
        case "k":
            return "K";
        default:
            return "";
    }
}

function muunin(lampotila) {
    const suunta = lampotila[0];
    const desimaali = lampotila[1];
    const lampo = lampotila[2];

    let tulos;
    switch (suunta) {
        case "ctof":
            tulos = lampo * 1.8 + 32;
            break;
        case "ctok":
            tulos = lampo + 273.15;
            break;
        case "ftoc":
            tulos = (lampo - 32) / 1.8;
            break;
        case "ftok":
            tulos = (lampo + 459, 67) / 1.8;
            break;
        case "ktoc":
            tulos = lampo - 273.15;
            break;
        case "ktof":
            tulos = lampo * 1.8 - 459.67;
            break;
        default:
            break;
    }

    return [tulos.toFixed(desimaali), yksikko(suunta.charAt(suunta.length - 1))];
}
