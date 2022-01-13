import {usiIllSigninOrderLoggedOutController} from './usi-ill-signin-order-logged-out.controller';
import {usiIllSigninOrderLoggedOutService} from './usi-ill-signin-order-logged-out.service';

export const usiIllSigninOrderLoggedOutModule = angular
    .module('usiIllSigninOrderLoggedOutModule', [])
        .factory('usiIllSigninOrderLoggedOutService', usiIllSigninOrderLoggedOutService)
        .controller('usiIllSigninOrderLoggedOutController', usiIllSigninOrderLoggedOutController)
        .component('usiIllSigninOrderLoggedOutComponent',  {
            bindings: {afterCtrl: '<'},
            controller: 'usiIllSigninOrderLoggedOutController',

        })
    