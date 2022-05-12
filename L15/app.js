const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('menu-list')
const listItem = document.querySelector('.a_menu')

class Burger {
  constructor(burger, menu, list) {
    console.log(list)
    this.burgerBtn = burger;
    this.burgerMenu = menu;
    this.listItem = list;
    console.log(this.listMenu, this.burgerBtn, this)
    this.burgerBtn.addEventListener('click', this.onBurgerClick.bind(this));
    this.burgerMenu.addEventListener('click', this.onMenuClick.bind(this));
  }

  onBurgerClick() {
    console.log(this)
    this.burgerMenu.classList.toggle('header_menu_active');
  }

  onMenuClick(event) {
    const target = event.target;
    if(target.id === listItem.id) {
      this.burgerMenu.classList.remove('header_menu_active');
    }
  }
}

new Burger(burgerBtn, burgerMenu, listItem)
