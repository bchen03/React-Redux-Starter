'use strict';

import _ from 'lodash';

// Lodash
const flipped = _.flip(function() {
    return _.toArray(arguments);
});


function lodashTests() {
    console.warn("Lodash Tests");
    console.warn("==> flipped (1,2,3,4,5): ", flipped(1,2,3,4,5));
}

export {lodashTests};

