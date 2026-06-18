import { assetPath } from "../utils/assetPath.js";

export default function Contact() {
  return (
    <main className="page">
      <section className="content-section contact-layout">
        <div className="section-heading">
          <span>Contato</span>
          <h1>Fale com a MARS</h1>
        </div>

        <div className="contact-card">
          <h2>Atendimento</h2>
          <p>Brasilia - DF</p>
          <p>WhatsApp: (61) 98373-1359</p>
          <p>Instagram: @_marsdesigner</p>

          <div className="social-row">
            <a href="https://www.instagram.com/_marsdesigner/" target="_blank" rel="noreferrer">
              <img src={assetPath("instagram.svg")} alt="Instagram" />
            </a>
            <a href="https://whatsa.me/5561983731359" target="_blank" rel="noreferrer">
              <img src={assetPath("whatsapp.svg")} alt="WhatsApp" />
            </a>
          </div>
        </div>

        <iframe
          className="map-frame"
          title="Localizacao MARS"
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d61415.35107865831!2d-48.10150281774389!3d-15.832431940589649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e2!4m0!4m5!1s0x935a3321354999e9%3A0x881fa531a22a3f88!2sSt.%20B%20Norte%20Centro%20Universit%C3%A1rio%20Proje%C3%A7%C3%A3o%20-%20Taguatinga%20-%20Taguatinga%2C%20Bras%C3%ADlia%20-%20DF%2C%2070297-400!3m2!1d-15.8193551!2d-48.0652797!5e0!3m2!1spt-BR!2sbr!4v1667759768794!5m2!1spt-BR!2sbr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
