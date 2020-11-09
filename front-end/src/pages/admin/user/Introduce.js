import React from 'react';
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  overflow:hidden;
  height: 768px;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: 0 0px;
  
`;

const Image = styled.img`
    max-width:100%;
    height:768px;
    object-fit: cover;
    
    
`;


const Introduce = () => {
    var settings = {
        dots: false,
        arrows: false,
        speed: 2000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        // 슬라이더를 넘기지 않고 fade in/out 하는 식으로 트랜지션 됨
        fade: true,
        // 레이지 로딩할 거야?
        lazyLoad: true

      };
    
    const imgUrl1 = require('../../../images/subway1.png');
    const imgUrl2 = require('../../../images/subway2.png');
    const imgUrl3 = require('../../../images/City_subway.jpg');

      const items = [
        { id: 1, url: imgUrl1 },
        { id: 2, url: imgUrl2 },
        { id: 3, url: imgUrl3 },
      ];
   

    return (
        <div>
           <Container>
                <StyledSlider {...settings}
                >
                {items.map(item => {
                    return (
                    <div key={item.id}>
                        <ImageContainer>
                        <Image src={item.url} />
                        </ImageContainer>
                    </div>
                    );
                })}
                </StyledSlider>
            </Container>
           
        </div>
    );
}

export default Introduce;

