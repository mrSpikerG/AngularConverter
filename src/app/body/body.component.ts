import { Component } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'body-converter',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent {

    currencyExchanges = [];
    eurISO: number = 978;
    usdISO: number = 840;
    uahISO: number = 980;

    countA: number = 0;
    currencyA: number = 980;

    countB: number = 0;
    currencyB: number = 980;

    countByA(event) {
        if(this.countA<0){
            return;
        }

        if (this.currencyA == this.currencyB) {
            this.countB = this.countA;
            return;
        }

        let exchangeRate = this.currencyExchanges.find(x => {
            return x.currencyCodeA == this.currencyA && x.currencyCodeB == this.currencyB
        });

        if(exchangeRate==null){
            exchangeRate = this.currencyExchanges.find(x => {
                return x.currencyCodeA == this.currencyB && x.currencyCodeB == this.currencyA
            });
            this.countB = parseFloat((this.countA / exchangeRate.rateSell).toFixed(2));
            return;
        }

        this.countB = parseFloat((this.countA * exchangeRate.rateSell).toFixed(2));
    }

    countByB(event) {
        if(this.countB<0){
            return;
        }
        if (this.currencyA == this.currencyB) {
            this.countA = this.countB;
            return;
        }

        let exchangeRate = this.currencyExchanges.find(x => {
            return x.currencyCodeA == this.currencyB && x.currencyCodeB == this.currencyA
        });

        if(exchangeRate==null){
            exchangeRate = this.currencyExchanges.find(x => {
                return x.currencyCodeA == this.currencyA && x.currencyCodeB == this.currencyB
            });

            this.countA = parseFloat((this.countB / exchangeRate.rateSell).toFixed(2));
            return;
        }


        this.countA = parseFloat((this.countB * exchangeRate.rateSell).toFixed(2));
    }

    ngOnInit() {


        axios.get("https://api.monobank.ua/bank/currency",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {


                this.currencyExchanges = response.data.filter(item => {
                    return (item.currencyCodeA == this.eurISO || item.currencyCodeA == this.usdISO);
                });
            }).catch(exception => {
                console.log(exception);

            })
    }


}

//#36393e