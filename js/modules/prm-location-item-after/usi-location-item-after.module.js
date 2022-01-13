import {usiItemRedTextModule} from './usi-item-red-text/usi-item-red-text.module';

export const usiLocationItemAfterModule = angular
    .module('usiLocationItemAfterModule', [])
        .component('prmLocationItemAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-item-red-text-component after-ctrl="$ctrl"></usi-item-red-text-component>'
        });

usiLocationItemAfterModule.requires.push(usiItemRedTextModule.name);