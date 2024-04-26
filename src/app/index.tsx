import reactLogo from '~/shared/assets/images/logotypes/react.svg'
import '~/shared/assets/styles/App.css'
import viteLogo from '/vite.svg'
import { config } from '~/shared/configs'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Vite + React + TS +{' '}
        <a
          href="https://feature-sliced.design/ru/docs/get-started/overview"
          target="_blank"
        >
          FSD
        </a>
      </h1>
      <div className="card">
        <p>
          Edit <code>src/app/index.tsx</code> and save to test HMR
        </p>
        <p>
          Config: <code>{JSON.stringify(config)}</code>
        </p>
      </div>
    </>
  )
}

export default App
