import {usiConfigService} from '../../../services/usi-config.service';
import {usiLocationOpenCloseConfig} from './usi-location-open-close.config';
import {usiLocationOpenCloseController} from './usi-location-open-close.controller';
import {usiLocationOpenCloseHtml} from './usi-location-open-close.html';

export const usiLocationOpenCloseModule = angular
    .module('usiLocationOpenCloseModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('usiLocationOpenCloseConfig', usiLocationOpenCloseConfig)
        .controller('usiLocationOpenCloseController', usiLocationOpenCloseController)
        .component('usiLocationOpenCloseComponent',{
            controller: 'usiLocationOpenCloseController',
            bindings: {afterCtrl: '<'},
            template: usiLocationOpenCloseHtml
        })

