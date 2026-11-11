import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SHOPING_PAGE } from '../../routes/routers';
import { useForm } from 'react-hook-form';

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  };
  const onSubmit = (data) => {
    console.log(data); // Submit the form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className='m-6 shadow-xl'>

<Link to={SHOPING_PAGE}>
<div className="w-56 p-4">
      <div className="flex w-full bg-blue-900 shadow rounded-lg py-1 px-6 cursor-pointer" >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <p className="m-auto inset-0 font-semibold leading-7 text-center text-white text-sm">Back to Shop</p>
        </div>
      </div>
</Link>
<main class="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse">
  <div class="px-4 py-6 sm:px-6 lg:hidden">
    <div class="max-w-lg mx-auto flex">
      <a href="#">
        <span class="sr-only">Workflow</span>
        <img src="" alt="" class="h-8 w-auto" />
      </a>
    </div>
  </div>

  <h1 class="sr-only">Checkout</h1>

  <section aria-labelledby="order-heading" class="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
    <div class="max-w-lg mx-auto">
      <div class="flex items-center justify-between">
        <h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" aria-controls="disclosure-1" aria-expanded="false">
          <span>Hide full summary</span>
          <span>Show full summary</span>
        </button>
      </div>

      <div id="disclosure-1 bg-black" >
      <ul role="list" className="divide-y bg-black divide-gray-200 border-b border-gray-200">
          {cartItems.map((item, index) => (
            <li key={index} className="flex py-6 space-x-6">
              <img src={item.image} alt={item.name} className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
              <div className="flex flex-col justify-between space-y-4">
                <div className="text-sm font-medium space-y-1">
                  <h3 className="text-gray-900">{item.name}</h3>
                  <p className="text-gray-900">{item.price}</p>
                  <p className="text-gray-500">{item.color}</p>
                  <p className="text-gray-500">{item.size}</p>
                </div>
                <div className="flex space-x-4">
                  {/* <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button> */}
                  <div className="flex border-l border-gray-300 pl-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form class="mt-10">
          <label for="discount-code-mobile" class="block text-sm font-medium text-gray-700">Discount code</label>
          <div class="flex space-x-4 mt-1">
            <input type="text" id="discount-code-mobile" name="discount-code-mobile" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <button type="submit" class="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Apply</button>
          </div>
        </form>

        <dl class="text-sm font-medium text-gray-500 mt-10 space-y-6">
          <div class="flex justify-between">
            <dt>Subtotal</dt>
            <dd class="text-gray-900">$210.00</dd>
          </div>
          <div class="flex justify-between">
            <dt class="flex">
              Discount
              <span class="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">CHEAPSKATE</span>
            </dt>
            <dd class="text-gray-900">-$24.00</dd>
          </div>
          <div class="flex justify-between">
            <dt>Taxes</dt>
            <dd class="text-gray-900">$23.68</dd>
          </div>
          <div class="flex justify-between">
            <dt>Shipping</dt>
            <dd class="text-gray-900">$.00</dd>
          </div>
        </dl>
      </div>

      <p class="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
            <span class="text-base">Total</span>
            <span class="text-base">${calculateTotalPrice()}</span>
      </p>
    </div>
  </section>

  <section aria-labelledby="summary-heading" class="hidden bg-gray-50 w-full max-w-md flex-col lg:flex">
    <h2 id="summary-heading" class="sr-only">Order summary</h2>

    <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#24559a #FFFFFF ' }}>
  <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {cartItems.map((item, index) => (
      <li key={index} className="flex py-6 space-x-6 px-2">
        <img
          src={`http://127.0.0.1:8000/storage/${item.imag}`}
          alt={item.name}
          className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
        />
        <div className="flex flex-col justify-between space-y-4">
          <div className="text-sm font-medium space-y-1">
            <h3 className="text-gray-900">{item.name}</h3>
            <p className="text-gray-900">{item.price}</p>
            <p className="text-gray-500">{item.color}</p>
            <p className="text-gray-500">{item.size}</p>
          </div>
          <div className="flex space-x-4">
          <div>
        <label for="discount-code" class="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="text" id="discount-code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Quantity" required />
        </div>
            <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
            <div className="flex border-l border-gray-300 pl-4">
              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>


    <div class="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
      <form>
        <div>
        <label for="discount-code" class="block text-sm font-medium text-gray-700">Discount code</label>
            <input type="text" id="discount-code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Discount code" required />
        </div>
      </form>

      <dl class="text-sm font-medium text-gray-500 mt-10 space-y-6">
        <div class="flex justify-between">
          <dt>Subtotal</dt>
          <dd class="text-gray-900">$210.00</dd>
        </div>
        <div class="flex justify-between">
          <dt class="flex">
            Discount
            <span class="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">CHEAPSKATE</span>
          </dt>
          <dd class="text-gray-900">-$24.00</dd>
        </div>
        <div class="flex justify-between">
          <dt>Taxes</dt>
          <dd class="text-gray-900">$23.68</dd>
        </div>
        <div class="flex justify-between">
          <dt>Shipping</dt>
          <dd class="text-gray-900">$22.00</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
          <dt class="text-base">Total</dt>
          <dd class="text-base"
          {...register('prix_total',{
            required:true})}

          >${calculateTotalPrice()}</dd>
        </div>
      </dl>
    </div>
  </section>

   <section aria-labelledby="payment-heading" class="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24">
    <div class="max-w-lg mx-auto">
      

      <button type="button" class="w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
        <span class="sr-only">Pay with Apple Pay</span>
        <svg class="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
          <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
        </svg>
      </button>

      <div class="relative mt-8">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-4 bg-white text-sm font-medium text-gray-500"> or </span>
        </div>
      </div>

      <form class="mt-6"  onSubmit={handleSubmit(onSubmit)}>

        <div class="grid grid-cols-12 gap-y-6 gap-x-4">
        <div className="col-span-full">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input type="email" id="email-address" name="email-address"
            {...register("email", { required: true })} onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='Email*'

            />
            {errors.email && <span className='text-sm px-2  text-red-800' >This field is required</span>}
          </div>
        </div>

          <div class="col-span-full">
            <label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
            <div class="mt-1">
              <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name"
                          {...register("email", { required: true })} onChange={handleChange}

  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder='Name on card*'
  />
              </div>
          </div>

          <div class="col-span-full">
            <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
            <div class="mt-1">
              <input type="text" id="card-number" name="card-number" autocomplete="cc-number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder='Card number*'
              />
            </div>
          </div>

          <div class="col-span-8 sm:col-span-9">
            <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
            <div class="mt-1">
              <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='Expiration date (MM/YY)*'
/>
            </div>
          </div>

          <div class="col-span-4 sm:col-span-3">
            <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
            <div class="mt-1">
              <input type="text" name="cvc" id="cvc" autocomplete="csc"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='CVC*'
/>
            </div>
          </div>

          <div class="col-span-full">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <div class="mt-1">
              <input type="text" id="address" name="address" autocomplete="street-address"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='address*'
        />
            </div>
          </div>

          <div class="col-span-full sm:col-span-4">
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <div class="mt-1">
              <input type="text" id="city" name="city" autocomplete="address-level2"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='city*'                />
            </div>
          </div>

          <div class="col-span-full sm:col-span-4">
            <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
            <div class="mt-1">
              <input type="text" id="region" name="region" autocomplete="address-level1"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='State / Province*'               />
            </div>
          </div>

          <div class="col-span-full sm:col-span-4">
            <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
            <div class="mt-1">
              <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code"
class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder='Postal code*'                />
            </div>
          </div>
        </div>

        <div class="mt-6 flex space-x-2">
          <div class="flex items-center h-5">
            <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked
            class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
          </div>
          <label for="same-as-shipping" class="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
        </div>

        <button type="submit" class="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Pay $341.68</button>

        <p class="flex justify-center text-sm font-medium text-gray-500 mt-6">
          <svg class="w-5 h-5 text-gray-400 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          Payment details stored in plain text
        </p>
      </form>
    </div>
  </section>
</main>

    </div>
  )
}

export default CheckoutPage;
