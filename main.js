const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const themeToggleBtn = document.getElementById('theme-toggle');

// 로또 번호 생성 함수
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// 생성된 번호를 화면에 표시하는 함수
function displayNumbers(numbers) {
  lottoNumbersContainer.innerHTML = ''; // 기존 번호 삭제
  numbers.forEach((number, index) => {
    const ball = document.createElement('div');
    ball.classList.add('lotto-ball');
    ball.textContent = number;
    ball.style.animationDelay = `${index * 0.1}s`; // 애니메이션 지연
    lottoNumbersContainer.appendChild(ball);
  });
}

// 번호 생성 버튼 클릭 이벤트
generateBtn.addEventListener('click', () => {
  const newNumbers = generateLottoNumbers();
  displayNumbers(newNumbers);
});

// 테마 전환 버튼 클릭 이벤트
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
});

// 초기 로드 시 번호 한 번 생성
window.addEventListener('load', () => {
    generateBtn.click();
});