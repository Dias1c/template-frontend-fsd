### Configure aliases

1. Configure `vite.config.ts`
   in root directory

````ts
// ? file: vite.config.ts

// ...

/**
 * Required import for configure aliases
 *
 * ```
 * npm i --save-dev @types/node
 * ```
 */
import path from 'path'

export default defineConfig({
  // ...
  resolve: {
    // ...

    /**
     * Configure aliases
     */
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
})
````

2. Configure `tsconfig.app.json`
   in root directory

```json
// ? file: tsconfig.json
{
  "compilerOptions": {
    // ...

    // Configure aliases
    "baseUrl": "./src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

3. Try to import something with prerifx `~/example` in `src/main.tsx`

```tsx
import { config } from '~/shared/configs'
```

4. Try to build

```sh
npm run build
```

> If build shows error with imports, try configure again from `1`-st step.
