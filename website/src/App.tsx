import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Examples from './pages/Examples'
import Playground from './pages/Playground'
import NotFound from './pages/NotFound'
import APIIndex from './pages/api/APIIndex'
import CasePage from './pages/api/CasePage'
import ManipulationPage from './pages/api/ManipulationPage'
import ValidationPage from './pages/api/ValidationPage'
import SanitizationPage from './pages/api/SanitizationPage'
import FormattingPage from './pages/api/FormattingPage'
import SimilarityPage from './pages/api/SimilarityPage'
import AnalysisPage from './pages/api/AnalysisPage'
import PluralizationPage from './pages/api/PluralizationPage'
import DiffPage from './pages/api/DiffPage'
import SearchPage from './pages/api/SearchPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<Docs />} />
        <Route path="docs/examples" element={<Examples />} />
        <Route path="docs/playground" element={<Playground />} />
        <Route path="docs/api" element={<APIIndex />} />
        <Route path="docs/api/case" element={<CasePage />} />
        <Route path="docs/api/manipulation" element={<ManipulationPage />} />
        <Route path="docs/api/validation" element={<ValidationPage />} />
        <Route path="docs/api/sanitization" element={<SanitizationPage />} />
        <Route path="docs/api/formatting" element={<FormattingPage />} />
        <Route path="docs/api/similarity" element={<SimilarityPage />} />
        <Route path="docs/api/analysis" element={<AnalysisPage />} />
        <Route path="docs/api/pluralization" element={<PluralizationPage />} />
        <Route path="docs/api/diff" element={<DiffPage />} />
        <Route path="docs/api/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
