(function () {


        var app = angular.module('viewCustom', ['angularLoad']);
    /****************************************************************************************************/
        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/
        /*var app = angular.module('centralCustom', ['angularLoad']);*/
    /****************************************************************************************************/

    // ITEM INSERT TEXT TEST
    app.controller('ItemCommentComponentController', [function () {
        var vm = this;

        vm.getItemId = getItemId;
        vm.getLibrary = getLibrary;
        vm.callAlmaApi = callAlmaApi;

        function getItemId() {
            return vm.parentCtrl.loc.items[0].item;
        }

        function getLibrary() {
            if (vm.parentCtrl.loc.location.libraryCode == 'MEAA') {
                return 'Library MEAA';
            }
            else {
                return '';
            }
        }

        function callAlmaApi() {
            var itemId = vm.parentCtrl.loc.items[0].item;
            var holdingId = vm.parentCtrl.results[0][0].location.holdId;
            var mmsId = vm.parentCtrl.results[0][0].location.ilsApiId;
            var apiURL = 'http://biblio.arc.usi.ch/files/tests/alma/api-proxy-bib.php?mms=' + mmsId + '&hold=' + holdingId + '&item=' + itemId;

            const Http = new XMLHttpRequest();
            Http.open("GET", apiURL);
            Http.send();

            var itempolicy = false;
            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(JSON.parse(Http.responseText).item_data.policy.value)
                    return JSON.parse(Http.responseText).item_data.policy.value;
                }
            }
        }
    }]);
    app.component('itemCommentComponent', {
        bindings: {parentCtrl: '<'},
        controller: 'ItemCommentComponentController',
        template: '<span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;">{{$ctrl.getLibrary()}}<br />{{$ctrl.getItemId()}}<br />{{$ctrl.callAlmaApi()}}</span>',
    });
    app.component('prmLocationItemAfter', {
        bindings: {parentCtrl: '<'},
        template: '<item-comment-component parent-ctrl="$ctrl.parentCtrl"></item-comment-component>'
    });



    app.controller('CourierInfoController', [function () {
        var vm = this;

        vm.linkText = "Fees \/ Geb\u00fchren \/ Frais \/ Costi";
        vm.linkBase = "https:\/\/slsp.ch\/fees";


    }]);

    app.component('prmRequestAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'CourierInfoController',
        template: '<div layout="row" class="courier-info bar alert-bar layout-align-center-center layout-row" layout-align="center center"><span class="md-subhead"><a href="{{ $ctrl.linkBase }}" target="_blank">{{ $ctrl.linkText }}</a></span></div>'
    });






    app.controller('LibInfoController', [function () {
        var vm = this;
        vm.getLibrary = getLibrary;
        vm.biblinkText = "Library";
        vm.biblinkBase = "https:\/\/slsp.ch\/libraries";

        function getLibrary() {
            return vm.parentCtrl.currLoc.location.librarycodeTranslation;
        }

    }]);

    app.component('prmLocationItemsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'LibInfoController',
        template: '<div layout="row" class="LibInfo" layout-align="start center"><span class="md-subhead"><a ng-href="{{ $ctrl.biblinkBase }}" target="_blank"><img width="35px" ng-src="/discovery/custom/41SLSP_USI-BiUSI/img/information.png" />{{ $ctrl.getLibrary() }}</a></span></div>'
    });



})();