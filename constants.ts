
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How ______ you today? - I'm fine, thanks.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 2,
    explanation: "With the subject 'you', we always use the verb to be 'are'."
  },
  {
    id: 2,
    text: "There ______ a desk and two chairs in my room.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 1,
    explanation: "When listing items, the verb 'to be' follows the first noun in the list ('a desk' is singular)."
  },
  {
    id: 3,
    text: "My brother ______ soccer every afternoon.",
    options: ["play", "plays", "playing", "to play"],
    correctAnswer: 1,
    explanation: "Present simple for singular third person (he/she/it/brother) adds 's/es' to the verb."
  },
  {
    id: 4,
    text: "What time ______ she go to school?",
    options: ["do", "does", "is", "doing"],
    correctAnswer: 1,
    explanation: "We use 'does' for auxiliary verbs in present simple questions with singular third person (she)."
  },
  {
    id: 5,
    text: "Look! The children ______ in the garden.",
    options: ["play", "plays", "are playing", "playing"],
    correctAnswer: 2,
    explanation: "The word 'Look!' signals an action happening now (Present Continuous: am/is/are + V-ing)."
  },
  {
    id: 6,
    text: "Our school is ______ to the park.",
    options: ["near", "between", "next", "opposite"],
    correctAnswer: 2,
    explanation: "'Next to' is the correct prepositional phrase meaning beside."
  },
  {
    id: 7,
    text: "How ______ apples do you want? - Five, please.",
    options: ["much", "many", "often", "old"],
    correctAnswer: 1,
    explanation: "'How many' is used for countable nouns like 'apples'."
  },
  {
    id: 8,
    text: "My mother is a ______. She works in a hospital.",
    options: ["teacher", "doctor", "farmer", "worker"],
    correctAnswer: 1,
    explanation: "People who work in hospitals are usually doctors or nurses."
  },
  {
    id: 9,
    text: "We usually have lunch ______ 11:30.",
    options: ["in", "on", "at", "to"],
    correctAnswer: 2,
    explanation: "We use 'at' for specific times of the day."
  },
  {
    id: 10,
    text: "______ do you go to school? - By bike.",
    options: ["What", "Where", "How", "Who"],
    correctAnswer: 2,
    explanation: "'How' is used to ask about the means of transport."
  }
];
