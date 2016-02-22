/* eslint angular/typecheck-array: 0 */

export default ngAnnotated => {
    if(Array.isArray(ngAnnotated)) {
        return ngAnnotated.slice(-1)[0];
    }
    return ngAnnotated;
};
