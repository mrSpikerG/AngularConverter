import { Component } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'header-converter',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    ngOnInit() {

      
        axios.get("https://api.monobank.ua/bank/currency",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                let eurISO = 978;
                let usdISO = 840;
                let uahISO = 980;
                
                this.currencyExchanges = response.data.filter(item=>{
                    return (item.currencyCodeA== eurISO || item.currencyCodeA== usdISO) && item.currencyCodeB==uahISO;
                });
            }).catch(exception => {
                console.log(exception);

            })
    }
    
    currencyExchanges = [];
}