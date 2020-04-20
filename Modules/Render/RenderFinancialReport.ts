import {currency} from "../Utils";
import {FinanceManager} from "../Manager/FinanceManager";

class RenderFinancialReport implements RenderInterface, RenderByHourInterface {
    private readonly reportBodyTable : HTMLTableElement = (<HTMLTableElement>document.querySelector('#incomeReport tbody'));
    private readonly reportFooterTable : HTMLTableElement = (<HTMLTableElement>document.querySelector('#incomeReport tfoot'));

    private readonly financeManager : FinanceManager;

    constructor(financeManager: FinanceManager) {
        this.financeManager = financeManager;
    }

    render(): void {}

    renderByHour(): void {
        this.reportBodyTable.innerHTML = '';
        this.reportFooterTable.innerHTML = '';

        this.financeManager.incomeReport.forEach((value, label ) => {
            this.reportBodyTable.innerHTML  += `<tr class="income"><th>${label}</th><td>+ ${currency(value)}</td></tr>`
        });
        this.financeManager.expensesReport.forEach((value, label ) => {
            this.reportBodyTable.innerHTML  += `<tr class="expense"><th>${label}</th><td>- ${currency(value)}</td></tr>`
        });

        let totalClass = (this.financeManager.balance >= 0) ? 'positive' : 'negative';
        this.reportFooterTable.innerHTML  += `<tr class="total ${totalClass}"><th>Total</th><td>${currency(this.financeManager.balance)}</td></tr>`;
    }
}

export {RenderFinancialReport}
