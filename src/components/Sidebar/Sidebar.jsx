import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import './Sidebar.css';
import { Context } from "../../contexts/Context";

export const Sidebar = () => {
    const [Extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    let menuHandle = () => {
        setExtended((prev) => !prev);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                {Extended ? (
                    <img
                        className="menu"
                        onClick={menuHandle}
                        src={assets.plus_icon}
                        alt=""
                    />
                ) : (
                    <img
                        onClick={menuHandle}
                        className="menu"
                        src={assets.menu_icon}
                        alt="menu-icon"
                    />
                )}

                <div className="newchat-img">
                    <img src={assets.plus_icon} alt="" />
                    {Extended ? <p>New Chat</p> : null}
                </div>
                {Extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div
                                onClick={() => loadPrompt(item)} // Pass the specific item to loadPrompt
                                className="recent-entry"
                                key={index}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <i className="ri-bard-fill"></i>
                    {Extended ? <p>Gem Manager</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question_icon" />
                    {Extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history_icon" />
                    {Extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting_icon" />
                    {Extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    );
};
