class RenderLoans {
    public render() {
        // reference the library as dependency
      //  var bsn = require("bootstrap.native");

// Create a Button instance:
//        var btn = new bsn.Button(element,option);



        // get the modal by ID
        var myModal = document.getElementById('modalID');

// initialize on a <div class="modal"> with all options
// Note: options object is optional
        var myModalInstance = new Modal(myModal,
            { // options object
                content: '<div class="modal-body">Some content to be set on init</div>', // sets modal content
                backdrop: 'static', // we don't want to dismiss Modal when Modal or backdrop is the click event target
                keyboard: false // we don't want to dismiss Modal on pressing Esc key
            });

    }
}