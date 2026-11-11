import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Chip,
  Avatar,
  Input,
} from "@material-tailwind/react";
import  DialogtPr  from "../../Editor_things/Product_Side/DialogPr.jsx";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Product } from "../../Admin_things/Editor_side/ProductsInfo/ProductAdded.jsx";
import ProductApi from "../../service/api/User/ProductApi.js";

const ITEMS_PER_PAGE = 5;

const TABLE_HEAD = ["PrImage", "ID", "Name", "Description", "Price", "Quantity", ""];

export default function Editor_Products_List() {
  const [listProducts, setListProducts] = useState([]);
  const [showProductDt, setShowProductDt] = useState(false);
  const [currentProductInfo, setCurrentProductInfo] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productCategories, setProductCategories] = useState([]);
  const [originalListProducts, setOriginalListProducts] = useState([]);





  useEffect(() => {
    ProductApi.AllProducts().then(({ data }) => {
        setListProducts(data.products);
        setOriginalListProducts(data.products);
        const categories = data.products.map(product => product.category_name);
        const uniqueCategories = [...new Set(categories)];
        setProductCategories(uniqueCategories);
      })
      .catch((error) => console.log(error));
  }, []);


  const handleShowProduct = (currentProduct) => {
    setShowProductDt(true);
    setCurrentProductInfo(currentProduct);
  };

  const filteredProducts = listProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "") {
      // If no category is selected, show all products from the original list
      setListProducts(originalListProducts);
    } else {
      // Filter products by the selected category from the original list
      const filteredByCategory = originalListProducts.filter(product => product.category_name === selectedCategory);
      setListProducts(filteredByCategory);
    }
  };

  return (
    <>
      <Card className="w-auto mx-4  mt-[10%] bg-blue-900  ">
        <div className=" p-4 ">
          <div className="m-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" className="text-white">
                All Products List
              </Typography>
            </div>
            <div className="w-72">
            <select
  name="Filter With category"
  className="rounded-md p-3 text-center text-blue-800 border-2 border-blue-900 border-dashed"
  onChange={(e) => handleCategoryChange(e.target.value)}
>
  <option value="">Filter With category</option>
  {productCategories.map((item, key) => (
    <option value={item} key={key}>{item}</option>
  ))}
</select>



    </div>
            {/* searsh input */}
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>
        <CardBody className=" px-0">
          <table className="w-full min-w-max  text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 flex items-center justify-center"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                const isLast = index === currentItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";

                return (
                  <tr key={index}>
                    {/* Image */}
                    <td className={classes}>
                      <div className="flex items-center justify-center gap-4 ">
                        <Avatar
                          src={`http://localhost:8000/storage/${item.imag}`}
                          size="xl"
                          className="border  rounded-full border-blue-gray-50 bg-blue-gray-50/50 "
                        />
                      </div>
                    </td>
                    {/* Id */}
                    <td className={classes}>
                      <div className="flex items-center justify-center ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-white"
                        >
                          {item.id}
                        </Typography>
                      </div>
                    </td>
                    {/* Name */}
                    <td className={classes}>
                      <div className="w-auto flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold text-white uppercase"
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </td>
                    {/* Description */}
                    <td className={`${classes} break-all`} style={{ width: '200px' }}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-white"
                        >
                          {item.description}
                        </Typography>
                      </div>
                    </td>
                    {/* Price */}
                    <td className={classes}>
                      <div className="w-auto flex items-center justify-center">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-green-300 font-bold  opacity-70"
                          >
                            <Chip
                              variant="outlined"
                              color="cyan"
                              size="sm"
                              value={`${item.price} MAD`}
                              className="text-white"
                            />

                          </Typography>
                        </div>
                      </div>
                    </td>
                    {/* Quantity */}
                    <td className={classes}>
                      <div className="  flex items-center justify-center">
                        <Chip
                          variant="outlined"
                          color="cyan"
                          size="sm"
                          value={item.quantity}
                          className="text-white"

                        />
                      </div>
                    </td>
                    {/* Details */}
                    <td className={classes}>
                      <div className="w-auto flex items-center justify-center">
                        <button type="button" onClick={() => handleShowProduct(item)}>
                          <div className="group inline-block relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                            </svg>
                            <span className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded p-1 absolute top-full left-1/2 transform -translate-x-1/2 transition-opacity">
                              See Details
                            </span>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="flex items-center justify-center my-4 gap-8  w-full ">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
          <strong className="text-gray-900">{totalPages}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>

      {showProductDt && currentProductInfo && (
        <div className="rounded-lg w-auto">
          <DialogtPr currentPrInfo={currentProductInfo} onClose={() => setShowProductDt(false)} />
        </div>
      )}
    </>
  );
}
