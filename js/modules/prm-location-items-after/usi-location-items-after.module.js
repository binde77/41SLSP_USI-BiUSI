import {usiLinksModule} from './usi-links/usi-links.module';

export const usiLocationItemsAfterModule = angular
    .module('usiLocationItemsAfterModule', [])
        .component('prmLocationItemsAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-links-component after-ctrl="$ctrl"></usi-links-component>'
        });

usiLocationItemsAfterModule.requires.push(usiLinksModule.name);
