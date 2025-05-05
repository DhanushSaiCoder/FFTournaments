import React from 'react';
import "../styles/SectionDivider.css";
const SectionDivider = (props) => {
    return (
        <div className='sectionDivider'>
            <h3>{props.text}</h3>
        </div>
    );
}

export default SectionDivider;
