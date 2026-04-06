import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/signup" element={<h1>Signup Page</h1>} />
      <Route path="/courses" element={<h1>Courses Page</h1>} />
    </Routes>
  )
}

export default App