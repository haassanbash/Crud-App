import { IoMdClose } from "react-icons/io";
import { MdCurrencyPound } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function Modal({ setOpenModal, addNewProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({ mode: "onSubmit" });

  const [file, setFile] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "product_image"); 
    try {
              const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dwfg13lda/image/upload", 
                formData
              );
              
              return response.data.secure_url;
            } catch (error) {
              console.error("Error uploading image:", error);
              return null;
            }
          };

  const onSubmit = async (data) => {
    console.log(data);
    if (data?.file) {
      const file = data.file[0]; 

      const imageUrl = await uploadImage(file);
      if (!imageUrl) {
        setError("file", { type: "manual", message: "Image upload failed" });
        return;
      }
      data.file = imageUrl; 
    }

    addNewProduct(data); 
    setOpenModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
      onClick={() => setOpenModal(false)} 
    >
      <div
        className="relative bg-white z-100 rounded-lg shadow dark:bg-gray-700 w-[784px] my-5"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-4">
          <div className="flex items-center justify-between px-4 pb-[30px] rounded-t dark:border-gray-600 ml-4">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
              Sell an item
            </h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200"
              onClick={() => setOpenModal(false)} 
            >
              <p className="w-[10px] h-[10px] text-neutral-900">
                <IoMdClose />
              </p>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="w-[684px] h-[181px] flex justify-center items-center border border-[#E5E5E5]">
                  <label
                    htmlFor="fileInput"
                    className="py-3 px-6 border border-[#D9F99D] text-neutral-900 cursor-pointer"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      clearErrors("file");
                    }}
                    {...register("file", {
                      required: "Please upload a photo",
                    })}
                  />
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm">{errors.file.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm w-[684px] h-[42px] pl-2"
                  placeholder="Type product name"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description Your Item
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm w-[684px] h-[42px] pl-2"
                  placeholder="Type product description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  className="w-[684px] h-[42px]  rounded border border-[#E5E5E5] px-2"
                  {...register("category", {
                    required: "Please select a category",
                  })}
                >
                  <option disabled  value="Select">
                    Select
                  </option>
                  <option value="clothes">Clothes</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white focus:border-none outline-none"
                >
                  Item Price
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-[684px] h-[42px]">
                  <MdCurrencyPound className="ml-3" />
                  <input
                    className="w-full h-full border-none text-right pr-3 outline-none "
                    placeholder="00.00"
                    type="text"
                    {...register("price", {
                      required: "Please enter a price",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Enter a valid price (e.g., 10.50)",
                      },
                    })}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <button
                className="block w-[684px] h-[42px] text-neutral-900 bg-[#D9F99D]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Item"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
