Hexo-Waffles-Wiki
===

Thsi was based initially on the Wixo theme, and has been modified

Turn your Hexo into a Wiki, powered by Waffles!


## Features ##

* **Simple** - keep it simple and stupid;
* **Notebook** - notebook-aware post arrangement and pagination. A category is a notebook;
* **Scrollspy** - automatically updating ToC targets based on scroll position;
* **Tag plugins** - luxuriant Bootstrap tag plugins, provided by [hexo-tag-bootstrap](https://github.com/wzpan/hexo-tag-bootstrap), including:
  - textcolor - a paragraph of text with specified color;
  - button - a button with target links, text and specified color;
  - label - a label with text and specified color;
  - badge - a badge with text;
  - alert - alert messages with text and specified color;



## Enable ##

Modify `theme` setting in your `_config.yml` to `waffle-wiki`.

## Update ##

``` sh
$ cd themes/wixo
$ git pull
```

## Configuration ##

```
fancybox: true
favicon: favicon.png
google_analytics:
```

* **fancybox** - enable [Fancybox](http://fancyapps.com/fancybox/)
* **google_analytics** - Google Analytics ID

## Front-Matter ##

* **toc** - renders a table of contents

For example:

```
title: Tag Plugins
date: 2014-03-16 10:17:16
categories: Docs
toc: true
---
```

## License ##

This theme is provided under [MIT License](http://opensource.org/licenses/MIT).

## Credits ##
* Initially based on [Wixo](https://github.com/wzpan/hexo-theme-wixo)
* The beautiful icons are from [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).
