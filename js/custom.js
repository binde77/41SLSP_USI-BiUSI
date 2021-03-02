(function () {


    var app = angular.module('centralCustom', ['angularLoad']);
    // var app = angular.module('viewCustom', ['angularLoad']);


    // TARIFFE USI
    app.controller('CourierInfoController', [function () {
        var vm = this;

        // vm.linkBase = "https:\/\/slsp.ch\/fees";
        vm.getParms = "?vid=41SLSP_USI:BiUSI";
        vm.customLinkBase = "\/discovery\/static-file\/costs";

    }]);

    // ELIMINATO, VIENE EREDITATO DA CENTRAL CUSTOMIZATION PACKAGE
    // App.component“prmRequestAfter”


    app.component('prmRequestAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'CourierInfoController',
        template: '<div layout="row" class="courier-info bar alert-bar layout-align-center-center layout-row" layout-align="center center"><span class="md-subhead"><a href="{{ $ctrl.customLinkBase }}{{ $ctrl.getParms }}" target="_blank"><span translate="customized.fulldisplay.fees"></span></a></span></div>'
    });






    app.controller('LibInfoController', [function () {
        var vm = this;
        vm.getLibrary = getLibrary;
        vm.biblinkText = "Library";
        // vm.biblinkBase = "https:\/\/slsp.ch\/libraries";
        vm.biblinkBase = getLink;
        vm.biblinkStyle = getStyle;

        function getLibrary() {
            // if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca dell\'Accademia di architettura' || vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Academy of architecture Library') {
            //     return 'BIBLIOTECA CHIUSA / LIBRARY CLOSED 03.12.2020-31.01.2021';
            // }
            // else {
            //     return vm.parentCtrl.currLoc.location.librarycodeTranslation;
            // }
            return vm.parentCtrl.currLoc.location.librarycodeTranslation;
        }
        function getLink() {
            if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca dell\'Accademia di architettura' || vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Academy of architecture Library') {
                return 'http:\/\/biblio.arc.usi.ch';
            }
            else if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca universitaria Lugano'){
                return 'https:\/\/www.bul.sbu.usi.ch/'
            }
            else {
                return 'https:\/\/slsp.ch\/libraries';
            }
        }
        function getStyle() {
            // if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca dell\'Accademia di architettura' || vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Academy of architecture Library') {
            //     return 'color: red;';
            // }
            // else {
            //     return '';
            // }
            return '';
        }

    }]);

    app.component('prmLocationItemsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'LibInfoController',
        template: '<div layout="row" class="LibInfo" layout-align="start center"><span class="md-subhead"><a ng-href="{{ $ctrl.biblinkBase() }}" style="{{ $ctrl.biblinkStyle() }}" target="_blank"><img width="35px" ng-src="/discovery/custom/41SLSP_NETWORK-CENTRAL_PACKAGE/img/information.png" />{{ $ctrl.getLibrary() }}</a></span></div>'
    });




    // Insert customized text per items from MEAA and policy 65 - Same day loan
    app.controller('ItemCommentComponentController', [function () {
        var vm = this;

        vm.isMeaa = isMeaa;
        vm.isSameDay = isSameDay;
        vm.isLabisalp = isLabisalp;
        vm.isCattedre = isCattedre;

        function isMeaa() {
            if (vm.parentCtrl.loc.location.libraryCode == 'MEAA') {
                return true;
            }
            return false;
        }

        function isSameDay() {
            var policy = vm.parentCtrl.loc.items[0].itemFields[1];
            if (policy.lastIndexOf('Same') > -1) {
                return true;
            }
            return false;
        }

        function isLabisalp() {
        		var labisalpLocation = vm.parentCtrl.loc.location.subLocationCode;
            if (labisalpLocation == '820') {
                return true;
            }
            return false;
        }

        function isCattedre() {
        		var cattedreLocation = vm.parentCtrl.loc.location.subLocationCode;
            if (cattedreLocation == '845') {
                return true;
            }
            return false;
        }
    }]);

    app.component('prmLocationItemAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'ItemCommentComponentController',
        template: '<span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isLabisalp()"><span translate="customized.arc.labisalp"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isCattedre()"><span translate="customized.arc.cattedre"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isMeaa() && $ctrl.isSameDay()"><span translate="customized.arc.sameday"></span></span>'
    });



})();