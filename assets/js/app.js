'use strict';

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', function(){
    const intro = document.getElementById('intro');
    intro.setAttribute('style', 'display: none;');

    game.load();
});

const game = {
    products: [],
    board: document.getElementById('board'),
    results: document.getElementById('results'),

    images: 5,
    startPicks: 0,
    endPicks: 25,

    load: function () {
        this.products.push(
            new Product('R2D2 Bag', 'assets/images/bag.jpg', 0, 0),
            new Product('Banana Slicer', 'assets/images/banana.jpg', 0, 0),
            new Product('TP Tablet Stand', 'assets/images/bathroom.jpg', 0, 0),
            new Product('Sandal Boots', 'assets/images/boots.jpg', 0, 0),
            new Product('Meatball Bubblegum', 'assets/images/bubblegum.jpg', 0, 0),
            new Product('Breakfast Station', 'assets/images/breakfast.jpg', 0, 0),
            new Product('Modern Chair', 'assets/images/chair.jpg', 0, 0),
            new Product('Cthulhu Figurine', 'assets/images/cthulhu.jpg', 0, 0),
            new Product('Ducky Muzzle', 'assets/images/dog-duck.jpg', 0, 0),
            new Product('Dragon Meat', 'assets/images/dragon.jpg', 0, 0),
            new Product('Pen Silverware', 'assets/images/pen.jpg', 0, 0),
            new Product('Pet Sweeps', 'assets/images/pet-sweep.jpg', 0, 0),
            new Product('Pizza Scissors', 'assets/images/scissors.jpg', 0, 0),
            new Product('Shark Sleeping Bag', 'assets/images/shark.jpg', 0, 0),
            new Product('Baby Sweeps', 'assets/images/sweep.png', 0, 0),
            new Product('Tauntaun Sleeping Bag', 'assets/images/tauntaun.jpg', 0, 0),
            new Product('Unicorn Meat', 'assets/images/unicorn.jpg', 0, 0),
            new Product('USB Tentacle', 'assets/images/usb.gif', 0, 0),
            new Product('Artsy Watering Can', 'assets/images/water-can.jpg', 0, 0),
            new Product('Modern Wine Glass', 'assets/images/wine-glass.jpg', 0, 0)
        );
        game.start();
    },

    start: function () {
        this.getRandomProducts();
        this.board.addEventListener('click', this.clickHandler);
    },

    continue: function (){
        this.clearBoard();

        if (this.startPicks <= this.endPicks){
            this.getRandomProducts();
        } else {
            this.board.removeEventListener('click', this.clickHandler);
            this.board.setAttribute('style', 'display: none;');
            this.results.setAttribute('style', 'display: flex;');

            this.end();
        }
    },

    getRandomProducts: function () {
        const shownProducts = [];

        while (shownProducts.length < this.images){
            const random = Math.floor(Math.random() * this.products.length);
            const option = this.products[random];

            if (shownProducts.indexOf(option) === -1){
                shownProducts.push(option);
                this.products[random].displays++;
            };
        };

        for (let i = 0; i < this.images; i++){
            const box = document.createElement('div');
            box.setAttribute('class', 'box');

            const img = document.createElement('div');
            img.setAttribute('title', shownProducts[i].name);
            img.setAttribute('style', `background-image: url(${shownProducts[i].imageUrl})`);
            img.setAttribute('class', 'click');

            box.appendChild(img);
            this.board.appendChild(box);
        }
    },

    end: function(){
        this.splitData();
        this.drawPie();
        this.checkData();
        this.drawBar();
    },

    arrayNames: [],
    arraySelections: [],
    arrayDisplays: [],

    splitData: function (){
        for(let i = 0; i < this.products.length; i++){
            this.arrayNames.push(this.products[i].name);
            this.arraySelections.push(this.products[i].selections);
            this.arrayDisplays.push(this.products[i].selections);
        };
    },

    checkData: function() {
        if (localStorage.getItem('stored')){
            const stored = JSON.parse(localStorage.getItem('stored'));

            console.log(this.arraySelections);
            for (let i = 0; i < stored.length; i++){
                this.arraySelections[i] += stored[i].selections;
                this.arrayDisplays[i] += stored[i].displays;
            }
            console.log(this.arraySelections);
        } else {
            let string = JSON.stringify(this.products);
            localStorage.setItem('stored', string);
        }
    },

    drawPie: function(){
        const pCanvas = document.getElementById('pieChart');
        const pCtx = pCanvas.getContext('2d');

        const userPie = new Chart(pCtx,{ // eslint-disable-line
            type: 'doughnut',
            maintainAspectRatio: false,
            data: {
                labels: this.arrayNames,
                datasets: [{
                    label: 'times chosen',
                    data: this.arraySelections,
                    backgroundColor: [
                        '#E07563','#E17277','#DC738C','#D1789F','#BE7FAF',
                        '#A788BB','#8A90C2','#6A97C2','#499DBC','#26A2B0',
                        '#0FA4A0','#21A58C','#3DA577','#57A362','#70A04F',
                        '#879C40','#9D9637','#B28E36','#C4863C','#D27E49',
                    ]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Your Picks:',
                },
                legend: {
                    display: false,
                },
            },
        });
    },

    drawBar: function(){
        const bCanvas = document.getElementById('barChart');
        const bCtx = bCanvas.getContext('2d');

        const barChart = new Chart(bCtx, { // eslint-disable-line
            type: 'horizontalBar',
            data: {
                labels: this.arrayNames,
                datasets: [{
                    label: 'total times displayed',
                    data: this.arrayDisplays,
                    backgroundColor: '#8C8C8C',
                    stack: 'Together',
                },
                {
                    label: 'total times selected',
                    data: this.arraySelections,
                    backgroundColor: '#ADCDFF',
                    stack: 'Together',

                }]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Total Results',
                },
                legend: {
                    display: true,
                    position: 'bottom',
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            fontColor: '#000000',
                        },
                    }],
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                    }]
                },
            }
        });
    },

    clickHandler (){
        const choice = event.target.title;

        if (choice === '') return;
        for (let i = 0; i < game.products.length; i++){
            if (game.products[i].name === choice){
                game.products[i].selections++;
                game.startPicks++;
                game.continue();
            }
        }
    },

    clearBoard: function (){
        for (let i = 0; i < this.boxes.length; i++){
            this.boxes[i].textContent = '';
        }
    },
};
