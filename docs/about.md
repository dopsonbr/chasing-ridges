# About

## How to use

- Each app should have a directory containing information about the requirements and mockups
- code syles are located in /code-styles; a code style should be defined for each framework and app type

### Code Style
- a code style should be defined for each framework and app type
- still working on a mechanism to keep code styles in sync with cursor rules. it would be ideal to not have a cursor specific implementation


### APIs
- should be defined in the apps directory and have an associated e2e project
- each api should have a folder named after the api and a file named $name-api.md
- an openapi spec should be included
- sequence diagrams if applicable
- example structure for a restful products-api below
- focus on blackbox validation via e2e project over unit tests; units should still exist but e2e should validate requirements

#### example structure
```
    /docs
        /apis
            /product-api
                product-api.md
                openapi-spec.yml
                deployment.md
                use-cases.md
```

### libs
- follow struture layed out in @enterpries-angular-mono-repo-patterns.pdf

#### models
- Only types exists here. to buisness logic
