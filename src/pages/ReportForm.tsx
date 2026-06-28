import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ReportForm = () => {
  const navigate = useNavigate();

  // قائمة لتخزين الخيارات القادمة من جوجل شيت
  const [options, setOptions] = useState({
    supervisors: [],
    delegates: [],
    reportTypes: [],
    vacationTypes: []
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

  // قائمة الـ 81 منتج المجهزة مسبقاً
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
    { id: 18, category: 'كلوركس ألوان (CFC)', name: 'CFC F. 2Lit', target: '', achieved: '' },
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
    // ضَع رابط الـ Web App الخاص بك هنا بدلاً من الرابط الوهمي بالأسفل
    fetch('https://script.google.com/macros/s/AKfycbxRwoyorw1b4k8wboC-gVhum36lpgV_mAtWAbChH-I68cgkLvph8X1pLDSfVtEnrQys/exec') 
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

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', fontWeight: 'bold' }}>جاري تحميل البيانات من جوجل شيت... 🔄</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/archive')}>🔙 رجوع</button>
        <h2 style={styles.title}>إضافة تقرير جديد</h2>
      </div>
      
      {/* قسم البيانات الأساسية */}
      <div style={styles.topSection}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>التاريخ:</label>
          <input type="date" style={styles.input} value={reportData.date} onChange={(e) => handleDataChange('date', e.target.value)} />
        </div>
        
        {/* اسم المشرف من شيت Supervisor */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>اسم المشرف:</label>
          <select style={styles.input} value={reportData.supervisorName} onChange={(e) => handleDataChange('supervisorName', e.target.value)}>
            <option value="">-- اختر المشرف --</option>
            {options.supervisors.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
        </div>

        {/* اسم المندوبة من شيت Delegate */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>اسم المندوبة:</label>
          <select style={styles.input} value={reportData.delegateName} onChange={(e) => handleDataChange('delegateName', e.target.value)}>
            <option value="">-- اختر المندوبة --</option>
            {options.delegates.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
        </div>

        {/* نوع التقرير من شيت Type */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>نوع التقرير:</label>
          <select style={styles.input} value={reportData.reportType} onChange={(e) => handleDataChange('reportType', e.target.value)}>
            <option value="">-- اختر نوع التقرير --</option>
            {options.reportTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
          </select>
        </div>

        {/* نوع الإجازة من شيت Vacation (يظهر فقط لو تم اختيار إجازة) */}
        {reportData.reportType === "اجازة" && (
          <div style={styles.inputGroup}>
            <label style={styles.label} style={{...styles.label, color: '#E53935'}}>نوع الإجازة:</label>
            <select style={{...styles.input, borderColor: '#E53935'}} value={reportData.vacationType} onChange={(e) => handleDataChange('vacationType', e.target.value)}>
              <option value="">-- اختر نوع الإجازة --</option>
              {options.vacationTypes.map((vType, i) => <option key={i} value={vType}>{vType}</option>)}
            </select>
          </div>
        )}

        <div style={styles.inputGroup}>
  <label style={styles.label}>اسم الفرع / المتجر:</label>
  <select 
    style={styles.input} 
    value={reportData.branchName} 
    onChange={(e) => handleDataChange('branchName', e.target.value)}
  >
    <option value="">-- اختر الفرع --</option>
    {options.branches.map((branch, i) => (
      <option key={i} value={branch}>{branch}</option>
    ))}
  </select>
</div>
      </div>

      {/* شاشة جرد المنتجات */}
      {reportData.reportType !== "اجازة" && (
        <div style={styles.productsContainer}>
          <div style={styles.tableHeader}>
            <span style={styles.headerName}>المنتج</span>
            <span style={styles.headerInput}>المستهدف</span>
            <span style={styles.headerInput}>المحقق</span>
          </div>

          {categories.map(category => (
            <div key={category}>
              <div style={styles.categoryHeader}>{category}</div>
              {products.filter(p => p.category === category).map(product => (
                <div key={product.id} style={styles.productRow}>
                  <span style={styles.productName}>{product.name}</span>
                  <div style={styles.inputsWrapper}>
                    <input 
                      type="number" 
                      style={styles.numberInput} 
                      placeholder="0"
                      value={product.target}
                      onChange={(e) => handleProductChange(product.id, 'target', e.target.value)}
                    />
                    <input 
                      type="number" 
                      style={styles.numberInput} 
                      placeholder="0"
                      value={product.achieved}
                      onChange={(e) => handleProductChange(product.id, 'achieved', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {/* قسم الفاوتشر (يظهر فقط لو نوع التقرير "فاوتشر") */}
{reportData.reportType === 'فاوتشر' && (
  <div style={styles.topSection}>
    <div style={styles.productRow}>
      <span style={{ fontWeight: 'bold', color: '#1C74B4' }}>عدد الفاوتشر:</span>
      <input 
        type="number" 
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100px', textAlign: 'center' }} 
        placeholder="0"
        value={voucherCount}
        onChange={(e) => setVoucherCount(e.target.value)} 
      />
    </div>
  </div>
)}
      {/* قسم بيانات العملاء */}
<div style={styles.topSection}>
  <div style={styles.productRow}>
    <span style={{ fontWeight: 'bold', color: '#333' }}>العميل السلبي:</span>
    <input 
      type="number" 
      style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }} 
      placeholder="0"
      value={negativeCustomer || ''}
      onChange={(e) => setNegativeCustomer(Number(e.target.value))} 
    />
  </div>

  <div style={styles.productRow}>
    <span style={{ fontWeight: 'bold', color: '#333' }}>العميل الإيجابي:</span>
    <input 
      type="number" 
      style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }} 
      placeholder="0"
      value={positiveCustomer || ''}
      onChange={(e) => setPositiveCustomer(Number(e.target.value))} 
    />
  </div>

  <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ fontWeight: 'bold', color: '#1C74B4' }}>إجمالي العملاء:</span>
      {/* هنا بيحصل الجمع الأوتوماتيك */}
      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1C74B4' }}>
        {(negativeCustomer || 0) + (positiveCustomer || 0)}
      </span>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: 'bold', color: '#333' }}>هدف العملاء:</span>
      <input 
        type="number" 
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100px', textAlign: 'center' }} 
        placeholder="الهدف" 
      />
    </div>
  </div>
</div>

      {/* الملاحظات والحفظ */}
      <div style={styles.topSection}>
        <label style={styles.label}>ملاحظات إضافية (اختياري):</label>
        <textarea 
          style={styles.textarea} 
          value={reportData.notes}
          onChange={(e) => handleDataChange('notes', e.target.value)}
          placeholder="أي ملاحظات عن الزيارة..."
        />
      </div>

      <button style={styles.submitBtn} onClick={() => navigate('/archive')}>
        حفظ وإرسال التقرير
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '15px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif', direction: 'rtl' as const },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  title: { color: '#1C74B4', margin: 0, fontSize: '20px', fontWeight: 'bold' },
  backBtn: { background: 'none', border: 'none', fontSize: '16px', color: '#555', cursor: 'pointer' },
  topSection: { marginBottom: '15px', backgroundColor: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  inputGroup: { marginBottom: '12px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333', fontSize: '14px' },
  input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' as const, fontSize: '14px', backgroundColor: '#fafafa' },
  productsContainer: { backgroundColor: '#fff', padding: '10px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1C74B4', paddingBottom: '10px', marginBottom: '10px', fontWeight: 'bold', color: '#1C74B4', fontSize: '14px' },
  headerName: { flex: 1.5, textAlign: 'right' as const },
  headerInput: { flex: 1, textAlign: 'center' as const },
  categoryHeader: { backgroundColor: '#1C74B4', color: '#fff', padding: '8px 10px', borderRadius: '5px', marginTop: '15px', marginBottom: '5px', fontSize: '15px', fontWeight: 'bold' },
  productRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' },
  productName: { fontSize: '12px', color: '#444', flex: 1.5, fontWeight: 'bold', paddingLeft: '5px', direction: 'ltr' as const, textAlign: 'right' as const },
  inputsWrapper: { display: 'flex', flex: 2, gap: '8px', justifyContent: 'space-between' },
  numberInput: { flex: 1, padding: '8px 4px', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center' as const, width: '100%', fontSize: '14px' },
  textarea: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px', boxSizing: 'border-box' as const, fontSize: '14px' },
  submitBtn: { width: '100%', padding: '15px', backgroundColor: '#34A853', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px' }
};
const handleSubmit = async () => {
  // 1. تصفية المنتجات: هناخد بس المنتجات اللي المندوبة كتبت فيها أرقام (عشان الشيت ميتمليش صفوف فاضية)
  const filledProducts = products.filter(p => p.target !== '' || p.achieved !== '');

  // 2. تجميع كل داتا التقرير في كائن واحد
  const finalReport = {
    ...reportData,
    negativeCustomers: negativeCustomer,
    positiveCustomers: positiveCustomer,
    totalCustomers: (negativeCustomer || 0) + (positiveCustomer || 0),
    voucherCount: reportData.reportType === 'فاوتشر' ? voucherCount : 0,
    products: filledProducts
  };

  try {
    // 3. إرسال البيانات للجوجل شيت بأسلوب POST
    const response = await fetch('رابط_الـ_Web_App_الخاص_بك', {
      method: 'POST',
      body: JSON.stringify(finalReport)
    });

    if (response.ok) {
      alert('تم حفظ وإرسال التقرير بنجاح! 🎉');
      navigate('/archive'); // يرجعها لصفحة الأرشيف بره تلقائياً
    } else {
      alert('حدث خطأ أثناء الحفظ، حاول مرة أخرى');
    }
  } catch (error) {
    console.error('خطأ في الإرسال:', error);
    alert('فشل الاتصال بالسيرفر، تأكد من الإنترنت');
  }
};

export default ReportForm;