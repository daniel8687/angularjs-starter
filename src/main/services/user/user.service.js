angular
    .module('main')
    .factory('UserService', UserService);

function UserService($log, $q, $resource) {
    var resource = $resource('http://localhost:9001/users');
    var userIsAuthenticated = false;

    return {
        validateUser: validateUser,
        successfulLogin: successfulLogin,
        statusLogin: statusLogin
    };

    function validateUser(user) {
        $log.info('Running validateUser');
        var future = $q.defer();
        resource.query({'userName': user.userName}, {'userPassword': user.userPassword}).$promise.then(function (result) {
            console.log(result);
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function successfulLogin() {
        $log.info('Running successfulLogin');
        userIsAuthenticated = true;
    }

    function statusLogin() {
        $log.info('Running statusLogin');        
        return userIsAuthenticated;
    }
}
