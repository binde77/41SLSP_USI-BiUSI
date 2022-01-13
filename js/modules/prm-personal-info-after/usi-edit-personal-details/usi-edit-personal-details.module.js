import {usiEditPersonalDetailsController} from './usi-edit-personal-details.controller';
import {usiEditPersonalDetailsHtml} from './usi-edit-personal-details.html';

export const usiEditPersonalDetailsModule = angular
    .module('usiEditPersonalDetailsModule', [])
        .controller('usiEditPersonalDetailsController', usiEditPersonalDetailsController)
        .component('usiEditPersonalDetailsComponent',{
            bindings: {afterCtrl: '<'},
            controller: 'usiEditPersonalDetailsController',
            template: usiEditPersonalDetailsHtml
        })
