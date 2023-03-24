const buttonNext = document.getElementById('next');
const buttonPrev = document.getElementById('prev');
const page = document.getElementById('page').innerText;



buttonNext.addEventListener('click', () => {
   window.location.replace(`/products/?page=${parseInt(page)+1}`)
});

buttonPrev.addEventListener('click', () => {
   window.location.replace(`/products/?page=${parseInt(page)-1}`)
});


const addProductToCart = async (productId , cartId) => {
   debugger
   await fetch ("api/cartsBd/" + cartId + "/product/" + productId , { method: "PUT"});
   alert("Producto Agregado al Carrito")
}
