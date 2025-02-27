---
title: I Updated My Portfolio Site!
pubDate: 2025-02-27
category: Coding
heroImage: https://blog-images.poppyland.dev/hannah-dot-dev-v2.png
subcategories:
  - Astro
  - Vercel
  - Bolt.new
  - Tailwind CSS
  - Hannah dot dev
---
Hello, friends! 🌸 This weekend, I updated my portfolio site! Check it out [here](https://hannahwilloughby.dev).

I started working on this page in 2022, thinking it would be fun to make a pure HTML/CSS website for the retro-feel. This was great for a first pass and getting back to the basics, but the site really needed to be updated to be more modern and show off my skills as both a software engineer and a designer. Since I started this project, I have learned about many new frameworks and packages, so I wanted to use them! Astro is a static site framework that I also use for this blog, and I thought it'd be a great fit for the portfolio site. Astro is opitimized for static sites and search engine optimization (SEO), which is exactly what I was looking for in a framework.

### Features

I designed the app to be mostly single-page, but really it has two pages: the home page and the project detail page. The home page has a blurb about me, my projects, and my skills. You can find more information about the background and implementation of each project on the project detail page.


## Background

### Notes on Bolt.new

[Bolt.new](https://bolt.new) is an AI tool that generates code for websites and mobile apps. It's a great tool for quickly generating a basic site as a foundation for a project. Sometimes it's tricky to get the exact look you want, but I've been using it as a starting point for many of my projects. You just need to pick the framework you want, then describe the functionality you want and iterate from there. Once you have your site/app, you can export it directly as a new repository on GitHub.

### Notes on Tailwind CSS

[Tailwind CSS](https://tailwindcss.com) is great for quickly styling a site. It's a utility-first framework, so you can quickly style without having to worry about the underlying structure. It is much easier to design a responsive site becuase of the utility classes, and it also bundles up the CSS into a smaller file than traditional CSS. All you need to do is add the Tailwind classes to your HTML elements, and it will generate the CSS for you on build. You can define your own classes, color scheme, variables, etc.

### Notes on Vercel

[Vercel](https://vercel.com) is a cloud platform for hosting websites with modern frameworks. It's a great way to host a static site like this one. You can host for free, and it links right up to your GitHub repository so you can deploy with a single push to main. You can even set up custom domains for free! They also offer one free database per account, but you can use any number of schemas and tables within that database.

## Orignal Implementation

![hannah-dot-dev-v1](https://blog-images.poppyland.dev/hannah-dot-dev-v1.png)

The original implentation of the site was a single-page static site built with pure HTML/CSS. It was styled to give a sort of retro-feel. It was deployed on GitHub Pages for free, and deployed automatically on every push to main.

## Refactor Implementation

### Getting Started

![bolt-new-prompt](https://blog-images.poppyland.dev/hannah-dot-dev-bolt-implementation.png)

To start, I prompted Bolt.new to generate a single-page static website using Astro and Tailwind CSS. I prompted it to make it styled like Windows 95, and it did an \~okay\~ job, but wasn't exactly what I was looking for. The layout of the site was fine enough, but the colors, fonts, and overall uniqueness of the site was lacking. I then exported it as a new repository on GitHub, and began styling it to be my own.

### Styling and Embellishments

![hannah-dot-dev-v2](https://blog-images.poppyland.dev/hannah-dot-dev-welcome-banner.png)

I wanted to make the site more modern but also have my unique style. I've been developing with Tailwind CSS for a relatively short amount of time, but it's really easy to pick up and use. I created classes for repeatedly used styles, and otherwise used the Tailwind utility classes to style the page. I picked a color palette that was both modern and comforting.



![hannah-dot-dev-v2](https://blog-images.poppyland.dev/hannah-dot-dev-embellishments.png)

To make the site feel more like "me", I added a few personal touches. All the pixel art I designed myself (they were all originally made for my cross-stitch projects). I didn't want the art to distract from the content, so I used them in separate "windows" on the home page. I also wanted to give a little more depth to the design, so I made the windows overlap each other on desktop mode.

![hannah-dot-dev-v2](https://blog-images.poppyland.dev/hannah-dot-dev-skills.png)

As for the list of my skills, I wanted to make sure it was easy to read and skim. To accomplish this, I sorted each skill into a category. I think it makes it much easier to find what skill you may be looking for. 

### Deployment

![hannah-dot-dev-v2](https://blog-images.poppyland.dev/hannah-dot-dev-vercel.png)

Before, I was using GitHub Pages to host the site, which was fine for a static HTML page. I switched it over to Vercel with this new version. Because the site is built with Astro, it needs to be built and compiled into HTML before it can be hosted. Vercel links to the GitHub repository and automatically does exactly that on every push to main. My DNS configuration is still set up in AWS Route 53, so I can use the custom domain I purchased from namecheap by adding a CNAME and an A record to prove that I own the domain, and Vercel does the rest.

## Conclusion

I'm really happy with the new version of my portfolio site! I think it's a great way to show off my skills and projects.

Interested in the source code? You can find it [here](https://github.com/hwilloug/hannah-dot-dev-v2).

If you found this article interesting or just like my new site, please let me know in the comments below and give this article a like!
