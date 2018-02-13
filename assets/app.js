'use strict';

// Start

const game = {
    products: [],
    boxes: document.querySelectorAll('.box'),
    picks: 0,

    start: function () {
        this.products.push(
            new product('R2D2 Bag', 'assets/images/bag.jpg'),
            new product('Banana Slicer', 'assets/images/banana.jpg'),
            new product('TP Tablet Stand', 'assets/images/bathroom.jpg'),
            new product('Sandal Boots', 'assets/images/boots.jpg'),
            new product('Breakfast Station', 'assets/images/breakfast.jpg'),
            new product('Modern Chair', 'assets/images/chair.jpg'),
            new product('Cthulhu Figurine', 'assets/images/cthulhu.jpg'),
            new product('Ducky Muzzle', 'assets/images/dog-duck.jpg'),
            new product('Dragon Meat', 'assets/images/dragon.jpg'),
            new product('Pen Silverware', 'assets/images/pen.jpg'),
            new product('Pet Sweeps', 'assets/images/pet-sweep.jpg'),
            new product('Pizza Scissors', 'assets/images/scissors.jpg'),
            new product('Shark Sleeping Bag', 'assets/images/shark.jpg'),
            new product('Baby Sweeps', 'assets/images/sweep.png'),
            new product('Tauntaun Sleeping Bag', 'assets/images/tauntaun.jpg'),
            new product('Unicorn Meat', 'assets/images/unicorn.jpg'),
            new product('USB Tentacle', 'assets/images/usb.gif'),
            new product('Artsy Watering Can', 'assets/images/water-can.jpg'),
            new product('Modern Wine Glass', 'assets/images/wine-glass.jpg'),
        );
        
        this.getRandomProducts();
        const board = document.getElementById('choices');

        board.addEventListener('click', function () {
            console.log('game was clicked', event.target.title);
            const choice = event.target.title;

            for (let i = 0; i < game.products.length; i++){
                if (game.products[i].name === choice){
                    game.products[i].selections++;
                    game.picks++;
                    game.next();
                }
            }
        });
    },

    next: function (){
        this.clearBoard();

        if (game.picks <= 25){
            game.getRandomProducts();
        } else {
            const table = document.getElementById('table');
            const h1 = document.createElement('h1');
            h1.textContent = 'Results:'
            table.appendChild(h1);

            for (let i = 0; i < game.products.length; i++){
                const pLine = document.createElement('p');
                pLine.textContent = game.products[i].name + ' was clicked ' + game.products[i].selections + ' times!';
                table.appendChild(pLine);
            }
        }

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

    clearBoard: function (){
        for (let i = 0; i < game.boxes.length; i++){
            game.boxes[i].textContent = '';    
        }
    },
}

game.start();

// Object
function product (name, imageUrl){
    this.name= name;
    this.imageUrl = imageUrl;

    this.displays = 0;
    this.selections = 0;
}