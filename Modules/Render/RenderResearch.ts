import {Cinema} from "../Entity/Cinema";
import {currency} from "../Utils";

class RenderResearch implements RenderInterface {
    private readonly costSlider = (<HTMLElement>document.querySelector('#research-cost-slider'));
    private readonly costPrice = (<HTMLElement>document.querySelector('#research-cost'));
    private readonly progressBar = (<HTMLElement>document.querySelector('#research-progress-bar'));
    private readonly container = (<HTMLElement>document.querySelector('#research-container'));
    private readonly template = (<HTMLTemplateElement>document.querySelector('#research-template'));

    private readonly _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        var self = this;
        this.costSlider.addEventListener('change', function() {
            self._cinema.researchManager.level = parseInt((<HTMLInputElement>this).value);

            self.costPrice.innerHTML = currency(self._cinema.researchManager.getMontlyCost());
        });

        self.costPrice.innerHTML = currency(self._cinema.researchManager.getMontlyCost());

        this.costSlider.setAttribute('min', '0');
        this.costSlider.setAttribute('max', self._cinema.researchManager.getMaxLevel().toString());
        this.costSlider.setAttribute('value', self._cinema.researchManager.level.toString());
        this.renderResearchGrid();
    }

    private renderResearchGrid() {
        var self = this;

        self.container.innerHTML = '';
        this._cinema.researchManager.categories.forEach(function (category) {
            let researchItem = category.getNextResearch();

            if (researchItem === undefined) {
                return;
            }

            let clone = <HTMLElement>self.template.content.cloneNode(true);

            clone.querySelector('.research-name')!.innerHTML = category.name + ": " + researchItem.name;
            clone.querySelector('.research-points')!.innerHTML = researchItem.points.toString();
            (<HTMLElement>clone.querySelector('.research-block')).dataset.researchId = researchItem.id.toString();

            let block = (<HTMLElement>clone.querySelector('.research-block'));
            block.dataset.researchId = researchItem.id.toString();

            if (self._cinema.researchManager.activeResearch !== null && self._cinema.researchManager.activeResearch.id === researchItem.id) {
                block.classList.add("active");
            }

            self.container.appendChild(clone);
        });

        document.querySelectorAll('div.research-block').forEach(function(elementA) {
            let element = <HTMLElement>elementA;
            element.addEventListener('click', function() {
                if(element.dataset.researchId === undefined) {
                    return;
                }

                let researchItem = self._cinema.researchManager.tree.get(parseInt(element.dataset.researchId));

                if(researchItem === undefined || !self._cinema.researchManager.setActiveResearch(researchItem)) {
                    return;
                }

                let alreadyActiveTech = self.container.querySelector('.active');
                if(alreadyActiveTech !== null) {
                    alreadyActiveTech.classList.remove('active');
                }

                element.classList.add("active");
                self.costPrice.innerHTML = currency(self._cinema.researchManager.getMontlyCost());

            });
        });
    }

    render(): void {
        this.progressBar.setAttribute('value', this._cinema.researchManager.getProgressPercentage().toString());
    }

    renderMonthly() : void {
        //only update once a month
        this.renderResearchGrid();
    }
}

export {RenderResearch}