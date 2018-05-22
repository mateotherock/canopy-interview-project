import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const ranks = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'JACK': 11,
  'QUEEN': 12,
  'KING': 13,
  'ACE': 14
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck_id: '',
      spades: [],
      clubs: [],
      hearts: [],
      diamonds: []
    }

    this.shuffleCards = this.shuffleCards.bind(this);
    this.drawCards = this.drawCards.bind(this);
  }

  shuffleCards() {
    if (this.state.deck_id === '') {
      axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(resp => {
        this.setState({
          deck_id: resp.data.deck_id
        }, () => {
          this.drawCards();
        })
      })
    }
  }

  drawCards() {
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=2`).then(resp => {
      resp.data.cards.forEach(card => {
        if (card.suit === 'SPADES') {
          this.setState(prevState => ({
            spades: [...prevState.spades, card.value]
          }));
        } else if (card.suit === 'CLUBS') {
          this.setState(prevState => ({
            clubs: [...prevState.clubs, card.value]
          }));
        } else if (card.suit === 'HEARTS') {
          this.setState(prevState => ({
            hearts: [...prevState.hearts, card.value]
          }));
        } else {
          this.setState(prevState => ({
            diamonds: [...prevState.diamonds, card.value]
          }));
        }
      })
      if (!this.state.spades.includes('QUEEN') || !this.state.clubs.includes('QUEEN') || !this.state.hearts.includes('QUEEN') || !this.state.diamonds.includes('QUEEN')) {
        this.drawCards();
      }
    })
  }

  render() {

    return (
      <div className="App">

        <h2>Welcome to the Game of Queens</h2>

        <button onClick={this.shuffleCards}>Shuffle</button>
        <button onClick={() => {this.setState({
          deck_id: '',
          spades: [],
          clubs: [],
          hearts: [],
          diamonds: []
        })}}>Reset</button>

        <p>SPADES: [{this.state.spades.sort(function(left, right) {
          return ranks[left] - ranks[right];
        }).join(', ')}] </p>
        <p>CLUBS: [{this.state.clubs.sort(function(left, right) {
          return ranks[left] - ranks[right];
        }).join(', ')}] </p>
        <p>HEARTS: [{this.state.hearts.sort(function(left, right) {
          return ranks[left] - ranks[right];
        }).join(', ')}] </p>
        <p>DIAMONDS: [{this.state.diamonds.sort(function(left, right) {
          return ranks[left] - ranks[right];
        }).join(', ')}] </p>

      </div>
    );
  }
}

export default App;
