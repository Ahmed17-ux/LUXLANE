import React from 'react'
import HOME_PNG_IMAG from '../images/HOME_PNG_IMAG.png';
import { useNavigate } from 'react-router-dom';
import { ABOUTUS_PATH, LOGIN_PATH, SIGNUP_PATH } from '../routes/routers';
import Kitchen from '../images/Kitchen.svg';

import Glases from '../images/Glases.svg';
import Love from '../images/Love.svg';
import computer_speaker from '../images/computer-speaker.svg';
import Coffe from '../images/coffee-beans.svg';
import BootHeeled from '../images/boot-heeled.svg';
import EmptyBad from '../images/bed-empty.svg';
import babycarriage from '../images/baby-carriage.svg';


function Home() {

    const navigate=  useNavigate()

  return (
<>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 my-10 ">

<div class="col-span-1 bg-black">
    <img src={HOME_PNG_IMAG} alt="HOME_PNG_IMAG" className='h-full' />
</div>
<div class="col-span-1 grid grid-rows-3  flex items-center mx-5">
    <span className='font-bold text-7xl text-[#35439c]  '>LuxeLane</span>
    <p className='font-semibold'>
    Step into the world of luxury and style at LuxeLane.
     Indulge in a seamless shopping experience where
     sophistication meets convenience. Explore our
     curated selection of exquisite fashion, accessories,
     and lifestyle treasures. From timeless classics
     to the latest trends, LuxeLane is your gateway
     to elevated elegance. Dive into a realm of
    opulence and make every purchase a statement of
    refined taste. Embrace luxury effortlessly – welcome
     to LuxeLane, where your style journey begins.
    </p>
    <div className='flex gap-4'>
    <button className='bg-[#35439c] rounded-full w-40  text-white justify-self-start p-3 ml-3 hover:bg-[#064ea6] hover:text-black ' onClick={()=>navigate(SIGNUP_PATH)}>Get Started</button>
<button className='flex items-center font-semibold  hover:text-[#064ea6] justify-center gap-2' onClick={navigate(ABOUTUS_PATH)}>Learn more  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>
 </button>
    </div>
</div>



</div>
{/* inifinit scroll bar */}
<div class="flex  my-16 overflow-x-hidden group  gap-6 ">
  <div class="flex  space-x-20  animate-loop-scroll group-hover:paused gap-6   ">

  <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Glases} alt="Glases" className='w-[40px] h-[40px] ' />
    <h1 className='text-xl font-somibold'>Glases</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Love} alt="Clothes" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Clothes</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Coffe} alt="Coffee" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Coffee</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={computer_speaker} alt="Electronic" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Electronic</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={babycarriage} alt="Baby" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Children</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={EmptyBad} alt="HomeNeeds" className='w-[40px] h-[40px]'  />
    <h1  className='text-xl font-somibold'>Home Needs</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={BootHeeled} alt="BootHeeled" className='w-[40px] h-[40px]' />
    <h1 className='text-xl font-somibold'>Boot Heeled</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Kitchen} alt="Kitchen"className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold' >Kitchen</h1>
    </div>

</div>
<div  class="flex  space-x-20  animate-loop-scroll group-hover:paused gap-6   " aria-hidden='true'>


<div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Glases} alt="Glases" className='w-[40px] h-[40px] ' />
    <h1 className='text-xl font-somibold'>Glases</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Love} alt="Clothes" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Clothes</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Coffe} alt="Coffee" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Coffee</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={computer_speaker} alt="Electronic" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Electronic</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={babycarriage} alt="Baby" className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold'>Children</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={EmptyBad} alt="HomeNeeds" className='w-[40px] h-[40px]'  />
    <h1  className='text-xl font-somibold'>Home Needs</h1>
    </div>

    <div className='flex py-2  items-center justify-center gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={BootHeeled} alt="BootHeeled" className='w-[40px] h-[40px]' />
    <h1 className='text-xl font-somibold'>Boot Heeled</h1>
    </div>

    <div className='flex py-2  items-center justify-center   gap-4 rounded-full w-[250px]  border-indigo-600 border-y-4 border-indigo-500 '>
    <img src={Kitchen} alt="Kitchen"className='w-[40px] h-[40px]'  />
    <h1 className='text-xl font-somibold' >Kitchen  </h1>
    </div>

</div>

</div>

<div className='flex items-center  justify-center  my-16'>
<hr  className=' w-[80%]'/>
</div>

<div className='flex items-center justify-center my-10'>
    <h1 className=' py-6 font-bold text-4xl text-center w-[50%] underline decoration-blue-300'>
        Efficiency and productivity made
        easy with these features
        </h1>
</div>

<div   class="grid md:grid-cols-2 sm:grid-cols-1 text-center mx-12  gap-4 my-12">
  <div class=' bg-blue-100 rounded-xl shadow-md shadow-inner shadow-blue-900 '>
    <div class='m-6 md:m-12 flex items-start justify-start md:gap-14'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 border-2 border-blue-900 rounded-lg">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

      <h1 class='text-xl md:text-3xl font-semibold'>Smart Automation</h1>
    </div>
    <p class='text-start m-3 md:m-5 py-4'>
      Our software comes equipped with advanced automation tools that streamline your processes and reduce the time and effort required to complete routine tasks.
    </p>
  </div>

  <div class='bg-blue-100 rounded-xl shadow-md shadow-inner shadow-blue-900 '>
    <div class='m-6 md:m-12 flex items-start justify-start md:gap-14'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 border-2 border-blue-900 rounded-lg">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
</svg>

      <h1 class='text-xl md:text-3xl font-semibold'>Real-time Analytics</h1>
    </div>
    <p class='text-start m-3 md:m-5 py-4'>
      With our powerful analytics tools, you can get a real-time view of your business performance and make data-driven decisions that drive growth and profitability.
    </p>
  </div>

  {/* <!-- Seamless Collaboration --> */}
  <div class='bg-blue-100 rounded-xl shadow-md shadow-inner shadow-blue-900 '>
    <div class='m-6 md:m-12 flex items-start justify-start md:gap-14'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 border-2 border-blue-900 rounded-lg">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
</svg>


      <h1 class='text-xl md:text-3xl font-semibold'>Seamless Collaboration</h1>
    </div>
    <p class='text-start m-3 md:m-5 py-4'>
      Collaboration is key to success in today's fast-paced business world, and our software makes it easy to work together with your team, partners, and clients.
    </p>
  </div>

  {/* <!-- Team Collaboration --> */}
  <div class=' bg-blue-100 rounded-xl shadow-md shadow-inner shadow-blue-900 '>
    <div class='m-6 md:m-12 flex items-start justify-start md:gap-14'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 border-2 border-blue-900 rounded-lg">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

      <h1 class='text-xl md:text-3xl font-semibold'>Team Collaboration</h1>
    </div>
    <p class='text-start m-3 md:m-5 py-4'>
      Collaborate with your team members and clients in real-time, share files and feedback, and keep everyone on the same page with our intuitive collaboration tools.
    </p>
  </div>
</div>



<div className='flex items-center justify-center mt-16'>
    <h1  className='text-5xl font-bold underline decoration-blue-300 '>Tranding Product </h1>
</div>

<div class="grid md:grid-cols-3 sm:grid-cols-1 gap-8 mx-12 my-10 text-center  py-8 ">
<div className='w-full border-4 border-dashed border-blue-700 rounded-t-3xl shadow-md shadow-blue-300'>
  <div className='flex my-5 items-center justify-center gap-8'>
<span className='border-2 border-blue-400 rounded-xl p-2 font-bold'>186 +</span>

        <h1 className='text-3xl font-semibold'>Treanding Clothes</h1>
  </div>
    </div>

    <div className='w-full border-4 border-dashed border-blue-700 rounded-t-3xl shadow-md shadow-blue-300'>
  <div className='flex my-5 items-center justify-center gap-8'>
<span className='border-2 border-blue-400 rounded-xl p-2 font-bold'>186 +</span>

        <h1 className='text-3xl font-semibold'>Treanding Clothes</h1>
  </div>
    </div>
    <div className='w-full border-4 border-dashed border-blue-700 rounded-t-3xl shadow-md shadow-blue-300'>
  <div className='flex my-5 items-center justify-center gap-8'>
<span className='border-2 border-blue-400 rounded-xl p-2 font-bold'>186 +</span>

        <h1 className='text-3xl font-semibold'>Treanding Clothes</h1>
  </div>
    </div>
</div>


{/* footer  */}
<footer class="relative bg-blueGray-200  pt-8 pb-4 w-full">
  <div class="w-full  px-4">
    <div class="flex flex-wrap text-left lg:text-left">
      <div class="w-full lg:w-6/12 px-4">
        <h4 class="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
        <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div class="mt-6 lg:mb-0 mb-6">
          <button class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-twitter"></i></button><button class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-dribbble"></i></button><button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
         <a href="https://github.com/houssamHADELAMOUS">            <i class="fab fa-github"></i>
</a>
          </button>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="flex flex-wrap items-top mb-6">
          <div class="w-full lg:w-4/12 px-4 ml-auto">
            <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
            <ul class="list-unstyled">
              <li>
                <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile" onClick={navigate(ABOUTUS_PATH)}>About Us</a>
              </li>

              <li>
                <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/houssamHADELAMOUS" >Github </a>
              </li>

            </ul>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
            <ul class="list-unstyled">
              <li>
                <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">MIT License</a>
              </li>
              <li>
                <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
              </li>
              <li>
                <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-6 border-blueGray-300" />
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-4/12 px-4 mx-auto text-center">
        <div class="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2024</span>
          <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank" /> Notus JS by
          <a href="https://www.creative-tim.com?ref=njs-profile" class="text-blueGray-500 hover:text-blueGray-800">Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</>

  )
}

export default Home
