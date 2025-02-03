let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('add')){
            var itemNew = item.cloneNode(true);
            let checkIsset  = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart =>{
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            })
            if(checkIsset == false){
                document.querySelector('.listCart').appendChild(itemNew);
            }

        }
    })
})

function Remove($key){
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == $key){
            item.remove();
            return;
        }
    })
}

document.getElementById('clearCart').addEventListener('click', function() {
    if (confirm('Czy na pewno chcesz utworzyć nową listę? Wszystkie obecne elementy zostaną usunięte.')) {
        const cartContainer = document.querySelector('.listCart');
        
        while (cartContainer.firstChild) {
            cartContainer.removeChild(cartContainer.firstChild);
        }

        const notification = document.getElementById('notification');
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000);
    }
});