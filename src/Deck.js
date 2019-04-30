import React from 'react';
import spade from './img/spade.png';
import diamond from './img/diamond.png';
import clover from './img/clover.png';
import heart from './img/heart.png';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: '',
            p1: '',
            p2: '',
            won: '',
            showDealer: '',
            playerTotal: '',
            dealerTotal: '',
            whoWin: '',
            index: 3
        }
    }

    render () {
        return (
            <div>
                <h1>BLACKJACK</h1>
                <button onClick={this.state.whoWin === '' ? this._getDeck : this._reset}>Start</button>
                <br></br>
                    <h2>{this.state.won ? <h2>You won</h2> : null}</h2>
                    {this.state.p1 ? <div className="p1">Player 1: <div className="card">{this.state.p1[0].Value} <img className="card-img-top" src={this.state.p1[0].Suit}></img></div> <div className="card">{this.state.p1[1].Value} <img className="card-img-top" src={this.state.p1[1].Suit}></img></div></div> : null}
                    {this.state.index > 3 && this.state.p1 ? <div className="card">{this.state.p1[2].Value} <img className="card-img-top" src={this.state.p1[2].Suit}></img></div> : null}
                    {this.state.index > 4 && this.state.p1 ? <div className="card">{this.state.p1[3].Value} <img className="card-img-top" src={this.state.p1[3].Suit}></img></div> : null}
                    {this.state.index > 5 && this.state.p1 ? <div className="card">{this.state.p1[4].Value} <img className="card-img-top" src={this.state.p1[4].Suit}></img></div> : null}
                    <h3>Player total: {this.state.playerTotal}</h3>
                    <div className="line">
                    {this.state.p2 ? <div className="p2">Dealer: <div className="card">{this.state.p2[0].Value} <img className="card-img-top" src={this.state.p2[0].Suit}></img></div></div> : null}
                        {this.state.showDealer ? <div className="card">{this.state.p2[1].Value} <img className="card-img-top" src={this.state.p2[1].Suit}></img></div> : null}
                    </div>
                        {this.state.dealerTotal ? <h3>Dealer total: {this.state.dealerTotal}</h3> : null}
                    <br></br>
                <button onClick={this._hitCard}>Hit</button>
                <button onClick={this.state.deck ? this._showDealer : null}>Stop</button>
                <br></br>
                {this.state.whoWin ? <h2>{this.state.whoWin}</h2> : null}
            </div>
        )
    }

    _getDeck = () => {
        const deck = [];
        const suits = [spade, diamond, clover, heart];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (let i=0; i<suits.length; i++) {
            for (let x=0; x<values.length; x++) {
                const card = {Value: values[x], Suit: suits[i]};
                deck.push(card);
            }
        }
        for (let i=0; i<1000; i++) {
            let location1 = Math.floor((Math.random() * deck.length));
            let location2 = Math.floor((Math.random() * deck.length));
            let tmp = deck[location1];
    
            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
        return (
            this.setState({
                deck: deck,
                won: '',
                showDealer: '',
                whoWin: '',
                dealerTotal: ''
            }, this._randomCards)
        )
    }

    _randomCards = () => {
        this.setState({
            p1: [this.state.deck[0], this.state.deck[2]],
            p2: [this.state.deck[1], this.state.deck[3]]
        }, () => (
            this._winCondition(),
            this._playerTotal()
        ))
    }

    _winCondition = () => {
        if (this.state.p1[0].Value === "A" && (this.state.p1[1].Value === "J" || this.state.p1[1].Value === "Q" || this.state.p1[1].Value === "Q")) {
            this.setState({
                won: 1
            })
        } else if (this.state.p1[0].Value === "J" && this.state.p1[1].Value === "A") {
            this.setState({
                won: 1
            })
        } else if (this.state.p1[0].Value === "Q" && this.state.p1[1].Value === "A") {
            this.setState({
                won: 1
            })
        } else if (this.state.p1[0].Value === "K" && this.state.p1[1].Value === "A") {
            this.setState({
                won: 1
            })
        } else if (this.state.p1[0].Value === "10" && this.state.p1[1].Value === "A") {
            this.setState({
                won: 1
            })
        }
    }

    _showDealer = () => {
        this.setState({
            showDealer: 1
        }, () => (
            this._dealerTotal()
        ))
    }

    _playerTotal = () => {

        let total = 0;
        this.state.p1.map((card) => {
            if (card.Value === "A") {
                total += 1;
            } else if (card.Value === "J") {
                total += 10;
            } else if (card.Value === "Q") {
                total += 10;
            } else if (card.Value === "K") {
                total += 10;
            } else {
                total += parseInt(card.Value, 10)
            }
        })
        return (
            this.setState({
                playerTotal: total
            })
        )
    }

    _dealerTotal = () => {
        let total = 0;
        this.state.p2.map((card) => {
            if (card.Value === "A") {
                total += 1;
            } else if (card.Value === "J") {
                total += 10;
            } else if (card.Value === "Q") {
                total += 10;
            } else if (card.Value === "K") {
                total += 10;
            } else {
                total += parseInt(card.Value, 10)
            }
        })
        return (
            this.setState({
                dealerTotal: total
            }, this._whoWin)
        )
    }

    _whoWin = () => {
        if (this.state.playerTotal > 21 || (this.state.playerTotal < 21 && this.state.dealerTotal > this.state.playerTotal)) {
            this.setState({
                whoWin: 'Dealer win'
            })
        }
        if (this.state.playerTotal <= 21 && this.state.playerTotal > this.state.dealerTotal || this.state.playerTotal === 21) {
            this.setState({
                whoWin: 'Player win'
            })
        }
    }

    _hitCard = () => {
        this.setState({
            p1: this.state.p1.concat(this.state.deck[this.state.index]),
            index: this.state.index + 1
        }, this._playerTotal)
    }

    _reset = () => {
        this.setState({
            deck: '',
            p1: '',
            p2: '',
            won: '',
            showDealer: '',
            playerTotal: '',
            dealerTotal: '',
            whoWin: '',
            index: 3
        }, this._getDeck)
    }
}

export default Deck;