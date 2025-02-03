let listaKontow = [] // список з акаунтами
let loginAtt = 1 // кількість спроб входу
const LogRegForm = document.querySelector("form")
const signBtn = document.querySelector(".btn-secondary")
const logBtn = document.querySelector(".btn-primary")
const deteleBtn = document.querySelector(".btn-danger")
function renderMessage(text, color) { // функція появи повідомлення про зареєстрований акаунт (або щось інше)
    const message = document.createElement("p")
    message.innerHTML = `<strong>${text}</strong>`
    message.style.color = color
    LogRegForm.appendChild(message)
    setTimeout(() => {
        message.remove() //видалення повідомлення через 4 секунди
    }, 4000)
}
signBtn.addEventListener("click", () => {
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    if (loginText.trim() == '' || pass.trim() == '') { // перевірка чи всі поля для входу заповнені (trim прибирає пробіли)
        renderMessage("Wpisz wszystkie dane", 'red')
    } else {
        listaKontow.push({ login: loginText.trim(), password: pass.trim()})
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
    if (!foundAcc && !document.querySelector(".deleteAcc")) {
        renderMessage("Takiego konta nie istnieje", "red")
    }
    console.log(listaKontow)
})
function logining() {
    const loginText = document.querySelector(".login").value
    const pass = document.querySelector(".password").value
    let successLogin = false
    if(loginAtt > 4){ //якщо 4 рази неправильно ввів дані
        renderMessage("Przekroczono liczbę prób, sprobuj pozniej", "red")
        logBtn.removeEventListener("click", logining) // видалення обробника кліку з кнопки
        return
    }
    for (let i in listaKontow) {
        if (listaKontow[i].login == loginText && listaKontow[i].password == pass) {
            successLogin = true
            window.location.href = 'mainpage.html'
        } 
    }
    if (!successLogin) { 
        renderMessage("Niepoprawny login lub haslo", "red")
        ++loginAtt
        console.log(loginAtt)
    }
}
logBtn.addEventListener("click", logining) // після кліку на кнопку wejsc виконується функція вище