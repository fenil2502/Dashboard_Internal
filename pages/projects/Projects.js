import React, { Component } from 'react';

class Projects extends Component {
  render() {
    return (
      <div className="projectpage">
        <h3>All projects</h3>
          <div className="project-box">
            <div className="project-card">
              <div className="project-logo">
                <img src="./" alt="Pionear Pumps"/>
              </div>
              <div className="project-info">
                <h5>Pionear Pumps</h5>
                <p>Experience excellence with Pionear Pumps. Discover our top-tier products and services tailored to meet your industrial needs effortlessly.</p>
              </div>
              <button>View Site</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Projects;