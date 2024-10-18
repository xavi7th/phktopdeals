<script>
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { atSign, faceBookFilled, googleColored } from '$lib/Components/iconPaths';

  export let register = false;
</script>

<div class="flex flex-col gap-2">
  <div class="my-8 flex items-center">
    <div class="mt-px flex-auto border-t"></div>
    <div class="text-bold text-secondary text-md mx-6 dark:text-slate-50">Or</div>
    <div class="mt-px flex-auto border-t"></div>
  </div>

  <a href="{register ? '/login' : '/register'}" class="group relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
    <SvgIcon class="size-[1.2em] stroke-[3] group-hover:stroke-[5] transition-all" svgHeight={48} slot={atSign}/>
    <span class="rounded-sm text-sm dark:text-slate-50">{register ? 'Sign in' : 'Register'} with Email</span>
  </a>

  <button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
    <SvgIcon class="size-[1.2em]" svgHeight={128} slot={googleColored}/>
    <span class="rounded-sm text-sm dark:text-slate-50">Sign in with Google</span>
  </button>

  <button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
    <SvgIcon class="size-[1.5em]" svgHeight={24} slot={faceBookFilled}/>
    <span class="rounded-sm text-sm dark:text-slate-50">Sign in with Facebook</span>
  </button>
</div>
