function ScoreBoardView(props){

    function showCorrectSynonymsCB(synonymObject) {
        return (
            <tr key={synonymObject.word}>
                <td>{synonymObject.word}</td>
                <td><span className="number">{synonymObject.points.toFixed(0)}</span></td>
            </tr>
            )
    }
    function showIncorrectSynonymsCB(incorrectSynonym){
        return(
            <tr key ={incorrectSynonym}>
                <td>
                    <span className="strikethrough">{incorrectSynonym}</span>
                </td>
            </tr>
        )
    }

    //Replaces unwanted words within < > from the definition.
    function definitionCB(definition) {

        const newDefinition = definition.replace(/<(.*?)>/gi, "");

        return <li key={definition}>"{newDefinition}"</li>
    }

    // Displays all synonyms (for the given word) retrieved from the API.
    function showSynonymsForGivenWordCB(synonym){
        return (
                <li key ={synonym}>
                    {synonym}
                </li>
        )
    }
    function navigateToNextWordACB(){
        props.navigateToNextWord()
    }
    function navigateToGameScoreACB(){
        props.navigateToGameScore()
    }

    return (
        <div id="scoreBoard">

            <span className="roundDescription">round {props.round} of {props.maxRound}</span>
            <h1 className="givenWord">[{props.word}]</h1>

            {props.newBestWord && <p className="instruction">Congratulations! You got a new all-time best word, <b>{props.newBestWord.word}</b> with {props.newBestWord.points.toFixed(0)} points.</p> }

            <h3>Your synonyms:</h3>
            <table className="userSynonyms">
                <tbody>
                    {props.userWords.map(showCorrectSynonymsCB)}
                    {props.incorrectUserWords.map(showIncorrectSynonymsCB)}
                </tbody>
            </table>
            <p>
                Score this round: <span className="number">{props.scoreThisRound.toFixed(0)}</span>
            </p>
            <p>
                Total score: <span className="number">{props.totalScore.toFixed(0)}</span>
            </p>

            <button className="button" onClick={navigateToNextWordACB} hidden={props.lastRound}>Next round</button>
            <button className="button" onClick={navigateToGameScoreACB} hidden = {!props.lastRound}>Game Score!</button>

            <props.Accordion title="Definitions">
                <ol className="definitions">
                    {props.definition.map(definitionCB)}
                </ol>
            </props.Accordion>

            <props.Accordion title="Example synonyms">
                <ul className="wordList">
                    {props.givenWordSynonyms.map(showSynonymsForGivenWordCB)}
                </ul>
            </props.Accordion>

        </div>
    );
}
export default ScoreBoardView;