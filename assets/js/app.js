'use strict';

const startGame= document.getElementById('startGame')
startGame.addEventListener('click', function(){
    const intro = document.getElementById('intro');
    intro.setAttribute('style', 'display: none;');

    game.start();
});

const game = {
    products: [],
    boxes: document.querySelectorAll('.box'),
    board: document.getElementById('board'),
    picks: 0,

    load: function () {
        // if (localStorage.getItem('products')){
        //     const prodArray = JSON.parse(localStorage.getItem('products'));

        //     for (let i = 0; i < prodArray.length; i++){
        //         const product = new Product(prodArray[i].name, prodArray[i].imageUrl, prodArray[i].displays, prodArray[i].selections);
        //         this.products.push(product);
        //         }            
        // } else {
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
                new Product('Modern Wine Glass', 'assets/images/wine-glass.jpg', 0, 0),
            );
        // }
    },

    start: function () {
        this.getRandomProducts();
        this.board.addEventListener('click', this.clickHandler);
    },

    continue: function (){
        this.clearBoard();

        if (this.picks <= 25){
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
        this.board.setAttribute('style', 'border: none;');
        document.getElementById('results').setAttribute('style', 'display: flex;');

        //user data
        const names = [];
        const selections = [];
        const displays = [];
        for(let i = 0; i < this.products.length; i++){
            names.push(this.products[i].name);
            selections.push(this.products[i].selections);
        };

        //user results
        const canvas = document.getElementById('pieChart');
        const ctx = canvas.getContext('2d');

        const userPie = new Chart(ctx,{
            type: 'doughnut',
            maintainAspectRatio: false,
            data: {
                labels: names,
                datasets: [{
                    label: 'times chosen',
                    data: selections,
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

        // persistant results
        let storedData = []
        if (localStorage.getItem('products')){
            storedData = JSON.parse(localStorage.getItem('products'));

            for (let i = 0; i < storedData.length; i++){
                const userSelections = this.products[i].selections;
                const userDisplays = this.products[i].displays;

                storedData[i].selections += userSelections;
                storedData[i].displays += userDisplays;
                }
        }
        localStorage.setItem('products', JSON.stringify(storedData));

        const totalSelects = [];
        const totalDisplays = [];

        for(let i = 0; i < storedData.length; i++){
            totalSelects.push(storedData[i].selections);
            totalDisplays.push(storedData[i].displays);
        };

        const canvas2 = document.getElementById('barChart');
        const ctx2 = canvas2.getContext('2d');

        const barChart = new Chart(ctx2, {
            type: 'horizontalBar',
            data: {
                labels: names,
                datasets: [{
                    label: 'total times displayed',
                    data: totalDisplays,
                    backgroundColor: '#8C8C8C',
                    stack: 'Together',
                },
                {
                    label: 'total times selected',
                    data: totalSelects,
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

game.load();


// Object
function Product (name, imageUrl, displays, selections){
    this.name= name;
    this.imageUrl = imageUrl;

    this.displays = displays;
    this.selections = selections;
}