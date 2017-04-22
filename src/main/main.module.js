angular
    .module('main', [
        'ngResource',
        'ui.bootstrap'
    ])
    .run(function ($state, $transitions, UserService) {
        $transitions.onStart({
            to: function (state) {
                if (state.data.requiredLogin && !UserService.statusLogin()) {
                    return $state.go('login');
                }
                state.data.requiredLogin = false;
                return state.data && state.data.requiredLogin;
            }
        }, function () {
            return $state.target('login');
        });
    });