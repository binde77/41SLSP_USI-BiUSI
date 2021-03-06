(function () {

	var app = angular.module('viewCustom', ['angularLoad']);

	//--------Fees messages ---------------------------------------

	app.controller('CourierInfoController', ['$element', function ($element) {

	//shortcut for convenience
    this.form = $element[0].parentElement;

    //function for inserting block
     this.$doCheck = function () {
            let form = false;
            let formLength = 2;
            if (this.form.children[0].children[1] !== undefined && this.form.children[0].children[1].children[0] !== undefined) {
                form = this.form.children[0].children[1].children[0];
            }
            else if (this.form.children[0].children[0] !== undefined && this.form.children[0].children[0].children[0] !== undefined) {
                form = this.form.children[0].children[0].children[0];
                formLength = 3;
            }

            //create and insert info block if not present
            if (form && form.children.length == formLength) {
                let info = document.createElement('DIV');
                info.className = "courier-info bar alert-bar";
                info.innerHTML =
                `<h4>${this.parentCtrl.$translate.instant('customize.fullview.feesTitle')}</h4>
        <p>${this.parentCtrl.$translate.instant('customize.fullview.feesInfo')}</p>
        <p><a href="${this.parentCtrl.$translate.instant('customize.fullview.feesUrl')}"
        target="_blank">${this.parentCtrl.$translate.instant('customize.fullview.feesLinkText')}</a></p>`;
                form.insertBefore(info, form.children[formLength-1]);
        }
        }
	}]);
	app.component('prmRequestAfter', {
	 bindings: { parentCtrl: '<' },
	 controller: 'CourierInfoController'
	});

	//--------"i" button Central Package version---------------------------------------
    // app.controller('LibInfoController', [function () {
    //     var vm = this;
    //     vm.getLibrary = getLibrary;
    //     vm.biblinkText = "Library";
    //     vm.biblinkBase = "https:\/\/slsp.ch\/libraries";
    //     function getLibrary() {
    //         return vm.parentCtrl.currLoc.location.librarycodeTranslation;
    //     }
    // }]);
    // app.component('prmLocationItemsAfter', {
    //     bindings: { parentCtrl: '<' },
    //     controller: 'LibInfoController',
    //     template: '<div layout="row" class="LibInfo" layout-align="start center"><span class="md-subhead"><a ng-href="{{ $ctrl.biblinkBase }}" target="_blank"><img width="35px" ng-src="/discovery/custom/41SLSP_NETWORK-CENTRAL_PACKAGE/img/information.png" />{{ $ctrl.getLibrary() }}</a></span></div>'
    // });

    //--------"i" button BiUSI version ---------------------------------------
    app.controller('LibInfoController', [function () {
        var vm = this;
        vm.getLibrary = getLibrary;
        vm.biblinkText = "Library";
        vm.biblinkBase = getLink;
        vm.biblinkStyle = getStyle;
        vm.MEAAclosureMessage = getMEAAclosureMessage;

        function getLibrary() {
            return vm.parentCtrl.currLoc.location.librarycodeTranslation;
        }
        function getLink() {
            if (vm.parentCtrl.loc.location.libraryCode == 'MEAA' || vm.parentCtrl.currLoc.location.libraryCode == 'MEAA') {
                return 'http:\/\/biblio.arc.usi.ch';
            }
            else if (vm.parentCtrl.loc.location.libraryCode == 'LUBUL' || vm.parentCtrl.currLoc.location.libraryCode == 'LUBUL'){
                return 'https:\/\/www.bul.sbu.usi.ch/'
            }
            else {
                return 'https:\/\/slsp.ch\/libraries';
            }
        }
        function getStyle() {
            return '';
        }
        function getMEAAclosureMessage() {
            // check if today is in given closure range
            var today = new Date().getTime();
            // the month is 0-indexed! For example, new Date(1995, 11, 17) resolves to December 17, 1995
            var from = new Date(2021, 6, 21).getTime();
            var to = new Date(2021, 7, 8).getTime();
            var withinRange = today >= from && today <= to;
            // return closure message, or return false
            if ( withinRange ) {
                switch ( vm.parentCtrl.userSessionManagerService.attributesMap.interfaceLanguage ) {
                    case "it":
                        return "Attenzione: servizi sospesi per chiusura estiva dal 26 luglio all’8 agosto";
                    break;
                    default:
                        return "Attention: services suspended due to summer closure from 26 July to 8 August";
                }
            }
            return false;
        }
    }]);
    app.component('prmLocationItemsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'LibInfoController',
        template: `
            <div ng-if="!$ctrl.MEAAclosureMessage()" layout="row" class="LibInfo" layout-align="start center">
                <span class="md-subhead">
                    <a ng-href="{{ $ctrl.biblinkBase() }}" style="{{ $ctrl.biblinkStyle() }}" target="_blank">
                        <img width="35px" ng-src="/discovery/custom/41SLSP_USI-BiUSI/img/information.png" />
                        {{ $ctrl.getLibrary() }}
                    </a>
                </span>
            </div>
            <!-- With closure message -->
            <div ng-if="$ctrl.MEAAclosureMessage()" layout="row" class="LibInfo" layout-align="start center">
                <span class="md-subhead">
                    <a ng-href="{{ $ctrl.biblinkBase() }}" style="{{ $ctrl.biblinkStyle() }}" target="_blank">
                        <img width="35px" ng-src="/discovery/custom/41SLSP_USI-BiUSI/img/information.png" />
                        {{ $ctrl.getLibrary() }}
                    </a> - <span style="color: red;font-size: 15px;">{{ $ctrl.MEAAclosureMessage() }}</span>
                </span>
            </div>
            `
    });


     //--------ILL Signin Order -  if logged out ---------------------------------------
    app.service('userService', ['jwtHelper', function (jwtHelper) {
        this.isGuest = function () {
            var jwt = sessionStorage.getItem('primoExploreJwt');
            if (!jwt) {
                return true;
            }
            var decodedToken = jwtHelper.decodeToken(jwt);
            let userName = decodedToken.userGroup !== 'GUEST' ? decodedToken.userName : '';
            if (userName) {
                return false
            }
            else {
                return true;
            }
        }
    }]);

    app.controller('IllBoxController', function ($scope, userService) {
        $scope.usrNme = userService.isGuest();
        if ($scope.usrNme == true) {
            var myEl = angular.element(document.querySelector('primo-explore'));
            return myEl.addClass('logged-out')
        }
        else {
            var myEl = angular.element(document.querySelector('primo-explore'));
            return myEl.removeClass('logged-out');
        }
    });
    app.component('prmUserAreaExpandableAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'IllBoxController',
        template: ''
    });

    //--------ILL Signin Order -  if Alert Message ---------------------------------------
    app.controller('AlertMsgController', ['$scope', function ($scope) {
        var vm = this;
        vm.getAlert = getAlert

        function getAlert() {
            var ga = vm.parentCtrl.almaHowToGetitService.reqAlert._htmlMsg;
            var myEl2 = angular.element(document.querySelector('primo-explore'));
            if (ga.length > 0) {
                return myEl2.addClass('alert');
            }
            else {
                return myEl2.removeClass('alert');
            }
        }
    }]);
    app.component('almaHowovpAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'AlertMsgController',
        template: '<div style="display:none">{{$ctrl.getAlert()}}</div>'
    });

    //------------------------------ edit personal details  ---------------------------

    app.controller('EditPersonalDetailsController', ['$scope', function ($scope) {

        let lang = 'en';
        let sms = $scope.$root.$$childHead.$ctrl.userSessionManagerService;
        if (sms) {
            lang = sms.getInterfaceLanguage();
        }
        this.detailsBaseEdu = "https:\/\/eduid.ch\/web\/change-account-data\/2\/?lang=" + lang;
        this.detailsBaseReg = "https:\/\/registration.slsp.ch\/library-card\/?lang=" + lang;
        this.grpA = ['11', '91', '92'];
        this.grpB = ['12', '13', '14', '15', '16'];
        this.noShow = ['STAFF', '99'];
        this.showButtons = this.showA = this.showB = false;

        this.$doCheck = function () {
            if (this.parentCtrl.personalInfoService.personalInfo !== undefined) {
                let patron = this.parentCtrl.personalInfoService.personalInfo.patronstatus[0].registration[0].institution[0].patronstatuscode;
                if (this.grpA.includes(patron)) {
                    this.showA = true;
                }
                else if (this.grpB.includes(patron)) {
                    this.showB = true;
                }
                else if (!this.noShow.includes(patron)) {
                    this.showButtons = true;
                }
            }
        }
    }]);
    app.component('prmPersonalInfoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'EditPersonalDetailsController',
    template: '<md-card ng-show="$ctrl.showA || $ctrl.showB">\
                    <md-card-content>\
                        <p>\
                            <span ng-show="$ctrl.showA" translate="customized.libraries.details"></span>\
                            <span ng-show="$ctrl.showB" translate="customized.slsp.details"></span>\
                        </p>\
                    </md-card-content>\
                </md-card>\
                <div ng-show="$ctrl.showButtons">\
                    <md-button class="md-button-confirm button-link" href="{{ $ctrl.detailsBaseEdu }}" target="_blank">\
                        <prm-icon  class="rotate-20 margin-right-small" icon-type="svg" svg-icon-set="primo-ui" icon-definition="pencil"></prm-icon>\
                        <span translate="customized.personal.details"></span>\
                    </md-button>\
                    <br>\
                    <md-button class="md-button-confirm button-link" href="{{ $ctrl.detailsBaseReg }}" target="_blank">\
                        <prm-icon class="rotate-20 margin-right-small" icon-type="svg" svg-icon-set="primo-ui" icon-definition="account-card-details"></prm-icon>\
                        <span translate="customized.libcard.number"></span>\
                    </md-button>\
                </div>'
    });


    // -------- BiUSI - Insert customized texts for items from MEAA -----------------
    app.controller('ItemCommentComponentController', ['$element', function ($element) {
        var vm = this;
        vm.isMeaa = isMeaa;
        vm.isSameDay = isSameDay;
        vm.isLabisalp = isLabisalp;
        vm.isCattedre = isCattedre;
        vm.isBtm = isBtm;
        vm.isVercGubl = isVercGubl;

        function setSamedaypolicywarning() {
			this.requestafter = $element[0].parentElement;
	        var policy = this.requestafter.children[0].children[0].children[0].children[1].innerText;
	        if ( policy == 'Same Day Loan' ) {
	        	let policymsg = document.createElement('DIV');
					policymsg.className = "policy-message-red";
					policymsg.innerHTML =
					`<span>${vm.parentCtrl.$translate.instant('customized.arc.sameday')}</span>`;
					this.requestafter.children[1].append(policymsg);
	        }
		}
		setTimeout(setSamedaypolicywarning, 300);

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
        function isBtm() {
                var cattedreLocation = vm.parentCtrl.loc.location.subLocationCode;
            if (cattedreLocation == '809') {
                return true;
            }
            return false;
        }
        function isVercGubl() {
                var vercgubl = vm.parentCtrl.loc.location.subLocationCode;
            if (vercgubl == '808' || vercgubl == '810') {
                return true;
            }
            return false;
        }
    }]);
    app.component('prmLocationItemAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'ItemCommentComponentController',
        template: '<span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isLabisalp()"><span translate="customized.arc.labisalp"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isCattedre()"><span translate="customized.arc.cattedre"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px; display: flex !important; flex-direction: column;" ng-if="$ctrl.isMeaa() && $ctrl.isBtm()"><span translate="customized.arc.btm"></span> <a style="color: red; text-decoration: underline solid red;" href="http://www.arc.usi.ch/it/btm" target="_blank">http://www.arc.usi.ch/it/btm</a></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isVercGubl()"><span translate="customized.arc.vercgubl"></span></span>'
    });

    // -------- BiUSI - show open/closed stacks at individual location level -----------------
    //
    app.controller( 'CurrLocationFuController', [function () {
        var vm = this;
        vm.isCurrOpenFu = isCurrOpenFu;
        vm.isUsi = isUsi;
        function isCurrOpenFu() {
            const openLocations = [ '201', '202', '208', '801', '803', '804', '805', '808', '810', '819', '823', '827', '831', '832', '833', '834', '841', '842', '843', '844' ];
                if ( openLocations.includes( vm.parentCtrl.currLoc.location.subLocationCode ) ) {
                    return true;
                }
                return false;
        }
        function isUsi() {
            if ( vm.parentCtrl.currLoc.location.organization == '41SLSP_USI' ) {
                    return true;
                }
                return false;
        }
    }]);
    app.component('prmLocationHoldingsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'CurrLocationFuController',
        template: '<div class="open-closed-container" ng-if="$ctrl.isCurrOpenFu() && $ctrl.isUsi()"><div class="open-closed-img"><img src="/discovery/custom/41SLSP_USI-BiUSI/img/open_shelf_traced_icon.png" alt=""></div><div class="open-closed-txt"><span style="padding: 0.1em 0px 0px; font-size: 1em; color: green; display: flex; max-width: 200px;" translate="customized.arc.openshelf"></span></div></div><div class="open-closed-container" ng-if="!$ctrl.isCurrOpenFu() && $ctrl.isUsi()"><div class="open-closed-img"><img src="/discovery/custom/41SLSP_USI-BiUSI/img/closed_shelf_traced_icon.png" alt=""></div><div class="open-closed-txt"><span style="padding: 0.1em 0px 0px; font-size: 1em; color: red; display: flex; max-width: 200px;" translate="customized.arc.closedshelf"></span></div></div>'
    });

})();