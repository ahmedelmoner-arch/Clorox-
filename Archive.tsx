import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Archive = () => {
  const navigate = useNavigate();
  // رابط السكريبت بتاعك (نفس الرابط اللي موجود في صفحة التقارير)
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwQJOXguCJQxNFCc0ZmwaC_OYo2_ywyR05kWwurDfWw6B4uyKE4mljcU7_UPVfo5bNq/exec';
  
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // هنا بنضيف أمر صغير للرابط عشان نقول للسكريبت يرجع التقارير مش القوائم
  useEffect(() => {
    fetch(`${scriptUrl}?action=getReports`)
      .then(res => res.json())
      .then(data => {
        // لو البيانات رجعت بنجاح
        if(data && Array.isArray(data)) {
          setReports(data.reverse()); // Reverse عشان أجدد تقرير يظهر فوق
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ في جلب الأرشيف:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-right" dir="rtl">
      
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <button onClick={() => navigate('/report-form')} className="bg-[#00529b] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-blue-800 transition">
          + تقرير جديد
        </button>
        <h2 className="text-2xl font-extrabold text-[#00529b]">أرشيف التقارير</h2>
      </div>

      {/* شاشة التحميل */}
      {loading ? (
        <div className="text-center mt-20 text-lg font-bold text-[#00529b]">
          جاري تحميل الأرشيف... ⏳
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 font-bold">
          لا توجد تقارير مسجلة حتى الآن.
        </div>
      ) : (
        /* عرض التقارير في كروت */
        <div className="grid gap-4">
          {reports.map((report, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
                  {report[3] /* نوع التقرير */}
                </span>
                <span className="text-gray-500 font-semibold text-sm">
                  {new Date(report[0]).toLocaleDateString('ar-EG') /* التاريخ */}
                </span>
              </div>
              
              <div className="mb-2">
                <span className="text-gray-500 text-sm">المندوبة:</span>
                <span className="font-bold text-[#00529b] mr-2">{report[2]}</span>
              </div>
              
              <div className="mb-2">
                <span className="text-gray-500 text-sm">الفرع:</span>
                <span className="font-bold text-[#00529b] mr-2">{report[4]}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl mt-3 text-sm text-gray-700 whitespace-pre-wrap">
                <span className="font-bold block mb-1">المنتجات:</span>
                {report[6] ? report[6] : 'لم يتم إدخال منتجات'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
