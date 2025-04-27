import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [incidents] = useState([
    { 
      id: 1, 
      title: "Biased Recommendation Algorithm", 
      description: "The recommendation algorithm consistently favored certain demographics, leading to an unequal distribution of suggested products. The bias was particularly evident in categories such as media and shopping, where specific groups were overly represented. This raised concerns about fairness and inclusivity in the recommendation process.", 
      severity: "Medium", 
      reported_at: "2025-03-15T10:00:00Z" 
    },
    { 
      id: 2, 
      title: "LLM Hallucination in Critical Info", 
      description: "The language model incorrectly generated safety procedure instructions, which could have posed serious risks if followed. Despite the model being trained on extensive datasets, it still provided inaccurate information when queried about hazardous materials. This prompted an immediate review of the model's training data and quality assurance processes.", 
      severity: "High", 
      reported_at: "2025-04-01T14:30:00Z" 
    },
    { 
      id: 3, 
      title: "Minor Data Leak via Chatbot", 
      description: "The chatbot accidentally exposed non-sensitive user metadata such as browsing behavior and interaction history to a third-party application. While no personal data was involved, the breach raised concerns about the chatbot's data handling practices. Investigations showed that the issue was due to improper access controls within the integration layers.", 
      severity: "Low", 
      reported_at: "2025-03-20T09:15:00Z" 
    },
    { 
      id: 4, 
      title: "Unintended AI Behavior in Navigation", 
      description: "The AI-powered navigation system unexpectedly suggested unsafe routes that could potentially lead to accidents. This included recommending paths through areas with poor road conditions and high traffic. The incident led to an urgent reevaluation of the AI’s decision-making process and more stringent safety checks.", 
      severity: "High", 
      reported_at: "2025-02-10T08:45:00Z" 
    },
    { 
      id: 5, 
      title: "Overfitting in Predictive Model", 
      description: "The predictive model trained on historical data failed to generalize well to new, unseen datasets. As a result, the model’s predictions were highly inaccurate when applied to real-world scenarios. Efforts to resolve this included refining the model’s feature selection process and introducing better validation techniques to prevent overfitting.", 
      severity: "Medium", 
      reported_at: "2025-01-25T13:20:00Z" 
    },
    { 
      id: 6, 
      title: "Privacy Breach in Voice Assistant", 
      description: "The voice assistant unexpectedly recorded user interactions without obtaining explicit consent, breaching privacy policies. This was discovered during a routine audit and raised significant concerns regarding user data privacy. Immediate action was taken to implement stricter voice activation protocols and data encryption standards.", 
      severity: "High", 
      reported_at: "2025-04-15T16:00:00Z" 
    },
    { 
      id: 7, 
      title: "Incorrect Sentiment Analysis", 
      description: "The AI's sentiment analysis model misclassified user feedback, failing to detect the negative tone in customer complaints. This error resulted in misleading insights for the business, potentially affecting customer satisfaction strategies. A post-mortem identified issues with the training data and adjustments were made to improve accuracy.", 
      severity: "Low", 
      reported_at: "2025-03-01T11:10:00Z" 
    },
    { 
      id: 8, 
      title: "AI Misdiagnosis in Healthcare", 
      description: "The AI-driven diagnostic tool incorrectly suggested a life-threatening condition based on inaccurate data, leading to unnecessary testing and stress for the patient. The error was traced back to a bug in the data preprocessing pipeline, which caused it to misinterpret medical records. The case led to a revision of the AI’s validation procedures.", 
      severity: "High", 
      reported_at: "2025-04-20T09:30:00Z" 
    },
    { 
      id: 9, 
      title: "Chatbot Loop Error", 
      description: "A chatbot failed to exit a response loop, continuously repeating the same questions to users without progressing in the conversation. This glitch severely impacted the user experience and caused frustration. Developers were able to quickly identify the issue in the bot's decision tree and deployed a fix within hours.", 
      severity: "Medium", 
      reported_at: "2025-02-28T14:50:00Z" 
    },
    { 
      id: 10, 
      title: "False Positive in Fraud Detection", 
      description: "The fraud detection system flagged a large number of legitimate transactions as fraudulent, causing delays and unnecessary investigations for customers. The false positives were linked to an over-sensitivity in the system's anomaly detection algorithm, which was subsequently recalibrated to reduce such errors.", 
      severity: "Medium", 
      reported_at: "2025-03-10T12:00:00Z" 
    },
    { 
      id: 11, 
      title: "Bias in Hiring Algorithm", 
      description: "The AI-based hiring tool displayed a bias against certain demographic groups, leading to skewed hiring recommendations. This bias was later traced back to the model being trained on biased historical data. A complete overhaul of the hiring algorithm was undertaken to ensure fairness and equality in the hiring process.", 
      severity: "High", 
      reported_at: "2025-04-05T17:25:00Z" 
    },
    { 
      id: 12, 
      title: "Content Moderation Failure", 
      description: "The AI-powered content moderation system failed to flag inappropriate content, allowing harmful material to remain visible to users. The failure was linked to the model’s lack of training on edge cases, which caused it to miss subtle violations. An urgent retraining of the moderation model was initiated to address these gaps.", 
      severity: "High", 
      reported_at: "2025-03-30T10:40:00Z" 
    },
    { 
      id: 13, 
      title: "Translation Error in AI", 
      description: "The AI translation tool made a critical error in translating safety instructions, leading to a potentially dangerous misunderstanding. The problem stemmed from the AI's inability to account for regional dialects and terminology. The translation algorithm was reviewed and improved to handle a wider range of linguistic variations.", 
      severity: "Medium", 
      reported_at: "2025-02-15T09:00:00Z" 
    },
    { 
      id: 14, 
      title: "Ad Targeting Misalignment", 
      description: "The AI-driven ad targeting system misaligned advertisements with user interests, showing irrelevant ads to specific groups. This led to a decrease in user engagement and ad effectiveness. The misalignment was resolved by adjusting the targeting algorithm to better match users' preferences and browsing habits.", 
      severity: "Low", 
      reported_at: "2025-01-30T15:15:00Z" 
    },
    { 
      id: 15, 
      title: "AI-Driven Energy Overuse", 
      description: "The AI system responsible for managing energy consumption in a smart building over-optimized power usage, leading to unnecessary energy waste. The issue was identified as a result of faulty optimization algorithms that ignored certain power-saving constraints. A fix was deployed to prevent the AI from making overly aggressive optimization decisions.", 
      severity: "Medium", 
      reported_at: "2025-04-10T11:55:00Z" 
    }
  ]);
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [newIncident, setNewIncident] = useState({ title: "", description: "", severity: "Low" });
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState("dashboard");

  const filteredIncidents = incidents
    .filter(incident => filter === "All" || incident.severity === filter)
    .sort((a, b) => sort === "newest" ? new Date(b.reported_at) - new Date(a.reported_at) : new Date(a.reported_at) - new Date(b.reported_at));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIncident.title && newIncident.description) {
      const updatedIncidents = [...incidents, { ...newIncident, id: Date.now(), reported_at: new Date().toISOString() }];
      console.log("New incident added:", updatedIncidents);
      setNewIncident({ title: "", description: "", severity: "Low" });
    }
  };

  const renderDashboard = () => (
    <>
      <div className="filters">
        <div className="severity-filters">
          {["All", "Low", "Medium", "High"].map(sev => (
            <button key={sev} className={`filter-btn ${filter === sev ? 'active' : ''}`} onClick={() => setFilter(sev)}>{sev}</button>
          ))}
        </div>
        <div className="sort-filters">
          {["Newest First", "Oldest First"].map(sortOption => (
            <button key={sortOption} className={`sort-btn ${sort === (sortOption === "Newest First" ? "newest" : "oldest") ? 'active' : ''}`} onClick={() => setSort(sortOption === "Newest First" ? "newest" : "oldest")}>{sortOption}</button>
          ))}
        </div>
      </div>
      <div className="incidents">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className="incident-card">
            <div className="incident-header">
              <span className="incident-title">{incident.title}</span>
              <div className="incident-meta">
                <span className={`severity severity-${incident.severity.toLowerCase()}`}>[{incident.severity}]</span>
                <span>Reported on {new Date(incident.reported_at).toLocaleDateString()}</span>
              </div>
            </div>
            <button className="details-btn" onClick={() => setExpanded({ ...expanded, [incident.id]: !expanded[incident.id] })}>
              {expanded[incident.id] ? 'Hide Details' : 'View Details'} 📊
            </button>
            {expanded[incident.id] && <div className="description">{incident.description}</div>}
          </div>
        ))}
      </div>
    </>
  );

  const renderAbout = () => (
    <div className="about-section">
      <h2>About Trust AI 😊</h2>
      <p>
        Trust AI is a deep-tech AI startup dedicated to advancing AI safety. Our mission is to create a safer, more Trust AIworthy, and human-centric digital world. We focus on identifying and mitigating risks associated with AI systems, ensuring they align with human values and ethical standards. 🌐
      </p>
      <p>
        Our cutting-edge research and development are driven by the goal of enhancing the safety, transparency, and accountability of AI systems. As AI technology continues to evolve and integrate into every facet of society, it is essential that we take proactive measures to ensure its responsible use.
      </p>
      <p>
        At Trust AI, we strive to bridge the gap between innovation and ethics. We provide solutions that not only advance the capabilities of AI but also ensure it operates in ways that are safe, ethical, and aligned with human well-being.
      </p>
      <div className="mission-statement">
        <h3>Our Mission</h3>
        <p>
          Our mission is to make AI technologies more transparent and interpretable while ensuring they can be Trust AIed by individuals, businesses, and communities. We aim to develop tools and methodologies that help prevent harmful AI behaviors and foster a safe digital environment.
        </p>
      </div>
      <div className="core-values">
        <h3>Core Values</h3>
        <ul>
          <li><strong>Ethical Responsibility:</strong> We prioritize fairness, transparency, and accountability in everything we do.</li>
          <li><strong>Safety First:</strong> Our primary goal is to create AI systems that pose no risk to users or society.</li>
          <li><strong>Collaboration:</strong> We believe in collaborating with policymakers, researchers, and organizations to create universal standards for AI safety.</li>
          <li><strong>Innovation with Integrity:</strong> Our team pushes the boundaries of AI innovation while adhering to strong ethical principles.</li>
        </ul>
      </div>
    </div>
  );
  

  const renderReportNewIncident = () => (
    <div className="section">
      <h2>Report New Incident 📝</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title* 
          <input 
            type="text" 
            value={newIncident.title} 
            onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })} 
            placeholder="Enter title" 
            required 
          />
        </label>
        <label>
          Description* 
          <textarea 
            value={newIncident.description} 
            onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })} 
            placeholder="Enter description" 
            required
          ></textarea>
        </label>
        <label>
          Severity* 
          <select 
            value={newIncident.severity} 
            onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })} 
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <button type="submit" className="submit-btn">Submit Incident 🚀</button>
      </form>
    </div>
  );
  

  const renderContact = () => (
    <div className="section">
      <h2>Contact Us 📧</h2>
      <p>
        Have questions or need support? Reach out to us at:
      </p>
      <p>Email: <a href="mailto:support@Trust AI.ai">trustaisafetyincident@gmail.com</a> 📩</p>
      <p>Phone: +91 (555) 123-4567 📞</p>
      <p>Address: 123 AI Safety Lane, Tech City, TC 90210 📍</p>
    </div>
  );

  return (
    <div className="app">
      <div className="header">
        <h1>Trust <span>AI Safety Incident Dashboard</span></h1>
        <div>
          <button className={`nav-btn ${currentPage === "dashboard" ? 'active' : ''}`} onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
          <button className={`nav-btn ${currentPage === "about" ? 'active' : ''}`} onClick={() => setCurrentPage("about")}>About</button>
          <button className={`nav-btn ${currentPage === "report" ? 'active' : ''}`} onClick={() => setCurrentPage("report")}>Report New Incident</button>
          <button className={`nav-btn ${currentPage === "contact" ? 'active' : ''}`} onClick={() => setCurrentPage("contact")}>Contact</button>
        </div>
      </div>
      {currentPage === "dashboard" && renderDashboard()}
      {currentPage === "about" && renderAbout()}
      {currentPage === "report" && renderReportNewIncident()}
      {currentPage === "contact" && renderContact()}
      <footer className="footer">
        <p>© 2025 Trust AI | Rayudu</p>
      </footer>
    </div>
  );
};

export default App;
