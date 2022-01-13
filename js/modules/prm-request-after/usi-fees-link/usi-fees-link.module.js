import {usiConfigService} from '../../../services/usi-config.service';
import {usiFeesLinkConfig} from './usi-fees-link.config';
import {usiFeesLinkController} from './usi-fees-link.controller';

export const usiFeesLinkModule = angular
    .module('usiFeesLinkModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('usiFeesLinkConfig', usiFeesLinkConfig)
        .controller('usiFeesLinkController', usiFeesLinkController)
        .component('usiFeesLinkComponent',{
            controller: 'usiFeesLinkController',
            bindings: {afterCtrl: '<'}
        })
