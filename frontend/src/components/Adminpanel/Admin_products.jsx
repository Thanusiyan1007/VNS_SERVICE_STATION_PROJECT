import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, TextInput, Pagination } from "flowbite-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin_products() {
    const [products, setProducts] = useState([]); // State to hold products data
    const [showAddModal, setShowAddModal] = useState(false); // State to show add product modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show delete confirmation modal
    const [showImageModal, setShowImageModal] = useState(false); // State to show image modal
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const [title, setTitle] = useState(''); // State for title
    const [description, setDescription] = useState(''); // State for description
    const [image, setImage] = useState(null); // State for image

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4; // Number of products per page

    // Fetch products data from the API
    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/products/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setProducts(response.data); // Set the products state with fetched data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Runs once on component mount

    // Function to handle adding a new product
    const handleAddProduct = async () => {
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/products/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProducts([...products, response.data]); // Add the new product to the state
            toast.success('Product added successfully!');
            setShowAddModal(false); // Close modal after success
            resetForm(); // Reset form
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product.');
        }
    };

    // Function to handle deleting a product
    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/v1/products/${selectedProduct.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                setProducts(products.filter(product => product.id !== selectedProduct.id)); // Remove deleted product from the state
                toast.success('Product deleted successfully!');
            } else {
                toast.error('Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product.');
        }
        setShowDeleteModal(false); // Close delete modal
    };

    // Function to handle displaying an image in a modal
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    // Reset form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage(null);
    };

    // Get current products for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-auto">
            {/* Add Button */}
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAddModal(true)} >
                    Add Product
                </Button>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentProducts.map(product => (
                        <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.title}
                            </Table.Cell>
                            <Table.Cell>{product.description}</Table.Cell>
                            <Table.Cell>
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover cursor-pointer"
                                        onClick={() => handleImageClick(product.image)} // Handle image click
                                    />
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="inline-flex justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product); // Set the selected product
                                            setShowDeleteModal(true); // Show delete confirmation modal
                                        }}
                                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(products.length / productsPerPage)}
                    onPageChange={paginate}
                />
            </div>

            {/* Add Product Modal */}
            <Modal
                show={showAddModal}
                onClose={() => setShowAddModal(false)} // Close add modal on cancel
            >
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <TextInput
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter product title"
                        />
                        <TextInput
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                        />
                        <TextInput
                            label="Image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="green" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                    <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)} // Close delete modal on cancel
            >
                <Modal.Header>Delete Product</Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this product?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                    <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Image Popup Modal */}
            <Modal
                show={showImageModal}
                onClose={() => setShowImageModal(false)} // Close image modal
            >
                <Modal.Header>Product Image</Modal.Header>
                <Modal.Body>
                    {selectedImage && <img src={selectedImage} alt="Product" className="w-full h-auto" />}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowImageModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={5000} />
        </div>
    );
}

export default Admin_products;
