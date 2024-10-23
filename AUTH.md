# SvelteKit Laravel SPA and JWT Auth Process

## MOST IMPORTANT VIDEOS
- [@see https://www.youtube.com/watch?v=ujDnuzi1t1s](https://www.youtube.com/watch?v=ujDnuzi1t1s)
- [@see https://www.youtube.com/watch?v=gKC7yvllsPE](https://www.youtube.com/watch?v=gKC7yvllsPE)
- [@see https://www.youtube.com/watch?v=K1Tya6ovVOI](https://www.youtube.com/watch?v=K1Tya6ovVOI)
- [@see https://www.youtube.com/watch?v=O6ibPLFfAh0&t=35s](https://www.youtube.com/watch?v=O6ibPLFfAh0&t=35s)
- [@see https://www.youtube.com/watch?v=HYO8OuLuTFw](https://www.youtube.com/watch?v=HYO8OuLuTFw)
- [@see https://www.youtube.com/watch?v=2zKoS8GsKK8](https://www.youtube.com/watch?v=2zKoS8GsKK8)
- [@see https://www.youtube.com/watch?v=rBcgNKt2FZs&t=786s](https://www.youtube.com/watch?v=rBcgNKt2FZs&t=786s)
- [@see https://www.youtube.com/watch?v=UbhhJWV3bmI&t=361s](https://www.youtube.com/watch?v=UbhhJWV3bmI&t=361s)
- [@see https://medium.com/@slamtm608/laravel-sanctum-multi-authentication-504b9489a2cc](https://medium.com/@slamtm608/laravel-sanctum-multi-authentication-504b9489a2cc)
- [@see https://stackoverflow.com/questions/61170647/](https://stackoverflow.com/questions/61170647/laravel-sanctum-can-be-use-multiauth-guard)


## OTHER NECESSARY ONES
- [@see https://www.youtube.com/watch?v=pZdzzKf0h3E](https://www.youtube.com/watch?v=pZdzzKf0h3E)
- [@see https://www.youtube.com/watch?v=jIzPuM76-nI&list=PLlameCF3cMEssaXOEym93ID7_e6ZDyiGO](https://www.youtube.com/watch?v=jIzPuM76-nI&list=PLlameCF3cMEssaXOEym93ID7_e6ZDyiGO)
- [@see https://laravel.com/docs/10.x/sanctum#spa-authentication](https://laravel.com/docs/10.x/sanctum#spa-authentication)
- [@see https://laravel.com/docs/11.x/sanctum](https://laravel.com/docs/11.x/sanctum)
- [@see https://laravel-news.com/building-apis-in-laravel](https://laravel-news.com/building-apis-in-laravel)
- [@see https://medium.com/@tsubasakondo_36683/make-laravel-api-only-2da47a0f92b7](https://medium.com/@tsubasakondo_36683/make-laravel-api-only-2da47a0f92b7)
- [@see https://craftable.pro/article/creating-apis-for-mobile-apps-using-laravel-part-i](https://craftable.pro/article/creating-apis-for-mobile-apps-using-laravel-part-i)
- [@see https://github.com/daison12006013/sveltekit-starter/blob/develop/guides/](https://github.com/daison12006013/sveltekit-starter/blob/develop/guides/laravel-sanctum.md)
- [@see https://laracasts.com/discuss/channels/laravel/laravel-sanctum-with-angular-csrf-token-mismatch?page=1&replyId=917041](https://laracasts.com/discuss/channels/laravel/laravel-sanctum-with-angular-csrf-token-mismatch?page=1&replyId=917041)
- [@see https://brightsec.com/blog/what-is-csrf-token-mismatch-and-6-ways-to-fix-it/#:~:text=Here%20are%20the%20most%20common,will%20result%20in%20a%20mismatch.](https://brightsec.com/blog/what-is-csrf-token-mismatch-and-6-ways-to-fix-it/#:~:text=Here%20are%20the%20most%20common,will%20result%20in%20a%20mismatch.)



### NOTE

First of all, to see your request and response headers, Add this to your env files

```env
LOG_REQUEST_HEADERS=FALSE #add logger(['$response->headers' => $response->headers, '$request->header' => $request->headers]); to vendor/fruitcake/php-cors/src/CorsService.php:201
```

Then you have to install sanctum if you're on 10 and below 'composer require laravel/sanctum' and publish the config file 'php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"' and run the migrations 'php artisan migrate'


There are two ways to authenticate with Sanctum. JWTs and SPA mode. The SPA mode uses the web guard along with api guard. IT does not use JWT token but CSRF cookies. This method is where this issue is most present. This CSRF cookies is where the issues come from.

For this feature, Sanctum does not use tokens of any kind. Instead, Sanctum uses Laravel's built-in cookie based session authentication services. This approach to authentication provides the benefits of CSRF protection, session authentication, as well as protects against leakage of the authentication credentials via XSS.

But your SPA and API must share the same top-level domain. However, they may be placed on different subdomains. Also, you should ensure that you send the Accept: application/json header /* or implement the ForceJSON middleware as shown below */ and either the Referer or Origin header with your request.


## Steps to implement SPA

1. In app/Http/Kernel.php, uncomment this line under api \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,

2. Update cors.php to be similar to this, taking special note of allowed_origins and supports_credentials

```php
return [

  /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

  'paths' => ['api/*', 'sanctum/csrf-cookie'],

  'allowed_methods' => ['*'],

  'allowed_origins' => ['localhost', 'phkhotdeals.com', 'localhost:5173'],

  'allowed_origins_patterns' => [],

  'allowed_headers' => ['*'],

  'exposed_headers' => [],

  'max_age' => 0,

  'supports_credentials' => TRUE,
];
```

3. Apply the "auth:sanctum" guard to your authenticated routes, the "api" guard to ALL your routes


4. Make sure your env details are correct and that the relevant fields in auth.php are set

```env
AUTH_GUARD=web
AUTH_PASSWORD_BROKER=users
AUTH_MODEL='Modules\AppUser\Models\AppUser'
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost #very very very important
SESSION_DOMAIN=.localhost # this is also very important when you are using subdomains @see https://laravel.com/docs/10.x/sanctum#cors-and-cookies
```


5. Configure your trusted hosts. @see [configuring-trusted-hosts](https://laravel.com/docs/10.x/requests#configuring-trusted-hosts)

6. In your before you make any calls to your `api/*` endpoints, first of all make a call to `sanctum/csrf-token` endpoint. This call will set AND RETURN 2 cookies that will be set on your browser. An `XSRF-TOKEN` cookie and another cookie that matches the config`('session.cookie')` setting of your app. Check your Application tab to ensure these cookies have been set properly. In sveltekit, you can make this call in your hooks.server.js file. `/* Contents listed below */`. These cookies will be set using a set-cookie directive sent from the server.

7. Also ensure that the server returns 2 headers. An `'Access-Control-Allow-Origin'` header that contains your domain inclusive and an `'Access-Control-Allow-Credentials'` header set to true.

8. After that, when you make calls to your `'api/*'` routes, make sure to send 2 headers.
   - An `X-XSRF-TOKEN` header that contains the `XSRF-TOKEN` set in the `'sanctum/csrf-token'` request.
   - And then a `coookie` header that contains the cookie request set by the browser. In Sveltekit this can be done in the hooks.server.js `/* Contents listed below */`

```env
//sveltekit .env file
PUBLIC_VITE_BASE_DOMAIN="http://localhost/"
PUBLIC_VITE_BASE_API="http://localhost/api/v1/"

VITE_APP_NAME="PHKHotDeals"
VITE_SESSION_NAME="phkhotdeals_session"
VITE_AUTH_COOKIE_NAME="phkhotdeals_jwt_cookie"
VITE_LOGIN_PATH="/auth/login/"
VITE_LOGOUT_PATH="/auth/logout/"
```

```js
//helpers.js

import { PUBLIC_VITE_BASE_API, PUBLIC_VITE_BASE_DOMAIN } from '$env/static/public';

/**
 * Custom function to set API headers and make API calls
 *
 * @param {import('$lib/types').ApiParams} params
 *
 * @returns {Promise<Response> | undefined}
 */
export async function api({toBaseDomain, resource, event, method, data, logResponse}) {
	const base = PUBLIC_VITE_BASE_DOMAIN
	const baseApi = PUBLIC_VITE_BASE_API
	let fullurl = toBaseDomain ? base : baseApi

	if (resource) {
		fullurl += resource
	}

  console.log('--------------- API Request: ' + method.toUpperCase() + ' ' + fullurl);

	const response = await event?.fetch(fullurl, {
		method: method,
		headers: {
			'content-type': 'application/json',
			'accept': 'application/json',
			'cookie': event.request?.headers?.get('cookie') || '',
			'referer': event.request?.headers?.get('referer') || '',
      'x-xsrf-token': event.cookies.get('XSRF-TOKEN') || '',
		},
		body: data && JSON.stringify(data),
	});

  if(logResponse){
    console.log('--------------- API Response: ');
    let spyResponse = await response?.clone();
    console.log({status: spyResponse?.status, body: spyResponse?.status==204 ? null : await spyResponse?.json()}, '\n\n')
  }

	return response;
}
```

```js
//hooks.server.js file

import { parse } from 'cookie';
import { api } from '$lib/helpers';
import scp from 'set-cookie-parser';
import { dev } from "$app/environment";
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleDeviecDetector } from 'sveltekit-device-detector';

/** @type {import('@sveltejs/kit').Handle} */
async function logger({event, resolve}){
  const start_time = Date.now();

  //Await here. Run other hooks AND LOAD FUNCTIONS then come back here to continue
  const response = await resolve(event)

  if ( dev && ! event.request.url.includes('assets') ) {
    console.log(`
      INTERNAL REQUEST: ${Date.now() - start_time}ms ${event.locals.deviceName} ${event.request.method} ${event.url.pathname}
    `)
  }

  return response;
}

/** @type {import('@sveltejs/kit').Handle} */
async function setCsrf({event, resolve}){
	const cookies = parse(event.request.headers.get('cookie') || '')
	event.locals.session = cookies[import.meta.env.VITE_SESSION_NAME]

	if (!event.locals.session && ! event.route.id?.includes('http://')) { //fire this ONLY on requests that hit our back end. Dont use this on requests that hit internal routes
    await api({
      method: 'get',
			resource: 'sanctum/csrf-cookie',
      toBaseDomain: true,
      event,
		});
	}

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
async function addSecurityHeaders({event, resolve}){

	const securityHeaders = { //@see https://edoverflow.com/2023/sveltekit-security-headers/
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    // 'Content-Security-Policy': 'script-src \'self\' \'nonce-Y70QFNhAVmer2wdobT8YoQ==\'',
    // 'Referrer-Policy': 'no-referrer',
    // 'Strict-transport-security': 'max-age=15552000; includeSubDomains',
    // 'X-Content-Type-Options': 'nosniff',
    // 'X-DNS-Prefetch-Control': 'off',
    // 'X-Download-Options': 'noopen',
    // 'X-Permitted-Cross-Domain-Policies': 'none',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '0',
  }

  const response = await resolve(event);

  Object.entries(securityHeaders).forEach(
      ([header, value]) => response.headers.set(header, value)
  );

  return response;
}

/** @type {import('@sveltejs/kit').Handle} */
async function getUserDetails({event, resolve}){
  if ( ! event.locals?.user?.name && ! event.route.id?.includes('api/home') && ! event.request.url.includes('assets')) {
		const getUserDetails = await api({
			method: 'get',
			resource: 'user',
			event,
		});

    event.locals.user = await getUserDetails?.json() //use this to determine auth on frontend. Before accessing auth routes if this is null redirect to login page
	}

  event.locals.deviceName = event.locals.deviceType.isDesktop
                              ? `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''}`
                              : `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''} ${event.locals.deviceType?.osVersion || ''}`;

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
function authorize({event, resolve}){

  if ( ! event.request.url.includes('assets')) {
    console.log(`--------------AUTHORIZING ${event.request.url}---------------`);
    console.log({user: event.locals?.user?.name});
  }

  if (event.url.pathname.startsWith('/user') && ! event.locals?.user?.name) {
    redirect(303, '/login') //303 will always redirect with GET, 307 will redirect with the original request method, while 302 is just 303 made popular
  }

  if (event.route.id?.includes('(auth)') && event.locals?.user?.name) {
    redirect(303, '/user/settings')
  }

  return resolve(event);
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({request, fetch, event}) => {

  console.log(`--------------FETCHING ${request.url}---------------`);

  const response = await fetch(request);

  /** @type {CookieSerializeOptions[]} */
  let cookies = scp.parse(response)

  if (cookies.length) {
    cookies.forEach(cookie => {
      event.cookies.set(cookie.name, cookie.value, {
        ...cookie,
        sameSite: cookie.sameSite,
        secure: !dev,
      });
    })
  }

  return response
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = ({event, error}) => {
  if ( ! event.request.url.includes('assets')) {
    console.log('error', error);

    return {
      message: 'Oops',
      code: error?.code ?? 500,
    }
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(handleDeviecDetector({}),logger, setCsrf, getUserDetails, authorize, addSecurityHeaders);
```


9. If you want to use this app for API only add a `ForceJSON` middleware to `'protected $middleware'` group in your Laravel App.

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceJSON
{
  public function handle(Request $request, Closure $next)
  {
    $request->headers->set('Accept', 'application/json');  // Force the application to treat ALL requests as JSON rewuests

    if ($request->isMobile()) { //Set the Bearer header from the user's auth cookie
      $request->headers->set('Authorization', 'Bearer ' . $request->cookie(config('auth.cookie')));
    }

    return $next($request);
  }
}
```

10. Also your frontend MUST send either an `'Origin'` header or a `'Referer'` header. In Sveltekit this can be done in the `'hooks.server.js'` file `/* as shown above 'referer': event.request?.headers?.get('referer') || '', */`

11. Configure your frontend to redirect 419 responses to the login page.

12. Add your types to either

```ts
//$lib/types.d.ts
import type { RequestEvent } from '@sveltejs/kit';

export interface ApiParams {
	method: string;
	event?: RequestEvent;
	resource?: string;
  /** Indicates whether to append the base url to the supplied resource url */
  toBaseDomain?: boolean;
  logResponse?: boolean;
	data?: Record<string, unknown> | null;
}
export type MediaHandler = {
  isDesktop: boolean,
  isMobile: boolean,
}

OR

//app.d.ts @see https://kit.svelte.dev/docs/types#app

import type { AppUser } from '$lib/types';
import type { DevicePayload } from 'sveltekit-device-detector';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user: AppUser | undefined;
      session: string | undefined;
      deviceType: DevicePayload;
      deviceName?: string;
    }
		interface PageData {
      deviceType: DevicePayload;
      deviceName?: string;
    }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
```

13. Your login's +page.server.js file could be

```js
// logic/+page.server.js
import { api } from '$lib/helpers';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {
		const form = await event.request.formData();

		const response = await api({
			method: 'post',
			resource: 'login',
			data: {
				'email': form.has('email') ? form.get('email') : undefined,
				'password': form.has('password') ? form.get('password') : undefined,
				'remember': form.has('rememberme') ? form.get('rememberme') : false,
        'device_name': event.locals.deviceName,
			},
      event,
		});

		if (response?.status == 422) {
			return fail(response?.status || 400, await response?.json());
		}

    if ( ! response?.ok) {
      return fail(response?.status || 500, {message: response?.statusText || 'An error occured while processing your request'});
    }

		if (response?.status == 200 || response?.status == 201) {
			throw redirect(302, '/user/settings')
		}
	},
}
```

<br>
<br>


## Steps to implement JWTs for Mobile Apps


- [@see https://www.youtube.com/watch?v=jIzPuM76-nI&list=PLlameCF3cMEssaXOEym93ID7_e6ZDyiGO](https://www.youtube.com/watch?v=jIzPuM76-nI&list=PLlameCF3cMEssaXOEym93ID7_e6ZDyiGO)
- [@see https://laravel.com/docs/10.x/sanctum#issuing-mobile-api-tokens](https://laravel.com/docs/10.x/sanctum#issuing-mobile-api-tokens)


In this method, you will get JWT tokens (from your login routes) that will be used with `Bearer Auth` headers

1. ALL Your routes MUST implement the `'api'` guard, protected routes should implement the `'auth:sanctum'` guard, and any routes MUST NOT implement `'web'` guard.

2. In `app/Http/Kernel.php`, this line under api `'\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,'` MUST be commented out.
    - **NOTE:** If you have to use both SPA and JWT sanctum authentications together, Create a new moddleware that extends Sanctum's `'EnsureFrontendRequestsAreStateful::class'` like this.

```php
namespace App\Http\Middleware;

use Illuminate\Routing\Pipeline;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

final class ModifiedSanctumStatefulRequests extends EnsureFrontendRequestsAreStateful
{
  /**
   * Handle the incoming requests.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  callable  $next
   * @return \Illuminate\Http\Response
   */
  public function handle($request, $next)
  {
    if ($request->header('x-mobile-api', FALSE)) { // If this is a mobile request ignore CSRF protection
      return $next($request);
    }

    $this->configureSecureCookieSessions();

    return (new Pipeline(app()))->send($request)->through(
        self::fromFrontend($request) ? $this->frontendMiddleware() : []
    )->then(fn ($request) => $next($request));
  }
}
```

and then use this class instead in the api key of `'Kernel.php'`

```php
'api' => [
  Middleware\ModifiedSanctumStatefulRequests::class,
  \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
  \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```


1. Setup your Login POST route something like this

```php
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required', //this should be a name the user would recognize, such as "Nuno's iPhone 12". This is useful for creating a way to revoke tokens
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return ['token' => $user->createToken($request->device_name)->plainTextToken];
```

 These tokens are saved in the database and are accessible via `$user->tokens()` relationship from the `'HasApiTokens'` trait.

4. When the mobile application uses the token to make an API request to your application, it should pass the token in the Authorization header as a `Bearer Token`.

5. Revoking tokens `$user->tokens()->delete();`, `$request->user()->currentAccessToken()->delete();` or `$user->tokens()->where('id', $tokenId)->delete();`

6. The User Model should use the `'HasApiTokens'` trait.

7. You can give tokens abilities. `@see https://laravel.com/docs/10.x/sanctum#token-abilities` and also use these abilities for auth guarding `@see https://medium.com/@slamtm608/laravel-sanctum-multi-authentication-504b9489a2cc`

3. Token expiration configurations `@see https://laravel.com/docs/10.x/sanctum#token-expiration`

4. Cleaning up expired tokens: `$schedule->command('sanctum:prune-expired --hours=24')->daily();`

<br>
<br>


## Steps to Implement Multi Auth with Sanctum

### Approach 1

[@see https://medium.com/@slamtm608/laravel-sanctum-multi-authentication-504b9489a2cc](https://medium.com/@slamtm608/laravel-sanctum-multi-authentication-504b9489a2cc)

<br>
<br>

### Approach 2

The link above is one possible implementation that is easy to wire up, but I went for a different approach


1. Add this to your guards array

```php
'admin' => [
  'driver' => 'session',
  'provider' => 'admins',
],
```

2. Add this to your providers array

```php
'admins' => [
  'driver' => 'eloquent',
  'model' => env('AUTH_ADMIN_MODEL', Modules\SuperAdmin\Models\SuperAdmin::class),
],
```

and `AUTH_ADMIN_MODEL='Modules\SuperAdmin\Models\SuperAdmin'` to your env


3. In sanctum.php add `"admin"` to your guards array. It should now look something like this

```php
'guard' => ['web', 'admin'],
```

4. Make sure your SuperAdmin model has `'HasApiTokens'` trait added to it

5. Your `RedirectIfAuthenticated`'s middleware  `handle()` method should acknowledge previous auth

```php
foreach ($guards as $guard) {
  if (Auth::guard($guard)->check()) {
    return $request->expectsJson() ? response()->json(['message' => 'Already Authenticated'], 205) : redirect(RouteServiceProvider::home());
  }
}
```


6. Add 2 new middlewares to your Kernel.php

```php
'admins' => \Modules\SuperAdmin\Http\Middleware\AdminsOnly::class,
'users' => \Modules\AppUser\Http\Middleware\AppUsersOnly::class,
```


```php

namespace Modules\SuperAdmin\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Modules\UserAuth\Services\AuthService;

class AdminsOnly
{
  public function handle(Request $request, Closure $next)
  {
    if ( ! $request->user()->isSuperAdmin()) {
      logger()->critical('HACKING ATTEMPT: ' . $request->user()->email . ' tried to access the admin section illegally.', ['user_details' => $request->user()]);

      (new AuthService())->logout($request);

      return response()->json(['message' => 'Unauthorized Action!!'], 401);
    }

    return $next($request);
  }
}
```


```php

namespace Modules\AppUser\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Modules\UserAuth\Services\AuthService;

class AppUsersOnly
{
  public function handle(Request $request, Closure $next)
  {
    if ( ! $request->user()->isAppUser()) {
      logger()->critical('HACKING ATTEMPT: ' . $request->user()->email . ' tried to access the app user section illegally.', ['user_details' => $request->user()]);

      (new AuthService())->logout($request);

      return response()->json(['message' => 'Unauthorized Action!!'], 401);
    }

    return $next($request);
  }
}
```



7. Your AuthService should be like this

```php

namespace Modules\UserAuth\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Auth\SessionGuard;
use Illuminate\Auth\Events\Lockout;
use Modules\AppUser\Models\AppUser;
use Illuminate\Support\Facades\Auth;
use Modules\AppUser\DTOs\AppUserDTO;
use Illuminate\Auth\Events\Registered;
use Modules\SuperAdmin\Models\SuperAdmin;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Cookie;
use Illuminate\Validation\ValidationException;
use Modules\AppUser\Transformers\AppUserResource;
use Modules\SuperAdmin\Transformers\SuperAdminResource;

class AuthService
{
  /**
   * Creates an AppUser account
   *
   * @event \Illuminate\Auth\Events\Registered
   */
  public function createAppUserAccount(array $params, bool $send_email_verification = TRUE): AppUser
  {
    $user = AppUser::make((new AppUserDTO(...$params))->toArray(with_password: TRUE));

    $user->username = Str::limit(Str::slug($user->full_name, '-'), rand(5, 10), uniqid());
    $user->save();

    if ($send_email_verification) {
      event(new Registered($user));
    }

    return $user;
  }

  /**
   * Generate an obfuscated code to hide the user's id in the generated url for email verification purposes
   */
  public function getVerificationCode(User $user): string
  {
    return 'rg-' . rand(11, 99) . $user->id . rand(55, 89);
  }

  public function authenticate(Request $request, AppUser|SuperAdmin|null $user = NULL): Cookie|bool
  {
    if (is_null($user)) { //NOTE: This must be a login request.
      if ( ! ($guard = $this->attemptGuardLogin($request))) {
        RateLimiter::hit($this->throttleKey($request));

        throw ValidationException::withMessages([
          'email' => __('auth.failed'),
        ]);
      }

      RateLimiter::clear($this->throttleKey($request));

      /** @var AppUser|SuperAdmin */
      $user = Auth::guard($guard)->user();
    } else {
      Auth::login($user, TRUE);
    }

    if ($request->isMobile()) {
      $token = $user->createToken($request->device_name, ['*'], now()->addMinutes(config('auth.lifetime')))->plainTextToken;

      return cookie(config('auth.cookie'), $token, config('auth.lifetime'));
    }

    $request->session()->regenerate();

    return TRUE;
  }

  public function logout(Request $request)
  {
    if ($request->isMobile()) {
      $request->user()->currentAccessToken()->delete();

      return cookie()->forget(config('auth.cookie'));
    }

    $this->authenticatedGuard()->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return TRUE;
  }

  public function user(): AppUserResource|SuperAdminResource|null
  {
    /** @var User */
    $user = $this->authenticatedGuard()->user();

    if ($user->isAppUser()) {
      return AppUserResource::make($user);
    }

    if ($user->isSuperAdmin()) {
      return SuperAdminResource::make($user);
    }

    return NULL;
  }

  /**
   * Ensure the request is not rate limited.
   *
   * @throws ValidationException
   */
  public function ensureIsNotRateLimited(Request $request): void
  {
    if ( ! RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
      return;
    }

    event(new Lockout($request));

    $seconds = RateLimiter::availableIn($this->throttleKey($request));

    throw ValidationException::withMessages([
      'email' => trans('auth.throttle', [
        'seconds' => $seconds,
        'minutes' => ceil($seconds / 60),
      ]),
    ]);
  }

  /**
   * Get the rate limiting throttle key for the request.
   */
  private function throttleKey(Request $request): string
  {
    return Str::transliterate(Str::lower($request->string('email')) . '|' . $request->ip());
  }

  private function attemptGuardLogin(Request $request): ?string
  {
    $auth_guard = NULL;

    collect(array_keys(config('auth.guards')))->diff(['sanctum'])->each(function ($guard) use ($request, &$auth_guard) {
      logger($guard);
      if (Auth::guard($guard)->attempt($request->only('email', 'password'), $request->filled('remember'))) {
        $auth_guard = $guard;

        return FALSE;
      }
    });

    return $auth_guard;
  }

  private function authenticatedGuard(): ?SessionGuard
  {
    $auth_guard = NULL;
    collect(array_keys(config('auth.guards')))->diff(['sanctum'])->each(function ($guard) use (&$auth_guard) {
      if (Auth::guard($guard)->check()) {
        $auth_guard = Auth::guard($guard);

        return FALSE;
      }
    });

    return $auth_guard;
  }
}
```


1. And your LoginController should be

```php

namespace Modules\UserAuth\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cookie;
use App\Providers\RouteServiceProvider;
use Modules\UserAuth\Services\AuthService;
use Modules\UserAuth\Http\Requests\LoginRequest;

class AuthenticatedSessionController extends Controller
{
  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request, AuthService $authService): RedirectResponse|JsonResponse
  {
    $authService->ensureIsNotRateLimited($request);

    /** @var Cookie|bool Either a JWT cookie plaintext string for mobile requests or boolean for SPA requests */
    $rsp = $authService->authenticate($request);

    if ($request->isMobile()) {
      return response()->json(['user' => $authService->user()], 201)->withCookie($rsp);
    }

    return $request->expectsJson() ? response()->json(['user' => $authService->user()], 200) : Inertia::location(RouteServiceProvider::home());
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request, AuthService $authService): RedirectResponse|JsonResponse
  {
    /** @var Cookie|bool Either a JWT cookie plaintext string for mobile requests or boolean for SPA requests */
    $rsp = $authService->logout($request);

    if ($request->isMobile()) {
      return response()->json([], 204)->withCookie($rsp);
    }

    return $request->expectsJson() ? response()->json(['message' => 'Logout Successful'], 200) : Inertia::location(redirect('/'));
  }
}
```


9. Your Routes should have your middlewares applied like this

```php
Route::middleware(['auth:sanctum', 'auth:admin'])->name(SuperAdmin::ROUTE_NAME_PREFIX)->prefix('v1')->group(function (): void {
  Route::get('/admins', SuperAdminDashboardController::class)->name('show');
});
```
