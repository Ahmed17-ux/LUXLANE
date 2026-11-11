import {
    Avatar,
    Dialog,
    DialogBody,
}from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import '../IndexCssAdmin.css';
import EditorApi from "../../service/api/User/EditorApi";
import { EditorInfo } from "./EditorInfo";

function ALL_Editors() {
    const [AllEditorsList, setAllEditorsList] = useState([]);
    const [currentEditorInfo,setcurrentEditorInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openEditroInfo, setopenEditroInfo] = useState(false);
    const [removedSuccess ,setRemovedSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    // A Row function that make dialogeg Open and Close when Editro Removed
    const handleOpen = () => {
        setOpen(!open);
        setRemovedSuccess(!open)
      };
    const handeopenEditroInfo =  (current_EditorInfo)=>{
        console.log(current_EditorInfo)
        setcurrentEditorInfo(current_EditorInfo)

        setopenEditroInfo(!openEditroInfo)

    }

// Remove Editor
    const handelRemoveEditore = async (editorId) => {
        try {
        handleOpen();


// Make open value true to  Open an Dialoge When Editor Removed with Success
        await EditorApi.RemoveEditor(editorId);
        setAllEditorsList((prevEditors) => prevEditors.filter((editor) => editor.id !== editorId));

        }catch (error) {
        console.error('Error removing editor', error);
        }finally{


// Make open value = false to  close the Dialoge
        handleOpen();
        setRemovedSuccess(open)


        // setRemovedSuccess(true)


        }
      };


// Get All Editor data
    useEffect(() => {
        EditorApi.AllEditor()
        .then(({ data }) => {
          setAllEditorsList(data);
          setLoading(false);

        })
        .catch(error => {
          console.error('Error fetching editors:', error);
          setLoading(false);

        })

    });

    return (
<>
<div className="flex items-center justify-between mt-8 mx-4  ">
<div>
    <span className="text-xl font-bold">All Editros List</span>
</div>
    <div class=''>
    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
  type="text"
  id="search"
  placeholder="Search something.."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

    </div>
</div>
</div>
    <div className='flex flex-col lg:flex-row items-center justify-center h-auto w-full'>


        <div className="w-full ">
          {/* head */}
          <div className="flex bg-[#0a233f] text-gray-200 grid grid-cols-4 rounded-md m-2 ">
            <div className="p-3 flex items-center justify-center">Editors</div>
            <div className="p-3 flex items-center justify-center">#ID</div>
            <div className="p-3 flex items-center justify-center">Status</div>
            <div className="p-3 flex items-center justify-center">Action</div>
          </div>

          {/* body */}
          {AllEditorsList.filter((editor) =>
  editor.firstname.toLowerCase().includes(searchQuery.toLowerCase())
).map((editor, index) => (
            <div key={index} className="sm:p-3 flex flex-col lg:grid grid-cols-4 items-center justify-center bg-gray-100 rounded-md m-2">

              <div className="p-2 flex  lg:flex items-center justify-center ">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  withBorder={true}
                  color="green"
                  className="p-0.5 m-2   "
                />
                <div className="sm:w-[30%] lg:w-[35%] m-4"  >
                  <div className="mr-2 font-bold flex items-center justify-center text-sm sm:text-base">{editor?.firstname}</div>
                  <div className="text-gray-500 text-xs sm:text-[10px] ">{editor?.email}</div>

                </div>
              </div>

              <div className="p-3 flex items-center justify-center font-bold text-xs sm:text-sm ">
              {editor?.id}
              </div>

              <div className="p-3 flex items-center justify-center">
                <span className="bg-green-400 text-gray-50 rounded-md px-2 block lg:inline text-xs sm:text-sm">En ligne</span>
              </div>

              <div className="p-3 flex items-center justify-center">
                <div className="p-3 flex items-center justify-center space-x-3  ">
                  <a href="#" className="text-gray-400 hover:text-[#0a233f] "

                  onClick={()=>handeopenEditroInfo(editor)}
                  >
                    <i className="material-icons-outlined text-xs sm:text-base">visibility</i>
                  </a>



                  <a href='#'
                  onClick={()=>handelRemoveEditore(editor.id)}
                   className="text-gray-400 hover:text-[#0a233f] ">
                    <i className="material-icons-round text-xs sm:text-base">delete_outline</i>
                  </a>

                </div>
              </div>
            </div>
          ))}
                  {loading && <SkeletonRow />}

        </div>

{/* Remove Success editor   */}
    <Dialog open={open} handler={handleOpen} >
        <DialogBody>
    {!removedSuccess &&(
                <div className='flex font-bold items-center justify-center'>Editor Removed With Success
                <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-red-400  w-8 h-8 font-bold "
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>

                </div>
            )}
{removedSuccess && (
                <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </section>
)}

        </DialogBody>
      </Dialog>


{/* show Editor Info and his  edits and all about product he add ,removed and new products offres  */}
  <Dialog
        open={openEditroInfo}
        size='xxl'
        handler={handeopenEditroInfo}


    >

<div className="bg-white h-auto   ">

    <div className="flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" onClick={handeopenEditroInfo} viewBox="0 0 24 24" fill="currentColor" className="animate-bounce w-5 h-5 bg-gray-100 rounded-full font-bold  cursor-pointer text-blue-900 "
    >
    <path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
    </svg>

    </div>
        <EditorInfo currentEditorInfo={currentEditorInfo}/>
        </div>

    </Dialog>

  </div>
</>

    );
  }

  export default ALL_Editors;



// Skeleton Row
function SkeletonRow() {
    return (
      <div className=" sm:p-3 flex flex-col lg:grid grid-cols-4 items-center justify-center bg-gray-100 rounded-md m-2 animate-pulse">
        <div className="p-3 flex lg:flex items-center justify-center flex">

        <div className=" text-xs sm:text-sm rounded-full">
            {/* img skeleton  */}
        <div className="p-3 flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-12 w-12 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

</div>
                </div>
                <div>

                    {/* name skeleton  */}
                <div className="p-3 flex items-center justify-center bg-gray-300 w-12 ml-2 rounded-sm   ">
</div>
{/* email skeleton  */}
        <div className="p-3 flex items-center justify-center bg-gray-300 w-28 m-1  rounded-sm ">

        </div>
                </div>
              </div>

              <div className="p-3 flex items-center justify-center font-bold text-xs sm:text-sm ">

              <div className="p-3 flex items-center justify-center bg-gray-300 w-10 rounded-sm">

</div>
              </div>

{/* status skeleton */}
              <div className="p-3 flex items-center justify-center  w-auto m-2">

              <div className="p-3 flex items-center justify-center bg-gray-300 w-[9rem] rounded-sm">

</div>
              </div>

{/* button div skeleton */}
              <div className="p-3 flex items-center justify-center ">
              <div className="p-3 flex items-center justify-center bg-gray-300 w-16  rounded-sm">


</div>
              </div>
      </div>
    );
  }



