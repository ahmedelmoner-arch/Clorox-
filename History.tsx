import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [reportsByDate, setReportsByDate] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbzsxTJsDodK5QGdrU6AJrxUGMBhbJGQOFVcE_nLdflkwiOADkByvdoP86DWjdXOlR15/exec?action=getReports')
      .then(res => res.json())
      .then(data => {
        const dateGroups: any = {};
        data.forEach((report: any) => {
          const d = new Date(report["التاريخ"]);
          const dateStr = d.toLocaleDateString('en-US');
          if (!dateGroups[dateStr]) dateGroups[dateStr] = [];
          dateGroups[dateStr].push(report);
        });
        setReportsByDate(dateGroups);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}><h2 style={styles.title}>التاريخ</h2></div>
      
      <div style={styles.content}>
        {!selectedDate ? (
          <div style={styles.list}>
            {Object.keys(reportsByDate).map((date) => (
              <div key={date} style={styles.row} onClick={() => setSelectedDate(date)}>
                <span>{date}</span>
                <span>{reportsByDate[date].length} ❯</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.list}>
            <div style={styles.row} onClick={() => setSelectedDate(null)}>❮ رجوع</div>
            {reportsByDate[selectedDate].map((r: any, i: number) => (
              <div key={i} style={styles.row} onClick={() => setSelectedReport(r)}>
                {r["اسم المندوبة"]} - {r["اسم الفرع"]}
              </div>
            ))}
          </div>
        )}
      </div>

      <button style={styles.fab} onClick={() => navigate('/report-form')}>+</button>
      
      {/* تأكد إن الـ div دي مقفولة صح هنا */}
      <div style={styles.bottomNav}>
        <div onClick={() => navigate('/archive')}>📂 الأرشيف</div>
        <div style={{color: '#4b88e5'}} onClick={() => navigate('/history')}>📅 التاريخ</div>
      </div>
      <button 
  style={styles.fab} 
  onClick={() => navigate('/report-form')}
>
  +
</button>
    </div>
    
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column' as const, direction: 'rtl' as const },
  header: { padding: '20px', borderBottom: '1px solid #ddd' },
  title: { margin: 0 },
  content: { flex: 1, overflowY: 'auto' as const },
  list: { display: 'flex', flexDirection: 'column' as const },
  row: { padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' },
  fab: { position: 'fixed' as const, bottom: '80px', right: '20px', width: '50px', height: '50px', borderRadius: '50%', background: '#4b88e5', color: '#fff', border: 'none' },
  bottomNav: { height: '60px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }
};

export default History;