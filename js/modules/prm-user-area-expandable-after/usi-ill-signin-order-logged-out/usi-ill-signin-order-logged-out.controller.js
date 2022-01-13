export class usiIllSigninOrderLoggedOutController {

    constructor(usiIllSigninOrderLoggedOutService, $scope) {
        this.usiIllSigninOrderLoggedOutService = usiIllSigninOrderLoggedOutService;
        this.$scope = $scope;
    }

    $doCheck() {
        try{
            // this.parentCtrl = this.afterCtrl.parentCtrl;
            this.$scope.usrNme = this.usiIllSigninOrderLoggedOutService.isGuest();

            if (this.$scope.usrNme == true) {
                let myEl = angular.element(document.querySelector('primo-explore'));
                return myEl.addClass('logged-out')
            }
        
            else {
                let myEl = angular.element(document.querySelector('primo-explore'));
                return myEl.removeClass('logged-out');
            }
        }
        catch(e){
            console.error("***SLSP*** an error occured: usiIllSigninOrderLoggedOutController\n\n");
            console.error(e.message);
        }
    }
}

usiIllSigninOrderLoggedOutController.$inject = ['usiIllSigninOrderLoggedOutService', '$scope'];