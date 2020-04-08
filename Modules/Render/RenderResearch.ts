import {Cinema} from "../Entity/Cinema";
import {currency} from "../Utils";

class RenderResearch implements RenderInterface, RenderByMonthInterface {
    private readonly costSlider = (<HTMLElement>document.querySelector('#research-cost-slider'));
    private readonly costPrice = (<HTMLElement>document.querySelector('#research-cost'));
    private readonly progressBar = (<HTMLElement>document.querySelector('#research-progress-bar'));
    private readonly container = (<HTMLElement>document.querySelector('#research-container'));
    private readonly template = (<HTMLTemplateElement>document.querySelector('#research-template'));

    private readonly _cinema: Cinema;

    constructor(cinema: Cinema) {
        this._cinema = cinema;

        var self = this;
        this.costSlider.addEventListener('change', function () {
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
            let researchItem = category.getNextResearch(self._cinema.timeManager);

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

        document.querySelectorAll('div.research-block').forEach(function (elementBase) {
            let element = <HTMLElement>elementBase;
            element.addEventListener('click', function () {
                if (element.dataset.researchId === undefined) {
                    return;
                }

                let researchItemId = parseInt(element.dataset.researchId);

                //is this tech already active?
                if (self._cinema.researchManager.activeResearch !== null && researchItemId === self._cinema.researchManager.activeResearch.id) {
                    element.classList.remove('active');
                    self._cinema.researchManager.setActiveResearch(null);
                    self.renderWhenTechChanges();
                    return;
                }

                //is this a valid tech?
                let researchItem = self._cinema.researchManager.tree.get(researchItemId);
                if (researchItem === undefined || !self._cinema.researchManager.setActiveResearch(researchItem)) {
                    return;
                }

                //everything ok, mark it as active
                let alreadyActiveTech = self.container.querySelector('.active');
                if (alreadyActiveTech !== null) {
                    alreadyActiveTech.classList.remove('active');
                }

                element.classList.add("active");
                self.renderWhenTechChanges();
            });
        });
    }

    render(): void {
    }

    //only update once a month
    renderByMonth(): void {
        this.renderResearchGrid();
        this.renderWhenTechChanges();//maybe the tech changed so we need to update the ui
    }

    private renderWhenTechChanges() {
        this.progressBar.setAttribute('value', this._cinema.researchManager.getProgressPercentage().toString());
        this.costPrice.innerHTML = currency(this._cinema.researchManager.getMontlyCost());
    }
}

export {RenderResearch}