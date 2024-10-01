import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  // Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("data")) || [];
    setProducts(storedProducts);
    setFilterProduct(storedProducts); 
  }, []);

  // Add a new product
  const addNewProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setFilterProduct(updatedProducts);
    localStorage.setItem("data", JSON.stringify(updatedProducts));
  };

  // Function to handle search filtering by description
  const handleSearch = (searchValue) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())||product.category.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterProduct(filtered);
    setCurrentPage(1); // Reset to go to the first page when filtering
  };

  // Function to handle sorting by different criteria
  const handleSort = (sortOption) => {
    let sortedProducts = [...filterProduct];
    if (sortOption === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "priceHighToLow") {
      sortedProducts.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
    } else if (sortOption === "priceLowToHigh") {
      sortedProducts.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    }

    setFilterProduct(sortedProducts);
    setCurrentPage(1); // Reset to go to the first page when sorting
  };

  const totalItems = filterProduct.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProduct.slice(indexOfFirstItem, indexOfLastItem); // Correct slice logic

  return (
    <div className=" py-[85px] px-[57px] w-full  ">
      <Header setOpenModal={setOpenModal} onSearch={handleSearch} onSort={handleSort} />
      <div className=" w-full items-center xl:justify-start justify-center sm:gap-[31px] gap-4 flex flex-wrap ">
        {filterProduct.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          currentItems.map((item) => (
            <ProductCard key={item.file} product={item} />
          ))
        )}
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} addNewProduct={addNewProduct} />}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage} // Pass setCurrentPage to Pagination
      />
    </div>
  );
}

