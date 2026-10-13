import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import { Phone, Mail, Globe, Linkedin, MessageCircle, Download, Copy, ExternalLink, BriefcaseBusiness, Users, Megaphone, QrCode, Upload, Check, MapPin } from 'lucide-react';
import './style.css';

const profile = {
  name: 'Jayadev KV',
  role: 'HR Team Lead & Marketing Executive',
  company: 'TalentGrade',
  phone: '+971567710107',
  email: 'hr@talentgradehr.com',
  website: 'https://www.talentgradehr.com',
  linkedin: 'https://www.linkedin.com/in/jayadev555/',
};

function App() {
  const [photo, setPhoto] = useState<string>(() => localStorage.getItem('jayadev-card-photo') || '/jayadev-profile.jpg');
  const [pageUrl, setPageUrl] = useState(window.location.href.split('#')[0]);
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = window.location.href.split('#')[0];
    setPageUrl(url);
    if (url.startsWith('http://') || url.startsWith('https://')) {
      QRCode.toDataURL(url, { width: 320, margin: 2, color: { dark: '#06152b', light: '#ffffff' }, errorCorrectionLevel: 'H' })
        .then(setQr).catch(() => setQr(''));
    }
  }, []);

  const saveContact = () => {
    const vcard = [
      'BEGIN:VCARD', 'VERSION:3.0',
      `FN:${profile.name}`,
      `ORG:${profile.company}`,
      `TITLE:${profile.role}`,
      `TEL;TYPE=CELL,VOICE:${profile.phone}`,
      `EMAIL;TYPE=WORK:${profile.email}`,
      `URL:${profile.website}`,
      `URL;TYPE=LinkedIn:${profile.linkedin}`,
      'END:VCARD'
    ].join('\r\n');
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Jayadev-KV-TalentGrade.vcf'; a.click();
    URL.revokeObjectURL(url);
  };

  const uploadPhoto = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setPhoto(result);
      try { localStorage.setItem('jayadev-card-photo', result); } catch { /* Large photos may exceed local storage. */ }
    };
    reader.readAsDataURL(file);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy your digital business card link:', pageUrl);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Jayadev KV | TalentGrade', text: 'Connect with Jayadev KV at TalentGrade', url: pageUrl }); } catch { /* User cancelled sharing. */ }
    } else copyLink();
  };

  return <main className="page-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="brand" href={profile.website} target="_blank" rel="noreferrer" aria-label="TalentGrade website">
        <span className="brand-mark">T</span><span className="brand-copy"><strong>TalentGrade</strong><small>HUMAN RESOURCES CONSULTANCIES</small></span>
      </a>
      <span className="availability"><i /> Digital Business Card</span>
    </header>

    <section className="hero panel">
      <div className="portrait-wrap">
        {photo ? <img className="portrait" src={photo} alt="Jayadev KV" /> :
          <div className="portrait placeholder"><Users size={54}/><span>Add your photo</span></div>}
        <label className="photo-edit" title="Upload profile photo"><Upload size={16}/><span>Upload photo</span><input type="file" accept="image/*" onChange={e => uploadPhoto(e.target.files?.[0])}/></label>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">HELLO, I'M</p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="company-name">at {profile.company}</p>
        <div className="hero-tags"><span>PEOPLE</span><b>•</b><span>OPPORTUNITIES</span><b>•</b><span>GLOBAL CAREERS</span></div>
      </div>
      <div className="orbit" aria-hidden="true"><Globe size={106}/><span>Connecting talent<br/>with opportunity</span></div>
    </section>

    <section className="actions" aria-label="Contact actions">
      <a className="action whatsapp" href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><MessageCircle/><span>WhatsApp</span><ExternalLink className="external"/></a>
      <a className="action" href={`tel:${profile.phone}`}><Phone/><span>Call me</span></a>
      <a className="action" href={`mailto:${profile.email}`}><Mail/><span>Email me</span></a>
      <button className="action" onClick={saveContact}><Download/><span>Save contact</span></button>
    </section>

    <section className="contact-grid panel">
      <div className="contact-item"><span className="contact-icon"><Phone/></span><div><small>PHONE</small><a href={`tel:${profile.phone}`}>{profile.phone}</a></div></div>
      <div className="contact-item"><span className="contact-icon"><Mail/></span><div><small>EMAIL</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div></div>
      <div className="contact-item"><span className="contact-icon"><Globe/></span><div><small>WEBSITE</small><a href={profile.website} target="_blank" rel="noreferrer">talentgradehr.com</a></div></div>
      <div className="contact-item"><span className="contact-icon"><Linkedin/></span><div><small>LINKEDIN</small><a href={profile.linkedin} target="_blank" rel="noreferrer">View profile</a></div></div>
    </section>

    <section className="about panel">
      <div className="about-main"><p className="section-label"><Users/> ABOUT MY WORK</p>
        <p>Connecting people with opportunities through recruitment, talent acquisition, and digital marketing. I work with TalentGrade to support hiring initiatives and strengthen professional connections.</p>
        <a className="outline-link" href={profile.website} target="_blank" rel="noreferrer">Explore TalentGrade <ExternalLink size={15}/></a>
      </div>
      <div className="expertise">
        <div><BriefcaseBusiness/><span>Talent acquisition & recruitment</span></div>
        <div><Users/><span>HR coordination & operations</span></div>
        <div><Megaphone/><span>Digital marketing & brand growth</span></div>
      </div>
    </section>

    <section className="quick-links panel">
      <p className="section-label"><ExternalLink/> QUICK LINKS</p>
      <div className="link-grid">
        <a href={profile.website} target="_blank" rel="noreferrer"><Globe/><span>TalentGrade website</span><ExternalLink className="tiny"/></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/><span>Connect on LinkedIn</span><ExternalLink className="tiny"/></a>
        <a href={`mailto:${profile.email}`}><Mail/><span>Send an email</span><ExternalLink className="tiny"/></a>
      </div>
    </section>

    <section className="connect panel">
      <div className="qr-box">{qr ? <img src={qr} alt="QR code linking to this digital business card"/> : <div className="qr-wait"><QrCode size={44}/><span>QR ready when published</span></div>}</div>
      <div className="connect-copy"><p className="eyebrow">SCAN TO CONNECT</p><h2>Let's connect.</h2><p>Scan this code to open my digital business card and save my contact details.</p><button className="text-button" onClick={copyLink}><Copy size={16}/>{copied ? 'Link copied!' : 'Copy card link'}</button></div>
      <button className="primary-button" onClick={saveContact}><Download size={20}/> Save to phone <span>(VCF)</span></button>
    </section>

    <footer><span>PEOPLE&nbsp;&nbsp; | &nbsp;&nbsp;OPPORTUNITIES&nbsp;&nbsp; | &nbsp;&nbsp;GLOBAL CAREERS</span><div/><button onClick={share}>Share my card <ExternalLink size={14}/></button></footer>
    <p className="note">Your QR code uses this page's current URL. After publishing, use the public website link when sharing or printing it.</p>
  </main>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
