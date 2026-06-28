import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// تأكد من المسارات (لو الصفحات في مجلد اسمه pages اتأكد من المسار صح)
import Archive from './pages/Archive';
import History from './pages/History';
import ReportForm from './pages/ReportForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* هنا بنعرف الخريطة: أي مسار يكتبه المستخدم، يقابله صفحة معينة */}
        <Route path="/archive" element={<Archive />} />
        <Route path="/history" element={<History />} />
        <Route path="/report-form" element={<ReportForm />} />
        
        {/* أي حاجة غير دول، يرجعه للأرشيف أوتوماتيك */}
        <Route path="*" element={<Navigate to="/archive" />} />
      </Routes>
    </Router>
  );
}

export default App;