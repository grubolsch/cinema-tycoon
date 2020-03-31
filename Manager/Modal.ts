class Modal {
    public show(partialName) {
        $('#game-modal div.modal-body').html(ConfigManager.partial(partialName));
        $('#game-modal').modal(
            {
                backdrop: 'fixed',
                keyboard: false
            }
        );
    }

    public hide = function() {
        $('#game-modal').modal('hide');
    }
}
var Modal = new Modal();