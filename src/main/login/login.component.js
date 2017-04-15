function AppLoginController(UserService) {
    console.log('Running login controller');
    var vm = this;
    vm.user = {};

    vm.validationLogin = function () {        
        var promise = UserService.validateUser(vm.user);
        if (promise === true) {
            vm.error = null;
            window.location.replace(window.location.protocol + "//" + window.location.host + "/home");
        }
        else {
            vm.error = 'Usuario o Contraseña invalida. Por favor intente nuevamente';
        }
    };
}

var component = {
    templateUrl: 'main/login/login.html',
    controller: AppLoginController
};

angular
    .module('main')
    .component('appLogin', component);
