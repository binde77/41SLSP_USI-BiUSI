import {slspFeesLinkController} from './slsp-fees-link.controller';
import {usiConfigService} from '../../../services/usi-config.service';
import {slspFeesLinkConfig} from './slsp-fees-link.config';

export const slspFeesLinkModule = angular
    .module('slspFeesLinkModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('slspFeesLinkConfig', slspFeesLinkConfig)
        .controller('slspFeesLinkController', slspFeesLinkController)
        .component('slspFeesLinkComponent',{
            controller: 'slspFeesLinkController',
            bindings: {afterCtrl: '<'}
        })