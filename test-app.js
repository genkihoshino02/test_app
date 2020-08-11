const quizContainer=document.getElementById("quiz");
const results=document.getElementById("result");
const submitBtn=document.getElementById("submit");

// クイズのデータ
let questions=[
    {
        question:"Which of the following are pyrimidines?",
        answers:{
            a:"adenine and cytosine",
            b:"adenine and thymine",
            c:"cytosine and thymine"
        },
        correctAns:"c",
        picture:"./img/quiz1.jpg" ,
        translated:"次の内ピリミジンはどれか"
    },
    {
        question:"Which of the following are purines?",
        answers:{
            a:"adenine and cytosine",
            b:"adenine and guanine",
            c:"adenine and thymine"
        },
        correctAns:"b",
        picture:"./img/quiz2.jpg",
        translated:"次の内プリンはどれか"
    },
    {
        question:"Who is the current CEO of apple?",
        answers:{
            a:"Tim Cook",
            b:"Steve Jobs",
            c:"Jony Ive"
        },
        correctAns:"a",
        picture:"./img/quiz3.jpg",
        translated:"アップルの現在のCEOは誰か"
    }
];

function showQuestions(){
    const output=[];

    questions.forEach(
        (currentQuestion,questionNumber)=>{
            const answers=[];
            for(letter in currentQuestion.answers){
                answers.push(`
                    <div>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}  :
                        ${currentQuestion.answers[letter]}
                    </div>
                `);
            }

            output.push(`
                <div class="question mt-4">
                   Q.${questionNumber+1} :   ${currentQuestion.question}
                 </div>
                 <div class="translated"  style="display: none;"> ${currentQuestion.translated}</div>
                <div class="image">
                    <img src="${currentQuestion.picture}">
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
    const percentCorrect=Math.floor(100*numCorrect/questions.length);
    let message;
    if(percentCorrect>=80){
        message="Excellent";
    }else if(percentCorrect>=60){
      message="well done";
    }else{
     message="Good luck";
    }
    results.innerHTML=`${numCorrect} OUT OF ${questions.length} is correct.<br>
                    your correct answer rate is ${percentCorrect}   <br>
                    ${message}`;
    

    
}

submitBtn.addEventListener("click",showResult);
showQuestions();


$(document).ready(function() {
    $(".question").click(function() {
      $(".translated").toggle("slow");
    });
  });