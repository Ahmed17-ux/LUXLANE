
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Rating,
  Card,
  Typography,
} from "@material-tailwind/react";
import ProductApi from "../../service/api/User/ProductApi";


function DialogPr({ currentPrInfo, onClose }) {
    const [open, setOpen] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [lodingspinner,setlodingspinner]  = useState(false)


    useEffect(() => {
      setOpen(true);
    }, [currentPrInfo]);

    const handleOpen = () => {
      onClose();
    };


    const handleEditClick = () => {
        setEditMode(true);
        setEditedData({
          id: currentPrInfo?.id,
          name: currentPrInfo?.name,
          price: currentPrInfo?.price,
          quantity: currentPrInfo?.quantity,
        });
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEditedData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    };

    const handleSaveClick = async () => {
    try {
      await ProductApi.updateProduct(currentPrInfo.id, editedData);

      setEditMode(false);
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
    finally
    {
        setEditMode(false);


    }
    };


    const handleRemoveClick = async () => {
    try {
setlodingspinner(true)
      const productId = currentPrInfo.id;
      await ProductApi.removeProduct(productId);
      handleOpen();


    } catch (error) {
        setlodingspinner(false)

      console.error('Error removing product:', error);
    }finally{
        setlodingspinner(false)

    }
    };



    return (
      <>
<Dialog size="xxl" open={open} className="h-full  overflow-auto">
<button className="m-4" onClick={handleOpen}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
</button>

  <DialogBody className="overscroll-contain flex flex-col items-center flex-1">
  <Card className="w-full grid grid-cols-3  gap-7 mb-6 shadow-md">

  <div className="m-0 w-2/5 shrink-0 rounded-r-none" style={{ width: '300px', height: '300px' }}>
        <img
          src={`http://localhost:8000/storage/${currentPrInfo.imag}`}
          alt={currentPrInfo.imag}
          className="w-full h-full object-cover rounded-md rounded-r-none"
          onError={(e) => {
            console.error("Image failed to load:", e);
          }}
        />
      </div>
      <div className="p-8">
        <Typography variant="h4" color="gray" className="mb-4 uppercase">
          {currentPrInfo?.id}
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-2">
          {editMode ? (
            <input type="text"  className="text-[#090979]"   value={editedData?.name} onChange={(e) => handleInputChange(e, 'name')} />
          ) : (
            <span className="text-[#090979]">{currentPrInfo?.name}</span>
          )}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {editMode ? (
            <input type="text" className="text-[#35439c] font-bold" value={editedData?.price} onChange={(e) => handleInputChange(e, 'price')} />
          ) : (

  <span className="text-[#24559a] font-bold"  >{currentPrInfo?.price}</span>          )}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {editMode ? (
            <input type="text" className="text-[#35439c] font-bold" value={editedData?.quantity} onChange={(e) => handleInputChange(e, 'quantity')} />
          ) : (

            <span className="text-[#35439c] font-bold"  >{currentPrInfo?.quantity}</span>          )}


        </Typography>
      </div>

      <div className="justify-self-end m-7 ">
        {editMode ? (
         <button onClick={handleSaveClick}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#090979]">
           <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
         </svg>
       </button>
        ) : (
            <button onClick={handleEditClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#090979]">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </button>

        )}
      </div>
    </Card>
    <Card className="w-full flex-row mb-6 shadow-md">

      <div className="p-6">


     <div className="h-[60%]">
     <Typography color="gray" className="pb-9 font-bold break-all">
        Description :
        </Typography>

        <Typography color="gray" className="mb-8 font-normal break-all">
        {currentPrInfo?.description}


        </Typography>

     </div >
        <div className="h-[40%]  flex items-center gap-2 font-bold text-blue-gray-500">

<Rating value={4} />
<Typography color="blue-gray" className= " font-medium text-blue-gray-500">
  Based on 134 Reviews
</Typography>
</div>



      </div>
      <div
        className="m-0 w-[70%]   shrink-0 "
      >
    <video className="h-full w-full rounded-lg rounded-l-none" controls autoPlay muted>
  <source src={`http://localhost:8000/storage/${currentPrInfo.video_url}`} type="video/mp4" loading="lazy" />
  Your browser does not support the video tag.
</video>
      </div>


    </Card>
    <Card className="w-full flex-row mb-6 shadow-md flex items-center justify-end">

      <div>

        <button
          onClick={handleRemoveClick}
          className="m-8 w-40 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
       {lodingspinner  ?

       <div class="inline-block h-4 w-4 text-red-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>

</div> :

'Remove'

    }

        </button>

      </div>

    </Card>



          </DialogBody>
        </Dialog>
      </>
    );
}

export default DialogPr



