import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Archive = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('أرشيف التقارير');
  const [filter, setFilter] = useState<{ key: string, value: string } | null>(null);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbzsxTJsDodK5QGdrU6AJrxUGMBhbJGQOFVcE_nLdflkwiOADkByvdoP86DWjdXOlR15/exec?action=getReports')
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  // المنطق بتاع الفلترة والتابات
  const getFilteredData = () => {
    let data = reports;
    if (activeTab === 'الإجازات') data = data.filter(r => r["نوع التقرير"] === 'اجازة');
    else if (activeTab === 'أرشيف التقارير') data = data.filter(r => r["نوع التقرير"] !== 'اجازة');
    
    if (filter) data = data.filter(r => r[filter.key] === filter.value);
    return data;
  };

  const filteredData = getFilteredData();
  const totalAchieved = filteredData.reduce((acc, curr) => acc + (Number(curr["المحقق"] || 0)), 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: 0, fontSize: '20px'}}>سجل التقارير</h2>
      </div>

      {/* الـ Tabs اللي طلبتها */}
      <div style={styles.tabsContainer}>
        {['أرشيف التقارير', 'الإجازات', 'إجمالي المندوبة'].map(tab => (
          <button key={tab} style={{...styles.tab, borderBottom: activeTab === tab ? '3px solid #1C74B4' : 'none'}} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* شريط الفلتر الذكي */}
      {filter && (
        <div style={styles.filterBar}>
          <span>نتائج لـ: <strong>{filter.value}</strong></span>
          <button style={styles.clearBtn} onClick={() => setFilter(null)}>إلغاء ❌</button>
          <strong>الإجمالي: {totalAchieved}</strong>
        </div>
      )}

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>التاريخ</th>
              <th style={styles.th}>المندوبة</th>
              <th style={styles.th}>الفرع</th>
              <th style={styles.th}>المحقق</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} style={styles.tr}>
                <td style={styles.td} onClick={() => setFilter({key: "التاريخ", value: row["التاريخ"]})}>{row["التاريخ"]}</td>
                <td style={styles.td} onClick={() => setFilter({key: "اسم المندوبة", value: row["اسم المندوبة"]})}>{row["اسم المندوبة"]}</td>
                <td style={styles.td} onClick={() => setFilter({key: "اسم الفرع", value: row["اسم الفرع"]})}>{row["اسم الفرع"]}</td>
                <td style={styles.td}>{row["المحقق"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الزر العائم وشريط التنقل تحت */}
      <button style={styles.fab} onClick={() => navigate('/report-form')}>+</button>
      <div style={styles.bottomNav}>
        <div style={{color: '#1C74B4'}} onClick={() => navigate('/archive')}>📂 الأرشيف</div>
        <div onClick={() => navigate('/history')}>📅 التاريخ</div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column' as const, direction: 'rtl' as const, backgroundColor: '#f9f9f9' },
  header: { padding: '20px', backgroundColor: '#fff', textAlign: 'center' as const, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  tabsContainer: { display: 'flex', backgroundColor: '#fff' },
  tab: { flex: 1, padding: '15px', border: 'none', background: 'none', fontWeight: 'bold' as const, cursor: 'pointer' },
  filterBar: { padding: '10px 20px', backgroundColor: '#d1e7dd', display: 'flex', justifyContent: 'space-between' },
  tableWrapper: { flex: 1, overflowY: 'auto' as const, padding: '10px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, backgroundColor: '#fff', borderRadius: '8px' },
  th: { padding: '12px', borderBottom: '2px solid #ddd' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px', textAlign: 'center' as const, cursor: 'pointer', color: '#1C74B4' },
  fab: { position: 'fixed' as const, bottom: '80px', right: '20px', width: '55px', height: '55px', borderRadius: '50%', background: '#1C74B4', color: '#fff', border: 'none', fontSize: '24px' },
  bottomNav: { height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderTop: '1px solid #ddd' }
};

export default Archive;