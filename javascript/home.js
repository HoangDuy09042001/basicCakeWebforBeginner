let header = document.getElementById('header');
let mobileMenu = document.getElementById('mobile-menu');
let headerHeight = header.clientHeight;
// Mở Menu 
mobileMenu.addEventListener('click', () => {
    let isClosed = header.clientHeight === headerHeight;
    let menuItems = document.querySelectorAll('#nav li a[href*="#"]');
    console.log(menuItems)
    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = '46px';
    }
})

// Tự động đóng khi chọn Menu 
let menuItems = document.querySelectorAll('#nav li a[href*="#"]');
console.log(menuItems)

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (!(item.nextElementSibling &&
            item.nextElementSibling.classList.contains('subnav'))
        ) {
            header.style.height = null;
        } else {
            item.preventDefault();
        }
    })
});