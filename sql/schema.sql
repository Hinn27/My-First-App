-- Run this once to create the table

-- Needs pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS mon_an (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loai_mon_an VARCHAR(50) NOT NULL, -- Cơm, Bún, mì, phở, ...
  ten_mon_an VARCHAR(100) NOT NULL,
  mo_ta TEXT,
  hinh_anh VARCHAR(255),
  gia_nho DECIMAL(10,0),
  gia_vua DECIMAL(10,0),
  gia_lon DECIMAL(10,0),
  gia_mac_dinh DECIMAL(10,0),
  is_kich_co BOOLEAN NOT NULL DEFAULT TRUE,
  is_hien_thi BOOLEAN NOT NULL DEFAULT TRUE,
  thu_tu_hien_thi INT DEFAULT 0,
  diem_danh_gia_trung_binh DECIMAL(2,1) DEFAULT 0.0,
  so_luot_danh_gia INT DEFAULT 0,
  ngay_tao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ngay_cap_nhat TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to auto-update ngay_cap_nhat on update
CREATE OR REPLACE FUNCTION set_ngay_cap_nhat()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ngay_cap_nhat = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_ngay_cap_nhat ON mon_an;
CREATE TRIGGER trg_set_ngay_cap_nhat
BEFORE UPDATE ON mon_an
FOR EACH ROW EXECUTE FUNCTION set_ngay_cap_nhat();
