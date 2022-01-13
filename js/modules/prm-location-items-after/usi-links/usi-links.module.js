import {usiConfigService} from '../../../services/usi-config.service';
import {usiLinksController} from './usi-links.controller';
import {usiLinksHtml} from './usi-links.html';
import {usiLinksConfig} from './usi-links.config';

export const usiLinksModule = angular
    .module('usiLinksModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('usiLinksConfig', usiLinksConfig)
        .controller('usiLinksController', usiLinksController)
        .component('usiLinksComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'usiLinksController',
            template: usiLinksHtml
        })
