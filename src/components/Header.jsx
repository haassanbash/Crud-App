import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi";

export default function Header({ setOpenModal,onSearch, onSort }) {
    const handleSearchInput = (e) => {
        onSearch(e.target.value);
    };
    const handleSortChange = (e) => {
        onSort(e.target.value);
    };
    return (
        <div className="flex flex-wrap  w-full mb-11 items-center justify-center xl:justify-between">
            <div className="w-[528px] h-11 rounded border border-[#E5E5E5]  flex justify-between items-center">
                <input
                    className="w-full h-full border-none m-0 pl-3 focus:border-none outline-none"
                    placeholder="Search"
                    type="search"
                    onChange={handleSearchInput}
                />
                <CiSearch className="mr-3" />
            </div>
            <div className="flex items-center mt-10 xl:mt-0">
                <label className=""> Sort by</label>
                <select
                    className="w-56 h-10 rounded border border-[#E5E5E5] mx-2 px-2 "
                    onChange={handleSortChange}
                >
                    <option  value="az">A-Z</option>
                    <option  value="za">Z-A</option>
                    <option  value="priceHighToLow">Price: High To Low</option>
                    <option  value="priceLowToHigh">Price: Low To High</option>
                </select>
                   
                    <button
                        className="bg-[#D9F99D] flex items-center w-[132px] h-[44px] justify-center mx-4 "
                        type="button"
                        onClick={() =>setOpenModal(true)}
                        data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    >
                        <HiOutlinePlus className="mr-2 w-4 h-4 text-neutral-900" />
                        
                       <p>Sell Item</p> 
                    </button>
                </div>
            </div>
    );
}
