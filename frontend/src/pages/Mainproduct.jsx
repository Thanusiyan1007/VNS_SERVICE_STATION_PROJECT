import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Ensure this is imported
import axios from 'axios'; // Import axios for API calls

function Mainproduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products/'); // Update with your backend URL
        setProducts(response.data); // Assuming the API returns an array of products
        setFilteredProducts(response.data); // Initially, filtered products will be the same as products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle the search functionality
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='py-[90px] px-14'>
      <div>
        <h1 className='text-4xl font-bold text-maincolor text-center mb-12'>
          Our Products
        </h1>

        {/* Search Input */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-3 border border-gray-300 rounded-lg w-full max-w-md"
          />
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className='bg-white shadow-lg rounded-lg overflow-hidden'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={product.image} // Ensure your backend serves image URLs correctly
                  alt={product.title}
                  className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                  <h2 className='text-2xl font-bold text-maincolor mb-2'>{product.title}</h2>
                  <p className='text-gray-700 mb-4'>{product.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className='text-center col-span-3 text-lg'>
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainproduct;
