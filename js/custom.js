(function () {


    var app = angular.module('centralCustom', ['angularLoad']);
    // var app = angular.module('viewCustom', ['angularLoad']);


    // COMMENTATO IN ATTESA DI TARIFFE USI
    // app.controller('CourierInfoController', [function () {
    //     var vm = this;

    //     vm.linkBase = "https:\/\/slsp.ch\/fees";


    // }]);

    // ELIMINATO, VIENE EREDITATO DA CENTRAL CUSTOMIZATION PACKAGE
    // App.component“prmRequestAfter”






    app.controller('LibInfoController', [function () {
        var vm = this;
        vm.getLibrary = getLibrary;
        vm.biblinkText = "Library";
        // vm.biblinkBase = "https:\/\/slsp.ch\/libraries";
        vm.biblinkBase = getLink;
        vm.biblinkStyle = getStyle;

        function getLibrary() {
            if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca dell\'Accademia di architettura' || vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Academy of architecture Library') {
                return 'BIBLIOTECA CHIUSA / LIBRARY CLOSED 03.12.2020-31.01.2021';
            }
            else {
                return vm.parentCtrl.currLoc.location.librarycodeTranslation;
            }
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
            if (vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Biblioteca dell\'Accademia di architettura' || vm.parentCtrl.currLoc.location.librarycodeTranslation == 'USI-Academy of architecture Library') {
                return 'color: red;';
            }
            else {
                return '';
            }
        }

    }]);

    app.component('prmLocationItemsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'LibInfoController',
        template: '<div layout="row" class="LibInfo" layout-align="start center"><span class="md-subhead"><a ng-href="{{ $ctrl.biblinkBase() }}" style="{{ $ctrl.biblinkStyle() }}" target="_blank"><img width="35px" ng-src="/discovery/custom/41SLSP_NETWORK-CENTRAL_PACKAGE/img/information.png" />{{ $ctrl.getLibrary() }}</a></span></div>'
    });



})();