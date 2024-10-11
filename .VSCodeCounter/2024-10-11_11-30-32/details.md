# Details

Date : 2024-10-11 11:30:32

Directory /Users/neilc/Projects/RestoreCourse/2024/practice2/Restore

Total : 81 files,  6999 codes, 28 comments, 410 blanks, all 7437 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [API/API.csproj](/API/API.csproj) | XML | 14 | 0 | 4 | 18 |
| [API/Controllers/BaseApiController.cs](/API/Controllers/BaseApiController.cs) | C# | 10 | 0 | 2 | 12 |
| [API/Controllers/BasketController.cs](/API/Controllers/BasketController.cs) | C# | 60 | 0 | 21 | 81 |
| [API/Controllers/BuggyController.cs](/API/Controllers/BuggyController.cs) | C# | 35 | 0 | 6 | 41 |
| [API/Controllers/ProductsController.cs](/API/Controllers/ProductsController.cs) | C# | 40 | 0 | 10 | 50 |
| [API/Controllers/WeatherForecastController.cs](/API/Controllers/WeatherForecastController.cs) | C# | 27 | 0 | 6 | 33 |
| [API/DTOs/BasketDto.cs](/API/DTOs/BasketDto.cs) | C# | 9 | 0 | 3 | 12 |
| [API/DTOs/BasketItemDto.cs](/API/DTOs/BasketItemDto.cs) | C# | 11 | 0 | 1 | 12 |
| [API/Data/DbInitializer.cs](/API/Data/DbInitializer.cs) | C# | 219 | 0 | 10 | 229 |
| [API/Data/Migrations/20241009045439_InitialCreate.Designer.cs](/API/Data/Migrations/20241009045439_InitialCreate.Designer.cs) | C# | 47 | 2 | 13 | 62 |
| [API/Data/Migrations/20241009045439_InitialCreate.cs](/API/Data/Migrations/20241009045439_InitialCreate.cs) | C# | 34 | 3 | 4 | 41 |
| [API/Data/Migrations/20241010050425_BasketEntityAdded.Designer.cs](/API/Data/Migrations/20241010050425_BasketEntityAdded.Designer.cs) | C# | 93 | 2 | 30 | 125 |
| [API/Data/Migrations/20241010050425_BasketEntityAdded.cs](/API/Data/Migrations/20241010050425_BasketEntityAdded.cs) | C# | 64 | 3 | 8 | 75 |
| [API/Data/Migrations/20241010052235_BasketCorrections.Designer.cs](/API/Data/Migrations/20241010052235_BasketCorrections.Designer.cs) | C# | 97 | 2 | 32 | 131 |
| [API/Data/Migrations/20241010052235_BasketCorrections.cs](/API/Data/Migrations/20241010052235_BasketCorrections.cs) | C# | 38 | 3 | 8 | 49 |
| [API/Data/Migrations/StoreContextModelSnapshot.cs](/API/Data/Migrations/StoreContextModelSnapshot.cs) | C# | 95 | 1 | 32 | 128 |
| [API/Data/StoreContext.cs](/API/Data/StoreContext.cs) | C# | 9 | 0 | 2 | 11 |
| [API/Entities/Basket.cs](/API/Entities/Basket.cs) | C# | 40 | 0 | 10 | 50 |
| [API/Entities/BasketItem.cs](/API/Entities/BasketItem.cs) | C# | 10 | 1 | 3 | 14 |
| [API/Entities/Product.cs](/API/Entities/Product.cs) | C# | 13 | 0 | 3 | 16 |
| [API/Extensions/BasketExtensions.cs](/API/Extensions/BasketExtensions.cs) | C# | 26 | 0 | 3 | 29 |
| [API/Extensions/HttpExtensions.cs](/API/Extensions/HttpExtensions.cs) | C# | 14 | 0 | 3 | 17 |
| [API/Extensions/ProductExtensions.cs](/API/Extensions/ProductExtensions.cs) | C# | 38 | 0 | 12 | 50 |
| [API/Middleware/ExceptionMiddleware.cs](/API/Middleware/ExceptionMiddleware.cs) | C# | 34 | 0 | 8 | 42 |
| [API/Program.cs](/API/Program.cs) | C# | 20 | 2 | 8 | 30 |
| [API/Properties/launchSettings.json](/API/Properties/launchSettings.json) | JSON | 14 | 0 | 1 | 15 |
| [API/RequestHelpers/PagedList.cs](/API/RequestHelpers/PagedList.cs) | C# | 23 | 0 | 3 | 26 |
| [API/RequestHelpers/PaginationMetadata.cs](/API/RequestHelpers/PaginationMetadata.cs) | C# | 9 | 0 | 3 | 12 |
| [API/RequestHelpers/PaginationParams.cs](/API/RequestHelpers/PaginationParams.cs) | C# | 13 | 0 | 3 | 16 |
| [API/RequestHelpers/ProductParams.cs](/API/RequestHelpers/ProductParams.cs) | C# | 9 | 0 | 3 | 12 |
| [API/WeatherForecast.cs](/API/WeatherForecast.cs) | C# | 8 | 0 | 5 | 13 |
| [API/appsettings.Development.json](/API/appsettings.Development.json) | JSON | 11 | 0 | 1 | 12 |
| [API/appsettings.json](/API/appsettings.json) | JSON | 9 | 0 | 1 | 10 |
| [API/store.db](/API/store.db) | Database | 58 | 0 | 1 | 59 |
| [client/README.md](/client/README.md) | Markdown | 40 | 0 | 11 | 51 |
| [client/eslint.config.js](/client/eslint.config.js) | JavaScript | 27 | 0 | 2 | 29 |
| [client/index.html](/client/index.html) | HTML | 13 | 0 | 1 | 14 |
| [client/package-lock.json](/client/package-lock.json) | JSON | 4,392 | 0 | 1 | 4,393 |
| [client/package.json](/client/package.json) | JSON | 40 | 0 | 1 | 41 |
| [client/public/vite.svg](/client/public/vite.svg) | XML | 1 | 0 | 0 | 1 |
| [client/src/app/api/baseApi.ts](/client/src/app/api/baseApi.ts) | TypeScript | 46 | 0 | 7 | 53 |
| [client/src/app/errors/NotFound.tsx](/client/src/app/errors/NotFound.tsx) | TypeScript JSX | 25 | 0 | 1 | 26 |
| [client/src/app/errors/ServerError.tsx](/client/src/app/errors/ServerError.tsx) | TypeScript JSX | 18 | 0 | 2 | 20 |
| [client/src/app/layout/App.tsx](/client/src/app/layout/App.tsx) | TypeScript JSX | 43 | 0 | 7 | 50 |
| [client/src/app/layout/NavBar.tsx](/client/src/app/layout/NavBar.tsx) | TypeScript JSX | 81 | 0 | 8 | 89 |
| [client/src/app/layout/styles.css](/client/src/app/layout/styles.css) | CSS | 0 | 0 | 1 | 1 |
| [client/src/app/layout/uiSlice.ts](/client/src/app/layout/uiSlice.ts) | TypeScript | 25 | 0 | 3 | 28 |
| [client/src/app/router/Routes.tsx](/client/src/app/router/Routes.tsx) | TypeScript JSX | 29 | 0 | 1 | 30 |
| [client/src/app/shared/components/AppPagination.tsx](/client/src/app/shared/components/AppPagination.tsx) | TypeScript JSX | 25 | 1 | 4 | 30 |
| [client/src/app/shared/components/CheckboxButtons.tsx](/client/src/app/shared/components/CheckboxButtons.tsx) | TypeScript JSX | 34 | 0 | 6 | 40 |
| [client/src/app/shared/components/OrderSummary.tsx](/client/src/app/shared/components/OrderSummary.tsx) | TypeScript JSX | 87 | 2 | 9 | 98 |
| [client/src/app/shared/components/RadioButtonGroup.tsx](/client/src/app/shared/components/RadioButtonGroup.tsx) | TypeScript JSX | 27 | 0 | 2 | 29 |
| [client/src/app/store/store.ts](/client/src/app/store/store.ts) | TypeScript | 28 | 0 | 3 | 31 |
| [client/src/app/types/basket.ts](/client/src/app/types/basket.ts) | TypeScript | 25 | 0 | 4 | 29 |
| [client/src/app/types/pagination.ts](/client/src/app/types/pagination.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [client/src/app/types/product.ts](/client/src/app/types/product.ts) | TypeScript | 10 | 0 | 0 | 10 |
| [client/src/app/types/productParams.ts](/client/src/app/types/productParams.ts) | TypeScript | 8 | 0 | 0 | 8 |
| [client/src/assets/react.svg](/client/src/assets/react.svg) | XML | 1 | 0 | 0 | 1 |
| [client/src/features/about/AboutPage.tsx](/client/src/features/about/AboutPage.tsx) | TypeScript JSX | 41 | 0 | 4 | 45 |
| [client/src/features/about/errorApi.ts](/client/src/features/about/errorApi.ts) | TypeScript | 30 | 0 | 2 | 32 |
| [client/src/features/basket/BasketItem.tsx](/client/src/features/basket/BasketItem.tsx) | TypeScript JSX | 77 | 0 | 9 | 86 |
| [client/src/features/basket/BasketPage.tsx](/client/src/features/basket/BasketPage.tsx) | TypeScript JSX | 21 | 0 | 4 | 25 |
| [client/src/features/basket/basketApi.ts](/client/src/features/basket/basketApi.ts) | TypeScript | 69 | 0 | 5 | 74 |
| [client/src/features/catalog/CatalogPage.tsx](/client/src/features/catalog/CatalogPage.tsx) | TypeScript JSX | 38 | 0 | 4 | 42 |
| [client/src/features/catalog/Filters.tsx](/client/src/features/catalog/Filters.tsx) | TypeScript JSX | 47 | 0 | 4 | 51 |
| [client/src/features/catalog/ProductCard.tsx](/client/src/features/catalog/ProductCard.tsx) | TypeScript JSX | 46 | 0 | 3 | 49 |
| [client/src/features/catalog/ProductDetails.tsx](/client/src/features/catalog/ProductDetails.tsx) | TypeScript JSX | 88 | 0 | 8 | 96 |
| [client/src/features/catalog/Search.tsx](/client/src/features/catalog/Search.tsx) | TypeScript JSX | 28 | 0 | 4 | 32 |
| [client/src/features/catalog/catalogApi.ts](/client/src/features/catalog/catalogApi.ts) | TypeScript | 32 | 0 | 2 | 34 |
| [client/src/features/catalog/catalogSlice.ts](/client/src/features/catalog/catalogSlice.ts) | TypeScript | 49 | 0 | 4 | 53 |
| [client/src/features/checkout/CheckoutPage.tsx](/client/src/features/checkout/CheckoutPage.tsx) | TypeScript JSX | 8 | 0 | 1 | 9 |
| [client/src/features/contact/ContactPage.tsx](/client/src/features/contact/ContactPage.tsx) | TypeScript JSX | 20 | 0 | 1 | 21 |
| [client/src/features/contact/counterSlice.ts](/client/src/features/contact/counterSlice.ts) | TypeScript | 22 | 0 | 4 | 26 |
| [client/src/features/home/HomePage.tsx](/client/src/features/home/HomePage.tsx) | TypeScript JSX | 5 | 0 | 0 | 5 |
| [client/src/lib/util.ts](/client/src/lib/util.ts) | TypeScript | 21 | 0 | 2 | 23 |
| [client/src/main.tsx](/client/src/main.tsx) | TypeScript JSX | 21 | 0 | 2 | 23 |
| [client/src/vite-env.d.ts](/client/src/vite-env.d.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [client/tsconfig.app.json](/client/tsconfig.app.json) | JSON | 20 | 2 | 3 | 25 |
| [client/tsconfig.json](/client/tsconfig.json) | JSON with Comments | 7 | 0 | 1 | 8 |
| [client/tsconfig.node.json](/client/tsconfig.node.json) | JSON | 18 | 2 | 3 | 23 |
| [client/vite.config.ts](/client/vite.config.ts) | TypeScript | 9 | 1 | 2 | 12 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)