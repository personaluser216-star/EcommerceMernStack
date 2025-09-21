import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { assets } from '../assets/assets';
import Title from "../Componets/Title";
import { useNavigate } from 'react-router-dom';
import { Range } from 'react-range';

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Price range slider state
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const navigate = useNavigate();

  // Use lowercase category names for consistent matching
  const categories = ['men', 'women', 'kids'];
  const subCategories = ['topwear', 'bottomwear', 'winterwear'];

  // Handle category checkbox toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle sub-category checkbox toggle
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCategory)
        ? prev.filter(s => s !== subCategory)
        : [...prev, subCategory]
    );
  };

  useEffect(() => {
    let updated = [...products];

    if (showsearch && search) {
      updated = updated.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter (compare lowercase)
    if (selectedCategories.length > 0) {
      updated = updated.filter(product =>
        selectedCategories.includes(product.category?.toLowerCase())
      );
    }

    // Sub-category filter (check subCategory or type, lowercase)
    if (selectedSubCategories.length > 0) {
      updated = updated.filter(product => {
        const prodSubCat = (product.subCategory || product.type || '').toLowerCase();
        return selectedSubCategories.includes(prodSubCat);
      });
    }

    // Price range filter
    updated = updated.filter(product => {
      const price = product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    if (sortOption === 'lowToHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [products, selectedCategories, selectedSubCategories, sortOption, search, showsearch, priceRange]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 md:pt-10 pt-4 border-t'>
      {/* FILTER SIDEBAR */}
      <div className='sm:min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 sm:cursor-default'
        >
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            alt='toggle'
          />
        </p>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          {/* CATEGORY FILTER */}
          <div className='border border-gray-300 pl-5 py-3 mt-6'>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {categories.map(cat => (
                <label key={cat} className='flex gap-2 capitalize'>
                  <input
                    type='checkbox'
                    className='w-3'
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* SUBCATEGORY FILTER */}
          <div className='border border-gray-300 pl-5 py-3 mt-6'>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {subCategories.map(subCat => (
                <label key={subCat} className='flex gap-2 capitalize'>
                  <input
                    type='checkbox'
                    className='w-3'
                    checked={selectedSubCategories.includes(subCat)}
                    onChange={() => handleSubCategoryChange(subCat)}
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </div>

          {/* PRICE RANGE SLIDER */}
          <div className='border border-gray-300 pl-5 py-3 mt-6'>
            <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
            <Range
              step={10}
              min={0}
              max={1000} // adjust max price as needed
              values={priceRange}
              onChange={values => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '5px',
                    width: '95%',
                    backgroundColor: '#ccc',
                    borderRadius: '4px',
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '10px',
                    width: '10px',
                    backgroundColor: '#000',
                    borderRadius: '50%',
                  }}
                />
              )}
            />
            <div className='flex justify-between text-xs mt-2 text-gray-700'>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DISPLAY AREA */}
      <div className='flex-1'>
        {/* TITLE + SORT */}
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collections'} />
          <select
            className='border-2 border-gray-300 text-sm px-2 py-1 md:mt-0 md:mt-12 mt-16 -ml-12  sm:ml-0  rounded-md'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="lowToHigh">Sort by: Low to High</option>
            <option value="highToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div
                key={index}
                className="border p-3 rounded hover:shadow transition cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
