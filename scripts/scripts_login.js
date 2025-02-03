let listaKontow = [] // список з акаунтами
let loginAtt = 1 // кількість спроб входу
const LogRegForm = document.querySelector("form")
const signBtn = document.querySelector(".btn-secondary")
const logBtn = document.querySelector(".btn-primary")
const deteleBtn = document.querySelector(".btn-danger")
function renderP(){ // функція появи повідомлення про зареєстрований акаунт
    const message = document.createElement("p")
    message.innerHTML = 'Konto zostalo zalozone'
    message.style.color = 'green'
    LogRegForm.appendChild(message)
    setTimeout(()=>{
        message.remove() //видалення повідомлення через 5 секунд
    }, 5000)
}
function deleteAccMessage(){
    const deleteMes = document.createElement("p")
    deleteMes.textContent = "takiego konta nie istnieje"
    deleteMes.classList.add("deleteAcc")
    LogRegForm.appendChild(deleteMes)
    setTimeout(()=>{deleteMes.remove()},4000)
}
signBtn.addEventListener("click", ()=>{ 
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    listaKontow.push({login: loginText, password: pass})
    if (!document.querySelector("p")){ // якщо є повідомлення про зареєстрований ак щоб 2 не повлялось
        renderP()
    }
    console.log(listaKontow)
})
deteleBtn.addEventListener("click", ()=>{
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    if (listaKontow.length === 0){
        deleteAccMessage()
    }
    let foundAcc = false
    for(let i in listaKontow){
        if (listaKontow[i].login == loginText && listaKontow[i].password == pass){
            listaKontow = listaKontow.filter(el => el.login !== loginText || el.password !== pass)
            const sucsess = document.createElement("p")
            sucsess.innerHTML = '<strong>Konto zostało usuniete</strong>'
            sucsess.style.color = 'green'
            LogRegForm.appendChild(sucsess)
            setTimeout(()=>{sucsess.remove()},4000)
            foundAcc = true
            break
        }
    }
    if (!foundAcc && !document.querySelector(".deleteAcc")){
        deleteAccMessage()
    }
    console.log(listaKontow)
})
function logining(){
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    for(let i in listaKontow){
        if(listaKontow[i].login == loginText && listaKontow[i].password == pass){
            window.location.href = 'mainpage.html'
        } else if(loginAtt > 4){ //якщо 4 рази неправильно ввів дані
            alert("przekroczono liczbę prób, sprobuj pozniej")
            logBtn.removeEventListener("click", logining) // видалення обробника кліку з кнопки
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
logBtn.addEventListener("click", logining) // після кліку на кнопку wejsc виконується функція вище