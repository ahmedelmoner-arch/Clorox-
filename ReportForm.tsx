import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const navigate = useNavigate();

  // قائمة لتخزين الخيارات القادمة من جوجل شيت
  const [options, setOptions] = useState({
    supervisors: [],
    delegates: [],
    reportTypes: [],
    vacationTypes: [],
    branches: []
  });

  const [loading, setLoading] = useState(true);

  // بيانات التقرير الأساسية
  const [negativeCustomer, setNegativeCustomer] = useState(0);
  const [positiveCustomer, setPositiveCustomer] = useState(0);
  const [voucherCount, setVoucherCount] = useState('');
  const [reportData, setReportData] = useState({
    date: new Date().toISOString().split('T')[0],
    reportType: '',
    vacationType: '',
    supervisorName: '',
    delegateName: '',
    branchName: '',
    notes: ''
  });

  // قائمة الـ 81 منتج المجهزة مسبقاً كما هي
  const [products, setProducts] = useState([
    // الكلور المبيض (CLB)
    { id: 1, category: 'الكلور المبيض (CLB)', name: 'Clorox Saving Pack 1kg', target: '', achieved: '' },
    { id: 2, category: 'الكلور المبيض (CLB)', name: 'CLB R. 950ml', target: '', achieved: '' },
    { id: 3, category: 'الكلور المبيض (CLB)', name: 'CLB L. 950ml', target: '', achieved: '' },
    { id: 4, category: 'الكلور المبيض (CLB)', name: 'CLB F. 950ml', target: '', achieved: '' },
    { id: 5, category: 'الكلور المبيض (CLB)', name: 'CLB Lav. 950ml', target: '', achieved: '' },
    { id: 6, category: 'الكلور المبيض (CLB)', name: 'CLB R. 1.2 Lit', target: '', achieved: '' },
    { id: 7, category: 'الكلور المبيض (CLB)', name: 'CLB H. Gallon', target: '', achieved: '' },
    { id: 8, category: 'الكلور المبيض (CLB)', name: 'CLB R. Gallon', target: '', achieved: '' },
    { id: 9, category: 'الكلور المبيض (CLB)', name: 'CLB L. 4Lit', target: '', achieved: '' },
    { id: 10, category: 'الكلور المبيض (CLB)', name: 'CLB F. 4Lit', target: '', achieved: '' },
    { id: 11, category: 'الكلور المبيض (CLB)', name: 'CLB Lav. 4Lit', target: '', achieved: '' },
    
    // كلوركس ألوان (CFC)
    { id: 12, category: 'كلوركس ألوان (CFC)', name: 'CFC Pouch 450ml', target: '', achieved: '' },
    { id: 13, category: 'كلوركس ألوان (CFC)', name: 'CFC Pouch 750ml', target: '', achieved: '' },
    { id: 14, category: 'كلوركس ألوان (CFC)', name: 'CFC R. 950ml', target: '', achieved: '' },
    { id: 15, category: 'كلوركس ألوان (CFC)', name: 'CFC F. 950ml', target: '', achieved: '' },
    { id: 16, category: 'كلوركس ألوان (CFC)', name: 'CFC Lav. 950ml', target: '', achieved: '' },
    { id: 17, category: 'كلوركس ألوان (CFC)', name: 'CFC R. 2Lit', target: '', achieved: '' },
    { id: 18, category: 'كلوركس ألوان (CFC)', name: 'CFC F. 2Lit', text: '', target: '', achieved: '' },
    { id: 19, category: 'كلوركس ألوان (CFC)', name: 'CFC Lav. 2Lit', target: '', achieved: '' },

    // منظفات 5 في 1
    { id: 20, category: 'منظفات 5 في 1', name: '5x1 L. Pouch 400ml', target: '', achieved: '' },
    { id: 21, category: 'منظفات 5 في 1', name: '5x1 Lav. Pouch 400ml', target: '', achieved: '' },
    { id: 22, category: 'منظفات 5 في 1', name: '5x1 L. 700ml', target: '', achieved: '' },
    { id: 23, category: 'منظفات 5 في 1', name: '5x1 SB. 700ml', target: '', achieved: '' },
    { id: 24, category: 'منظفات 5 في 1', name: '5x1 Lav. 700ml', target: '', achieved: '' },
    { id: 25, category: 'منظفات 5 في 1', name: '5x1 L. 3Lit', target: '', achieved: '' },
    { id: 26, category: 'منظفات 5 في 1', name: '5x1 SB. 3Lit', target: '', achieved: '' },
    { id: 27, category: 'منظفات 5 في 1', name: '5x1 Lav. 3Lit', target: '', achieved: '' },

    // مساحيق (PWD)
    { id: 28, category: 'مساحيق (PWD)', name: 'PWD Pouch 30gm', target: '', achieved: '' },
    { id: 29, category: 'مساحيق (PWD)', name: 'PWD Pouch 200gm', target: '', achieved: '' },
    { id: 30, category: 'مساحيق (PWD)', name: 'PWD 450gm', target: '', achieved: '' },

    // كلوركس جل
    { id: 31, category: 'كلوركس جل', name: 'Gel L. 400ml', target: '', achieved: '' },
    { id: 32, category: 'كلوركس جل', name: 'Gel F. 400ml', target: '', achieved: '' },
    { id: 33, category: 'كلوركس جل', name: 'Gel M. 400ml', target: '', achieved: '' },
    { id: 34, category: 'كلوركس جل', name: 'Gel L. 750ml', target: '', achieved: '' },
    { id: 35, category: 'كلوركس جل', name: 'Gel F. 750ml', target: '', achieved: '' },
    { id: 36, category: 'كلوركس جل', name: 'Gel M. 750ml', target: '', achieved: '' },

    // العناية بالملابس (CC)
    { id: 37, category: 'العناية بالملابس (CC)', name: 'CC 500ml', target: '', achieved: '' },
    { id: 38, category: 'العناية بالملابس (CC)', name: 'CC 900ml', target: '', achieved: '' },
    { id: 39, category: 'العناية بالملابس (CC)', name: 'CC 1.8Lit', target: '', achieved: '' },
    { id: 40, category: 'العناية بالملابس (CC)', name: 'CC Pre-Treater 500ml', target: '', achieved: '' },

    // منظفات الأسطح والحمامات
    { id: 41, category: 'منظفات الأسطح والحمامات', name: 'Kitchen Cleaner Regular 500ml', target: '', achieved: '' },
    { id: 42, category: 'منظفات الأسطح والحمامات', name: 'Kitchen Cleaner Lemon 500ml', target: '', achieved: '' },
    { id: 43, category: 'منظفات الأسطح والحمامات', name: 'Bathroom Cleaner 500ml', target: '', achieved: '' },
    { id: 44, category: 'منظفات الأسطح والحمامات', name: 'Multipurpose Cleaner 500ml', target: '', achieved: '' },

    // مناديل مبللة (Wipes)
    { id: 45, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Fresh- 10 wipes', target: '', achieved: '' },
    { id: 46, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Lemon - 10 wipes', target: '', achieved: '' },
    { id: 47, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Fresh - 20 wipes', target: '', achieved: '' },
    { id: 48, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Lemon - 20 wipes', target: '', achieved: '' },
    { id: 49, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Fresh - 40 wipes', target: '', achieved: '' },
    { id: 50, category: 'مناديل مبللة (Wipes)', name: 'Clorox Wipes Lemon - 40 wipes', target: '', achieved: '' },

    // العروض (Bundles)
    { id: 51, category: 'العروض (Bundles)', name: 'Bundle - B', target: '', achieved: '' },
    { id: 52, category: 'العروض (Bundles)', name: 'Bundle - O', target: '', achieved: '' },
    { id: 53, category: 'العروض (Bundles)', name: 'Bundle - Q', target: '', achieved: '' },
    { id: 54, category: 'العروض (Bundles)', name: 'Bundle - R', target: '', achieved: '' },
    { id: 55, category: 'العروض (Bundles)', name: 'Bundle - U', target: '', achieved: '' },
    { id: 56, category: 'العروض (Bundles)', name: 'Bundle - V', target: '', achieved: '' },
    { id: 57, category: 'العروض (Bundles)', name: 'Bundle - W', target: '', achieved: '' },
    { id: 58, category: 'العروض (Bundles)', name: 'Bundle - X', target: '', achieved: '' },
    { id: 59, category: 'العروض (Bundles)', name: 'Bundle - H', target: '', achieved: '' },
    { id: 60, category: 'العروض (Bundles)', name: 'Bundle - AB', target: '', achieved: '' },
    { id: 61, category: 'العروض (Bundles)', name: 'Bundle - AE', target: '', achieved: '' },
    { id: 62, category: 'العروض (Bundles)', name: 'Bundle - AF', target: '', achieved: '' },
    { id: 63, category: 'العروض (Bundles)', name: 'Bundle - AG', target: '', achieved: '' },
    { id: 64, category: 'العروض (Bundles)', name: 'Bundle - AI', target: '', achieved: '' },
    { id: 65, category: 'العروض (Bundles)', name: 'Bundle - AL', target: '', achieved: '' },
    { id: 66, category: 'العروض (Bundles)', name: 'Bundle ZA', target: '', achieved: '' },
    { id: 67, category: 'العروض (Bundles)', name: 'Bundle ZB', target: '', achieved: '' },
    { id: 68, category: 'العروض (Bundles)', name: 'Bundle ZC', target: '', achieved: '' },
    { id: 69, category: 'العروض (Bundles)', name: 'Bundle AR', target: '', achieved: '' },
    { id: 70, category: 'العروض (Bundles)', name: 'Bundle AS', target: '', achieved: '' },
    { id: 71, category: 'العروض (Bundles)', name: 'Bundle AV', target: '', achieved: '' },
    { id: 72, category: 'العروض (Bundles)', name: 'Bundle AT', target: '', achieved: '' },
    { id: 73, category: 'العروض (Bundles)', name: 'Bundle AU', target: '', achieved: '' },
    { id: 74, category: 'العروض (Bundles)', name: 'Bundle AX', target: '', achieved: '' },
    { id: 75, category: 'العروض (Bundles)', name: 'Bundle AY', target: '', achieved: '' },
    { id: 76, category: 'العروض (Bundles)', name: 'Bundle AZ', target: '', achieved: '' },
    { id: 77, category: 'العروض (Bundles)', name: 'Bundle BA', target: '', achieved: '' },
    { id: 78, category: 'العروض (Bundles)', name: 'Bundle ZD', target: '', achieved: '' },
    { id: 79, category: 'العروض (Bundles)', name: 'Bundle - AH', target: '', achieved: '' },
    { id: 80, category: 'العروض (Bundles)', name: 'Bundle ZF', target: '', achieved: '' },
    { id: 81, category: 'العروض (Bundles)', name: 'Bundle ZG', target: '', achieved: '' }
  ]);

  // استدعاء البيانات من جوجل شيت عند فتح الصفحة
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbx3_gR2hOe9dhjgdSVwNu2RM6EghU0b3q6VDrIg3kYu59cZRaiC4UHTZY_lTmCnIH_i/exec') 
      .then(res => res.json())
      .then(data => {
        setOptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ في جلب البيانات:", err);
        setLoading(false);
      });
  }, []);

  const handleDataChange = (field: string, value: string) => {
    setReportData({ ...reportData, [field]: value });
  };

  const handleProductChange = (id: number, field: 'target' | 'achieved', value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  /const handleSubmit = async () => {
    // تصفية المنتجات الفاضية
    const filledProducts = products.filter(p => p.target !== '' || p.achieved !== '');

    const finalReport = {
      ...reportData,
      negativeCustomers: negativeCustomer,
      positiveCustomers: positiveCustomer,
      totalCustomers: (negativeCustomer || 0) + (positiveCustomer || 0),
      voucherCount: reportData.reportType === 'فاوتشر' ? voucherCount : 0,
      products: filledProducts
    };

    // رسالة عشان نتأكد إن الزرار استجاب وبدأ يجمع الداتا
    alert('جاري إرسال التقرير للسيرفر... برجاء الانتظار ⏳');

    try {
      // حط الرابط بتاعك اللي نسخته من جوجل سكريبت هنا مكان الرابط ده
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbz5f7ZOokdekKVbXSXfC_s9t6L06QEHr-QkoQ07cgM2174ugBtcWMFyw--4YkHIAAj5/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(finalReport),
        redirect: 'follow'
      });

      // لو وصل للسطر ده بدون ما يضرب خطأ، يبقى الداتا وصلت بنجاح
      alert('تم إرسال التقرير بنجاح! 🎉');
      navigate('/archive'); 

    } catch (error: any) {
      // هنا الفخ! لو المتصفح أو جوجل رفضوا الداتا، هيطبعلنا السبب بالظبط
      console.error('تفاصيل الخطأ:', error);
      alert('البيانات لم تصل! الخطأ هو: ' + error.message);
    }
  };
  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-[#00529b] text-xl font-bold">
        جاري تحميل البيانات من جوجل شيت... 🔄
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-right" dir="rtl">
      
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/archive')} className="text-gray-500 font-bold hover:text-[#00529b] transition-colors">
          🔙 رجوع
        </button>
        <h2 className="text-2xl font-extrabold text-[#00529b]">إضافة تقرير جديد (تحديث V2 🚀)</h2>
      </div>
      
      {/* قسم البيانات الأساسية */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">التاريخ:</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#00529b]" 
            value={reportData.date} 
            onChange={(e) => handleDataChange('date', e.target.value)} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المشرف:</label>
          <select 
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#00529b]" 
            value={reportData.supervisorName} 
            onChange={(e) => handleDataChange('supervisorName', e.target.value)}
          >
            <option value="">-- اختر المشرف --</option>
            {options.supervisors?.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المندوبة:</label>
          <select 
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#00529b]" 
            value={reportData.delegateName} 
            onChange={(e) => handleDataChange('delegateName', e.target.value)}
          >
            <option value="">-- اختر المندوبة --</option>
            {options.delegates?.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">نوع التقرير:</label>
          <select 
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#00529b]" 
            value={reportData.reportType} 
            onChange={(e) => handleDataChange('reportType', e.target.value)}
          >
            <option value="">-- اختر نوع التقرير --</option>
            {options.reportTypes?.map((type, i) => <option key={i} value={type}>{type}</option>)}
          </select>
        </div>

        {reportData.reportType === "اجازة" && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-red-600 mb-2">نوع الإجازة:</label>
            <select 
              className="w-full border border-red-300 rounded-xl p-3 bg-red-50 focus:outline-none focus:border-red-500" 
              value={reportData.vacationType} 
              onChange={(e) => handleDataChange('vacationType', e.target.value)}
            >
              <option value="">-- اختر نوع الإجازة --</option>
              {options.vacationTypes?.map((vType, i) => <option key={i} value={vType}>{vType}</option>)}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الفرع / المتجر:</label>
          <select 
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#00529b]" 
            value={reportData.branchName} 
            onChange={(e) => handleDataChange('branchName', e.target.value)}
          >
            <option value="">-- اختر الفرع --</option>
            {options.branches?.map((branch, i) => <option key={i} value={branch}>{branch}</option>)}
          </select>
        </div>
      </div>

      {/* شاشة جرد المنتجات */}
      {reportData.reportType !== "اجازة" && (
        <div className="mb-8">
          {categories.map(category => (
            <div key={category}>
              <div className="bg-[#00529b] text-white p-3 rounded-xl mt-6 mb-4 text-lg font-bold shadow-md text-center">
                {category}
              </div>
              
              {products.filter(p => p.category === category).map(product => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3">
                  <h3 className="text-md font-bold text-[#00529b] mb-3 text-left" dir="ltr">
                    {product.name}
                  </h3>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 mb-1 text-center">المستهدف</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-xl p-3 text-center text-lg bg-gray-50 focus:outline-none focus:border-[#00529b]"
                        placeholder="0"
                        value={product.target}
                        onChange={(e) => handleProductChange(product.id, 'target', e.target.value)}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 mb-1 text-center">المحقق</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-xl p-3 text-center text-lg bg-gray-50 focus:outline-none focus:border-green-500"
                        placeholder="0"
                        value={product.achieved}
                        onChange={(e) => handleProductChange(product.id, 'achieved', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* قسم الفاوتشر */}
      {reportData.reportType === 'فاوتشر' && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4 flex items-center justify-between">
          <span className="font-bold text-[#00529b] text-lg">عدد الفاوتشر:</span>
          <input 
            type="number" 
            className="border border-gray-300 rounded-xl p-3 w-24 text-center text-lg bg-gray-50 focus:outline-none" 
            placeholder="0"
            value={voucherCount}
            onChange={(e) => setVoucherCount(e.target.value)} 
          />
        </div>
      )}

      {/* قسم بيانات العملاء */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-gray-700">العميل السلبي:</span>
          <input 
            type="number" 
            className="border border-gray-300 rounded-xl p-3 w-24 text-center bg-gray-50 focus:outline-none" 
            placeholder="0"
            value={negativeCustomer || ''}
            onChange={(e) => setNegativeCustomer(Number(e.target.value))} 
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-gray-700">العميل الإيجابي:</span>
          <input 
            type="number" 
            className="border border-gray-300 rounded-xl p-3 w-24 text-center bg-gray-50 focus:outline-none" 
            placeholder="0"
            value={positiveCustomer || ''}
            onChange={(e) => setPositiveCustomer(Number(e.target.value))} 
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-[#00529b]">إجمالي العملاء:</span>
            <span className="text-2xl font-black text-[#00529b]">
              {(negativeCustomer || 0) + (positiveCustomer || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* الملاحظات */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات إضافية (اختياري):</label>
        <textarea 
          className="w-full border border-gray-300 rounded-xl p-3 min-h-[100px] bg-gray-50 focus:outline-none" 
          value={reportData.notes}
          onChange={(e) => handleDataChange('notes', e.target.value)}
          placeholder="أي ملاحظات عن الزيارة..."
        />
      </div>

      {/* زرار الحفظ */}
      <button 
        onClick={handleSubmit}
        className="w-full bg-[#34A853] hover:bg-green-600 text-white font-extrabold text-xl py-4 rounded-xl shadow-lg transition-colors mb-8"
      >
        حفظ وإرسال التقرير
      </button>

    </div>
  );
};

export default ReportForm;
