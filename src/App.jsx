// App.js
import React, { useState, useEffect, useRef } from 'react';


const App = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedElement, setSelectedElement] = useState('hydrogen');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const elements = {
    hydrogen: { name: 'Hydrogen', protons: 1, neutrons: 0, electrons: 1, symbol: 'H' },
    helium: { name: 'Helium', protons: 2, neutrons: 2, electrons: 2, symbol: 'He' },
    lithium: { name: 'Lithium', protons: 3, neutrons: 4, electrons: 3, symbol: 'Li' },
    carbon: { name: 'Carbon', protons: 6, neutrons: 6, electrons: 6, symbol: 'C' },
    oxygen: { name: 'Oxygen', protons: 8, neutrons: 8, electrons: 8, symbol: 'O' },
    sodium: { name: 'Sodium', protons: 11, neutrons: 12, electrons: 11, symbol: 'Na' }
  };

  const quizQuestions = [
    {
      question: "What particle has a positive charge?",
      options: ["Proton", "Neutron", "Electron", "Photon"],
      answer: "Proton"
    },
    {
      question: "Where are electrons located in an atom?",
      options: ["Nucleus", "Electron cloud", "Proton shell", "Neutron orbit"],
      answer: "Electron cloud"
    },
    {
      question: "What determines the atomic number of an element?",
      options: ["Number of protons", "Number of neutrons", "Number of electrons", "Total mass"],
      answer: "Number of protons"
    }
  ];

  const handleQuizSubmit = (selected, correct) => {
    setQuizAnswer(selected);
    setShowQuizFeedback(true);
  };

  return (
    <div className="container">
      <Header />

      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="content">
        <IntroductionSection activeSection={activeSection} />
        <StructureSection
          activeSection={activeSection}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          elements={elements}
        />
        <SimulationSection activeSection={activeSection} elements={elements} />
        <QuizSection
          activeSection={activeSection}
          quizQuestions={quizQuestions}
          quizAnswer={quizAnswer}
          showQuizFeedback={showQuizFeedback}
          handleQuizSubmit={handleQuizSubmit}
        />
      </div>

      <Footer />
    </div>
  );
};

const Header = () => (
  <header>
    <div className="header-pattern"></div>
    <div className="logo">
      <i className="fas fa-atom logo-icon"></i>
      <h1>Atomic Structure Explorer</h1>
    </div>
    <p className="subtitle">An interactive learning module for Class 10 students</p>
  </header>
);

const Nav = ({ activeSection, setActiveSection }) => (
  <div className="nav">
    <div className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
      onClick={() => setActiveSection('intro')}>
      <i className="fas fa-info-circle"></i>
      Introduction
    </div>
    <div className={`nav-item ${activeSection === 'structure' ? 'active' : ''}`}
      onClick={() => setActiveSection('structure')}>
      <i className="fas fa-sitemap"></i>
      Atomic Structure
    </div>
    <div className={`nav-item ${activeSection === 'simulation' ? 'active' : ''}`}
      onClick={() => setActiveSection('simulation')}>
      <i className="fas fa-gamepad"></i>
      Build an Atom
    </div>
    <div className={`nav-item ${activeSection === 'quiz' ? 'active' : ''}`}
      onClick={() => setActiveSection('quiz')}>
      <i className="fas fa-question-circle"></i>
      Quiz
    </div>
  </div>
);

const IntroductionSection = ({ activeSection }) => (
  <div className={`section ${activeSection === 'intro' ? 'active' : ''}`}>
    <h2><i className="fas fa-info-circle"></i> Introduction to Atomic Structure</h2>
    <p>Atoms are the basic building blocks of matter. Everything around us is made up of atoms.</p>

    <div className="info-box">
      <h3><i className="fas fa-lightbulb"></i> Did you know?</h3>
      <p>Atoms are so small that a single drop of water contains about 10<sup>21</sup> atoms! That's 1 followed by 21 zeros.</p>
    </div>

    <h3><i className="fas fa-list"></i> Main Components of an Atom:</h3>
    <ul>
      <li><strong>Protons</strong>: Positively charged particles in the nucleus</li>
      <li><strong>Neutrons</strong>: Neutral particles in the nucleus</li>
      <li><strong>Electrons</strong>: Negatively charged particles orbiting the nucleus</li>
    </ul>

    <p>Select different sections from the menu above to explore atomic structure in more detail!</p>
  </div>
);

const StructureSection = ({ activeSection, selectedElement, setSelectedElement, elements }) => {
  const getElectronShells = (electrons) => {
    if (electrons <= 2) return 1;
    if (electrons <= 10) return 2;
    if (electrons <= 18) return 3;
    return 4; // Simplified for this example, up to Sodium
  };

  const currentElement = elements[selectedElement];
  const electronShells = getElectronShells(currentElement.electrons);

  return (
    <div className={`section ${activeSection === 'structure' ? 'active' : ''}`}>
      <h2><i className="fas fa-sitemap"></i> Understanding Atomic Structure</h2>
      <p>Atoms consist of a nucleus surrounded by electrons. The nucleus contains protons and neutrons.</p>

      <div className="atom-visualization">
        <div className="canvas-container">
          <AtomSimulation element={currentElement} />
        </div>

        <div className="element-selector">
          <h3>Choose an element to explore:</h3>
          <select
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
          >
            {Object.keys(elements).map(key => (
              <option key={key} value={key}>{elements[key].name} ({elements[key].symbol})</option>
            ))}
          </select>
        </div>

        <div className="info-box">
          <h3><i className="fas fa-flask"></i> Element: {currentElement.name}</h3>
          <p>Atomic Number: {currentElement.protons}</p>
          <p>Mass Number: {currentElement.protons + currentElement.neutrons}</p>
          <p>Electron Shells: {electronShells}</p>
        </div>
      </div>
    </div>
  );
};

const SimulationSection = ({ activeSection, elements }) => {
  const [protons, setProtons] = useState(0);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(0);

  const handleReset = () => {
    setProtons(0);
    setNeutrons(0);
    setElectrons(0);
  };

  const getAtomName = (protonCount) => {
    const element = Object.values(elements).find(el => el.protons === protonCount);
    return element ? element.name : "Unknown Atom";
  };

  const getCharge = (protonCount, electronCount) => {
    const charge = protonCount - electronCount;
    if (charge > 0) return `${charge}+`;
    if (charge < 0) return `${Math.abs(charge)}-`;
    return "Neutral";
  };

  return (
    <div className={`section ${activeSection === 'simulation' ? 'active' : ''}`}>
      <h2><i className="fas fa-gamepad"></i> Build Your Own Atom</h2>
      <p>Use the controls below to create different atoms by adding protons, neutrons, and electrons.</p>

      <div className="atom-visualization">
        <div className="canvas-container">
          <InteractiveAtom protons={protons} neutrons={neutrons} electrons={electrons} />
        </div>

        <div className="controls">
          <button className="proton" onClick={() => setProtons(p => p + 1)}>
            <i className="fas fa-plus-circle"></i>
            Add Proton
          </button>
          <button className="neutron" onClick={() => setNeutrons(n => n + 1)}>
            <i className="fas fa-plus-circle"></i>
            Add Neutron
          </button>
          <button className="electron" onClick={() => setElectrons(e => e + 1)}>
            <i className="fas fa-plus-circle"></i>
            Add Electron
          </button>
          <button onClick={handleReset}>
            <i className="fas fa-redo"></i>
            Reset Atom
          </button>
        </div>

        <div className="info-box">
          <h3><i className="fas fa-clipboard-list"></i> Atom Properties</h3>
          <p>Protons: {protons} | Neutrons: {neutrons} | Electrons: {electrons}</p>
          <p>Atom Name: {getAtomName(protons)}</p>
          <p>Charge: {getCharge(protons, electrons)}</p>
        </div>
      </div>
    </div>
  );
};

const QuizSection = ({ activeSection, quizQuestions, quizAnswer, showQuizFeedback, handleQuizSubmit }) => (
  <div className={`section ${activeSection === 'quiz' ? 'active' : ''}`}>
    <h2><i className="fas fa-question-circle"></i> Test Your Knowledge</h2>
    <p>Answer these questions to check your understanding of atomic structure.</p>

    <div className="quiz-container">
      <h3>{quizQuestions[0].question}</h3>
      {quizQuestions[0].options.map(option => (
        <div
          key={option}
          className={`quiz-option ${showQuizFeedback ?
            (option === quizQuestions[0].answer ? 'correct' :
              (quizAnswer === option ? 'incorrect' : '')) : ''}`}
          onClick={() => !showQuizFeedback && handleQuizSubmit(option, quizQuestions[0].answer)}
        >
          {option}
        </div>
      ))}
      {showQuizFeedback && (
        <div className="info-box">
          {quizAnswer === quizQuestions[0].answer ?
            <p><i className="fas fa-check-circle"></i> Correct! Protons have a positive charge.</p> :
            <p><i className="fas fa-times-circle"></i> Incorrect. The correct answer is Proton.</p>
          }
        </div>
      )}
    </div>
  </div>
);

const Footer = () => (
  <footer>
    <div className="footer-content">
      <p>Atomic Structure Explorer - Created for Educational Purposes</p>
      <p>Quazar Education Internship Assignment</p>
      <div className="footer-links">
        <a href="#"><i className="fas fa-envelope"></i> Contact</a>
        <a href="#"><i className="fas fa-info-circle"></i> About</a>
        <a href="#"><i className="fas fa-book"></i> Resources</a>
        <a href="#"><i className="fas fa-graduation-cap"></i> Courses</a>
      </div>
    </div>
  </footer>
);

const AtomSimulation = ({ element }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw nucleus
    const nucleusSize = 10 + (element.protons + element.neutrons) * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 100, 200, 0.7)';
    ctx.fill();

    // Draw protons and neutrons in nucleus
    const particles = element.protons + element.neutrons;
    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2;
      const radius = nucleusSize * 0.6;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = i < element.protons ? '#e74c3c' : '#3498db';
      ctx.fill();
    }

    // Draw electron shells and electrons
    let electronsRemaining = element.electrons;

    if (electronsRemaining > 0) {
      const shell1Radius = 70;
      const electronsShell1 = Math.min(electronsRemaining, 2);
      drawElectronShell(ctx, centerX, centerY, shell1Radius, electronsShell1);
      electronsRemaining -= electronsShell1;
    }

    if (electronsRemaining > 0) {
      const shell2Radius = 100;
      const electronsShell2 = Math.min(electronsRemaining, 8);
      drawElectronShell(ctx, centerX, centerY, shell2Radius, electronsShell2, 2);
      electronsRemaining -= electronsShell2;
    }

    if (electronsRemaining > 0) {
      const shell3Radius = 130;
      const electronsShell3 = Math.min(electronsRemaining, 8);
      drawElectronShell(ctx, centerX, centerY, shell3Radius, electronsShell3, 10);
      electronsRemaining -= electronsShell3;
    }
  }, [element]);

  const drawElectronShell = (ctx, x, y, radius, count, offset = 0) => {
    // Draw shell path
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(46, 204, 113, 0.3)';
    ctx.stroke();

    // Draw electrons on the path
    for (let i = 0; i < count; i++) {
      const angle = ((i + offset) / (count + offset)) * Math.PI * 2; // Offset for better distribution
      const eX = x + Math.cos(angle) * radius;
      const eY = y + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(eX, eY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2ecc71';
      ctx.fill();
    }
  };

  return <canvas ref={canvasRef} width="500" height="350" />;
};

const InteractiveAtom = ({ protons, neutrons, electrons }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw nucleus
    const nucleusSize = 10 + (protons + neutrons) * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 100, 200, ${protons + neutrons > 0 ? 0.7 : 0.3})`;
    ctx.fill();

    // Draw protons and neutrons in nucleus
    const particles = protons + neutrons;
    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2;
      const radius = nucleusSize * 0.6;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = i < protons ? '#e74c3c' : '#3498db';
      ctx.fill();
    }

    // Draw electron shells and electrons
    let electronsRemaining = electrons;
    const shells = [];

    if (electronsRemaining > 0) {
      shells.push({ radius: 70, count: Math.min(electronsRemaining, 2) });
      electronsRemaining -= Math.min(electronsRemaining, 2);
    }
    if (electronsRemaining > 0) {
      shells.push({ radius: 100, count: Math.min(electronsRemaining, 8) });
      electronsRemaining -= Math.min(electronsRemaining, 8);
    }
    if (electronsRemaining > 0) {
      shells.push({ radius: 130, count: Math.min(electronsRemaining, 8) });
      electronsRemaining -= Math.min(electronsRemaining, 8);
    }

    shells.forEach(shell => {
      // Draw shell path
      ctx.beginPath();
      ctx.arc(centerX, centerY, shell.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(46, 204, 113, 0.3)';
      ctx.stroke();

      // Draw electrons on the path
      for (let i = 0; i < shell.count; i++) {
        const angle = (i / shell.count) * Math.PI * 2;
        const eX = centerX + Math.cos(angle) * shell.radius;
        const eY = centerY + Math.sin(angle) * shell.radius;

        ctx.beginPath();
        ctx.arc(eX, eY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2ecc71';
        ctx.fill();
      }
    });

    if (protons === 0 && neutrons === 0 && electrons === 0) {
      // Draw instructions
      ctx.fillStyle = '#3949ab';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Use buttons to add particles', centerX, 30);
    }
  }, [protons, neutrons, electrons]);

  return <canvas ref={canvasRef} width="500" height="350" />;
};

export default App;