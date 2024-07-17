# code-style

This convention was created to make code easier to develop and understand. Adhere to these rules consciously, understanding why each rule exists. This means that these rules can be broken if you think it is true.

## Global Imports

### Configure aliases

1. Configure `vite.config.ts`
   in root directory

```ts
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
```

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

### Import throwgh `~/`

```tsx
// ❌ - here better to use global imports
import { something } from '../../../../../lib/something'

// ✅
import { something } from '../lib/something'
// ✅
import { something } from '../../lib/something'

// ✅
import { something } from '~/shared/lib/something'
```

## Typescript

Code style guide for typescript.

### Naming of types

The following convention is used in naming different types:

- In naming of type use `UpperCamelCase`;
- Depending on the type, a prefix is ​​placed before the type name. Here is prefix examples:
  - `T` - `type`: `TEntity`
  - `I` - `interface`: `IEntity`
  - `E` - `enum`: `EEntity`
  - `C` - `class`: `CEntity`

#### type

```ts
// ❌
type Entity = {}
// ❌
type EntityType = {}

// ✅
type TEntity = {}
```

#### interface

```ts
// ❌
interface Entity {}
// ❌
interface EntityInterface {}

// ✅
interface IEntity {}
```

#### class

```ts
// ❌
class Entity {}
// ❌
class EntityClass {}

// ✅
class CEntity {}
```

#### enum

```ts
// ❌
enum EntityStatus {}
// ❌
enum EntityStatuses {}
// ❌
enum EntityStatuseEnum {}
// ❌ - name of type enum must be singular
enum EEntityStatuses {}

// ✅
enum EEntityStatus {}
```

#### enum variants

Name of enum variants must be follow identical convention.

```ts
// ❌ - different name of values, not recomended
enum EEntityStatus {
  ON_DRAFT = 'ON_DRAFT',
  OnWaiting = 'OnWaiting',
  on_complete = 'on_complete',
}

// ✅
enum EEntityStatus {
  OnDraft = 'ON_DRAFT',
  OnWaiting = 'OnWaiting',
  OnComplete = 'on_complete',
}

// ✅
enum EEntityStatus {
  on_draft = 'on_draft',
  on_waiting = 'on_waiting',
  on_complete = 'on_complete',
}

// ✅
enum EEntityStatus {
  ON_DRAFT = 'ON_DRAFT',
  ON_WAITING = 'ON_WAITING',
  ON_COMPLETE = 'ON_COMPLETE',
}
```

## React

### Application architecture

Use [Feature Sliced Design 2.0.0](https://feature-sliced.design/docs/reference). Using this architecture helps to extend your application esily. It has already been tested in several projects, and I am convinced of it.

### Components

#### Define components

Define functional components via `const` or `function`

```tsx
// ❌
const MyComponent = () => <div>Hello</div>

// ✅
const MyComponent = () => {
  return <div>Hello</div>
}

// ✅
function MyComponent() {
  return <div>Hello</div>
}
```

#### Comonent props

Avoid naming DOM props of components with different logic. className should be strictly responsible for the name of the class.

```tsx
// ❌
<MyComponent className="primary" />

// ❌
<MyComponent style="primary" />

// ✅
<MyComponent variant="primary" />
```

#### Export components

Avoid default exports for components

> Reason: Just I dont like it. Sometimes these imports can limit us.

```tsx
// ❌
export default function MyComponent() {
  return <div>Hello<div>
}

// ✅
export function MyComponent() {
  return <div>Hello<div>
}
```

#### Import components

Create components in folder with his name, for example `MyComponent` with `index` file.

> [!NOTE]
> The reason of this rule, cause your component can use own hooks or sub comopnents which use only him, and this subcomponents will be stored in folder `MyComponent`.

```tsx
// ❌
import { MyComponent } from './MyComponent/MyComponent'
// ❌
import { MyComponent } from './MyComponent/index'

// ✅
import { MyComponent } from './MyComponent'
```

#### Naming of components

In all components, the type of the component itself is written at the beginning, and then what it belongs to.

This applies to almost everything:

- `Button` - button component
- `Page` - page component
- `Modal` - modal component
- `Container` - container component
- `Snackbar` - snackbar component
- `Block` - block components
- `Form` - form component
- `Widget` - widget component (FSD)
- `FormikForm` - form component using formik context
- `...` - etc.

Example for buttons:

```tsx
// ❌
function DoActionButton() {
  return <button>action<button>
}

// ✅
function ButtonDoAction() {
  return <button>action<button>
}
```

#### Naming of page components

Naming of page components must be identical with endpoint path.

Example for endpoint `/auth/reset-password/:token`:

> Page must be stored in `~/pages/auth/reset-password/:token/index.tsx`

It helps to find and understand what the page is.

```tsx
// ❌
function ResetPasswordPage() {
  return <div>page<div>
}

// ❌
function AuthResetPasswordPage() {
  return <div>page<div>
}

// ❌
function PageAuthResetpassword() {
  return <div>page<div>
}

// ❌
function PageAuthResetPassword() {
  return <div>page<div>
}

// ✅
function PageAuthResetPasswordToken() {
  return <div>page<div>
}
```

### Hooks

```ts
// ❌
const useHello = () => value

// ✅
const useHello = () => {
  // ...
}
// ✅
function useHello() {
  // ...
}
```

#### Action Hooks

Action hooks is: `Sending`, `Downloading`, `Deleting`, `Dublicate` and any actions.

##### Name of action hook

Name of action hooks must be identical with `useAction[Entity][ActionName]`

```ts
// ❌
function useSignIn() {}
// ❌
function useUserSignIn() {}
// ❌
function useActionSignInUser() {}

// ✅
function useActionUserSignIn() {}
```

##### Action hook returns

Action hook must containe only one aciton.
Name of returnning values must be:

| property  | type                                                       | description                                                                                            |                  |
| --------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------- |
| `run`     | `({}: any) => Promise<boolean \| void> \| boolean \| void` | It makes main action. Returns `true` if action successfully finished, otherwise `false`.               | required         |
| `cancel`  | `() => Promise<boolean \| void> \| boolean \| void`        | It is function that can cancel main action. REturns `true` if successfully canceled, otherwise `false` | optional         |
| `loading` | `boolean`                                                  | Main action running state.                                                                             | usually required |

```ts
// ❌
function useActionUserSignIn() {
  return { isLoading, send, cancel }
}

// ✅
function useActionUserSignIn() {
  return { loading, run, cancel }
}
```

##### Action hook arguments

```ts
// ❌ - must accept object, with `onError` funciton
function useActionUserSignIn(setError) {}

// 🟨 - also correct, but this is lite version
function useActionUserSignIn() {
  // return { ... }
}

// ✅
export interface IActionUserSignInProps {
  /**
   * onSuccess -
   */
  onSuccess?: (props) => Promise<void>
  /**
   * onError -
   */
  onError?: (props) => Promise<void>
}

function useActionUserSignIn(props: IActionProps) {
  // return { ... }
}
```

##### Using action hooks

Name of returning value of action hook must be started with `action`, or you can use destructured values.

```ts
// 🟨
const send = useActionUserSignIn()
// 🟨
const action = useActionUserSignIn()

// ✅
const actionSend = useActionUserSignIn()
// ✅
const actionDocumentSend = useActionUserSignIn()
// ✅
const { run, loading } = useActionUserSignIn()
```

### API functions

#### Naming of `API` funcitons

Name of `API` functions must identical with method and route of request. Template `[method][path]`.

Example of request functions for path `/users/:user_id/orders` with method `GET`

```ts
// ❌
function fetchUsersOrdersByUserId() {}
// ❌
function apiUsersIdOrders() {}
// ❌
function getUsersUserIdOrders() {}
// ❌
function getUserOrders() {}

// ✅ - GET
function getUsersIdOrders() {}
// ✅ - POST
function postUsersIdOrders() {}
// ✅ - PATCH
function patchUsersIdOrders() {}
// ✅ - PUT
function putUsersIdOrders() {}
// ✅ - DELETE
function deleteUsersIdOrders() {}
```

#### `API` function props

The `id` name in the parameters should always indicate its affiliation in request `path`.

> This is done so that when using the function there is an understanding of what `id` we are passing. Even if there is only one `id`, you should adhere to this rule.

```ts
/**
 * Examples: GET /users/:user_id
 */

// ❌
function getUsersId(userId: string) {
  // ...
}

// ❌
function getUsersId(props: { id: string }) {
  // ...
}

// ✅ -
function getUsersId(props: { userId: string }) {
  // ...
}

/**
 * Examples: GET /users/:user_id/orders/:order_id
 */
// ✅
function getUsersIdOrdersId(props: { userId: string; orderId: string }) {
  // ...
}
```
