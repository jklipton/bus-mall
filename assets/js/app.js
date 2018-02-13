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
            new Product('Meatball Bubblegum', 'assets/images/bubblegum.jpg'),
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

    continue: function (){
        this.clearBoard();

        if (this.picks <= 5){
            this.getRandomProducts();
        } else {
            this.board.removeEventListener('click', this.clickHandler);
            this.drawResults();
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

    drawResults: function () {
        document.getElementById('results').setAttribute('style', 'display: block;')
        //data
        const names = [];
        const selections = [];
        for(let i = 0; i < this.products.length; i++){
            names.push(this.products[i].name);
            selections.push(this.products[i].selections);
        };

        //chart
        const canvas = document.getElementById('chart');
        const ctx = canvas.getContext('2d');

        const results = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'number of times chosen',
                    data: selections,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Results',
                    yAxisID: 'Times chosen',
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        }
                    }]
                }
            }
        });
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