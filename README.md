# Empty or missing translation tags detection

## What is it?

This action detects empty or missing translation tags.

## How to use it?

### Configure the GitHub action

## Inputs

### `full-path`

**Required** The path to the translation files root folder. Example `"./src/locales"`.

make sure this folder has a sub-folder for each language.

    ./src/locales
    ├── EN
    |   ├── main.json
    |   └── admin.json
    ├── TH
    |   ├── main.json
    |   └── admin.json
    ├── JP
    |   ├── main.json
    |   └── admin.json
    └── ...

## Outputs

### `found-missing-translations`

Boolean indicator used to tell that empty or missing translation tags where found.

## Example usage

```yml

jobs:
    precheck:
        runs-on: ubuntu-latest
        steps:
            - uses: kevin-manatal/empty-translation-tags-detection-action@v1.2.1
              id: missingtags
              with:
                  full-path: './src/locales'
            - run: echo "result ${{ steps.missingtags.outputs.found-missing-translations }}"
```

# Contact and bug reports

Feel free to open an issue on this GitHub project.

