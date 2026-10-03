import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const instagram = 'https://www.instagram.com/formandflowfitness?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
const photo = './research-assets/generated-hero.png';
const services = [
  { number: '01', title: 'Personal training', description: 'Make your training personal. Message us to discuss where you want to start.' },
  { number: '02', title: 'Strength training', description: 'Put strength at the centre of your training.' },
  { number: '03', title: 'Functional workouts', description: 'Bring movement into focus with functional workouts.' },
  { number: '04', title: 'Weight loss', description: 'Explore training with your weight loss goals in mind.' }
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('reveal-pending');
      observer.observe(element);
    });
    const showAll = () => {
      if (media.matches) document.querySelectorAll('.reveal-pending').forEach(element => element.classList.remove('reveal-pending'));
    };
    media.addEventListener?.('change', showAll);
    return () => { observer.disconnect(); media.removeEventListener?.('change', showAll); };
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <a className="wordmark" href="#home" aria-label="Form and Flow Fitness home">FORM <span>&</span> FLOW<small>FITNESS · RAJKOT</small></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
      <nav id="navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        <a href="#training" onClick={() => setMenuOpen(false)}>The training</a>
        <a href="#approach" onClick={() => setMenuOpen(false)}>Find your flow</a>
        <a className="nav-cta" href={instagram} target="_blank" rel="noopener noreferrer">Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <img className="hero-photo" src={photo} alt="Illustrative athlete performing a dumbbell row in a gym" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span className="dot" /> FORM & FLOW FITNESS / RAJKOT</p>
          <h1 id="hero-title">FIND YOUR<br />FORM.<br /><span>FEEL YOUR<br />FLOW.</span></h1>
          <p className="hero-description">Strength. Movement. Your next step.<br />Training starts with you.</p>
          <a className="button orange" href={instagram} target="_blank" rel="noopener noreferrer">DM to start today <Arrow diagonal /></a>
        </div>
        <div className="hero-bottom"><span>PERSONAL TRAINING · STRENGTH · MOVEMENT</span><a href="#training">Explore the training <span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="ticker" aria-hidden="true"><span>GOOD FORM.</span><span className="star">✳</span><span>YOUR FLOW.</span><span className="star">✳</span><span>LET’S MOVE.</span><span className="star">✳</span></div>
      <section className="training section" id="training" aria-labelledby="training-title">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">01 / THE TRAINING</p>
          <h2 id="training-title">YOUR GOALS.<br /><span>YOUR STARTING POINT.</span></h2>
          <p>Discover the training at FORM & FLOW FITNESS. Get in touch to talk about your goals and the way you want to move.</p>
        </div>
        <div className="service-list">
          {services.map(service => <article className="service" key={service.number} data-reveal><span className="service-number">/{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><Arrow diagonal /></article>)}
        </div>
      </section>
      <section className="approach" id="approach" aria-labelledby="approach-title">
        <div className="approach-image" data-reveal><img src={photo} alt="Illustrative strength exercise with a dumbbell" loading="lazy" /><span className="image-label">STRENGTH IN MOTION / ILLUSTRATION</span></div>
        <div className="approach-content" data-reveal>
          <p className="eyebrow">02 / FIND YOUR FLOW</p>
          <h2 id="approach-title">EVERY START<br />IS A <span>STRONG<br />START.</span></h2>
          <p>You don’t need a perfect starting point. Bring your goals, your questions, and your curiosity about training.</p>
          <p>From personal training to functional workouts, explore your next step with FORM & FLOW FITNESS in Rajkot.</p>
          <a className="text-link" href={instagram} target="_blank" rel="noopener noreferrer">Start a conversation <Arrow diagonal /></a>
        </div>
      </section>
      <section className="contact section" id="contact" aria-labelledby="contact-title" data-reveal>
        <div className="contact-top"><p className="eyebrow">03 / YOUR NEXT MOVE</p><span className="location"><span className="dot" /> RAJKOT</span></div>
        <h2 id="contact-title">LET’S GET<br /><span>MOVING.</span></h2>
        <div className="contact-bottom"><p>Have a goal in mind?<br />Message us on Instagram to get started.</p><a className="button dark" href={instagram} target="_blank" rel="noopener noreferrer">Message FORM & FLOW <Arrow diagonal /></a></div>
      </section>
    </main>
    <footer className="footer"><div><a className="wordmark" href="#home">FORM <span>&</span> FLOW<small>FITNESS · RAJKOT</small></a><p>Find your form. Feel your flow.</p></div><div className="footer-right"><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow diagonal /></a><p>AI-generated illustrative imagery</p><p className="image-disclaimer">Imagery does not depict actual premises, staff, customers or results.</p></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
