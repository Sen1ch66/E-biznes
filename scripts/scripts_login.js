let listaKontow = [] 
let loginAtt = 1 
const LogRegForm = document.querySelector("form")
const signBtn = document.querySelector(".btn-secondary")
const logBtn = document.querySelector(".btn-primary")
function renderP(){
    const message = document.createElement("p")
    message.innerHTML = 'Konto zostalo zalozone'
    message.style.color = 'green'
    LogRegForm.appendChild(message)
    setTimeout(()=>{
        message.remove() 
    }, 5000)
}

signBtn.addEventListener("click", ()=>{ 
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    listaKontow.push({login: loginText, password: pass})
    if (!document.querySelector("p")){ 
        renderP()
    }
})

function logining(){
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    for(let i in listaKontow){
        if(listaKontow[i].login == loginText && listaKontow[i].password == pass){
            window.location.href = 'mainpage.html'
        } else if(loginAtt > 4){ 
            alert("przekroczono liczbę prób, sprobuj pozniej")
            logBtn.removeEventListener("click", logining) 
        } else {
            const error = document.createElement("p")
            error.innerHTML = "Niepoprawny login lub haslo"
            error.style = "color: red; font-weight: 900;"
            LogRegForm.appendChild(error)
            setTimeout(()=>{
                error.remove()
            },5000)
            ++loginAtt
        }
    }
}

logBtn.addEventListener("click", logining)