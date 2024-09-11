<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="container py-10 sm:py-40">
    <div class="flex justify-center">
        <div class="login-card my-10 sm:w-auto w-full sm:bg-white rounded-xl">
            <div class="sm:w-[500px] w-full p-12">
                <div class="mb-8 text-center text-5xl font-extrabold tracking-tight"> Sign In </div>
                    <div class="flex flex-col gap-2">
                        <button class="relative h-[38px] border">
                            <span class="text-sm rounded-sm">Sign In with Google</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 128 128" class="absolute top-[50%] translate-y-[-50%] left-1.5"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"></path><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"></path><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"></path><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"></path><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"></path></svg>
                        </button>
                        <button class="relative h-[38px] border">
                            <span class="text-sm rounded-sm">Sign In with Binance</span>
                            <svg fill="#FFDA1C" width="1.7em" height="1.7em" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" class="absolute top-[50%] translate-y-[-50%] left-1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>binance</title> <path d="M15.986 1.019l9.189 9.159-3.396 3.393-5.793-5.793-5.793 5.823-3.396-3.393 9.189-9.189zM4.399 12.605l3.365 3.395-3.363 3.365-3.396-3.365zM15.986 12.607l3.394 3.363-3.395 3.395-3.395-3.365 3.395-3.393zM27.572 12.605l3.423 3.395-3.393 3.395-3.395-3.395zM21.778 18.399l3.396 3.393-9.189 9.189-9.189-9.187 3.396-3.395 5.793 5.823 5.793-5.823z"></path> </g></svg>
                        </button>
                        <button class="relative h-[38px] border">
                            <span class="text-sm rounded-sm">Sign In with Facebook</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-[50%] translate-y-[-50%] left-1.5" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="#1278f2" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"></path></svg>
                        </button>
                    </div>
                    <div class="space-y-10"><div class="mt-8 flex items-center">
                        <div class="mt-px flex-auto border-t"></div>
                        <div class="text-bold text-secondary mx-2 text-2xl"> Or continue with </div>
                        <div class="mt-px flex-auto border-t"></div>
                    </div>
                    <form action="" class="flex flex-col gap-4">
                        <div class="flex flex-col">
                            <span>Email / Phone Number *</span>
                            <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                        </div>
                        <div class="flex flex-col">
                            <span>Password *</span>
                            <div class="relative">
                                <input type="text" class="block w-full border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                <button class="absolute top-[50%] translate-y-[-50%] right-2"><svg width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="black" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path></svg></button>
                            </div>
                            <div class="flex gap-2">
                                <span>Don’t have an account?</span> <a href="#" class="text-[#FFDA1C]">Sign Up</a>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center gap-4">
                            <a href="#" class="text-[#FFDA1C] text-center hover:underline cursor-pointer text-sm">Forgot Password?</a>
                            <button class="bg-brand hover:bg-brand-400 rounded-full px-5 py-3 text-sm">
                                <span class="">Sign in</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>