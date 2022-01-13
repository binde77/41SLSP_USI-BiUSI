export class usiEditPersonalDetailsController {

    constructor($scope) {
        let lang = 'en';
        let sms = $scope.$root.$$childHead.$ctrl.userSessionManagerService;
        if (sms) {
            lang = sms.getInterfaceLanguage();
        }

        this.detailsBaseEdu = "https:\/\/eduid.ch\/web\/change-account-data\/2\/?lang=" + lang;
        this.detailsBaseReg = "https:\/\/registration.slsp.ch\/library-card\/?lang=" + lang;
        this.exclude = ['STAFF', '11', '12', '13', '14', '15', '16', '91', '92', '99'];
        this.grpA = ['11', '91', '92'];
        this.grpB = ['12', '13', '14', '15', '16'];
    }

    getPatronGrp() {
        if (this.afterCtrl.parentCtrl.personalInfoService.personalInfo !== undefined) {
            let patron = this.afterCtrl.parentCtrl.personalInfoService.personalInfo.patronstatus[0].registration[0].institution[0].patronstatuscode;
            if (!this.exclude.includes(patron)) {
                return true;
            }
            else {
                return false;
        	}
        }
		return false;
    }

    grpLabelA() {
        if (this.afterCtrl.parentCtrl.personalInfoService.personalInfo !== undefined) {
            let labelA = this.afterCtrl.parentCtrl.personalInfoService.personalInfo.patronstatus[0].registration[0].institution[0].patronstatuscode;
            if (this.grpA.includes(labelA)) {
                return true;
            }
            else {
                return false;
        	}
    	}
        return false;
	}


    grpLabelB() {
        if (this.afterCtrl.parentCtrl.personalInfoService.personalInfo !== undefined) {
            let labelB = this.afterCtrl.parentCtrl.personalInfoService.personalInfo.patronstatus[0].registration[0].institution[0].patronstatuscode;
            if (this.grpB.includes(labelB)) {
                return true;
            }
            else {
                return false;
        	}
		}
        return false;
    }
}

usiEditPersonalDetailsController.$inject = [ '$scope' ];