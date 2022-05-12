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
    this.burgerBtn.addEventListener('click', this.onBurgerClick);
    this.burgerMenu.addEventListener('click', this.onMenuClick);
    this.burgerMenu.addEventListener('mouseover', this.onMenuHover);
    this.burgerMenu.addEventListener('mouseout', this.onMenuHoverOff);
  }

  onBurgerClick = () => {
    console.log(this)
    this.burgerMenu.classList.toggle('header_menu_active');
  }

  onMenuClick = (event) => {
    const target = event.target;
    if(target.id === 'list-item') {
      this.burgerMenu.classList.remove('header_menu_active');
    }
  }
  onMenuHover = (event) => {
    const target = event.target;
    if(target.id === 'list-item') {
      target.classList.add('a_menu_hover');
    }
  }
  onMenuHoverOff = (event) => {
    const target = event.target;
    if(target.id === 'list-item') {
      target.classList.remove('a_menu_hover');
    }
  }
}

new Burger(burgerBtn, burgerMenu, listItem)
