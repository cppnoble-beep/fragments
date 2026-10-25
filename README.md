# Fragments. 🌸

> life is a collection of little moments.

Fragments. is a small, soft website for slow days. It's a place to breathe, write down what's on your mind, and read something kind when your heart feels heavy. There's no sign-up, no account, and no tracking. Just you and a quiet corner of the internet.

---

## What's inside

- **Home**: a cozy hero scene, a random "word of the moment," and a breathing orb you can tap for a guided breathing exercise (in for 4, hold for 4, out for 6).
- **Journal**: write whatever you need to, pick a mood, and save it. You can delete a single entry or everything. If you don't know where to start, tap "give me a prompt."
- **Poetry**: 56 words of encouragement. Tap one and it moves to your home page.
- **Notes**: 54 Bible verses (KJV) for tired, anxious, or heavy days. Tap the heart to save your favorites.
- **Search**: the little magnifying glass looks through both the words and the verses.
- **Night mode**: the moon button in the corner. It follows your device's setting at first, then remembers your choice.

## How to run it

1. Unzip the folder.
2. Open `index.html` in your browser.

That's all. There's nothing to install and no server to start.

## What's in the folder

```
project/
├── index.html      the page and all its sections
├── css/style.css   colors, layout, animations, responsive rules
├── js/data.js      the words, verses, and journal prompts
├── js/app.js       navigation, journal, favorites, breathing, petals
└── README.md       you are here
```

## Make it yours

**Add or change words and verses.** Open `js/data.js`. Each word looks like `["Bloom", "Even flowers need rain."]` and each verse looks like `["Psalm 46:1", "God is our refuge and strength..."]`. Add a new line, save, and refresh.

**Change the colors.** The main palette lives at the top of `css/style.css`, under `:root`. Change `--rose`, `--peach`, or `--cream` and the whole site follows.

**Change the fonts.** The site uses Quicksand and Caveat from Google Fonts. Swap the link in `index.html` and the `font-family` names in the CSS.

**Replace the hero illustration.** The window, mug, notebook, and books are drawn with plain CSS inside the `.scene` block. If you have your own artwork, replace that block with an `<img>`.

**Social links.** The three icons in the footer point to `#` for now. Put your real links in the `<footer>` of `index.html`.

## About your privacy

Your journal entries, saved verses, and theme choice are stored in your browser's `localStorage`. They never leave your device, and no one else can read them. Because of that, clearing your browser data or switching to another browser or device will also clear them. If an entry really matters to you, copy it somewhere safe.

## Works on

Phones, tablets, laptops, and big monitors. It should work in any modern version of Chrome, Safari, Firefox, and Edge. If a device is set to reduce motion, the falling petals and animations switch off automatically.

## Please read this

Fragments. is a gentle space, not a replacement for real help. If you're struggling to cope or you feel unsafe, please talk to someone you trust or reach out to a professional.

- In the Philippines, you can call the **NCMH Crisis Hotline at 1553** or **911**. Please double-check these numbers before you publish the site.
- Anywhere else, call your local emergency number or crisis line.

You don't have to carry it all by yourself. 🤍

## Credits

- Bible verses are from the King James Version, which is in the public domain.
- Fonts: [Quicksand](https://fonts.google.com/specimen/Quicksand) and [Caveat](https://fonts.google.com/specimen/Caveat) via Google Fonts.
- No frameworks or libraries. It's all plain HTML, CSS, and JavaScript.

*live gently. dream freely. be you.* ♥
