import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History/History'
import { Home } from './pages/Home/Home'
import { Error } from './pages/Error'
import { DefaultLayout } from './layouts/DefaultLayout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  )
}
