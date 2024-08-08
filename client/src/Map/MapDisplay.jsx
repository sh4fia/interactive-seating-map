import React, { useState } from 'react'

const MapDisplay = (props) => {

    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(prev => !prev);
    }

    const handleClick = (props) => {
        let index = props.index;
        props.updateStyle(index);
    }

    return (
        <>
            <text
                x={props.x}
                y={props.y + 20}
                fontSize="10"
                fill="white"
                height={props.height}
                width={props.width}
                display={hover || props.seatStyle === props.index ? "block" : "none"}
            >
                {props.seat}
            </text>
            <rect
                x={props.x}
                y={props.y}
                height={props.height}
                width={props.width}
                fill={props.chosen ? 'grey' : hover || props.seatStyle === props.index ? "blue" : "black"}
                onMouseEnter={() => handleHover()}
                onMouseLeave={() => handleHover()}
                onClick={!props.chosen ? () => handleClick(props) : null}
            >
            </rect>
        </>
    )
}

export default MapDisplay