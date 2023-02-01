# NPM pre-release packages check

## What is it?

This action detects empty translation tags.

## How to use it?

### Configure the GitHub action

## Inputs

### `full-path`

**Required** The path to the translation files root folder. Example `"./src/locales"`.

## Outputs

### `found-empty-tags`

Boolean indicator used to tell that a empty tags where found.

## Example usage

```yml

jobs:
    precheck:
        runs-on: ubuntu-latest
        steps:
            - uses: kevin-manatal/empty-translation-tags-detection-action@v1.1.1
              id: emptytags
              with:
                  full-path: './package.json'
            - run: echo "result ${{ steps.emptytags.outputs.found-empty-tags }}"
```

# Contact and bug reports

Feel free to open an issue on this GitHub project.

