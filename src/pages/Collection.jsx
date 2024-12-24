// import React from 'react'

import { useContext , useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";


const Collection = () => {

const { products, search, showSearch } = useContext(ShopContext);
const [showFilter, setShowFilter] = useState(false);
const [filterProducts, setFilterProducts] = useState([]);
const [categroy, setCategory] = useState([]);
const [subCategroy, setSubCategory] = useState([]);
const [sortType, setSortType] = useState("relavant");

const toggleCategory = (e) => {
    if(categroy.includes(e.target.value)){
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
        setCategory(prev => [...prev, e.target.value])
    }
}

const toggleSubCategory = (e) => {
    if(subCategroy.includes(e.target.value)){
        setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
        setSubCategory(prev => [...prev, e.target.value])
    }
}

const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // this is for the catorgy function 
    if(categroy.length > 0){
        productsCopy = productsCopy.filter(item => categroy.includes(item.category))
    }

    if(subCategroy.length > 0){
        productsCopy = productsCopy.filter(item => subCategroy.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
}

const sortProduct = () => {
    let filterProductsCopy = filterProducts.slice();

    switch(sortType){
        case "low-high":
            setFilterProducts(filterProductsCopy.sort((a,b) => a.price - b.price))
            break;
        case "high-low":
            setFilterProducts(filterProductsCopy.sort((a,b) => b.price - a.price))
            break;
        default:
            applyFilter();
            break;
    }
}

useEffect(() => {
    applyFilter()
},[categroy, subCategroy, search, showSearch])

useEffect(()=> {
    sortProduct();
},[sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        
        {/* Filter Option */}
        <div className="min-w-60">
            <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS</p>

            <img 
                src={assets.dropdown_icon} 
                alt=""
                className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                />

            {/* Category Filters */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Men'} onChange={toggleCategory}/> Men
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Women'} onChange={toggleCategory}/> Women
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Kids'} onChange={toggleCategory}/> Kids
                    </p>
                </div>
            </div>

            {/* sub categroy filter */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className="mb-3 text-sm font-medium">TYPE</p>
                <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" name="" id="" className="w-3" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                    </p>
                </div>
            </div>
        </div>

        {/* Right side */}
        <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
                <Title  text1={"ALL"} text2={"COLLECTIONS"}/>

                {/* Product sort */}
                <select onChange={(e)=>setSortType(e.target.value)} name="" id="" className="border-2 border-gray-300 text-sm px-2">
                    <option value="relavant">Sort by: Relavant</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>

            {/* map product */}
            <div className="grid grid-cols-2 md:grid=cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {
                    filterProducts.map((item, index) =>(
                        <ProductItem key={index} id={item._id}  name={item.name} price={item.price} image={item.image}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Collection