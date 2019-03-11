# bicyclewheel.info

Interactive app and blog about bicycle wheels.

Hosted at [https://github.com/bicyclewheel/bicyclewheel.github.io]

## Building and publishing

The website is built using the [Pelican](getpelican.com) static website generator. Content is in the `/content` directory. HTML files are generated in the `/output` directory.

To build the website, navigate to the project root and run

```
conda activate pelican
pelican content
```

To publish to the web, use ghp-import to push the contents of the `/output` directory to the `pub` remote.

```
conda activate pelican
pelican -s publishconf.py
conda activate ghp-import
ghp-import -m "Publish" -b gh-pages output
git push -f pub gh-pages:master
```
