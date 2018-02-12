'use strict';

// Start

const game = {
    products: [],
    start: function () {
        this.products.push(
            new product('R2D2 Bag', 'assets/images/bag.jpg'),
            new product('Banana Slicer', 'assets/images/banana.jpg'),
            new product('TP Tablet Stand', 'assets/images/bathroom.jpg'),
            new product('Sandal Boots', 'assets/images/boots.jpg'),
            new product('Breakfast Station', 'assets/images/breakfast.jpg'),
            new product('Modern Chair', 'assets/images/chair.jpg'),
            new product('Cthulhu Figurine', 'assets/images/cthulhu.jpg')
        );
    },
    getRandomProducts: function () {
        const shownProducts = [];

        while (shownProducts.length <= 2){
            const random = Math.floor(Math.random() * this.products.length);
            const option = this.products[random];

            if (shownProducts.indexOf(option) === -1){
                shownProducts.push(option);
            };
        };
        
        const boxOne = document.getElementById('one');
        const boxTwo = document.getElementById('two');
        const boxThree = document.getElementById('three');
        const boxes = [boxOne, boxTwo, boxThree];

        for (let i = 0; i < 3; i++){
            const img = document.createElement('img');
            img.src = shownProducts[i].imageUrl;
            img.setAttribute('alt', this.name);

            boxes[i].appendChild(img);
        }
    },


}


// Object
function product (name, imageUrl){
    this.name= name;
    this.imageUrl = imageUrl;

    this.displays = 0;
    this.selections = 0;
}