let listaKontow = [] 
let loginAtt = 1 
const LogRegForm = document.querySelector("form")
const signBtn = document.querySelector(".btn-secondary")
const logBtn = document.querySelector(".btn-primary")
const deteleBtn = document.querySelector(".btn-danger")

function renderMessage(text, color) { 
    const message = document.createElement("p")
    message.innerHTML = `<strong>${text}</strong>`
    message.style.color = color
    LogRegForm.appendChild(message)
    setTimeout(() => {
        message.remove() 
    }, 4000)
}

signBtn.addEventListener("click", () => {
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value

    if (loginText.trim() === '' || pass.trim() === '') { 
        renderMessage("Wpisz wszystkie dane", 'red')
    } else {
        listaKontow.push({ login: loginText.trim(), password: pass.trim() })
        renderMessage('Konto zostalo zalozone', 'green')
    }
    console.log(listaKontow)
})

deteleBtn.addEventListener("click", () => {
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    if (listaKontow.length === 0) {
        renderMessage("Takiego konta nie istnieje", "red")
        return
    }
    let foundAcc = false
    for (let i in listaKontow) {
        if (listaKontow[i].login == loginText && listaKontow[i].password == pass) {
            listaKontow = listaKontow.filter(el => el.login !== loginText || el.password !== pass)
            renderMessage("Konto zostalo usuniete", "green")
            foundAcc = true
            break
        }
    }
    if (!foundAcc) {
        renderMessage("Takiego konta nie istnieje", "red")
    }
    console.log(listaKontow)
})

function logining() {
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    if (loginAtt > 4) { 
        renderMessage("Przekroczono liczbę prób, sprobuj pozniej", "red")
        logBtn.removeEventListener("click", logining) 
        return
    }
    let successLogin = false
    for (let i in listaKontow) {
        if (listaKontow[i].login == loginText && listaKontow[i].password == pass) {
            successLogin = true
            window.location.href = 'mainpage.html'
            break
        } 
    }
    if (!successLogin) { 
        renderMessage("Niepoprawny login lub haslo", "red")
        ++loginAtt
        console.log(loginAtt)
    }
}

logBtn.addEventListener("click", logining)
