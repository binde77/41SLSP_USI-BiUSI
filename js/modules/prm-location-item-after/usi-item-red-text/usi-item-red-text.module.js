import {usiConfigService} from '../../../services/usi-config.service';
import {usiItemRedTextConfig} from './usi-item-red-text.config';
import {usiItemRedTextController} from './usi-item-red-text.controller';
import {usiItemRedTextHtml} from './usi-item-red-text.html';

export const usiItemRedTextModule = angular
    .module('usiItemRedTextModule', [])
        .factory('usiConfigService', usiConfigService)
        .factory('usiItemRedTextConfig', usiItemRedTextConfig)
        .controller('usiItemRedTextController', usiItemRedTextController)
        .component('usiItemRedTextComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'usiItemRedTextController',
            template: usiItemRedTextHtml
        })