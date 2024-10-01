import { CiHeart } from "react-icons/ci";
export default function ProductCard({product}) {
   return (
      <>
            <div className=" d-flex h-[402px] w-[326px] items-center ">
               <img className="w-full h-80 rounded " src={product.file} alt="Error Img" />
               <div className="flex flex-col w-full">
                  <div className="flex  items-center justify-between w-full mt-[10px] ">
                     <div>
                        <p className="font-light text-neutral-900 leading-[15px]  capitalize">{product.title}</p>
                     <p className=" font-medium text-base  my-1 ">£{product.price}</p>
                     </div>
                     <div className="w-7 h-7 rounded border border-[#E5E5E5] ">
                           <p className="w-full ml-[6px] mt-[5px]   text-neutral-900"> 
                           <CiHeart />
                           </p>
                     </div>
                  </div>
               </div>
               <div className="flex row items-center  gap-[5px]">
                  <img className="w-5 h-5 rounded-full" src={product.file} alt=" Error in logo Image" />
                  <p className=" text-[10px] font-normal leading-5 text-neutral-900">{product.category}</p>
               </div>
            </div>
      </>
   );
}
