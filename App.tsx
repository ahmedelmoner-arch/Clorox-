import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// استيراد صفحة الكود السري (تأكد إن اسم الملف جوه فولدر pages عندك هو Login)
import Login from './pages/Login'; 
import Archive from './pages/Archive';
import History from './pages/History';
import ReportForm from './pages/ReportForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* الشاشة الرئيسية أول ما الموقع يفتح هتبقى شاشة الكود السري */}
        <Route path="/" element={<Login />} />
        
        {/* باقي صفحات التطبيق */}
        <Route path="/archive" element={<Archive />} />
        <Route path="/history" element={<History />} />
        <Route path="/report-form" element={<ReportForm />} />
        
        {/* أي حد يكتب رابط غلط أو يحاول يتذاكى، هيرجعه لصفحة الكود السري غصب عنه */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
