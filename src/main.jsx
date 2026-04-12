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
import EditInternship from './internship/EditInternship'
import EditProfile from './profileImg/EditProfile'
import EditProject from './projects/EditProject'
import EditResume from './resumes/EditResume'
import Editskills from './skills/Editskills'
import ProtectedRoute from './Protected'


createRoot(document.getElementById('root')).render(
   <>

      <BrowserRouter>
         <Routes>

            {/* Login */}

            <Route path="/" element={<Login />} />


            {/* Admin Layout */}
            <Route element={<ProtectedRoute> <Home /> </ProtectedRoute>}>


               <Route path="dashboard" element={<Dashboard />} />

               {/* Profile */}
               <Route path="profile/add" element={<AddProfile />} />
               <Route path="profile/view" element={<ViewProfile />} />
               <Route path="profile/edit/:id" element={<EditProfile />} />

               {/* Resume */}
               <Route path="resume/add" element={<AddResume />} />
               <Route path="resume/view" element={<ViewResume />} />
               <Route path="resume/edit/:id" element={<EditResume />} />

               {/* Skills */}
               <Route path="skills/add" element={<Addskills />} />
               <Route path="skills/view" element={<Viewskills />} />
               <Route path="skills/edit/:id" element={<Editskills />} />

               {/* Internship */}
               <Route path="internship/add" element={<AddIntern />} />
               <Route path="internship/view" element={<ViewIntern />} />
               <Route path="internship/edit/:id" element={<EditInternship />} />

               {/* Projects */}
               <Route path="projects/add" element={<AddProject />} />
               <Route path="projects/view" element={<ViewProject />} />
               <Route path="projects/edit/:id" element={<EditProject />} />

               {/* Certificates */}
               <Route path="certificates/add" element={<AddCertificates />} />
               <Route path="certificates/view" element={<ViewCertificates />} />
               <Route path="certificates/edit/:id" element={<EditCertificates />} />

            </Route>

         </Routes>
      </BrowserRouter>

   </>
)
