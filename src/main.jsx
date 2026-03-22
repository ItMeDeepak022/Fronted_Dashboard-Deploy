import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import AddResume from './resumes/AddResume'
import ViewResume from './resumes/ViewResume'
import Addskills from './skills/Addskills'
import Viewskills from './skills/Viewskills'
import AddProfile from './profileImg/AddProfile'
import ViewProfile from './profileImg/ViewProfile'
import AddIntern from './internship/AddIntern'
import ViewIntern from './internship/ViewIntern'
import AddProject from './projects/AddProject'
import ViewProject from './projects/ViewProject'
import AddCertificates from './certificates/AddCertificates'
import ViewCertificates from './certificates/ViewCertificates'
import EditCertificates from './certificates/EditCertificates'
import Login from './common/Login'


createRoot(document.getElementById('root')).render(
   <>

      <BrowserRouter>
         <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />
            

            {/* Admin Layout */}
            <Route element={<Home />}>


               <Route path="dashboard" element={<Dashboard />} />
               {/* Profile */}
               <Route path="profile/add" element={<AddProfile />} />
               <Route path="profile/view" element={<ViewProfile />} />

               {/* Resume */}
               <Route path="resume/add" element={<AddResume />} />
               <Route path="resume/view" element={<ViewResume />} />

               {/* Skills */}
               <Route path="skills/add" element={<Addskills />} />
               <Route path="skills/view" element={<Viewskills />} />

               {/* Internship */}
               <Route path="internship/add" element={<AddIntern />} />
               <Route path="internship/view" element={<ViewIntern />} />

               {/* Projects */}
               <Route path="projects/add" element={<AddProject />} />
               <Route path="projects/view" element={<ViewProject />} />

               {/* Certificates */}
               <Route path="certificates/add" element={<AddCertificates />} />
               <Route path="certificates/view" element={<ViewCertificates />} />
               <Route path="certificates/edit/:id" element={<EditCertificates />} />

            </Route>

         </Routes>
      </BrowserRouter>

   </>
)
