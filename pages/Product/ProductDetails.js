import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState(null); // Add mainImage state

  const fetchProduct = async () => {
    if (id) {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.thumbnail); // Set the initial main image
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to fetch product');
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Function to change the main image when an additional image is clicked
  const changeMainImage = (image) => {
    setMainImage(image);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  // Render all product details
  return (
<div className="bg-gray-100 min-h-screen py-10">
<div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md">
<div class="max-w-2xl mx-auto">

	<div id="default-carousel" class="relative" data-carousel="static">
        <div class="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
      <img src={mainImage} alt={product.title} style={{ width: '500px', height: '350px', cursor: 'pointer' }} className="w-full h-64 object-cover mb-6 rounded-md" />

        </div>
    </div>

	<p class="mt-5">
	</p>
</div>





      <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">{product.title}</h1>
      <p className="text-xl font-bold text-green-600 mb-4"><strong>Price:</strong> ${product.price}</p>
      <p className="text-xl font-bold text-red-600 mb-4"><strong>Discount:</strong> {product.discountPercentage}%</p>
      <p className="text-lg text-gray-700 mb-1"><strong>Rating:</strong> {product.rating} / 5</p>
      <p className="text-lg text-gray-700 mb-1"><strong>Stock:</strong> {product.stock}</p>
      <p className="text-lg text-gray-700 mb-1"><strong>Brand:</strong> {product.brand}</p>
      <p className="text-lg text-gray-700 mb-1"><strong>Category:</strong> {product.category}</p>
      <p className="text-lg text-gray-700 mb-1"><strong>Description:</strong> {product.description}</p>

      <div>
        <span className="text-lg text-gray-700 mb-1">Images:<span class="text-sm text-muted">(Click picture to view)</span>
</span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} - ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px', cursor: 'pointer' }}
              onClick={() => changeMainImage(image)}
            />
          ))}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
