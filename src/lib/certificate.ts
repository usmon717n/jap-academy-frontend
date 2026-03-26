export function generateCertificateHTML(
  firstName: string,
  lastName: string,
  topicName: string,
  correct: number,
  total: number,
  timeStr: string,
): string {
  const pct = Math.round((correct / total) * 100);
  const grade = pct >= 90 ? "A'lo" : pct >= 70 ? 'Yaxshi' : pct >= 50 ? 'Qoniqarli' : 'Qayta topshiring';
  const date = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sertifikat - ${topicName}</title>
<style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f0;font-family:'DM Sans',sans-serif;padding:20px}
.cert{width:800px;padding:64px;background:#fff;position:relative;border:3px solid #1c1917}
.cert::before{content:'';position:absolute;inset:10px;border:1px solid #d6d3d1;pointer-events:none}
.cert::after{content:'';position:absolute;inset:14px;border:0.5px solid #e7e5e4;pointer-events:none}
.corner{position:absolute;width:36px;height:36px;border:3px solid #ea580c}
.tl{top:20px;left:20px;border-right:0;border-bottom:0}.tr{top:20px;right:20px;border-left:0;border-bottom:0}
.bl{bottom:20px;left:20px;border-right:0;border-top:0}.br{bottom:20px;right:20px;border-left:0;border-top:0}
.header{text-align:center;margin-bottom:40px}
.logo-row{display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:16px}
.logo-el{width:48px;height:54px;border-radius:6px;background:#ea580c;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff}
.logo-el .num{font-size:7px;opacity:.7}.logo-el .sym{font-size:22px;font-weight:800}.logo-el .sub{font-size:6px;opacity:.6}
.academy-name{font-family:'DM Sans';font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#1c1917}
.academy-sub{font-size:9px;letter-spacing:4px;color:#a8a29e;text-transform:uppercase;font-weight:600}
h1{font-family:'Playfair Display',serif;font-size:42px;text-align:center;color:#1c1917;margin-bottom:6px;font-weight:900}
.tagline{text-align:center;font-size:11px;letter-spacing:5px;color:#a8a29e;text-transform:uppercase;margin-bottom:44px}
.student-name{text-align:center;font-family:'Playfair Display',serif;font-size:32px;font-weight:700;color:#1c1917;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px}
.topic{text-align:center;font-size:18px;font-weight:700;color:#ea580c;margin:24px 0 8px}
.result-big{text-align:center;font-size:64px;font-weight:900;color:#1c1917;line-height:1}
.grade-text{text-align:center;font-size:18px;color:#78716c;margin-top:4px;margin-bottom:32px}
.details{display:flex;justify-content:center;gap:48px;margin-bottom:40px}
.detail{text-align:center}.detail span{display:block;font-size:10px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
.detail strong{font-size:16px;color:#1c1917;font-weight:700}
.divider{height:1px;background:#e7e5e4;margin:0 0 32px}
.footer-row{display:flex;justify-content:space-between;align-items:flex-end}
.sig{font-size:12px;color:#78716c}.sig strong{display:block;font-size:14px;color:#1c1917;font-weight:700;margin-bottom:2px}
.stamp{width:80px;height:80px;border-radius:50%;border:3px solid #ea580c;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#ea580c;font-weight:800;text-align:center;transform:rotate(-12deg)}
.stamp-inner{font-size:9px;letter-spacing:1px;line-height:1.3}.stamp-star{font-size:16px;margin-bottom:2px}
.date-box{text-align:right;font-size:12px;color:#78716c}.date-box strong{display:block;font-size:14px;color:#1c1917}
</style></head><body><div class="cert">
<div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
<div class="header"><div class="logo-row"><div class="logo-el"><span class="num">001</span><span class="sym">Jp</span><span class="sub">JAP</span></div>
<div><div class="academy-name">JAP ACADEMY</div><div class="academy-sub">Kimyo o'quv markazi</div></div></div></div>
<h1>SERTIFIKAT</h1><div class="tagline">Bilim va ko'nikmalar tasdiqlanadi</div>
<div class="student-name">${firstName} ${lastName}</div>
<div class="topic">${topicName}</div>
<div class="result-big">${pct}%</div>
<div class="grade-text">Baho: ${grade}</div>
<div class="details">
<div class="detail"><span>To'g'ri javoblar</span><strong>${correct} / ${total}</strong></div>
<div class="detail"><span>Sarflangan vaqt</span><strong>${timeStr}</strong></div>
<div class="detail"><span>Savollar soni</span><strong>${total} ta</strong></div>
</div>
<div class="divider"></div>
<div class="footer-row"><div class="sig"><strong>JAP Academy</strong>Kimyo o'quv markazi<br/>Rasmiy sertifikat</div>
<div class="stamp"><div class="stamp-star">★</div><div class="stamp-inner">JAP<br/>ACADEMY<br/>TASDIQLANGAN</div></div>
<div class="date-box"><span>Sana</span><strong>${date}</strong></div></div></div></body></html>`;
}

export function downloadCertificate(
  firstName: string,
  lastName: string,
  topicName: string,
  correct: number,
  total: number,
  timeStr: string,
) {
  const html = generateCertificateHTML(firstName, lastName, topicName, correct, total, timeStr);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JAP_Sertifikat_${topicName}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
