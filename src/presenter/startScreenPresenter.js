import React from "react";
import StartScreenView from "../view/startScreenView";
import {useNavigate,Link} from "react-router-dom";
import {useRecoilRefresher_UNSTABLE, useSetRecoilState} from "recoil";
import {enteredWordsState, gameRound, givenWordState, scoresPerRoundState} from "../model/atoms";

function StartScreen() {
    const navigate = useNavigate()
    const refreshGivenWord = useRecoilRefresher_UNSTABLE(givenWordState);
    const setTotalScore = useSetRecoilState(scoresPerRoundState);
    const setEnteredWords = useSetRecoilState(enteredWordsState);
    const setCurrentGameRound = useSetRecoilState(gameRound);

    //Navigates to game and refreshes the necessary states.
    function startNewGameACB(){
        refreshGivenWord();
        setEnteredWords([]);
        setTotalScore([0]);
        setCurrentGameRound(1);
        navigate("/game");
    }
    return (
        <StartScreenView onGameStart = {startNewGameACB}
                        Link={Link}/>
    )
}
export default StartScreen;
