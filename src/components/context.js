import React from "react";

const StyleContext = React.createContext({ bgcolor: "green" })

function Toolbar(props) {
    return (
        <div >
            <StyledAside />
        </div>
    )
}

function StyledAside(props) {
    return (
        <StyleContext.Consumer>
            { styled => <div {...props} style={{backgroundColor: styled.bgcolor, width: "500px"}}>This aside is styled using the new Context API</div> }
        </StyleContext.Consumer>
    )
}

export { StyleContext, Toolbar, StyledAside }
