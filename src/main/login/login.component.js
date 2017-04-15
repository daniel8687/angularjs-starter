function AppLoginController(UserService, $state) {
    console.log('Running login controller');
    var vm = this;
    vm.user = {};

    vm.validationLogin = function () {
        var promise = UserService.validateUser(vm.user);
        promise.then(function (result) {
            console.log('result login', result);
            if (result.length === 1) {
                vm.error = null;
                $state.go('home');
            }
            else {
                vm.error = 'Usuario o Contraseña invalida. Por favor intente nuevamente';
            }
        }).catch(function (error) {
            console.log('Error found login:', error);
            vm.error = 'Ocurrio un error al momento de iniciar sesion. Por favor contactese con el administrador';
        }).finally(function () {
            console.log('validationLogin is finished');
        });
    };
}

var component = {
    templateUrl: 'main/login/login.html',
    controller: AppLoginController
};

angular
    .module('main')
    .component('appLogin', component);
