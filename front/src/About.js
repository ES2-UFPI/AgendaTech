import React from 'react';
import './About.css'; // Importar um arquivo CSS para melhorar a estilização
import logo from './assets/Agendinho.png'; // Importa a logo
import sprint1 from './assets/Sprint1.png'; // Importa a imagem Sprint 1
import sprint3 from './assets/Sprint3.png'; // Importa a imagem Sprint 3

function About() {
  const developers = [
    { name: "Delphino Luciani", github: "https://github.com/dlpaf" },
    { name: "Victor Matheus", github: "https://github.com/Matheus21098" },
    { name: "Vival José", github: "https://github.com/VivalJose" },
    { name: "Raimundo Neto", github: "https://github.com/rngneto" },
  ];

  return (
    <div className="container about-container mt-5">
      <div className="text-center about-header d-flex align-items-center">
        <img src={logo} alt="Logo Agenda Tech" className="agenda-logo me-3" />
        <h1>Sobre o Agenda Tech</h1>
      </div>
      <p className="mt-4 lead text-center">
      Agenda Tech é uma plataforma desenvolvida por estudantes da disciplina de Engenharia de Software II da Universidade Federal do Piauí, no período 2024.2. 
      Nosso objetivo é reunir, em um só lugar, eventos da área de tecnologia que acontecem não apenas no nosso estado, mas em todo o país. 
      A plataforma foi idealizada para conectar entusiastas e profissionais, oferecendo oportunidades para aprendizado, networking e crescimento em suas áreas de interesse.

      </p>

      <div className="developers-section mt-5">
        <h2 className="text-center">Desenvolvedores</h2>
        <div className="row mt-4">
          {developers.map((dev, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card developer-card shadow-sm mb-4">
                <div className="card-body text-center">
                  <h5 className="card-title">{dev.name}</h5>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
                    Ver GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="images-section mt-5">
        <h2 className="text-center">Sprints</h2>
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="text-center sprint-title">Sprint 1</h5> {/* Título acima do card */}
            <div className="card shadow-sm">
              <img src={sprint1} alt="Sprint 1" className="card-img-top" />
              <div className="card-body"></div>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="text-center sprint-title">Sprint 3</h5> {/* Título acima do card */}
            <div className="card shadow-sm">
              <img src={sprint3} alt="Sprint 3" className="card-img-top" />
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
