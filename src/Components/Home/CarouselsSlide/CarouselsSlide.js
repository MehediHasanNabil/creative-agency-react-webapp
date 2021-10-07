import React from 'react';
import './CarouselsSlide.css';
import { Carousel, Container } from 'react-bootstrap';
import carousel1 from '../../../images/carousel-1.png';
import carousel2 from '../../../images/carousel-2.png';
import carousel3 from '../../../images/carousel-3.png';
import carousel4 from '../../../images/carousel-4.png';
import carousel5 from '../../../images/carousel-5.png';

const CarouselsSlide = () => {
    return (
        <Container fluid className="p-5 bg-dark mt-5">
            <Container className="mt-2">
                <h2 className="text-light text-center mb-5">Here are some of <span style={{color: 'rgb(122, 178, 89)'}}> our works </span></h2>
                <Carousel className="mb-5">
                    <Carousel.Item>
                        <img
                        className="d-block w-50 mx-auto"
                        src={carousel1}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 mx-auto"
                        src={carousel2}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 mx-auto cutImg"
                        src={carousel3}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 mx-auto"
                        src={carousel4}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 mx-auto"
                        src={carousel5}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Container>
        </Container>
    );
};

export default CarouselsSlide;