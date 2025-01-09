import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Agents from '@/pages/Agents'
import { MainLayout } from '@/components/MainLayout'

const ChatPage = React.lazy(() => import('@/pages/ChatPage'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Agents />} />
          <Route path="/chat" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChatPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
