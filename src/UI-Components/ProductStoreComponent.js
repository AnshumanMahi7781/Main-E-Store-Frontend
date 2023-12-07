import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
import RatingComponent from "./MUI-Components/RatingComponent"
import Loader from './Loader'
import axios from 'axios'
function ProductStoreComponent() {
  const [AllProduct, setAllProduct] = useState([])
  const category = useParams().category;
  const allBrandName = []

  const [currentCategoryProduct, setCurrentCategoryProduct] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true)
    axios.get(`http://localhost:5000/api/product/${category}`).then((response) => {
      setCurrentCategoryProduct(response.data);
      setIsloading(false)
    });
  }, [category]);

  useEffect(() => {
    setIsloading(true)
    axios.get("http://localhost:5000/api/product").then((response) => {
      setAllProduct(response.data.filter((product) => product.category === category))
    });
    setIsloading(false);
  }, [category]);


  AllProduct.forEach((product) => {
    if (!allBrandName.includes(product.brand)) {
      allBrandName.push(product.brand)
    }
  });

  const handleFilterOPTIONSClick = (e) => {
    console.log(e.currentTarget.textContent.split(" ")[0])
    setCurrentCategoryProduct(AllProduct.filter((products) => products.category === e.currentTarget.textContent.split(" ")[0] || products.brand === e.currentTarget.textContent.split(" ")[0] || products.rating >= e.currentTarget.textContent.split(" ")[0] || products.discountPercentage <= Number(e.currentTarget.textContent.split(" ")[0])));
  }

  const handleFilterBUttonClick = (e) => {
    const filterContainer = document.querySelector(".commonProductContainer__filterContainer");
    filterContainer.classList.toggle("activeFilterBox")
  }

  const handleClearFilterClick = (e) => {
    setIsloading(true)
    axios.get(`http://localhost:5000/api/product/${category}`).then((response) => {
      setCurrentCategoryProduct(response.data);
      setIsloading(false)
    });
  }

  return (
    <>
      <HeaderComponents />
      <WebNavBarComponent />

      <section className='commonProductContaienr'>
        <i className="fa-solid fa-filter ProductfilterContainerButton" onClick={handleFilterBUttonClick}></i>

        <div className="commonProductContainer__filterContainer activeFilterBox">
          <h3 className='filterContainer__header'>Filter <i className="fa-solid fa-xmark filterContainer__closeButton" onClick={handleFilterBUttonClick}></i></h3>

          <div className='filterContainer__FilterBox'>

            <div className="FilterBox__FilterOPTIONS">
              <h4 className='FilterOPTIONS__Heading'>Brand</h4>
              {
                allBrandName?.map((brand, index) => {
                  return <Link className='FilterOPTIONS__Items' key={index + 1} onClick={handleFilterOPTIONSClick}>{brand}</Link>
                })
              }
            </div>

            <div className="FilterBox__FilterOPTIONS">
              <h4 className='FilterOPTIONS__Heading'>Discount</h4>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>10 % or More</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>20 % or More</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>30 % or More</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>40 % or More</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>50 % or More</Link>
            </div>

            <div className="FilterBox__FilterOPTIONS">
              <h4 className='FilterOPTIONS__Heading'>Rating</h4>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>1 <i className="fa-solid fa-star"></i> &above</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>2 <i className="fa-solid fa-star"></i> &above</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>3 <i className="fa-solid fa-star"></i> &above</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>4 <i className="fa-solid fa-star"></i> &above</Link>
              <Link className='FilterOPTIONS__Items ratingFilterItems' onClick={handleFilterOPTIONSClick}>5 <i className="fa-solid fa-star"></i> &above</Link>
            </div>

          </div>

          <button className='clearFilterButton' onClick={handleClearFilterClick}>Clear</button>
        </div>

        <div className='commonProductContainer__ProductBox'>

          {
            isLoading ? <Loader /> : <>

              {
                currentCategoryProduct.length > 0 ? <>
                  {
                    currentCategoryProduct?.map((productData, index) => {
                      return <div className="homeProduct commonContainerProduct" key={productData.id + index}>
                        <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                        <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                        <div className="homeProductPosterContainer">
                          <img src={productData?.images[0]} alt="ProductPoster" className="ProductPoster" />
                        </div>
                        <div className="homeProduct__InformationContainer">
                          <RatingComponent rating={productData?.rating} />
                          <span className='homeProduct__discountPercentageText'>{productData?.discountPercentage} % Off</span>
                          <button className='addToCartButton'>Add To Cart</button>
                        </div>
                      </div>
                    })

                  }
                </> : <p className='noProductFoundMsg'>No Product Found</p>
              }
            </>
          }




        </div>
      </section>


    </>
  )
}

export default ProductStoreComponent
