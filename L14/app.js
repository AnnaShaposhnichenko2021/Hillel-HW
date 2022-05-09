const head = document.querySelector('.head')
const content = document.querySelector('.content')

class Tabs {
  static CLASSES = {
    title: 'title',
    titleActive: 'title-active',
    block: 'block',
    blockActive: 'block-active'
  }
  constructor(head, content) {
    this.head = head;
    this.content = content;
    this.head.addEventListener('click', this.onTitleClick);
    this.headItems = [...head.children];
    this.contentItems = [...content.children];
    this.setChildrenClass();
  }

  setChildrenClass() {
    const titleFirst = this.headItems[0];
    const blockFirst = this.contentItems[0];
    titleFirst.classList.add(Tabs.CLASSES.titleActive);
    blockFirst.classList.add(Tabs.CLASSES.blockActive);
    }

  onTitleClick = (event) => {
    const target = event.target;
    if (target.classList.contains(Tabs.CLASSES.title)) {
      this.headItems.forEach((e, index) => {
        const blockItem = this.contentItems[index]
        if (e === target) {
          if (!e.classList.contains(Tabs.CLASSES.titleActive)){
            e.classList.add(Tabs.CLASSES.titleActive) 
            blockItem.classList.add(Tabs.CLASSES.blockActive)
          }
        } else {
          e.classList.remove(Tabs.CLASSES.titleActive)
          blockItem.classList.remove(Tabs.CLASSES.blockActive)
        }
        })
      }
    }
  }




new Tabs(head, content)