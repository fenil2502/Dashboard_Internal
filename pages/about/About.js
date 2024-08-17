import React from "react";
import Link from "next/link";
import ProfileSec from "../shared/Profile-sec";

function About() {
  return (
    <div className="about-page">
      <ProfileSec />
      <div className="about-content">
        <div className="about-me">
          <div className="container">
            <h1>Get to Know Me</h1>
            <p>
              I am deeply committed to personal development and financial
              acumen. I regularly engage with thought-provoking literature
              centered on growth and investing to broaden my knowledge and
              maintain motivation. My enthusiasm for investing drives me to
              rigorously analyze and evaluate companies, ensuring well-informed
              investment decisions. This continuous pursuit of learning and
              strategic investment not only enriches my professional journey but
              also enhances my comprehensive approach to problem-solving and
              innovation within the tech sector.
            </p>
          </div>
        </div>
        <div className="journey">
          <div className="container">
            <h2>My journey</h2>
            <div className="journey-inner">
              <div className="education">
                <h3>My education</h3>
                <div className="education-list">
                  <div className="edu-card">
                    <h6>2019-23</h6>
                    <h5>Bachelor of Engineering in IT</h5>
                    <span>Aditya Silver Oak Institute of technology</span>
                    <p>Ahmedabad</p>
                  </div>
                  <div className="edu-card">
                    <h6>2017-19</h6>
                    <h5>Higher Secondary School</h5>
                    <span>11th & 12 grade in science stream</span>
                    <p>Ahmedabad</p>
                  </div>
                  <div className="edu-card">
                    <h6>2016-17</h6>
                    <h5>Secondary School</h5>
                    <span>10th grade</span>
                    <p>Ahmedabad</p>
                  </div>
                </div>
              </div>
              <div className="work">
                <h3>Work experiences</h3>
                <div className="work-list">
                  <div className="work-card">
                    <h6>2023 - present</h6>
                    <h5>Business Analyst</h5>
                    <span>Krishang Technolab</span>
                    <p>Ahmedabad</p>
                  </div>
                  <div className="work-card">
                    <h6>1 month</h6>
                    <h5>ReactJS Internship</h5>
                    <span>Infolabz</span>
                    <p>Ahmedabad</p>
                  </div>
                  <div className="work-card">
                    <h6>1 month</h6>
                    <h5>Web development Internship</h5>
                    <span>Softcoding Solutions</span>
                    <p>Ahmedabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="interest-hobby">
          <div className="container">
            <h2>Life outside work</h2>
            <p>
              I have a strong passion for sports like cricket, volleyball, and
              badminton, which keep me physically active and mentally engaged.
              My commitment to fitness extends to regular exercise and
              meditation, helping me maintain a balanced and healthy lifestyle.
              Outside of sports, I enjoy watching movies, which offer relaxation
              and entertainment. Additionally, I love reading, as it provides me
              with new insights and perspectives. These activities together
              contribute to my well-being and personal growth. They help me stay
              motivated, inspired, and connected with the world around me.
            </p>
            <div className="books-list">
              <p>Books I read:</p>
              <ul className="books-name">
                <li>The Bhagavad Gita</li>
                <li>Life’s Amazing Secret</li>
                <li>Death An Inside Story</li>
                <li>Atomic Habits</li>
                <li>Obstacles In The Way</li>
                <li>Do Epic Shit</li>
                <li>Good Vibes Good L ife</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
