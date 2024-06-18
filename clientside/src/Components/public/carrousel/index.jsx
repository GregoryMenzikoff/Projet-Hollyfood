import React from 'react';
import Card from '../Card';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrousel = ({ recipes, slider }) => {

       
    

    const settings = {
        accessibility: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,    
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 480,
                settings: {                    
                    slidesToShow: 1,
                    dots: false,
                }
            }
        ]
    };

    return (
        <> 
            <Slider ref={slider} {...settings}>                 
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                    <Card                       
                        score={recipe.averageRating}
                        picture={recipe.picture}
                        name={recipe.name}
                        workTitle={recipe.work.title}
                        difficulty={recipe.difficulty}
                        slug={recipe.slug}
                        id={recipe.id}      
                    />
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default Carrousel;
