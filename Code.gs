// Server penyimpanan pendaftaran pasien (Google Apps Script + Google Sheets)
// GANTI PIN di bawah sebelum dipakai. PIN ini dipakai staf untuk membuka daftar pasien.
const PIN = '1503';

const HP = ['id','t','json','no_daftar','nama','jenis','layanan','whatsapp','tanggal','jam','biaya','dibayar','metode'];
const HX = ['id','t','json','tanggal','keterangan','jumlah'];

function sheet_(nama, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(nama);
  if (!s) {
    s = ss.insertSheet(nama);
    s.appendRow(header);
    s.setFrozenRows(1);
    // Kolom teks diformat sebagai teks agar isian pasien tidak dibaca sebagai rumus
    if (nama === 'pasien') s.getRange('D:J').setNumberFormat('@');
    else s.getRange('D:E').setNumberFormat('@');
  }
  return s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function row_(s, id) {
  const n = s.getLastRow();
  if (n < 2) return 0;
  const v = s.getRange(2, 1, n - 1, 1).getValues();
  for (let i = 0; i < v.length; i++) if (String(v[i][0]) === String(id)) return i + 2;
  return 0;
}

function pRow_(r) {
  const p = r.pay || {};
  return [r.id, r.t, JSON.stringify(r), r.no, r.nama, r.k, r.layanan, r.hp, r.tgl, r.jam, p.biaya || '', p.bayar || '', p.metode || ''];
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    if (!e.postData || e.postData.length > 60000) return out_({ ok: false, err: 'size' });
    const b = JSON.parse(e.postData.contents);
    const P = sheet_('pasien', HP), X = sheet_('pengeluaran', HX);

    // Pendaftaran dari pasien (terbuka untuk umum, hanya bisa menambah)
    if (b.action === 'daftar') {
      const r = b.rec;
      if (!r || !r.id || !r.nama || row_(P, r.id)) return out_({ ok: false, err: 'invalid' });
      delete r.pay;
      P.appendRow(pRow_(r));
      return out_({ ok: true });
    }

    // Semua aksi di bawah ini khusus staf (wajib PIN)
    if (b.key !== PIN) return out_({ ok: false, err: 'auth' });

    if (b.action === 'list') {
      const baca = s => { const n = s.getLastRow(); return n < 2 ? [] : s.getRange(2, 3, n - 1, 1).getValues().map(r => JSON.parse(r[0])); };
      return out_({ ok: true, pasien: baca(P), pengeluaran: baca(X) });
    }
    if (b.action === 'bayar') {
      const i = row_(P, b.id);
      if (!i) return out_({ ok: false });
      const r = JSON.parse(P.getRange(i, 3).getValue());
      r.pay = b.pay;
      P.getRange(i, 1, 1, HP.length).setValues([pRow_(r)]);
      return out_({ ok: true });
    }
    if (b.action === 'hapus') {
      const i = row_(P, b.id);
      if (i) P.deleteRow(i);
      return out_({ ok: true });
    }
    if (b.action === 'hapussemua') {
      const n = P.getLastRow();
      if (n > 1) P.deleteRows(2, n - 1);
      return out_({ ok: true });
    }
    if (b.action === 'xadd') {
      const r = b.rec;
      if (!row_(X, r.id)) X.appendRow([r.id, r.t, JSON.stringify(r), r.tgl, r.ket, r.jml]);
      return out_({ ok: true });
    }
    if (b.action === 'xdel') {
      const i = row_(X, b.id);
      if (i) X.deleteRow(i);
      return out_({ ok: true });
    }
    return out_({ ok: false, err: 'aksi' });
  } catch (err) {
    return out_({ ok: false, err: String(err) });
  } finally {
    lock.releaseLock();
  }
}
