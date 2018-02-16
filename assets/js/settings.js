'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', function () {
    event.preventDefault();

    const setImages = this.images.value;
    const setTurns = this.turns.value;

    const settings = {setImages: setImages, setTurns: setTurns};
    localStorage.setItem('settings', JSON.stringify(settings));

    const message = document.createElement('p');
    message.textContent = 'Updated!';

    form.appendChild(message);

});