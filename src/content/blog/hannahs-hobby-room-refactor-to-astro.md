---
title: "Hannah's Hobby Room Refactor to Astro"
subtitle: "Refactoring from pure React to Astro using bolt.new"
pubDate: 2024-11-11
heroImage: https://blog-images.poppyland.dev/astro_1.jpeg
category: "Coding"
subcategories:
  - React
  - Astro
  - bolt.new
---
It takes a while to write articles using React, so when I learned about Astro, I decided to try it out. I created a new project using bolt.new and was able to get it running in no time.

## What is bolt.new?

![bolt.new screenshot](https://blog-images.poppyland.dev/boltnew_1.jpeg)

bolt.new is an AI tool that allows you to create an app using prompts. You can choose from a variety of frameworks and then customize your app to your liking. It's a great way to get started with a new app project, and it's a lot of fun to use. I was able to get the scaffolding for this blog going in no time, and then I ported it out to a GitHub repository to continue development.

## What is Astro?
<div class="centered">

![Astro logo](https://blog-images.poppyland.dev/astro_logo.jpeg)

</div>

Astro is a static site builder that allows you to write your articles in Markdown and then use React to style them. It's a lot like Next.js, but it's much simpler and easier to use. Astro also has a lot of built-in features that make it easier to build a blog or website. There are "content collections" that allow you to easily manage your articles and metadata without a database.

Articles are written in Markdown and then compiled into HTML at build time. Writing in Markdown is a lot easier and faster than using React (like I was doing previously), and this makes the article-writing process a lot more enjoyable.

### Downsides to Astro
The main downside to Astro is that it is still somewhat new, so there are not a lot of tutorials and resources available. I was able to find a few, but I did have to do a bit of trial and error to get things running smoothly. In addition, it isn't really made for dynamic content. For example, I had a lot of trouble getting the likes and comments to be dynamic, as well as getting the authentication to work. Clerk (the new auth provider for the site) documentation for Astro was extremely unhelpful and outdated. However, Astro wasn't really made for dynamic content, so I can't really fault it for that.

### Implementation Details

#### Tech Stack
- Astro (Framework)
- React (UI Library)
- Clerk (Authentication)
- Vercel (Deployment)
- AWS S3 (Static Assets)
- AWS Lambda & API Gateway (API)

#### Packages
- "@astrojs/mdx": "^3.1.7"
- "@astrojs/node": "^8.2.3"
- "@astrojs/react": "^3.6.2"
- "@astrojs/rss": "^4.0.7"
- "@astrojs/sitemap": "^3.2.0"
- "@astrojs/vercel": "^7.8.2"
- "@clerk/astro": "^1.4.8"
- "@clerk/backend": "^1.16.0"
- "@clerk/clerk-js": "^5.32.0"
- "astro": "^4.15.11"
- "chart.js": "^4.4.6"
- "date-fns": "^3.3.1"
- "marked": "^12.0.1"
- "slugify": "^1.6.6"

I should have used Tailwind for styling, but I didn't know it was possible to do it with Astro at the time of development.

#### Difficulties I Had

##### Likes and Comments

I had a similar issue with getting the likes and comments to be dynamic. Because this is using Astro, I couldn't just use a React query hook to fetch the data. Instead, I had to use the `fetch` function to get the data.

With the fetch function, the whole page waits on the fetch promise to resolve before rendering. This means that the user spends more time waiting for the page to load, and it makes the page feel slower. I figured out how to do this using "server islands", which allowed me to fetch the data without blocking the rest of the page from rendering.

###### Server Islands
Server islands are an experimental feature of Astro that allow you to fetch data on the server side. This means that the data is fetched before the page is rendered, so that it doesn't have to wait for the fetch promise to resolve. This makes the page feel faster and more responsive, and this is how I solved the likes and comments issue.

You need to set your `astro.config.mjs` file to use server islands by setting `experimental.serverIslands` to `true`, and ensure your output is set to `server`.
```js
export default defineConfig({
  ...,
  output: 'server',
  experimental: {
    serverIslands: true
  }
});
```

With this set, you can use the `fetch` function to fetch data on the server side and defer the rendering of the data until it's ready using `server:defer`.

By setting `server:defer`, I was able to get the like and comment data to load while the rest of the page is rendered, without making the page feel slow.

See the [server islands post](https://astro.build/blog/future-of-astro-server-islands/) on the Astro blog for the official details on server islands.


##### Authentication

I had a lot of trouble getting the authentication to work with Clerk. The documentation is outdated and unhelpful. I had to use Cursor's AI to help me figure out the little details that were missing from the Clerk documentation, and I still had to do a bit of trial and error to get it working.

###### Middleware & Configuring Clerk

The main part of the authentication is in the `middleware.ts` file. Here's the code for protecting routes using middleware:

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher([
  '/manage-articles(.*)',
  '/dashboard(.*)'
]);

export const onRequest = clerkMiddleware((auth, context, next) => {

  const { userId, sessionClaims, redirectToSignIn } = auth();

  // Check for admin role
  const isAdmin = sessionClaims?.roles?.includes('admin') || false;

  // Check if route needs protection  
  if (isProtectedRoute(context.request)) {
    // Not signed in - redirect to sign in
    if (!userId) {
      const currentUrl = new URL(context.request.url);
      const returnUrl = currentUrl.pathname + currentUrl.search;
      return redirectToSignIn({ returnBackUrl: returnUrl });
    }

    if (!isAdmin) {
      // User is signed in but not an admin - return 403 error
      return new Response('Unauthorized - Admin access required', {
        status: 403,
        headers: {
          'Location': '/'
        }
      });
    }
  }
  context.locals.userId = userId || '';
  context.locals.isAdmin = isAdmin;
  context.locals.username = sessionClaims?.username as string || '';
  return next()
});
```

The key part here is the `clerkMiddleware` function. This function is used to protect routes that are protected by Clerk. It checks if the user is signed in, and if they are not, it redirects them to the sign in page. If they are signed in, it checks if they have the admin role. If they do not, it returns a 403 error.

I had to add new variables to the local variables in Astro so I could access them in the components. I did this by modifying `env.d.ts` to include the new variables. See below:

```ts
declare namespace App {
  interface Locals {
    userId: string;
    isAdmin: boolean;
    username: string;
  }
}
``` 

After adding the new variables, I was able to assign them values in the middleware function.

As for wiring up Clerk to the app, I followed the Clerk documentation for implementing a ClerkProvider. This would have been simple, but I had a lot of trouble getting it to work, so I refactored the layouts to use the Clerk CDN instead.

```astro
<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <div id="clerk-root"></div>
    <Header server:defer />
    <main>
      <slot />
    </main>
    <Footer server:defer />

    <script is:inline src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"></script>
  </body>
</html>
```

The `clerk-root` div is where Clerk will mount itself by means of the script tag.

Then, I had to add `server:defer` to the Header (where the login button and user menu are) and the Footer (where the admin links are) components so that Clerk would have time to mount itself before rendering the page. (See earlier in the article for more details on `server:defer`)

###### Using Clerk in Components

At this point, I was able to use `@clerk/astro`'s `<SignedIn>` and `<SignedOut>` components to check if the user is signed in or not. There are also components for the user button and sign in button if you need them.

```astro
---
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/astro/components';
---
<div>
  <SignedIn>
    <UserButton />
  </SignedIn>
  <SignedOut>
    <SignInButton />
  </SignedOut>
</div>
```

## Conclusion

I'm really happy with how the refactor went and how the site turned out. I think it looks a lot cleaner and more modern, and I'm sure it will be a lot easier to maintain. I learned a lot about Astro and Clerk, and I'm looking forward to getting even more into the nitty gritty.

Astro is a great framework for static sites, and I would recommend it to anyone looking to build a simple blog or website. Once you start using a database, though, you're probably better off using something like Next.js, but it is possible in Astro with the right setup.

Please give this article a 💕, and comment below if you have any questions or feedback. (Note that you might need to create a new account since I switched authentication providers - Nov 11, 2024)
