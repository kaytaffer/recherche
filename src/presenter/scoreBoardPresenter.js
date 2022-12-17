//TODO present component scoreBoard
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ScoreBoardView from "../view/scoreBoardView.js";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    definitionState,
    enteredWordsWithScoreState,
    givenWordState,
    incorrectWordsState,
    scoresPerRoundState,
    synonymsState, gameRound, totalScoreState,
    highestScoringSynonymState,
} from "../model/atoms.js";
import Accordion from "./accordionPresenter";
import {numberOfRounds} from "../utilities/gameUtilities";

function ScoreBoard(props) {
    const givenWord = useRecoilValue(givenWordState);
    const definition = useRecoilValue(definitionState);
    const userWords = useRecoilValue(enteredWordsWithScoreState);
    const incorrectUserWords = useRecoilValue(incorrectWordsState);
    const givenWordSynonyms = useRecoilValue(synonymsState);
    const [scoreThisRound, setScoreThisRound] = useState(0);
    const [roundScores, setRoundScores] = useRecoilState(scoresPerRoundState);
    const [highestScoringSynonym, setHighestScoringSynonym] = useRecoilState(highestScoringSynonymState);
    const totalScore = useRecoilValue(totalScoreState);
    const currentGameRound = useRecoilValue(gameRound);
    const navigate = useNavigate()
    const arrayOfExampleSynonyms = getMultipleRandom(givenWordSynonyms);



    function getMultipleRandom(newArray) {
        const shuffled = [...newArray].sort(() => 0.5 - Math.random());
      
        return shuffled.slice(0, 4);
      }

      //sorts the entered synonyms and saves the synonym with the highest score
      function sortEnteredSynonyms(){
        function compareSynonymsCB(synonymA,synonymB){
            return synonymA.points > synonymB.points ? -1 : 1
        }
          function saveHighestScoringSynonym(synonym){
              if(synonym.points > highestScoringSynonym[0].points){
                  setHighestScoringSynonym([synonym])
              }
        }
        const sortedSynonymsArray = [...userWords].sort(compareSynonymsCB);
            if(sortedSynonymsArray[0]){
                saveHighestScoringSynonym(sortedSynonymsArray[0]);
            }

          return sortedSynonymsArray;
      }

    //Navigates to a page that shows values from the completed game round
    function navigateToGameScoreACB(){
        navigate("/gamescore")
    }

    //Navigates to start page
    function navigateToStartACB(){
        navigate("/")
    }

    //Sums the score for correct synonyms in the current round.
    function sumScoreCB(sumSoFar, newElement){
        return sumSoFar + newElement.points;
    }

    //Sums the points related to each synonym in the current round
    //and saves it in component and recoil states.
    function componentWasCreatedACB(){
        const roundScore = userWords.reduce(sumScoreCB, 0);
        setScoreThisRound(roundScore);
        setRoundScores([...roundScores, roundScore]);
    }
    React.useEffect( componentWasCreatedACB, [] );

    return <ScoreBoardView word = {givenWord}
                    definition = {definition}
                    userWords = {sortEnteredSynonyms()}
                    incorrectUserWords = {incorrectUserWords}
                    givenWordSynonyms = {arrayOfExampleSynonyms}
                    scoreThisRound = {scoreThisRound}
                    totalScore = {totalScore}
                    navigateToNextWord = {props.onRoundOver}
                    navigateToStart ={navigateToStartACB}
                    navigateToGameScore = {navigateToGameScoreACB}
                    lastRound = {currentGameRound === numberOfRounds}
                    Accordion = {Accordion}/>;
}
export default ScoreBoard;
