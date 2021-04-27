(function () {

    var app = angular.module('viewCustom', ['angularLoad']);

	//--------Fees messages ---------------------------------------

   app.controller('CourierInfoController', ['$element', function ($element) {

		//shortcut for convenience

		this.form = $element[0].parentElement;

		//function for inserting block

		this.$doCheck = function() {
			let form = false;
			if (this.form.children[1].children[1] !== undefined && this.form.children[1].children[1].children[0] !== undefined) {
				form = this.form.children[1].children[1].children[0];
			}
			else if (this.form.children[1].children[0] !== undefined && this.form.children[1].children[0].children[0] !== undefined) {
				form = this.form.children[1].children[0].children[0];
			}

			//create and insert info block if not present
			if (form && form.children.length == 2) {
				let info = document.createElement('DIV');
				info.className = "courier-info bar alert-bar";
				info.innerHTML =
				`<h4>${this.parentCtrl.$translate.instant('customize.fullview.feesTitle')}</h4>
				<p>${this.parentCtrl.$translate.instant('customize.fullview.feesInfo')}</p>
				<p><a href="${this.parentCtrl.$translate.instant('customize.fullview.feesUrl')}"
				target="_blank">${this.parentCtrl.$translate.instant('customize.fullview.feesLinkText')}</a></p>`;
				form.insertBefore(info, form.children[1]);
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
    }]);
    app.component('prmLocationItemsAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'LibInfoController',
        template: '<div layout="row" class="LibInfo" layout-align="start center"><span class="md-subhead"><a ng-href="{{ $ctrl.biblinkBase() }}" style="{{ $ctrl.biblinkStyle() }}" target="_blank"><img width="35px" ng-src="/discovery/custom/41SLSP_USI-BiUSITEST/img/information.png" />{{ $ctrl.getLibrary() }}</a></span></div>'
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


    // -------- BiUSI - Insert customized text per items from MEAA and policy 65 - Same day loan -----------------
    app.controller('ItemCommentComponentController', ['$element', function ($element) {
        var vm = this;
        vm.isMeaa = isMeaa;
        vm.isSameDay = isSameDay;
        vm.isLabisalp = isLabisalp;
        vm.isCattedre = isCattedre;
        vm.isBtm = isBtm;

        // this.tester = $element[0].parentElement;
        // console.log(this.tester.children[0].children[0].children[0].children[0]);
        function slamIt() {
			this.tester = $element[0].parentElement;
	        var policy = this.tester.children[0].children[0].children[0].children[1].innerText;
	        if ( policy == 'Same Day Loan' ) {
	        	let policymsg = document.createElement('DIV');
					policymsg.className = "policy-message-red";
					policymsg.innerHTML =
					`<span>${vm.parentCtrl.$translate.instant('customized.arc.sameday')}</span>`;
					this.tester.children[1].append(policymsg);
	        }
		}
		setTimeout(slamIt, 300);

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
    }]);
    app.component('prmLocationItemAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'ItemCommentComponentController',
        template: '<span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isLabisalp()"><span translate="customized.arc.labisalp"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isCattedre()"><span translate="customized.arc.cattedre"></span></span><span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px; display: flex !important; flex-direction: column;" ng-if="$ctrl.isMeaa() && $ctrl.isBtm()"><span translate="customized.arc.btm"></span> <a style="color: red; text-decoration: underline solid red;" href="http://www.arc.usi.ch/it/btm" target="_blank">http://www.arc.usi.ch/it/btm</a></span>'
    });
    // <span style="padding: 10px; font-size: 0.9em; color: red; display: flex; max-width: 200px;" ng-if="$ctrl.isMeaa() && $ctrl.isSameDay()"><span translate="customized.arc.sameday"></span></span>
})();