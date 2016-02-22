import initRouter from "core/core.router.run";

export default angular
    .module("app.core", [
        "ngAnimate",
        "ui.bootstrap",
        "ui.router",
        "ngResource"
    ])
    .run(initRouter);
