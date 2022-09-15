const menuBtns = document.querySelectorAll('.menu ul>li');
for (const menuBtn of menuBtns) {
    menuBtn.addEventListener('mouseover', () => {
        menuCurrentFire = document.querySelector('.font-effect-fire')
        menuCurrentFire.classList.remove('font-effect-fire')
        menuBtn.classList.add('font-effect-fire')
    })
}
var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight;
// Mở Menu 
mobileMenu.addEventListener('click', () => {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = '46px';
    }
})

// Tự động đóng khi chọn Menu 
var menuItems = document.querySelectorAll('#nav li a[href*="#"]');
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