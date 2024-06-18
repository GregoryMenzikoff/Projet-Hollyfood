import React from 'react';
import {Rating} from 'react-simple-star-rating';



const RatedBar = ({score}) => {
    return (
                <Rating
                emptyStyle={{ display: "flex" }}
                SVGstyle={{ display: "inline-block", marginBottom: 5 }}
                style={{ marginBottom: -5 }}
                allowFraction={true}
                size={25}
                readonly
                initialValue={score}>
                </Rating>
                    
    )
};



export {RatedBar};