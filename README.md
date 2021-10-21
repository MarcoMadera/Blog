# Marco Madera Blog

Blog Site: <https://marcomadera.com>

## **Running Locally**

```bash
git clone https://github.com/MarcoMadera/Blog.git
cd Blog
npm install
npm run dev
```

For the project to work properly a `.env.local` file similar to [`.env.example`](https://github.com/MarcoMadera/Blog/blob/master/.env.example) is required

## **Want to Contribute?**

Thank you for your interest in contributing to the blog site. Submit an issue in the Issues section for reporting/fixing bugs/typos and to request new features.

## **Creating a new post**

To create a new post, create a markdown file (.md) in the `/posts` directory. Make sure the metadata syntax at the start of your new blog follows the pattern given below:

```md
---
title: The title
description: A brief description of the content (25 - 160 characters)
date: 2020-07-20
cover: image at least 760px width
author: Your name
summary: Your summary e.g. Frontend Developer
profilePhoto: url image
twitter: Your twitter userName e.g. madera_marco
tags:
  - Tag
  - Another tag related
---

Blog content goes here following the markdown syntax.
```

## **Embed Elements**

To include Tweets in your post use the `tweet` tag:

```html
<!-- https://twitter.com/Twitter/status/1323314485705297926 id=1323314485705297926 -->
<tweet id="Tweet Id" hideConversation=false caption="string"></tweet>
```

**`Properties`**

- `id` (string)
- `hideConversation` ?boolean, default: false\
  When false it shows the full conversation as a thread\
  When true a single tweet is displayed.
- `caption` (string?)

The optional property `hideConversation` is set to `false` by default

To embed videos from youtube use the `youtube` tag.

```html
<!-- https://www.youtube.com/watch?v=xcJtL7QggTI id=xcJtL7QggTI -->
<youtube id="video Id" title="Video Title" caption="string"></youtube>
```

**`Properties`**

- `id` (string)
- `title` (string?)
- `caption` (string?)

## **Custom Tags**

In addition to everything that is already included with Markdown

### **Images**

In addition to the properties that already exist, the properties of `caption`, `dark` and `light` are added.

```html
<img src="" alt="" title="" caption="" light="" dark="">
```

**`Properties`**

- `caption` (string?)
- `light` (string?)\
  Is the img src that will be use when the theme page is light
- `dark` (string?)\
  Is the img src that will be use when the theme page is dark

⚡ This tag does not replace the Markdown form.

### **Gifs**

Sometimes videos are better than actual gif to get the same behaviour as a gif use the tag `videogif`

```html
<videogif src="" light="" dark="" title=""></videogif>
```

**`Properties`**

- `src` (string)
- `title` (string?)
- `light` (string?)\
  Is the video src that will be use when the theme page is light
- `dark` (string?)\
  Is the video src will be use when the theme page is dark

⚡ This tag does not replace the Markdown form.

### **Note**

```html
<note type="info">This is a note to provide more detail to the main content</note>
```

**`Properties`**

- `type` "success" | "info" | "danger" | "tip" | "important"

### **Text Font/Colors**

You can change the font of your texts with the tag usefont:

Go to the page <https://fonts.google.com> and choose a font

```html
<usefont src="https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap"></usefont>

<p style="font-family:Odibee Sans">Font families</p>
```

**`Properties`**

- `src` (string)
- `name` (string?)\
  Use the property `name` when you have the `.woff` font to set the font name

⚡ This only accept fonts from <https://fonts.gstatic.com> and <https://fonts.googleapis.com>

Make your text colorful with the predefined colors suitable for light mode and dark mode. The tag `colors` will make available the colors included as a class in the page.

```html
<colors red blue green yellow lightblue purple darkyellow></colors>

Without color

With <p class="green">color</p>
```

Available colors:

- red
- purple
- lightpurple
- blue
- lightblue
- gray
- darkgray
- darkyellow
- darkpink
- green
- orange
- black
- yellow
- textcolor

For more examples you can explore the [`posts`](https://github.com/MarcoMadera/Blog/blob/master/posts) folder.
