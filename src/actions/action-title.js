'use strict';

export const changeTitleColor = (color) => {
    console.log('changeTitleColor action called w/ color: ', color);
    return {
        type: "CHANGE_TITLE_COLOR",
        color
    };
}

