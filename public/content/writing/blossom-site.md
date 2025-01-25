---
title: Creating a site for a day of service
description: By Sarthak Mohanty
---
![First page load of the Blossom Day of Service website.](/content/writing/blossom-site-1.png)

This website was given to me to redesign after a couple of design attempts by younger members of the community. I wanted to keep a lot of their design choices so here's a list of things I did not change:

* Images and Logos

* Layouts

* Text

* Colors

Given that I was now re-styling rather than redesigning per se, I'm going to talk about some design choices I made during this process.

![A screenshot of a text block, a coupled heading and paragraph.](/content/writing/blossom-site-2.png)

### Headings and paragraphs

Previously, there wasn't really a direction. There was a font, but it wasn't imported, and hence defaulted to the system serif font. It looked like an HTML page with no CSS, but not in a brutalist way that looks pleasing for some reason.

I wanted to emphasize the headings, and making them bold didn't do the trick. Recently, I've been playing around with borders to containerize and emphasize different parts of a webpage. I love this pill-shape border on small headings and buttons. I kept the same color used in the previous design.

The previous design had lowercase copy, probably to make the copy more casual. I removed the old font, or rather lack of, and replaced it with the browser sans font. I don't really like big text blocks as they're harsh to my eye and barely readable from any distance. To create some sort of separation between words, i added span elements throughout the paragraphs with wavy underlines and different font weights.

![Screenshot of the Frequently Asked Questions (FAQ) section.](/content/writing/blossom-site-3.png)

### "Containers for questions"

The previous site designed used DaisyUI to create an accordion for the FAQ. I took the not-so-bold design decision to remove that because there were only 3 questions and replace it with plain text. This resulted in a weird text block that did not visually give me any rest.

I changed the headings to be semibold and italic and wrapped the question in a dotted border. This provides a container for the question, but doesn't make it too secluded from the others. I think this was a good option for these because of the small number and the surplus whitespace on the page.

![Screenshot of the footer of the webpage.](/content/writing/blossom-site-4.png)

### Footer

After I was satisfied with the site, I sent it back to the organizers of the event. When they shared it, I realized there was no link to the open-source repository. For the footer, I chose a darker hue of the pink used on the background and put a similarly styled span element to the anchor tag in the footer.

See the site [here](https://blossom.hackclub.com). See the code [here](https://github.com/hackclub/blossom).