import {usiConfigService} from '../../../services/usi-config.service';
import {usiHowovpController} from './usi-howovp.controller';
import {usiHowovpConfig} from './usi-howovp.config';

export const usiHowovpModule = angular
    .module('usiHowovpModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('usiHowovpConfig', usiHowovpConfig)
        .controller('usiHowovpController', usiHowovpController)
        .component('usiHowovpComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'usiHowovpController',

        })
