import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import HomeComponent from "home/home.component";
import homeRouteConfig from "home/home.route.config";

export default angular
    .module("app.home", [CoreModule.name, WidgetsModule.name])
    .component("home", HomeComponent)
    .config(homeRouteConfig);
