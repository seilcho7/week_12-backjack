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
            index: 3
        }
    }

    render () {
        return (
            <div className="App">
                <h1>BLACKJACK</h1>
                <button onClick={this._reset}>Start</button>
                <br></br>
                    {this.state.won === 1 ? <h2>You win</h2> : this.state.won === 2 ? <h2>You lose</h2> : this.state.won === 3 ? <h2>Tie</h2>: null}
                    {this.state.p1 ? <h3>Player: </h3> : null}
                    <div className="p1">
                    {this.state.p1 ? <div className='p1'><div className="card"><p className="top">{this.state.p1[0].Value}</p><img className="card-img-top" src={this.state.p1[0].Suit}></img><p className="bot">{this.state.p1[0].Value}</p></div> <div className="card"><p className="top">{this.state.p1[1].Value}</p><img className="card-img-top" src={this.state.p1[1].Suit}></img><p className="bot">{this.state.p1[1].Value}</p></div></div> : null}
                    {this.state.index > 3 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[2].Value}</p><img className="card-img-top" src={this.state.p1[2].Suit}></img><p className="bot">{this.state.p1[2].Value}</p></div> : null}
                    {this.state.index > 4 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[3].Value}</p><img className="card-img-top" src={this.state.p1[3].Suit}></img><p className="bot">{this.state.p1[3].Value}</p></div> : null}
                    {this.state.index > 5 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[4].Value}</p><img className="card-img-top" src={this.state.p1[4].Suit}></img><p className="bot">{this.state.p1[4].Value}</p></div> : null}
                    {this.state.index > 6 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[5].Value}</p><img className="card-img-top" src={this.state.p1[5].Suit}></img><p className="bot">{this.state.p1[5].Value}</p></div> : null}
                    {this.state.index > 7 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[6].Value}</p><img className="card-img-top" src={this.state.p1[6].Suit}></img><p className="bot">{this.state.p1[6].Value}</p></div> : null}
                    {this.state.index > 8 && this.state.p1 ? <div className="card"><p className="top">{this.state.p1[7].Value}</p><img className="card-img-top" src={this.state.p1[7].Suit}></img><p className="bot">{this.state.p1[7].Value}</p></div> : null}
                    </div>
                    {this.state.playerTotal ? <h4>Player total: {this.state.playerTotal}</h4> : null}
                    {this.state.p2 ? <h3>Dealer: </h3> : null}
                    <div className="line">
                    {this.state.p2 ? <div className="p2"><div className="card"><p className="top">{this.state.p2[0].Value}</p><img className="card-img-top" src={this.state.p2[0].Suit}></img><p className="bot">{this.state.p2[0].Value}</p></div></div> : null}
                        {this.state.showDealer ? <div className="card"><p className="top">{this.state.p2[1].Value}</p><img className="card-img-top" src={this.state.p2[1].Suit}></img><p className="bot">{this.state.p2[1].Value}</p></div> : null}
                    </div>
                        {this.state.dealerTotal ? <h4>Dealer total: {this.state.dealerTotal}</h4> : null}
                    <br></br>
                {this.state.p1 && !this.state.won ? <button onClick={this._hitCard}>Hit</button> : null}
                {this.state.p1 ? <button onClick={this.state.deck ? this._showDealer : null}>Stop</button> : null}
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
            this._playerTotal()
        ))
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
                total += 11;
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
        if (total > 21) {
            this.setState({
                playerTotal: total,
                won: ''
            }, this._ace)
        } else {
            this.setState({
                playerTotal: total,
                won: ''
            })
        }
    }

    _dealerTotal = () => {
        let total = 0;
        this.state.p2.map((card) => {
            if (card.Value === "A") {
                total += 11;
                if (total > 21) {
                    total -= 10;
                }
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
                won: 2
            })
        }
        if (this.state.playerTotal <= 21 && this.state.playerTotal > this.state.dealerTotal || this.state.playerTotal === 21) {
            this.setState({
                won: 1
            })
        }
        if (this.state.playerTotal === this.state.dealerTotal) {
            this.setState({
                won: 3
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
            index: 3
        }, this._getDeck)
    }

    _ace = async () => {
        await this.state.p1.map((card) => {
            if (card.Value === "A") {
                this.setState({
                    playerTotal: this.state.playerTotal - 10
                })
            }
        })
        if (this.state.playerTotal <= 21) {
            this.setState({
                won: ''
            })
        } else {
            this.setState({
                won: 2
            })
        }
    }
}

export default Deck;