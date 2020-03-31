var Modal = /** @class */ (function () {
    function Modal() {
        this.hide = function () {
            $('#game-modal').modal('hide');
        };
    }
    Modal.prototype.show = function (partialName) {
        $('#game-modal div.modal-body').html(ConfigManager.partial(partialName));
        $('#game-modal').modal({
            backdrop: 'fixed',
            keyboard: false
        });
    };
    return Modal;
}());
var Modal = new Modal();
