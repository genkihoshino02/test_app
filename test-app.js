const quizContainer=document.getElementById("quiz");
const results=document.getElementById("result");
const submitBtn=document.getElementById("submit");

// クイズのデータ
let questions=[
    {
        question:"What does CEO stand for?",
        answers:{
            a:"Chief excutive officer",
            b:"chewing excellent officer",
            c:"No idea"
        },
        correctAns:"a"
    },
    {
        question:"What does AI stand for?",
        answers:{
            a:"Ambitious Iron",
            b:"Artificail Intelligence",
            c:"No idea"
        },
        correctAns:"b"
    }
];

function showQuestions(){
    const output=[];

    questions.forEach(
        (currentQuestion,questionNumber)=>{
            const answers=[];
            for(letter in currentQuestion.answers){
                answers.push(`
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>
                `);
            }

            output.push(`
                <div class="question">
                    ${currentQuestion.question}
                 </div>
                 <div class="answers">
                    ${answers.join('')}
                </div>
            `);
    })  
    quizContainer.innerHTML=output.join('');
}

function showResult(){
    const answerContainers=quizContainer.querySelectorAll(".answers");

    let numCorrect=0;

    questions.forEach((currentQuestion,questionNumber) =>{
        const answerContainer=answerContainers[questionNumber];
        const selector=`input[name=question${questionNumber}]:checked`;
        const userAnswer=(answerContainer.querySelector(selector) || {}).value;

        if(userAnswer===currentQuestion.correctAns){
            numCorrect++;
            answerContainers[questionNumber].style.color="green";
        }else{
            answerContainers[questionNumber].style.color="red";
        }


       
    });
    results.innerHTML=`${numCorrect} OUT OF ${questions.length}`
}

submitBtn.addEventListener("click",showResult);
showQuestions();