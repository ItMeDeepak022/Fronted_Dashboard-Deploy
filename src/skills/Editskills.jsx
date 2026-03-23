import React from 'react'

export default function  Editskills() {
  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2"> Edit Your Skills</h1>
                <p className="text-gray-600 mb-8">Showcase your professional abilities and expertise</p>
                
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input type="text" placeholder="e.g., JavaScript, React, Python" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    
                     
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea placeholder="Describe your experience with this skill" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>
                    
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"> Edit Skill</button>
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}
