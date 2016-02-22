/* eslint  no-unused-vars: 0 */

/*
 * Necessary to initially load ui-view in an ng-include
 * https://github.com/angular-ui/ui-router/issues/679#issuecomment-31116942
 */
let noop = () => {};

export default $state => {
    "ngInject";
    noop();
};
