import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../contexts/Context";
import { useContext } from "react";

export const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user-icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Dev.</span>
              </p>
              <p id="help">How can I help you</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest me a course that can help me to get job early</p>
                <img src={assets.compass_icon} alt="compass-icon" />
              </div>
              <div className="card">
                <p>How to decorate an office space to look cosier yet professional?</p>
                <img src={assets.bulb_icon} alt="bulb-icon" />
              </div>
              <div className="card">
                <p>Help me work out how to advocate to my manager that I should be promoted.</p>
                <img src={assets.message_icon} alt="message-icon" />
              </div>
              <div className="card">
                <p>Help me update my website tracking code.</p>
                <img src={assets.code_icon} alt="code-icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user-icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini-icon" />
              {loading? <div className="loader">
                <hr/>
                <hr/>
                <hr/>
              </div>:<p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
              
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask to Gemini"
              value={input}
              onChange={(e) => setInput(e.target.value)} // Handle input changes
            />
            <div className="input-img">
              <img src={assets.gallery_icon} alt="gallery-icon" />
              <img src={assets.mic_icon} alt="mic-icon" />
              <img
                onClick={() => {
                  onSent(input); // Pass `input` to `onSent`
                }}
                src={assets.send_icon}
                alt="send-icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes. Check important info. Created by @Rohit
            <i className="ri-heart-3-fill"></i>
          </p>
        </div>
      </div>
    </div>
  );
};
