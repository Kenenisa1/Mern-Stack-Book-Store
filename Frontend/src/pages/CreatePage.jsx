import  { useState } from 'react';
import { FaBookMedical } from 'react-icons/fa';
import { useProductStore } from '../Store/book'; 
import { styles } from '../styles'; 

const CreatePage = () => {
    
    // State definition book
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });
    
    // Destructure action from the store
    const { createProduct } = useProductStore();
    
    // 2. FIXED: Define the handleChange function
    const handleChange = (e) => {
        setNewProduct({
            ...newProduct, 
            [e.target.name]: e.target.value 
        });
    }

    // 1. FIXED: Define the handleAddProduct function (using 'e' for event)
    const handleAddProduct = async (e) => {
        // Stop the page reload first
        e.preventDefault(); 
        
        // Simple client-side validation
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            alert("Please fill in all the required fields.");
            return;
        }

        console.log("Submitting New Book Data:", newProduct);
        
        try {
            // Call the store action
            const { success, message } = await createProduct(newProduct);
            
            if (success) {
                alert(`Success: ${message}`);
                // 3. FIXED: Logic for clearing state is inside the function
                setNewProduct({ name: "", price: "", image: "" });
            } else {
                alert(`Error: ${message || "Failed to create book."}`);
            }
        } catch (error) {
            console.error("API call failed:", error);
            alert("An unexpected error occurred during creation.");
        }
    };

    return (
        <div className={`${styles.container} ${styles.flexCenter} min-h-[80vh] py-12 bg-gray-50`}>
            <div className='w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl'>
                
                <div className={`${styles.flexCenter} flex-col mb-10`}>
                    <FaBookMedical className='w-10 h-10 text-indigo-600 mb-3' />
                    <h1 className='text-3xl font-extrabold text-gray-900'>
                        Add New Product
                    </h1>
                    <p className='text-gray-500 mt-2'>
                        Enter the details for the new product entry.
                    </p>
                </div>
                
                {/* 1. FIXED: Attach handleAddProduct to the form's onSubmit event */}
                <form onSubmit={handleAddProduct} className='flex flex-col space-y-6'>
                    
                    {/* Input Group: Book Name */}
                    <div>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>Book Title</label>
                        <input
                            type="text"
                            id="name"
                            name='name' 
                            placeholder='e.g., The MERN Stack Guide'
                            onChange={handleChange} // ✅ FIXED
                            value={newProduct.name}
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150'
                        />
                    </div>
                        
                    {/* Input Group: Price */}
                    <div>
                        <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name='price' 
                            placeholder='e.g., 29.99'
                            onChange={handleChange} // ✅ FIXED
                            value={newProduct.price}
                            required
                            min="0.01"
                            step="0.01"
                            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150'
                        />
                    </div>

                    {/* Input Group: Image URL */}
                    <div>
                        <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-1'>Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name='image' 
                            placeholder='e.g., https://example.com/cover.jpg'
                            onChange={handleChange} // ✅ FIXED
                            value={newProduct.image}
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150'
                        />
                    </div>

                    {/* Submit Button (type="submit" triggers form onSubmit, no separate onClick needed) */}
                    <button type='submit' 
                        className={`${styles.primaryButton} ${styles.flexCenter} w-full mt-8 h-12 text-lg`}
                    >
                        <FaBookMedical className={styles.iconSize} />
                        <span>Publish Book</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage;