# Mohammad's Resume Builder

My resume builder using:

- [JSON Resume](https://jsonresume.org/) standard (in YAML format)
- [Handlebars](https://handlebarsjs.com/) for generating HTML
- [Puppeteer](https://github.com/puppeteer/puppeteer) for generating PDF
- [Deno](https://deno.land) for runtime and dev server
- [Unocss](https://github.com/unocss/unocss/) for styling

## How to use it?

First clone or fork this repository. Then copy `resume.example.yml` to
`resume.yml` and edit it. Update the `template` as you need.

You can also define environment variables in `.env` file, and they will be
available in the `resume.yml` file.

### Commands

```bash
# run dev server
deno task dev

# build resume
deno task build
```

## Acknowledgments

Inspired By [Anthony Fu](https://github.com/antfu/resume) and
[Boilerplate theme for JSON Resume](https://github.com/jsonresume/jsonresume-theme-boilerplate)

## License

The source code is licensed by [MIT License](/LICENSE).
