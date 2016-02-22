import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";

export default angular
    .module("app.layout", [CoreModule.name, WidgetsModule.name]);
