const StartPage = props => {
    return (
        <>
            <div id="user-input-overlay">
                <div id="form-wrapper">
                    <form id="input-form">
                        <div id="input-modi">
                            <span>Modi: </span>
                            <select name="modi" id="modi">
                                <option value="SinglePlayer" className="modi-option">Single Player</option>
                                <option value="DoublePlayer" className="modi-option">Double Player</option>
                                <option value="MultiPlayer" className="modi-option">Multi Player</option>
                                <option value="Tournament" className="modi-option">Tournament</option>
                            </select>
                        </div>
                        <div id="input-number-players">Number of Players: <input type="text" name="fplayerNumber" /><br /><br /></div>
                            <div id="input-player-names"></div>
                            <button id="submit" type="button" value="Submit">Submit</button>
                        </form>
                        </div>
                </div>
                <div id="overlay">
                    <div id="scoreBoard">
                        <div id="player-left">
                            <p className="player-name"></p>
                            <p className="score score-left"></p>
                        </div>
                        <div id="player-right">
                            <p className="player-name"></p>
                            <p className="score score-right"></p>
                        </div>
                    </div>
                    <div id="main-container">
                        <img id="btn-start" src="start.png" />
                            <div id="tournament-wrapper"><div id="matchmaker"></div></div>
                            <div id="winning-background">
                                <p id='winning-text'></p>
                            </div>
                    </div>
                </div>

        </>
        );
}

export default StartPage;