import SetupDateCtrl from "setup-date/setup-date.controller";
import CoreModule from "core/core.module";

export default angular
    .module("app.setup-date", [CoreModule.name])
    .controller("SetupDateCtrl", SetupDateCtrl);