const ip = "https://yohoho.yuhhu.io:443";
let scores = {}

const buttonArr = document.querySelectorAll(".score-but");


async function post(path, body) {
    const d = await fetch(`${ip}${path}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        }
    });
    return await d.json();
}


function getScores() {
    post("/getScore", {})
        .catch(e => alert("Sorry. Don't have any score"))
        .then(e => {
            scores = e
            diz(scores.today);
            buttonArr[0].classList.add("white-button");
        });
}

function saveScore(nickname, puan) {
    post("/saveScore", { nickname, puan })
        .catch(e => console.log("error", e))
        .then(r => console.log("success", r));
}


function diz(kategori) {
    let HTML = "";
    kategori.forEach((e, i) => {
        if (i > 9) return;
        const puan = e.puan / 1000000 >= 1 ? (e.puan / 1000000).toFixed(1) + "M" : e.puan / 1000 >= 1 ? (e.puan / 1000 >= 100 ? (e.puan / 1000).toFixed(0) : (e.puan / 1000).toFixed(1)) + "T" : e.puan;
        HTML += `
        </tr>
        <tr>
            <td style="text-align: center; width:32px">
                <div style="width:24px; background-color: orange; border-radius: 3px;">${i+1}</div>
            </td>
            <td>${e.nickname}</td>
            <td class="score">
                <p>${puan}</p>
            </td>
        </tr>
        `
    });
    document.querySelector("#scores").innerHTML = HTML;
}

buttonArr.forEach((e, i) => e.addEventListener("click", () => {
    buttonArr.forEach(e => e.classList.remove("white-button"));
    e.classList.add("white-button")
    diz(Object.values(scores)[i]);
}));


function controlHighScore(puan) {
    const nickname = localStorage.getItem("username");
    Object.values(scores).forEach((e, i) => {
        if (e.indexOf({ nickname, puan }) > -1) return;
        e.push({ nickname, puan });
        if (e.length > 1) {
            e.sort((a, b) => {
                if (a.puan > b.puan) return -1;
                else if (a.puan <= b.puan) return 1;
            })
            console.log(e, e.length);
            if (e.length > 10) {
                console.log("lalalalal");
                let newArr = e.slice(0, 10);
                scores[Object.keys(scores)[i]] = newArr;
                e = newArr;
            }
        }
    })

    scores.today.forEach(e => e.nickname == nickname && e.puan == puan && saveScore(nickname, puan));
    diz(scores.today);
}

function controlEndPopup() {
    const setInterv = setInterval(() => {
        const endPopup = document.querySelector("#end-popup");
        if (endPopup.style.display == "block") {
            const puan = document.querySelector("#end-coins").innerHTML * 737 + Math.floor(Math.random() * 800);
            document.querySelector("#my-score").innerHTML = puan;
            controlHighScore(puan);
            clearInterval(setInterv);
        }
    }, 2000)
}

getScores();