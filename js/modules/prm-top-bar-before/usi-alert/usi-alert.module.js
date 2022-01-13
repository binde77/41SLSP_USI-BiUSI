import {usiConfigService} from '../../../services/usi-config.service';
import {usiAlertController} from './usi-alert.controller';
import {usiAlertHtml} from './usi-alert.html';

export const usiAlertModule = angular
    .module('usiAlertModule', [])
        .factory('usiConfigService', usiConfigService)
        .controller('usiAlertController', usiAlertController)
        .component('usiAlertComponent',{
            controller: 'usiAlertController',
            template: usiAlertHtml
        })
