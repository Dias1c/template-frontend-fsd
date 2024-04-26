/**
 * ? Your configs stored here
 */

interface IConfig {
  VITE_BACKEND_API_URL: string
}

export const config: IConfig = {
  VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
}

console.debug(
  `%cv${import.meta.env.MODE}`,
  'background: #000; color: #fff; padding: 2px; border-radius: 4px;'
)
