import { memo, useEffect, useState } from 'react';
import RatingComponent from './MUI-Components/RatingComponent';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader';

function HomeProductSlider({ category, title }) {
    const [isLoading, setIsloading] = useState(false);
    const [productData, setproductData] = useState([]);

    useEffect(() => {
        setIsloading(true)
        axios.get(`https://mainstoreapi.onrender.com/api/product/${category}`).then((response) => {
            setproductData(response.data);
            setIsloading(false)
        });
    }, [category])

    const navigateTO = useNavigate()
    const handleNextBtnClick = (e) => {
        e.preventDefault();
        let box = e.target.previousSibling
        box.scrollLeft = box.scrollLeft + 310
    }

    const handlePrevBtnClick = (e) => {
        e.preventDefault();
        let box = e.target.nextSibling
        box.scrollLeft = box.scrollLeft - 310
    }
    const handleShowProductClick = (e, ID, title, category) => {
        e.preventDefault();
        navigateTO(`/products/${title.slice(0, 5)}${category}-${ID}`)
    }


    return (
        <section className='homeProduct__SliderContainers'>
            <h1 className='homeProduct__ContainersHeader'>{title}</h1>
            <i className="fa-solid fa-caret-left leftArrow sliderArrow" onClick={handlePrevBtnClick} ></i>
            {
                isLoading ? <Loader /> : <div className='homeProduct__SliderBox'>
                    {
                        productData?.map((product) => {
                            return <div className="homeProduct" key={product._id}>
                                <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton" onClick={(e) => handleShowProductClick(e, product.id, product.title, product.category)}></i>
                                <div className="homeProductPosterContainer">
                                    <img src={product?.images.LinkOne} alt="ProductPoster" className="ProductPoster" />
                                </div>
                                <div className="homeProduct__InformationContainer">
                                    <RatingComponent rating={product?.rating} />
                                    <span className='homeProduct__discountPercentageText'>{product?.discountPercentage} % Off</span>
                                    <button className='addToCartButton'>Add To Cart</button>
                                </div>
                            </div>
                        })
                    }


                </div>
            }
            <i className="fa-solid fa-caret-right rightArrow sliderArrow" onClick={handleNextBtnClick}></i>

        </section>
    )
}

export default memo(HomeProductSlider)
