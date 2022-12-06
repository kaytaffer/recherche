import { atom, selector } from 'recoil';
import {compareWordsMatch, compareWordsMisMatch, createSynonymScoreObject} from "../utilities/wordUtilities";

// The given word
export const givenWordState = atom({
    key: 'givenWordState',
    default: 'example'
})

// Derived state of the given word
// Will contain all synonyms of that word
export const synonymsState = selector({
    key: 'synonymsState',
    get: ({get}) => {
        // TODO: call function to get synonyms, like this:
        // return functionName(get(givenWordState));

        // for now:
        return ["instance", "case", "illustration", "sample"];
    }
})

// Derived state of the given word
// Will contain the definition of that word
export const definitionState = selector({
    key: 'definitionState',
    get: ({get}) => { //TODO: un-arrow notation this
        // TODO: call function to get definition, like this:
        // return functionName(get(givenWordState));

        // for now:
        return "a thing characteristic of its kind or illustrating a general rule.";
    }
})

// All words entered by the user
export const enteredWordsState = atom({
    key: 'enteredWordsState',
    default: []
})

// All words entered by the user with their frequency
export const enteredWordsWithFrequencyState = selector({
    key: 'enteredWordsWithFrequencyState',
    get: ({get}) => { //TODO: un-arrow notation this

        function addFrequencyCB(synonym) {
            // TODO: call function to get frequencies
            return createSynonymScoreObject(synonym, 0);
        }
        return compareWordsMatch(get(enteredWordsState), get(synonymsState)).map(addFrequencyCB);
    }
})