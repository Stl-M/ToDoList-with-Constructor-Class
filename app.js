class ToDoList {
    constructor(notesSelector, AddNoteButton, newNoteSelector, storageKey = 'ToDos') {
        this.listsElement = document.querySelector(notesSelector);
        this.AddBtnElement = document.querySelector(AddNoteButton);
        this.newNoteElement = document.querySelector(newNoteSelector)
        this.storageKey = storageKey;
        this.items = JSON.parse(localStorage.getItem(storageKey)) || [];

        this.initialize();
    }

    initialize() {
        this.AddBtnElement.addEventListener('click', () =>{
            if( this.newNoteElement.value.trim().length < 1){
                return;
            }
            this.addItem(this.newNoteElement.value);
            this.newNoteElement.value ='';
            this.renderItems();
            this.storedItems();
          
        });
        this.renderItems();
    }

    renderItems(){
        this.listsElement.innerHTML = '';
        if (this.items.length === 0) {
            const itemElement = document.createElement('li');
            itemElement.textContent = 'No items';
            this.listsElement.appendChild(itemElement);
        }
        this.items.forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.textContent = item;
            const removeElement = document.createElement('span');
            removeElement.textContent = 'X';
            removeElement.classList.add('remove-item');
            removeElement.onclick = () => {
                this.removeItemAt(index);
                this.renderItems();
                this.storedItems();
            }
            itemElement.appendChild(removeElement);
            this.listsElement.appendChild(itemElement);
        })
    }

    addItem(newItem) {
        this.items.push(newItem)
    }

    removeItemAt(indexToRemove) {
        this.items = this.items.filter((item, itemIndex) => itemIndex != indexToRemove);
    }

    storedItems(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }
};

const myToDoList = new ToDoList ('#lists', '#addBtn', '#inputBox');

//Footer //
const sig = document.querySelector('footer');
const currentDate = new Date()
sig.innerHTML = `Stella Mungai ${currentDate.getFullYear()}` ;

