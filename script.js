const G=['Laki-laki','Perempuan'];
const API='https://script.google.com/macros/s/AKfycbyL5t6P0Hln5uCaPBtmMjzSblme6pMcu7drP2RGCKCkVtrlm6EBx1n3E8eiEoH1CIfJjg/exec'; // Tempel URL Web App Google Apps Script di sini (lihat panduan). Kosong = mode lokal.
let KEY='';
async function api(b){const r=await fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...b,key:KEY})});return r.json()}
function loginView(msg){W('760px');app.innerHTML=`<button type="button" class="back" data-act="home">‹ Kembali</button><h1>Masuk staf</h1><p class="lead">Daftar pasien hanya untuk staf klinik. Masukkan PIN staf.</p><div class="f" style="max-width:320px"><label class="l" for="pin">PIN staf</label><input id="pin" type="password" autocomplete="current-password"></div><p class="err" id="pe">${msg}</p><button type="button" class="btn sb" style="--c:var(--teal)" data-act="login">Masuk</button>`}
const GIGI=['Gigi depan atas','Gigi depan bawah','Gigi geraham kanan atas','Gigi geraham kiri atas','Gigi geraham kanan bawah','Gigi geraham kiri bawah'];
const F=(id,label,type,o={})=>({id,label,type,...o});
const CATS={
umum:{n:'Pasien Umum',d:'Sakit gigi, tambal, scaling, dan cabut gigi',c:'--c1',p:'U',svc:{
 'Sakit gigi':[F('lokasi','Gigi yang sakit','gigi',{}),F('sejak','Sudah berapa lama sakit?','select',{o:['Baru hari ini','2–3 hari','Seminggu','Lebih dari seminggu']}),F('nyeri','Tingkat nyeri (1–10)','range'),F('gejala','Gejala lain','check',{o:['Bengkak','Demam','Berlubang','Gusi berdarah','Nyeri saat dingin/panas'],full:1})],
 'Tambal gigi':[F('lokasi','Gigi yang ditambal','gigi',{}),F('jenis','Jenis tambalan','select',{o:['Belum tahu / sesuai saran dokter','Tambal warna gigi (komposit)','Tambal sementara']}),F('ket','Keluhan pada gigi tersebut','textarea',{full:1})],
 'Scaling (bersihkan karang gigi)':[F('terakhir','Terakhir scaling','select',{o:['Belum pernah','Kurang dari 6 bulan','6–12 bulan','Lebih dari 1 tahun']}),F('gejala','Keluhan','check',{o:['Gusi berdarah','Bau mulut','Karang gigi menumpuk','Gigi goyang'],full:1})],
 'Cabut gigi':[F('lokasi','Gigi yang dicabut','gigi',{}),F('alasan','Alasan pencabutan','select',{o:['Gigi rusak parah','Gigi goyang','Gigi bungsu','Sisa akar','Lainnya']}),F('obat','Obat pengencer darah?','radio',{o:['Tidak','Ya']}),F('hamil','Sedang hamil / menyusui?','radio',{o:['Tidak','Ya','Tidak berlaku']})]}},
behel:{n:'Pasien Behel',d:'Pemasangan behel, kontrol behel, dan pindah kontrol',c:'--c2',p:'B',svc:{
 'Pemasangan behel':[F('tipe','Jenis behel yang diminati','select',{o:['Metal (konvensional)','Keramik / estetik','Self-ligating','Clear aligner','Konsultasi dulu']}),F('tujuan','Keluhan susunan gigi','check',{o:['Gigi berjejal','Gigi renggang','Gigi tonggos','Gigi tidak rapat saat menggigit'],full:1}),F('pernah','Pernah pakai behel sebelumnya?','radio',{o:['Belum pernah','Pernah']}),F('rontgen','Sudah punya foto rontgen?','radio',{o:['Belum','Sudah']}),F('ket','Harapan / catatan','textarea',{full:1})],
 'Kontrol behel':[F('tipe','Jenis behel','select',{o:['Metal','Keramik','Self-ligating','Clear aligner']}),F('ke','Kontrol ke-','number',{ph:'Contoh: 5'}),F('last','Tanggal kontrol terakhir','date',{}),F('masalah','Masalah saat ini','check',{o:['Bracket lepas','Kawat menusuk','Karet putus','Gusi sakit','Tidak ada, kontrol rutin'],full:1})],
 'Pindah kontrol':[F('asal','Nama dokter / klinik sebelumnya','text',{}),F('tipe','Jenis behel','select',{o:['Metal','Keramik','Self-ligating','Clear aligner']}),F('lama','Sudah pakai berapa bulan?','number',{}),F('last','Tanggal kontrol terakhir','date',{}),F('dok','Dokumen yang dibawa','check',{o:['Kartu kontrol','Foto rontgen','Cetakan gigi','Tidak ada'],full:1}),F('alasan','Alasan pindah','textarea',{full:1})]}},
palsu:{n:'Pasien Gigi Palsu',d:'Gigi palsu permanen, bongkar pasang, dan veneer',c:'--c3',p:'P',svc:{
 'Gigi palsu permanen':[F('jenis','Jenis','select',{o:['Mahkota (crown)','Jembatan (bridge)','Implan','Belum tahu']}),F('hilang','Gigi yang hilang','select',{o:GIGI}),F('jml','Jumlah gigi hilang','number',{}),F('lama','Hilang sejak','select',{o:['Kurang dari 3 bulan','3–12 bulan','Lebih dari 1 tahun']}),F('bahan','Bahan yang diminati','select',{o:['Porselen','Zirkonia','Logam-porselen','Sesuai saran dokter']})],
 'Gigi palsu bongkar pasang':[F('rahang','Rahang','radio',{o:['Atas','Bawah','Atas & bawah']}),F('jml','Jumlah gigi yang diganti','number',{}),F('bahan','Bahan','select',{o:['Akrilik','Fleksibel (valplast)','Kerangka logam','Sesuai saran dokter']}),F('pernah','Pernah memakai gigi palsu?','radio',{o:['Belum','Pernah']}),F('ket','Catatan','textarea',{full:1})],
 'Veneer':[F('gigi','Gigi yang ingin diperbaiki','select',{o:['Gigi depan atas (2)','Gigi depan atas (4)','Gigi depan atas (6)','Gigi depan atas & bawah','Belum tahu']}),F('tujuan','Tujuan','check',{o:['Mengubah warna','Menutup celah','Merapikan bentuk','Gigi patah / aus'],full:1}),F('bahan','Bahan','select',{o:['Porselen','Komposit','Sesuai saran dokter']}),F('warna','Warna yang diinginkan','radio',{o:['Putih natural','Putih cerah','Sesuai saran dokter']})]}}};
const B0=[F('bio_kerja','Pekerjaan / sekolah','text')];
const BIO={
umum:[...B0,F('bio_dokter','Terakhir ke dokter gigi','select',{o:['Belum pernah','Kurang dari 6 bulan','6–12 bulan','Lebih dari 1 tahun']}),F('bio_sikat','Menyikat gigi per hari','select',{o:['1 kali','2 kali','3 kali atau lebih']}),F('bio_rokok','Merokok?','radio',{o:['Tidak','Ya']}),F('bio_riwayat','Riwayat perawatan gigi sebelumnya','textarea',{full:1})],
behel:[...B0,F('bio_wali','Nama orang tua / wali (jika di bawah 18 tahun)','text'),F('bio_cabut','Pernah cabut gigi untuk behel?','radio',{o:['Belum','Pernah']}),F('bio_keluarga','Ada keluarga dengan gigi tonggos / rahang tidak rata?','radio',{o:['Tidak','Ya']}),F('bio_kebiasaan','Kebiasaan','check',{o:['Menghisap jempol','Menggigit kuku','Bernapas lewat mulut','Menggigit pensil / benda keras'],full:1})],
palsu:[...B0,F('bio_rokok','Merokok?','radio',{o:['Tidak','Ya']}),F('bio_tulang','Pernah mengonsumsi obat osteoporosis?','radio',{o:['Tidak','Ya']}),F('bio_cabut','Pencabutan gigi terakhir','select',{o:['Belum pernah','Kurang dari 3 bulan','3–12 bulan','Lebih dari 1 tahun']}),F('bio_kebiasaan','Kebiasaan','check',{o:['Mengunyah satu sisi','Menggertakkan gigi','Sering minum kopi / teh / soda'],full:1}),F('bio_lalu','Pengalaman gigi palsu atau perawatan sebelumnya','textarea',{full:1})]};
const $=s=>document.querySelector(s),app=$('#app');
const W=()=>{};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chips=(name,o,t,r)=>`<div class="chips">${o.map((v,i)=>`<label class="chip"><input type="${t}" name="${name}" value="${esc(v)}" ${r&&i==0&&t=='radio'?'required':''}><span>${esc(v)}</span></label>`).join('')}</div>`;
const Q=[['Kanan atas',[18,17,16,15,14,13,12,11]],['Kiri atas',[21,22,23,24,25,26,27,28]],['Kanan bawah',[48,47,46,45,44,43,42,41]],['Kiri bawah',[31,32,33,34,35,36,37,38]]];
function field(f){const n='x_'+f.id,full=f.full||f.type=='textarea'||f.type=='check'||f.type=='range'||f.type=='gigi'?' full':'';let h='';
 if(f.type=='select')h=`<select id="${n}" name="${n}" ${f.r?'required':''}><option value="">Pilih…</option>${f.o.map(v=>`<option>${esc(v)}</option>`).join('')}</select>`;
 else if(f.type=='radio')h=chips(n,f.o,'radio',f.r);
 else if(f.type=='gigi')h=`<div class="chart">${Q.map(q=>`<div><div class="ql">${q[0]}</div><div class="qr${q[0].includes('bawah')?' lo':''}">${q[1].map(t=>`<label class="tooth"><input type="checkbox" name="${n}" value="${t}"><span>${t}</span></label>`).join('')}</div></div>`).join('')}</div><p class="sel">Belum ada gigi dipilih. Tekan nomor gigi pada bagan.</p>`;
 else if(f.type=='check')h=chips(n,f.o,'checkbox');
 else if(f.type=='range')h=`<div class="rng"><input type="range" id="${n}" name="${n}" min="1" max="10" value="5"><b>5</b></div>`;
 else if(f.type=='textarea')h=`<textarea id="${n}" name="${n}"></textarea>`;
 else h=`<input id="${n}" name="${n}" type="${f.type}" ${f.type=='number'?'min="0"':''} placeholder="${f.ph||''}" ${f.r?'required':''}>`;
 return `<div class="f${full}"><span class="l ${f.r?'req':''}">${f.label}</span>${h}</div>`}
function home(){W('');try{history.replaceState(null,'',location.pathname)}catch(e){}
 app.innerHTML=`<h1>Daftar berobat ke dokter gigi</h1><p class="lead">Pilih jenis pasien sesuai keperluan Anda. Setiap jenis punya formulir yang berbeda agar dokter sudah siap saat Anda datang.</p><div class="cats">${Object.entries(CATS).map(([k,c])=>`<button type="button" class="cat" data-act="form" data-k="${k}" style="--c:var(${c.c})"><i></i><div><h3>${c.n}</h3><p>${c.d}</p></div></button>`).join('')}</div><button type="button" class="btn alt" style="margin-top:18px" data-act="list">Lihat pasien terdaftar</button>`}
function form(k){W('');const C=CATS[k],names=Object.keys(C.svc);
 app.innerHTML=`<button type="button" class="back" data-act="home">‹ Ganti jenis pasien</button>
 <div class="head" style="--c:var(${C.c})"><h2>Formulir ${C.n}</h2><p>${C.d}</p></div>
 <form id="fm" style="--c:var(${C.c})" novalidate>
 <fieldset><legend>Layanan</legend><div class="f"><span class="l req">Pilih layanan</span><div class="chips">${names.map(s=>`<label class="chip"><input type="radio" name="layanan" value="${s}"><span>${s}</span></label>`).join('')}</div></div><div id="sub"></div></fieldset>
 <fieldset><legend>Data pasien</legend><div class="grid">
 <div class="f full"><label class="l req" for="nama">Nama lengkap</label><input id="nama" name="nama" type="text" autocomplete="name" required></div>
 <div class="f"><label class="l" for="lahir">Tanggal lahir</label><input id="lahir" name="lahir" type="date"></div>
 <div class="f"><span class="l">Jenis kelamin</span>${chips('jk',G,'radio')}</div>
 <div class="f"><label class="l" for="hp">No. WhatsApp</label><input id="hp" name="hp" type="tel" inputmode="tel" placeholder="08xxxxxxxxxx"></div>
 <div class="f full"><label class="l req" for="alamat">Alamat</label><input id="alamat" name="alamat" type="text" autocomplete="street-address" required></div>
 <div class="f full"><span class="l">Riwayat kesehatan</span>${chips('sakit',['Diabetes','Hipertensi','Jantung','Hemofilia','Asma','Hamil'],'checkbox')}</div>
 <div class="f full"><label class="l" for="alergi">Alergi obat / bahan</label><input id="alergi" name="alergi" type="text" placeholder="Kosongkan jika tidak ada"></div></div></fieldset>
 <fieldset><legend>Data lengkap ${C.n}</legend><div class="grid">${BIO[k].map(field).join('')}</div></fieldset>
 <fieldset><legend>Jadwal kunjungan</legend><div class="grid">
 <div class="f"><label class="l" for="tgl">Tanggal</label><input id="tgl" name="tgl" type="date"></div>
 <div class="f"><label class="l" for="jam">Jam</label><select id="jam" name="jam"><option value="">Pilih…</option>${[9,10,11,13,14,15,16,17,18].map(h=>`<option>${String(h).padStart(2,'0')}:00</option>`).join('')}</select></div></div></fieldset>
 <p class="err" id="err" role="alert"></p><button class="btn" type="submit">Kirim pendaftaran</button></form>`;
 const d=new Date(),iso=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 $('#tgl').min=iso;$('#lahir').max=iso;
 $('#fm').addEventListener('change',e=>{if(e.target.name=='layanan'){$('#sub').innerHTML=`<div class="sub"><div class="grid">${C.svc[e.target.value].map(field).join('')}</div></div>`}});
 $('#fm').addEventListener('submit',e=>{e.preventDefault();submit(k,C)});
 try{history.replaceState(null,'','#'+k)}catch(e){}}
function submit(k,C){const fm=$('#fm'),fd=new FormData(fm),err=$('#err');
 if(!fd.get('layanan')){err.textContent='Pilih layanan terlebih dahulu.';return}
 const bad=[...fm.querySelectorAll('[required]')].find(i=>i.type=='radio'?!fm.querySelector(`[name="${i.name}"]:checked`):!i.value.trim());
 if(bad){err.textContent='Lengkapi kolom yang bertanda *.';bad.focus();return}
 if(fd.get('hp').trim()&&!/^(\+62|62|0)8\d{7,12}$/.test(fd.get('hp').replace(/[\s-]/g,''))){err.textContent='Nomor WhatsApp tidak valid. Contoh: 081234567890';$('#hp').focus();return}
 const L=C.svc[fd.get('layanan')],det=L.map(f=>{const v=fd.getAll('x_'+f.id).filter(Boolean).join(', ');return v?[f.label,v]:null}).filter(Boolean);
 const d0=new Date(),tv=fd.get('tgl')||(d0.getFullYear()+'-'+String(d0.getMonth()+1).padStart(2,'0')+'-'+String(d0.getDate()).padStart(2,'0')),t=tv.replaceAll('-','').slice(2),no=C.p+'-'+t+'-'+String(Math.floor(Math.random()*900)+100);
 const tgl=fd.get('tgl')?new Date(fd.get('tgl')+'T00:00').toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'Belum dipilih',jam=fd.get('jam')||'-';
 const rows=[['Jenis pasien',C.n],['Layanan',fd.get('layanan')],['Nama',fd.get('nama')],['WhatsApp',fd.get('hp')],['Jadwal',fd.get('tgl')?tgl+', '+jam:'Belum dipilih'],...det];
 const ex=[];if(fd.get('lahir'))ex.push(['Tanggal lahir',new Date(fd.get('lahir')+'T00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})]);if(fd.get('jk'))ex.push(['Jenis kelamin',fd.get('jk')]);if(fd.get('alamat'))ex.push(['Alamat',fd.get('alamat')]);rows.splice(5,0,...ex);
 BIO[k].forEach(f=>{const v=fd.getAll('x_'+f.id).filter(Boolean).join(', ');if(v)rows.push([f.label,v])});
 const sk=fd.getAll('sakit').join(', ');if(sk)rows.push(['Riwayat kesehatan',sk]);if(fd.get('alergi'))rows.push(['Alergi',fd.get('alergi')]);
 app.innerHTML=`<div class="ok" style="--c:var(${C.c})"><h2>Pendaftaran diterima</h2><div class="no">${no}</div><dl>${rows.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl><p class="lead" style="margin-top:0">Simpan nomor pendaftaran ini dan tunjukkan ke resepsionis. Klinik akan menghubungi lewat WhatsApp untuk konfirmasi jadwal.</p><p class="lead" id="st" style="margin-top:0"></p><button type="button" class="btn" data-act="print">Cetak bukti pendaftaran</button><button type="button" class="btn alt" data-act="home">Daftarkan pasien lain</button></div>`;scrollTo(0,0);saveRec({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),t:Date.now(),k,no,nama:fd.get('nama'),layanan:fd.get('layanan'),hp:fd.get('hp'),tgl,jam,rows}).then(ok=>{const s=$('#st');if(s)s.textContent=ok?(API?'Pendaftaran terkirim ke klinik.':'Data tersimpan di daftar klinik.'):(API?'Pendaftaran belum terkirim ke klinik. Periksa koneksi lalu daftar ulang, atau hubungi klinik.':'Data tersimpan di perangkat ini saja. Hubungi klinik untuk konfirmasi.')})}
let DBP=Promise.resolve(null),LOCAL=[],FLT='all',ALL=[],ALLX=[],LEX=[],OPEN='';
const rp=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
try{if(window.claude)DBP=window.claude.use('db').catch(()=>null)}catch(e){}
try{LOCAL=JSON.parse(localStorage.getItem('pasien')||'[]')}catch(e){LOCAL=[]}
try{LEX=JSON.parse(localStorage.getItem('pengeluaran')||'[]')}catch(e){LEX=[]}
async function saveRec(r){let ok=false;
 if(API){try{const x=await api({action:'daftar',rec:r});if(x.ok)return true}catch(e){}}
 const db=await DBP;
 if(db){try{await db.collection('pasien').doc(r.id).set(r);ok=true}catch(e){}}
 try{LOCAL.unshift(r);localStorage.setItem('pasien',JSON.stringify(LOCAL.slice(0,300)))}catch(e){}
 return ok}
async function lihat(){FLT='all';OPEN='';
 let AD=null;
 if(API){if(!KEY){loginView('');return}try{AD=await api({action:'list'})}catch(e){AD={ok:false,err:'net'}}if(!AD.ok){KEY='';loginView(AD.err=='auth'?'PIN salah.':'Gagal terhubung ke server.');return}}
 W('1000px');
 app.innerHTML=`<button type="button" class="back" data-act="home">‹ Kembali</button><h1>Pasien terdaftar</h1><p class="lead" id="info">Memuat data…</p><div class="f"><label class="l" for="q">Cari pasien</label><input id="q" type="text" placeholder="Nama atau nomor pendaftaran"></div><div class="chips" style="--c:var(--teal);margin:14px 0 6px">${[['all','Semua'],['umum','Umum'],['behel','Behel'],['palsu','Gigi palsu']].map((x,i)=>`<label class="chip"><input type="radio" name="flt" value="${x[0]}" ${i?'':'checked'}><span>${x[1]}</span></label>`).join('')}</div><div class="tools"><button type="button" class="btn sb" style="--c:var(--teal)" data-act="cetakall">Cetak semua data pasien</button><button type="button" class="btn sb danger" data-act="hapusall">Hapus semua data pasien</button></div><div id="ha"></div><div class="lg"><span class="pill ok">Sudah bayar</span><span class="pill part">Kurang</span><span class="pill none">Belum bayar</span></div><p class="err" style="color:var(--mute)" id="cnt"></p><div id="ls"></div><div id="ex"></div><h2 style="margin:36px 0 0">Ringkasan keuangan</h2><div class="sum" id="sm"></div><div id="rm"></div>`;
 const m=new Map((API?[]:LOCAL).map(r=>[r.id,r]));let sh=false;const db=API?null:await DBP;
 if(API){AD.pasien.forEach(r=>m.set(r.id,r));sh=true}
 if(db){try{const s=await db.collection('pasien').orderBy('t','desc').get();s.docs.forEach(d=>m.set(d.id,d.data()));sh=true}catch(e){}}
 ALL=[...m.values()].sort((a,b)=>a.t-b.t);
 const mx=new Map((API?AD.pengeluaran:LEX).map(x=>[x.id,x]));
 if(db){try{const s=await db.collection('pengeluaran').get();s.docs.forEach(d=>mx.set(d.id,d.data()))}catch(e){}}
 ALLX=[...mx.values()].sort((a,b)=>a.tgl<b.tgl?-1:a.tgl>b.tgl?1:a.t-b.t);drawX();
 const inf=$('#info');if(inf)inf.textContent=sh?(API?'Menampilkan data klinik dari Google Sheets.':'Menampilkan data klinik dan data dari perangkat ini.'):'Menampilkan pasien yang didaftarkan dari perangkat ini.';
 draw()}
function draw(){const q=($('#q').value||'').toLowerCase(),L=ALL.filter(r=>(FLT=='all'||r.k==FLT)&&(r.nama+' '+r.no).toLowerCase().includes(q));
 $('#cnt').textContent=L.length+' pasien';
 const PP=r=>r.pay||{},sum=(a,f)=>a.reduce((s,r)=>s+(+f(r)||0),0);
 $('#ls').innerHTML=L.length?`<div class="tw"><table class="tb"><thead><tr><th>No</th><th>No. daftar</th><th>Nama pasien</th><th>Jenis pasien</th><th>Layanan</th><th>Jadwal kunjungan</th><th>WhatsApp</th><th>Pembayaran</th><th>Aksi</th></tr></thead><tbody>${L.map(r=>{const C=CATS[r.k]||CATS.umum,p=PP(r),op=OPEN==r.id,sk=!(p.bayar>0)?'none':(p.bayar>=(p.biaya||0)?'ok':'part'),st=sk=='ok'?'<span class="pill ok">Sudah bayar</span>':sk=='part'?`<span class="pill part">Kurang ${rp(p.biaya-p.bayar)}</span>`:'<span class="pill none">Belum bayar</span>';return `<tr class="s-${sk}"><td>${ALL.indexOf(r)+1}</td><td>${esc(r.no)}</td><td><b>${esc(r.nama)}</b></td><td><span class="dot" style="--c:var(${C.c})"></span>${esc(C.n)}</td><td>${esc(r.layanan)}</td><td>${esc(r.tgl)}<br>${esc(r.jam)}</td><td>${esc(r.hp)}</td><td>${rp(p.bayar)}${p.bayar>0&&p.metode?`<br><span class="mt">Metode: ${esc(p.metode)}</span>`:''}<br>${st}</td><td><button type="button" class="del dt" data-act="det" data-id="${esc(r.id)}">${op?'Tutup':'Detail'}</button><button type="button" class="del" data-act="del" data-id="${esc(r.id)}">Hapus</button></td></tr><tr class="dr${op?'':' hide'}" id="d-${esc(r.id)}"><td></td><td colspan="8"><div class="pf"><h3 style="font-size:17px;margin-bottom:10px">Pembayaran</h3><div class="pg"><div class="f"><label class="l">Total biaya (Rp)</label><input type="number" min="0" class="pb" value="${p.biaya||''}"></div><div class="f"><label class="l">Jumlah dibayar (Rp)</label><input type="number" min="0" class="py" value="${p.bayar||''}"></div><div class="f"><label class="l">Metode</label><select class="pm">${['Tunai','Transfer','QRIS','Debit / Kredit','BPJS / Asuransi'].map(m=>`<option${p.metode==m?' selected':''}>${m}</option>`).join('')}</select></div><div class="f"><label class="l">Catatan</label><input type="text" class="pc" value="${esc(p.cat||'')}"></div></div><button type="button" class="btn sb" style="--c:var(--teal);margin:12px 0 0" data-act="pay" data-id="${esc(r.id)}">Simpan pembayaran</button></div><dl style="margin-top:18px">${fullRows(r).map(x=>`<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl></td></tr>`}).join('')}</tbody><tfoot><tr><td colspan="7">Total pasien yang ditampilkan</td><td colspan="2">Biaya ${rp(sum(L,r=>PP(r).biaya))}<br>Dibayar ${rp(sum(L,r=>PP(r).bayar))}</td></tr></tfoot></table></div>`:'<p class="lead">Belum ada pasien yang cocok.</p>';
 summ()}
function fullRows(r){const C=CATS[r.k]||CATS.umum,sv=C.svc[r.layanan]||[],m=new Map((r.rows||[]).map(x=>[x[0],x[1]]));
 const L=[...new Set(['Jenis pasien','Layanan','Nama','Tanggal lahir','Jenis kelamin','WhatsApp','Alamat','Jadwal',...sv.map(f=>f.label),...(BIO[r.k]||[]).map(f=>f.label),'Riwayat kesehatan','Alergi'])];
 const out=L.map(l=>[l,l=='Jenis pasien'?C.n:(m.has(l)&&String(m.get(l)).trim()?m.get(l):'-')]);
 m.forEach((v,l)=>{if(!L.includes(l))out.push([l,String(v).trim()?v:'-'])});return out}
function cetakSemua(){if(!ALL.length){$('#cnt').textContent='Belum ada data pasien untuk dicetak.';return}
 let pr=$('#pr');if(!pr){pr=document.createElement('div');pr.id='pr';document.body.appendChild(pr)}
 const tot=a=>ALL.reduce((s,r)=>s+(+(r.pay&&r.pay[a])||0),0);
 pr.innerHTML=`<h2>${esc(CLINIC)}</h2><p>Daftar pasien terdaftar. Dicetak ${esc(new Date().toLocaleString('id-ID',{dateStyle:'full',timeStyle:'short'}))}. Jumlah pasien: ${ALL.length}.</p><table class="ptab"><thead><tr><th>No</th><th>No. daftar</th><th>Nama pasien</th><th>Jenis pasien</th><th>Layanan</th><th>Jadwal kunjungan</th><th>WhatsApp</th><th class="r">Biaya</th><th class="r">Dibayar</th></tr></thead><tbody>${ALL.map((r,i)=>{const p=r.pay||{},C=CATS[r.k]||CATS.umum;return `<tr><td>${i+1}</td><td>${esc(r.no)}</td><td>${esc(r.nama)}</td><td>${esc(C.n)}</td><td>${esc(r.layanan)}</td><td>${esc(r.tgl)}, ${esc(r.jam)}</td><td>${esc(r.hp)}</td><td class="r">${p.biaya?rp(p.biaya):'-'}</td><td class="r">${p.bayar?rp(p.bayar)+(p.metode?' ('+esc(p.metode)+')':''):'-'}</td></tr><tr class="dt"><td></td><td colspan="8">${esc(r.rows.slice(5).map(x=>x[0]+': '+x[1]).join('; '))}</td></tr>`}).join('')}</tbody><tfoot><tr><td colspan="7">Total</td><td class="r">${rp(tot('biaya'))}</td><td class="r">${rp(tot('bayar'))}</td></tr></tfoot></table>`;
 document.body.classList.add('cetak');
 addEventListener('afterprint',()=>document.body.classList.remove('cetak'),{once:true});
 setTimeout(()=>{window.print();setTimeout(()=>document.body.classList.remove('cetak'),800)},60)}
function panelHapus(){$('#ha').innerHTML=`<div class="ha"><p><b>Hapus semua data pasien?</b> Seluruh ${ALL.length} pasien beserta data pembayarannya akan dihapus permanen dan tidak bisa dikembalikan. Data pengeluaran tidak ikut terhapus. Ketik HAPUS untuk melanjutkan.</p><div class="xr2"><input id="hv" type="text" autocomplete="off" aria-label="Ketik HAPUS"><button type="button" class="btn sb danger fill" data-act="hapusall2">Hapus permanen</button><button type="button" class="del dt" data-act="batalhapus">Batal</button></div><p class="err" id="hae" style="margin:8px 0 0"></p></div>`;$('#hv').focus()}
async function hapusSemua(){const v=($('#hv').value||'').trim().toUpperCase(),e=$('#hae');
 if(v!=='HAPUS'){e.textContent='Ketik HAPUS (huruf besar) untuk konfirmasi.';return}
 e.textContent='Menghapus…';
 if(API){try{const x=await api({action:'hapussemua'});if(!x.ok)throw 0}catch(err){e.textContent='Gagal menghapus di server. Data tidak berubah.';return}}
 const db=API?null:await DBP;
 if(db){for(const r of ALL){try{await db.collection('pasien').doc(r.id).delete()}catch(x){}}}
 LOCAL=[];try{localStorage.removeItem('pasien')}catch(x){}
 ALL=[];OPEN='';$('#ha').innerHTML='';draw()}
async function hapus(id){if(API){try{await api({action:'hapus',id})}catch(e){}}const db=API?null:await DBP;if(db){try{await db.collection('pasien').doc(id).delete()}catch(e){}}
 LOCAL=LOCAL.filter(r=>r.id!=id);try{localStorage.setItem('pasien',JSON.stringify(LOCAL))}catch(e){}
 ALL=ALL.filter(r=>r.id!=id);draw()}
function summ(){const el=$('#sm');if(!el)return;
 const P=ALL.reduce((s,r)=>s+(+(r.pay&&r.pay.bayar)||0),0),K=ALL.reduce((s,r)=>{const p=r.pay;return s+(p?Math.max(0,(+p.biaya||0)-(+p.bayar||0)):0)},0),X=ALLX.reduce((s,x)=>s+x.jml,0),S=P-X;
 el.innerHTML=`<div><span>Total pemasukan</span><b>${rp(P)}</b></div><div><span>Belum dibayar</span><b>${rp(K)}</b></div><div><span>Total pengeluaran</span><b>${rp(X)}</b></div><div><span>Saldo (pemasukan dikurangi pengeluaran)</span><b style="color:${S<0?'var(--warn)':'inherit'}">${rp(S)}</b></div>`;
 const rm=$('#rm');if(rm){const M={};ALL.forEach(r=>{const p=r.pay;if(p&&p.bayar>0){const k=p.metode||'Tidak dicatat';M[k]=M[k]||{n:0,t:0};M[k].n++;M[k].t+=+p.bayar}});
  const O=['Tunai','Transfer','QRIS','Debit / Kredit','BPJS / Asuransi'];Object.keys(M).forEach(k=>{if(!O.includes(k))O.push(k)});
  rm.innerHTML=`<h3 style="font-size:18px;margin:26px 0 10px">Rekap pemasukan per metode</h3><div class="tw" style="max-width:640px"><table class="tb rk" style="min-width:420px"><thead><tr><th>Metode</th><th class="r">Jumlah pembayaran</th><th class="r">Total pemasukan</th><th class="r">Porsi</th></tr></thead><tbody>${O.map(k=>{const m=M[k]||{n:0,t:0};return `<tr><td>${esc(k)}</td><td class="r">${m.n}</td><td class="r">${rp(m.t)}</td><td class="r">${P?Math.round(m.t/P*100):0}%</td></tr>`}).join('')}</tbody><tfoot><tr><td>Total</td><td class="r">${Object.values(M).reduce((s,m)=>s+m.n,0)}</td><td class="r">${rp(P)}</td><td class="r">${P?'100%':'0%'}</td></tr></tfoot></table></div>`}}
function drawX(){const el=$('#ex');if(!el)return;const b=new Date(),td=b.getFullYear()+'-'+String(b.getMonth()+1).padStart(2,'0')+'-'+String(b.getDate()).padStart(2,'0');
 const T=ALLX.reduce((s,x)=>s+x.jml,0),fd=s=>new Date(s+'T00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
 el.innerHTML=`<h2 style="margin:36px 0 12px">Pengeluaran</h2><div class="xf" style="--c:var(--teal)"><div class="xr"><div class="f"><label class="l">Tanggal</label><input type="date" class="xt" value="${td}"></div><div class="f"><label class="l">Keterangan</label><input type="text" class="xk" placeholder="Contoh: bahan tambal, listrik"></div><div class="f"><label class="l">Jumlah (Rp)</label><input type="number" min="0" class="xj"></div><button type="button" class="btn sb" data-act="addx">Tambah</button></div><p class="err xe"></p></div>${ALLX.length?`<div class="tw"><table class="tb" style="min-width:560px"><thead><tr><th>No</th><th>Tanggal</th><th>Keterangan</th><th class="r">Jumlah</th><th>Aksi</th></tr></thead><tbody>${ALLX.map((x,i)=>`<tr><td>${i+1}</td><td>${fd(x.tgl)}</td><td>${esc(x.ket)}</td><td class="r">${rp(x.jml)}</td><td><button type="button" class="del" data-act="delx" data-id="${esc(x.id)}">Hapus</button></td></tr>`).join('')}</tbody><tfoot><tr><td colspan="3">Total pengeluaran</td><td class="r">${rp(T)}</td><td></td></tr></tfoot></table></div>`:'<p class="lead">Belum ada pengeluaran yang dicatat.</p>'}`}
async function bayar(id,box){const r=ALL.find(x=>x.id==id);if(!r||!box)return;const g=c=>box.querySelector('.'+c).value;
 const n={...r,pay:{biaya:+g('pb')||0,bayar:+g('py')||0,metode:g('pm'),cat:g('pc').trim(),t:Date.now()}};const db=API?null:await DBP;
 if(API){try{const x=await api({action:'bayar',id,pay:n.pay});if(!x.ok)throw 0}catch(e){alert('Gagal menyimpan pembayaran ke server.');return}}
 if(db){try{await db.collection('pasien').doc(id).set(n)}catch(e){}}
 LOCAL=LOCAL.filter(x=>x.id!=id);LOCAL.unshift(n);try{localStorage.setItem('pasien',JSON.stringify(LOCAL.slice(0,300)))}catch(e){}
 ALL[ALL.indexOf(r)]=n;OPEN=id;draw()}
async function tambahX(box){const g=c=>box.querySelector('.'+c).value,jml=+g('xj'),ket=g('xk').trim(),tgl=g('xt');
 if(!ket||!(jml>0)||!tgl){box.querySelector('.xe').textContent='Isi tanggal, keterangan, dan jumlah pengeluaran.';return}
 const r={id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),t:Date.now(),tgl,ket,jml},db=API?null:await DBP;
 if(API){try{await api({action:'xadd',rec:r})}catch(e){}}
 if(db){try{await db.collection('pengeluaran').doc(r.id).set(r)}catch(e){}}
 LEX.unshift(r);try{localStorage.setItem('pengeluaran',JSON.stringify(LEX.slice(0,500)))}catch(e){}
 ALLX.push(r);ALLX.sort((a,b)=>a.tgl<b.tgl?-1:a.tgl>b.tgl?1:a.t-b.t);drawX();draw()}
async function hapusX(id){if(API){try{await api({action:'xdel',id})}catch(e){}}const db=API?null:await DBP;if(db){try{await db.collection('pengeluaran').doc(id).delete()}catch(e){}}
 LEX=LEX.filter(x=>x.id!=id);try{localStorage.setItem('pengeluaran',JSON.stringify(LEX))}catch(e){}
 ALLX=ALLX.filter(x=>x.id!=id);drawX();draw()}
app.addEventListener('change',e=>{const ch=e.target.closest('.chart');if(ch){const v=[...ch.querySelectorAll('input:checked')].map(i=>i.value);ch.nextElementSibling.textContent=v.length?'Gigi dipilih: '+v.join(', '):'Belum ada gigi dipilih. Tekan nomor gigi pada bagan.'}if(e.target.name=='flt'){FLT=e.target.value;draw()}});
app.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;if(a=='form')form(t.dataset.k);else if(a=='home')home();else if(a=='print')window.print();else if(a=='list')lihat();else if(a=='cetakall')cetakSemua();else if(a=='hapusall')panelHapus();else if(a=='hapusall2')hapusSemua();else if(a=='batalhapus')$('#ha').innerHTML='';else if(a=='login'){KEY=($('#pin').value||'').trim();lihat()}else if(a=='det'){const x=document.getElementById('d-'+t.dataset.id);if(x){x.classList.toggle('hide');OPEN=x.classList.contains('hide')?'':t.dataset.id;t.textContent=x.classList.contains('hide')?'Detail':'Tutup'}}else if(a=='pay')bayar(t.dataset.id,t.closest('.pf'));else if(a=='addx')tambahX(t.closest('.xf'));else if(a=='delx'){if(!t.dataset.s){t.dataset.s=1;t.textContent='Yakin?';return}hapusX(t.dataset.id)}else if(a=='del'){if(!t.dataset.s){t.dataset.s=1;t.textContent='Tekan lagi untuk menghapus';return}hapus(t.dataset.id)}});
app.addEventListener('input',e=>{if(e.target.type=='range')e.target.nextElementSibling.textContent=e.target.value;if(e.target.id=='q')draw()});
const CLINIC='Klinik Gigi & Mulut';
$('#cn').textContent=CLINIC;document.title='Pendaftaran Pasien – '+CLINIC;
function tick(){const d=new Date();
 $('#tgl-now').textContent=d.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 $('#jam-now').textContent=d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).replace(/\./g,':');
 $('#zona').textContent={'-420':'WIB','-480':'WITA','-540':'WIT'}[d.getTimezoneOffset()]||''}
tick();setInterval(tick,1000);
const fsb=$('#fsb');if(!document.fullscreenEnabled)fsb.style.display='none';
fsb.addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})});
document.addEventListener('fullscreenchange',()=>{fsb.textContent=document.fullscreenElement?'Keluar layar penuh':'Layar penuh'});
const h=location.hash.slice(1);CATS[h]?form(h):home();
