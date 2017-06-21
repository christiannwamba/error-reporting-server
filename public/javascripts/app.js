(function(){
  function App () {
    this.cardTemplate = document.querySelector('.card-template');
    this.errorCards = document.querySelector('.error-cards');
  }

  App.prototype.updateCard = function(data) {
    const card = this.cardTemplate.cloneNode(true);

    card.classList.remove('card-template');
    card.querySelector('.error-card > h4').textContent = data.message;
    card.querySelector('.error-card > p').textContent = data.stack;
    card.querySelector('.error-details > h4 > a').textContent = data.filename;
    card.querySelector('.error-details > h4 > a').setAttribute('href', data.filename)
    card.querySelector('.error-details > p').textContent = `${data.lineno}:${data.colno}`;

    this.errorCards.appendChild(card);
  }
  
  App.prototype.boot = function() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('5c18d0c0570fe1b75193', {
      encrypted: true
    });

    const channel = pusher.subscribe('reports');
    channel.bind('error', (data) => {
      console.log('-- pusher --', data)
      this.updateCard(data);
    });
  }

  var app = new App();
  app.boot();
}())