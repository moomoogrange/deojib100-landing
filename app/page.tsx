"use client";

import { useState, useEffect, useRef } from "react";

const BRAND = {
  warmIvory: "#F5F0E8",
  cream: "#FAF7F2",
  warmEarth: "#8B6F4E",
  deepBrown: "#5C4033",
  coralRoof: "#D4756B",
  sageGreen: "#7A8B6F",
  dawnGold: "#C4A46C",
  softSand: "#E8DFD0",
  lightSage: "#E8EDE5",
};

function LogoSVG({ size = 280 }: { size?: number }) {
  return (
    <svg viewBox="0 0 400 260" width={size} style={{ display: "block" }}>
      <path
        d="M60 200 Q80 240 200 240 Q320 240 340 200 Q300 220 200 220 Q100 220 60 200Z"
        fill="none"
        stroke={BRAND.deepBrown}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M80 200 Q90 210 200 215 Q310 210 320 200"
        fill="none"
        stroke={BRAND.deepBrown}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M90 195 Q100 205 200 208 Q300 205 310 195"
        fill="none"
        stroke={BRAND.deepBrown}
        strokeWidth="1.5"
        opacity="0.3"
      />
      <rect x="140" y="120" width="70" height="55" rx="2" fill={BRAND.lightSage} stroke={BRAND.deepBrown} strokeWidth="1.5" />
      <polygon points="130,122 175,85 220,122" fill={BRAND.coralRoof} stroke={BRAND.deepBrown} strokeWidth="1.5" />
      <rect x="167" y="148" width="16" height="27" rx="2" fill={BRAND.warmIvory} stroke={BRAND.deepBrown} strokeWidth="1" />
      <rect x="150" y="138" width="10" height="10" rx="1" fill={BRAND.warmIvory} stroke={BRAND.deepBrown} strokeWidth="0.8" />
      <rect x="190" y="92" width="10" height="20" rx="1" fill={BRAND.softSand} stroke={BRAND.deepBrown} strokeWidth="1" />
    </svg>
  );
}

function WaveDivider() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: "100%", height: "40px" }}>
        <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill={BRAND.warmIvory} />
      </svg>
    </div>
  );
}

function GalleryImage({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "4/3",
        background: BRAND.softSand,
        opacity: loaded ? 1 : 0.5,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.6s ease ${delay}s`,
        boxShadow: "0 4px 20px rgba(92,64,51,0.1)",
      }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function PillarCard({
  icon,
  title,
  subtitle,
  desc,
  color,
}: {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "28px 24px",
        boxShadow: "0 2px 16px rgba(92,64,51,0.06)",
        borderTop: `4px solid ${color}`,
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>
      <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "18px", fontWeight: 700, color: BRAND.deepBrown, margin: "0 0 4px" }}>
        {title}
      </h3>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: BRAND.dawnGold, margin: "0 0 10px" }}>
        {subtitle}
      </p>
      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#6B5B4F", margin: 0, fontWeight: 300 }}>
        {desc}
      </p>
    </div>
  );
}

type FormData = {
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  message: string;
};

type Registration = FormData & { id: string; timestamp: string };

export default function DeoJib100Landing() {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    phone: "",
    childName: "",
    childAge: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("deojib100-rsvp-list");
      if (stored) {
        setRegistrations(JSON.parse(stored));
      }
    } catch {
      // No registrations yet
    }
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    if (!formData.parentName || !formData.phone || !formData.childName || !formData.childAge) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    const newReg: Registration = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updated = [...registrations, newReg];
    try {
      localStorage.setItem("deojib100-rsvp-list", JSON.stringify(updated));
      setRegistrations(updated);
      setSubmitted(true);
    } catch {
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const spotsLeft = 7 - registrations.length;

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", background: BRAND.cream, minHeight: "100vh", color: BRAND.deepBrown }}>
      {/* ═══════ HERO ═══════ */}
      <section
        style={{
          background: `linear-gradient(180deg, ${BRAND.warmIvory} 0%, ${BRAND.cream} 100%)`,
          textAlign: "center",
          padding: "60px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <LogoSVG size={220} />
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "36px", fontWeight: 700, margin: "8px 0 4px", letterSpacing: "-0.5px", color: BRAND.deepBrown }}>
            더집100
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", letterSpacing: "2px", color: BRAND.dawnGold, margin: "0 0 20px", textTransform: "uppercase" }}>
            Building Homes Together 100
          </p>
          <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "18px", fontWeight: 400, lineHeight: 1.8, color: BRAND.warmEarth, maxWidth: "360px", margin: "0 auto 24px" }}>
            함께 짓는 백 년의 집
          </p>
          <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", borderRadius: "16px", padding: "20px 24px", maxWidth: "400px", margin: "0 auto", border: `1px solid ${BRAND.softSand}` }}>
            <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", lineHeight: 1.9, color: BRAND.deepBrown, margin: "0 0 8px", fontWeight: 400 }}>
              &ldquo;수고하고 무거운 짐 진 자들아<br />다 내게로 오라<br />내가 너희를 쉬게 하리라&rdquo;
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: BRAND.dawnGold, margin: 0 }}>
              — 마태복음 11:28
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ EVENT INFO ═══════ */}
      <section style={{ padding: "48px 24px", maxWidth: "480px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", letterSpacing: "3px", color: BRAND.dawnGold, textTransform: "uppercase", margin: "0 0 8px" }}>
            One-Day Workshop
          </p>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: BRAND.deepBrown, margin: "0 0 8px" }}>
            원데이 집 만들기
          </h2>
          <p style={{ fontSize: "15px", color: BRAND.warmEarth, margin: 0, fontWeight: 300 }}>
            자유롭게 상상하고, 손으로 짓는 하루
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          {[
            { label: "날짜", value: "5월 2일 (금)", icon: "📅" },
            { label: "시간", value: "10:30 ~ 12:30", icon: "⏰" },
            { label: "참가비", value: "10,000원", icon: "💰" },
            { label: "정원", value: `7명 (잔여 ${Math.max(spotsLeft, 0)}명)`, icon: "👦" },
          ].map((item, i) => (
            <div key={i} style={{ background: "white", borderRadius: "14px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 12px rgba(92,64,51,0.05)" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
              <p style={{ fontSize: "11px", color: BRAND.dawnGold, margin: "0 0 4px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</p>
              <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: BRAND.deepBrown, margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div style={{ background: BRAND.lightSage, borderRadius: "14px", padding: "20px", borderLeft: `4px solid ${BRAND.sageGreen}` }}>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: BRAND.deepBrown, margin: 0, fontWeight: 300 }}>
            나무, 흙, 돌, 나뭇가지... 자연의 재료로 나만의 작은 집을 만들어요.
            정해진 틀 없이, 아이의 상상력이 이끄는 대로 자유롭게 짓습니다.
            서툴러도 괜찮아요. 실수도 이 집의 일부가 됩니다.
          </p>
        </div>
      </section>

      {/* ═══════ PHILOSOPHY ═══════ */}
      <section style={{ background: BRAND.warmIvory, padding: "48px 24px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", letterSpacing: "3px", color: BRAND.dawnGold, textTransform: "uppercase", margin: "0 0 8px" }}>
              Our Philosophy
            </p>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "22px", fontWeight: 700, color: BRAND.deepBrown, margin: 0 }}>
              더집100의 네 기둥
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <PillarCard icon="🤝" title="더불어 짓기" subtitle="Co-Building" desc="혼자서는 집을 지을 수 없습니다. 역할이 아닌 관계로 세워집니다." color={BRAND.coralRoof} />
            <PillarCard icon="⏳" title="백 년의 믿음" subtitle="Century of Faith" desc="노아처럼, 백 년을 믿습니다. 천천히, 깊이, 함께." color={BRAND.dawnGold} />
            <PillarCard icon="🔨" title="손으로 배우기" subtitle="Learning by Making" desc="손끝의 배움은 몸에 새겨집니다. 망치질이 곧 학습입니다." color={BRAND.sageGreen} />
            <PillarCard icon="♻️" title="회복과 재창조" subtitle="Re-Creation" desc="부러진 나무도 다시 씁니다. 실패를 재료로 삼는 법을 배웁니다." color={BRAND.warmEarth} />
          </div>
        </div>
      </section>

      {/* ═══════ MANIFESTO ═══════ */}
      <section style={{ background: BRAND.deepBrown, padding: "48px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", lineHeight: 2.2, color: BRAND.warmIvory, fontWeight: 400, margin: 0 }}>
            우리는 집을 짓습니다.<br />
            그러나 완성하지 않습니다.<br /><br />
            한 아이가 못 하나를 박으면<br />
            그 못은 백 년을 견디는<br />
            이야기가 됩니다.<br /><br />
            <span style={{ color: BRAND.dawnGold, fontStyle: "italic" }}>
              서툰 톱질도, 비뚤어진 못질도,<br />
              모두 이 집의 일부가 됩니다.
            </span>
          </p>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", letterSpacing: "3px", color: BRAND.dawnGold, textTransform: "uppercase", margin: "0 0 8px" }}>
              Gallery
            </p>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "22px", fontWeight: 700, color: BRAND.deepBrown, margin: 0 }}>
              손끝에서 태어나는 집들
            </h2>
          </div>
          <div style={{ display: "grid", gap: "14px" }}>
            <GalleryImage src="/images/gallery-01.jpeg" alt="더집100 작품" delay={0} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <GalleryImage src="/images/gallery-02.jpeg" alt="더집100 작품" delay={0.1} />
              <GalleryImage src="/images/gallery-03.jpeg" alt="더집100 작품" delay={0.2} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <GalleryImage src="/images/gallery-04.jpeg" alt="더집100 작품" delay={0.3} />
              <GalleryImage src="/images/gallery-05.png" alt="더집100 작품" delay={0.4} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <GalleryImage src="/images/gallery-06.jpeg" alt="더집100 작품" delay={0.5} />
              <GalleryImage src="/images/gallery-07.jpeg" alt="더집100 작품" delay={0.6} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ RSVP FORM ═══════ */}
      <section ref={formRef} style={{ background: BRAND.warmIvory, padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: "420px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", letterSpacing: "3px", color: BRAND.dawnGold, textTransform: "uppercase", margin: "0 0 8px" }}>
              Registration
            </p>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "22px", fontWeight: 700, color: BRAND.deepBrown, margin: "0 0 8px" }}>
              참가 신청
            </h2>
            {!loading && (
              <p style={{ fontSize: "14px", color: BRAND.warmEarth, margin: 0, fontWeight: 300 }}>
                {spotsLeft > 0 ? `현재 ${registrations.length}명 신청 / 잔여 ${spotsLeft}석` : "정원이 마감되었습니다"}
              </p>
            )}
          </div>

          {submitted ? (
            <div style={{ background: "white", borderRadius: "20px", padding: "40px 24px", textAlign: "center", boxShadow: "0 4px 24px rgba(92,64,51,0.08)" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏠</div>
              <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "20px", color: BRAND.deepBrown, margin: "0 0 12px" }}>신청이 완료되었습니다!</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.8, color: BRAND.warmEarth, fontWeight: 300 }}>
                5월 2일, 함께 집을 지어요.<br />당일 10:20까지 와주세요.
              </p>
            </div>
          ) : spotsLeft <= 0 ? (
            <div style={{ background: "white", borderRadius: "20px", padding: "40px 24px", textAlign: "center", boxShadow: "0 4px 24px rgba(92,64,51,0.08)" }}>
              <p style={{ fontSize: "16px", color: BRAND.warmEarth }}>
                정원이 마감되었습니다.<br />다음 워크숍을 기대해주세요!
              </p>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: "20px", padding: "28px 24px", boxShadow: "0 4px 24px rgba(92,64,51,0.08)" }}>
              {(
                [
                  { key: "parentName", label: "보호자 이름", placeholder: "홍길동", required: true },
                  { key: "phone", label: "연락처", placeholder: "010-0000-0000", required: true },
                  { key: "childName", label: "아이 이름", placeholder: "홍길순", required: true },
                  { key: "childAge", label: "아이 나이", placeholder: "8세", required: true },
                ] as const
              ).map((field) => (
                <div key={field.key} style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: BRAND.warmEarth, marginBottom: "6px", letterSpacing: "0.5px" }}>
                    {field.label} {field.required && <span style={{ color: BRAND.coralRoof }}>*</span>}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${BRAND.softSand}`, borderRadius: "10px", fontSize: "15px", fontFamily: "'Noto Sans KR', sans-serif", color: BRAND.deepBrown, background: BRAND.cream, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND.dawnGold)}
                    onBlur={(e) => (e.target.style.borderColor = BRAND.softSand)}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: BRAND.warmEarth, marginBottom: "6px", letterSpacing: "0.5px" }}>
                  한마디 (선택)
                </label>
                <textarea
                  placeholder="기대되는 점, 궁금한 점 등 자유롭게..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${BRAND.softSand}`, borderRadius: "10px", fontSize: "14px", fontFamily: "'Noto Sans KR', sans-serif", color: BRAND.deepBrown, background: BRAND.cream, outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND.dawnGold)}
                  onBlur={(e) => (e.target.style.borderColor = BRAND.softSand)}
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{ width: "100%", padding: "16px", background: BRAND.deepBrown, color: BRAND.warmIvory, border: "none", borderRadius: "12px", fontSize: "16px", fontFamily: "'Noto Serif KR', serif", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", letterSpacing: "1px" }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = BRAND.warmEarth; (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = BRAND.deepBrown; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >
                참가 신청하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: BRAND.deepBrown, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "18px", color: BRAND.warmIvory, margin: "0 0 8px" }}>더집100</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: BRAND.dawnGold, letterSpacing: "2px", margin: "0 0 16px" }}>
          BUILDING HOMES TOGETHER 100
        </p>
        <p style={{ fontSize: "11px", color: "rgba(245,240,232,0.5)", margin: 0, fontWeight: 300 }}>
          © 2026. 더집100 &amp; Karin. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
