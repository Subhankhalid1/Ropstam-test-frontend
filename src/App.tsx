import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './routes/privateRoutes'
import { PrivateRoutes, PublicRoutes } from './routes/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

const App: FC = () => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Routes>
        {PublicRoutes.map((item, key) => (
          <Route path={item.path} element={item.component} key={key} />
        ))}
        <Route element={<ProtectedRoutes />}>
          {PrivateRoutes.map((item, key) => (
            <Route path={item.path} element={item.component} key={key} />
          ))}
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
