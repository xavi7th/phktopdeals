<script>
  let regionSelectOptions = `{
    "hasSearch": true,
    "searchPlaceholder": "Search...",
    "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
    "searchWrapperClasses": "bg-white p-2 px-4 -mx-1 sticky top-0 dark:bg-neutral-900",
    "placeholder": "Select Region ...",
    "toggleTag": "<button type='button' aria-expanded='false' class=' px-4 '><span class='me-2 px-4' data-icon></span><span class='text-gray-800 dark:text-neutral-200 px-4' data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex gap-x-2 text-nowrap w-full px-4 flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
    "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
    "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
  }`;
</script>

<section class="pb-28 lg:py-[220px] w-full px-2">
  <div class="bg-white dark:bg-[#404040] sm:mb-auto mb-28 rounded-xl shadow-lg p-10 relative md:w-[900px] w-full mx-auto">
      <div class="absolute md:top-[-5rem] sm:top-[-3rem] top-[-3.2rem] left-[50%] translate-x-[-50%] md:size-40 sm:size-34 size-24 border-4 border-[#FFDA1C] rounded-full overflow-hidden mx-auto">
          <div class="relative size-full">
              <!-- <img src="" alt="" class="h-full w-full bg-black"> -->
              <p class="h-full w-full bg-black text-white grid place-content-center sm:text-[5em] text-[3em]">S</p>
              <label class="absolute grid place-content-center top-0 left-0 bottom-0 right-0 bg-black/20">
                  <input type="file" class="hidden">
              </label>
          </div>
      </div>
      <div>
          <h1 class="text-2xl font-extrabold mt-20 text-slate-800 dark:text-slate-200">Profile</h1>
          <span class="text-sm text-slate-700 dark:text-slate-300">Communication details . These will be kept private.</span>
      </div>
      <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-6 gap-7">
          <div class="space-y-3 relative w-full">
              <input type="text" class="py-3 px-4 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="">
  
              <div class="absolute inset-y-0 start-0 pl-4 !mt-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="24" width="24" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
              </div>
          </div>
          <div class="space-y-3 relative w-full">
              <input type="text" class="py-3 px-4 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="">
  
              <div class="absolute inset-y-0 start-0 !mt-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
              </div>
          
              <div class="absolute inset-y-0 end-0 !mt-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="currentColor" d="M12.92 2.873a2.975 2.975 0 0 1 4.207 4.207l-.67.67l.336.336a2 2 0 0 1 0 2.828l-.94.94a.5.5 0 0 1-.707-.708l.94-.939a1 1 0 0 0 0-1.414l-.336-.336l-7.98 7.981a2.5 2.5 0 0 1-1.235.678l-3.926.873a.5.5 0 0 1-.597-.597l.878-3.95c.1-.452.328-.867.655-1.194z"></path></svg>
              </div>
          </div>
          <div class="space-y-3 relative w-full">
              <input type="text" class="py-3 px-4 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="">
          
              <div class="absolute inset-y-0 end-0 !mt-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="currentColor" d="M12.92 2.873a2.975 2.975 0 0 1 4.207 4.207l-.67.67l.336.336a2 2 0 0 1 0 2.828l-.94.94a.5.5 0 0 1-.707-.708l.94-.939a1 1 0 0 0 0-1.414l-.336-.336l-7.98 7.981a2.5 2.5 0 0 1-1.235.678l-3.926.873a.5.5 0 0 1-.597-.597l.878-3.95c.1-.452.328-.867.655-1.194z"></path></svg>
              </div>
          </div>
          <div class="space-y-3 relative w-full">
              <input type="text" class="py-3 px-4 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="">
  
              <div class="absolute inset-y-0 start-0 !mt-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
                  </svg>
              </div>
          </div>
          <div class="space-y-3 relative">
              <select id="region-select" data-hs-select={regionSelectOptions} class="hidden">
                  <option value="">Choose</option>
                  <option value="AF" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/af.png' alt='Af' />"}`}'>
                    Afghanistan
                  </option>
                  <option value="AX" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}'>
                    Aland Islands
                  </option>
                  <option value="AL" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}'>
                    Albania
                  </option>
                  <option value="DZ" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}'>
                    Algeria
                  </option>
                  <option value="AS" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}'>
                    American Samoa
                  </option>
              </select>
          </div>
          <div class="space-y-3 relative w-full">
              <select id="region-select" data-hs-select={regionSelectOptions} class="hidden">
                  <option value="">Choose</option>
                  <option value="AF" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/af.png' alt='Af' />"}`}'>
                    Afghanistan
                  </option>
                  <option value="AX" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}'>
                    Aland Islands
                  </option>
                  <option value="AL" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}'>
                    Albania
                  </option>
                  <option value="DZ" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}'>
                    Algeria
                  </option>
                  <option value="AS" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}'>
                    American Samoa
                  </option>
                </select>
  
              <div class="absolute inset-y-0 start-0 !mt-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg  class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path>
                  </svg>
              </div>
          </div>
      </div>
      <div class="flex justify-end mt-8">
          <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold text-gray-800
                        rounded-md border border-transparent bg-brand-400 hover:bg-brand-500 focus:outline-none
                        focus:bg-brand-500 disabled:opacity-50 disabled:pointer-events-none text-nowrap">
            Save
          </button>
      </div>
  </div>
</section>