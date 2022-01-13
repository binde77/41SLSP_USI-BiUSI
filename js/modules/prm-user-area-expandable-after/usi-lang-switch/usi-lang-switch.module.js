/**
* @ngdoc module
* @name usiLangSwitchModule
*
* @description
* - Add LangSwitch to user area
* @example
* each view
*
*/
import {usiLangSwitchController} from './usi-lang-switch.controller';

export const usiLangSwitchModule = angular
    .module('usiLangSwitchModule', [])
        .controller('usiLangSwitchController', usiLangSwitchController)
        .component('usiLangSwitchComponent',  {
            bindings: {afterCtrl: '<'},
            controller: 'usiLangSwitchController',
//            template: '<button class="md-button md-lang-button" ng-repeat="(lang, url) in $ctrl.languages" ng-class="{active: $ctrl.afterCtrl.parentCtrl.lang == lang}"><a href="{{url}}">{{lang}}</a></button>'
            template: '<button class="md-button md-lang-button" ng-repeat="lang in $ctrl.languages" ng-class="{active: $ctrl.afterCtrl.parentCtrl.lang == lang}" ng-click="$ctrl.changeLanguage(lang)">{{lang}}</button>'
        })
