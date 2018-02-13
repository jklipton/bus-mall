'use strict';

// Start

const game = {
    products: [],
    boxes: document.querySelectorAll('.box'),
    board: document.getElementById('board'),
    picks: 0,

    load: function () {
        this.products.push(
            new Product('R2D2 Bag', 'assets/images/bag.jpg'),
            new Product('Banana Slicer', 'assets/images/banana.jpg'),
            new Product('TP Tablet Stand', 'assets/images/bathroom.jpg'),
            new Product('Sandal Boots', 'assets/images/boots.jpg'),
            new Product('Breakfast Station', 'assets/images/breakfast.jpg'),
            new Product('Modern Chair', 'assets/images/chair.jpg'),
            new Product('Cthulhu Figurine', 'assets/images/cthulhu.jpg'),
            new Product('Ducky Muzzle', 'assets/images/dog-duck.jpg'),
            new Product('Dragon Meat', 'assets/images/dragon.jpg'),
            new Product('Pen Silverware', 'assets/images/pen.jpg'),
            new Product('Pet Sweeps', 'assets/images/pet-sweep.jpg'),
            new Product('Pizza Scissors', 'assets/images/scissors.jpg'),
            new Product('Shark Sleeping Bag', 'assets/images/shark.jpg'),
            new Product('Baby Sweeps', 'assets/images/sweep.png'),
            new Product('Tauntaun Sleeping Bag', 'assets/images/tauntaun.jpg'),
            new Product('Unicorn Meat', 'assets/images/unicorn.jpg'),
            new Product('USB Tentacle', 'assets/images/usb.gif'),
            new Product('Artsy Watering Can', 'assets/images/water-can.jpg'),
            new Product('Modern Wine Glass', 'assets/images/wine-glass.jpg'),
        );
    },

    start: function () {
        this.load();
        this.getRandomProducts();
        this.board.addEventListener('click', this.clickHandler);
    },

    getRandomProducts: function () {
        const shownProducts = [];

        while (shownProducts.length <= 2){
            const random = Math.floor(Math.random() * this.products.length);
            const option = this.products[random];

            if (shownProducts.indexOf(option) === -1){
                shownProducts.push(option);
                this.products[random].displays++;
            };
        };

        for (let i = 0; i < 3; i++){
            const img = document.createElement('div');
            img.setAttribute('title', shownProducts[i].name);
            img.setAttribute('style', `background-image: url(${shownProducts[i].imageUrl})`);
            img.setAttribute('class', 'click');

            this.boxes[i].appendChild(img);
        }
        console.table(shownProducts);

    },

    continue: function (){
        this.clearBoard();

        if (this.picks <= 25){
            this.getRandomProducts();
        } else {
            this.board.removeEventListener('click', this.clickHandler);

            const table = document.getElementById('table');
            const h1 = document.createElement('h1');
            h1.textContent = 'Results:'
            table.appendChild(h1);

            for (let i = 0; i < this.products.length; i++){
                const pLine = document.createElement('p');
                pLine.textContent = this.products[i].name + ' was clicked ' + this.products[i].selections + ' times!';
                table.appendChild(pLine);
            }
        }
    },

    clickHandler (){
            const choice = event.target.title;

            if (choice === '') return;
            for (let i = 0; i < game.products.length; i++){
                if (game.products[i].name === choice){
                    game.products[i].selections++;
                    game.picks++;
                    game.continue();
                }
            }
    },

    clearBoard: function (){
        for (let i = 0; i < this.boxes.length; i++){
            this.boxes[i].textContent = '';    
        }
    },
}

game.start();

// Object
function Product (name, imageUrl){
    this.name= name;
    this.imageUrl = imageUrl;

    this.displays = 0;
    this.selections = 0;
}