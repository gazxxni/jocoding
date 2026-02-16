const themeToggleBtn = document.getElementById('theme-toggle');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');
const labelContainer = document.getElementById('label-container');

// 테마 전환 버튼 클릭 이벤트
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
});

// Teachable Machine
const URL = "https://teachablemachine.withgoogle.com/models/FbPUvPxyt/";
let model, maxPredictions;

// 모델 로드
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    
    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// '사진 선택' 버튼 클릭 시 숨겨진 file input 클릭
uploadBtn.addEventListener('click', () => fileInput.click());

// 파일이 선택되었을 때의 이벤트 처리
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 이전 이미지 및 결과 삭제
    imageContainer.innerHTML = '';
    labelContainer.innerHTML = ''; // 이전 결과 삭제
    
    // 이미지 미리보기 생성
    const img = document.createElement('img');
    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = async () => {
            imageContainer.appendChild(img);
            // 이미지 로드 후 예측 실행
            await predict(img);
        }
    };
    reader.readAsDataURL(file);
});

// 업로드된 이미지를 모델로 예측
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const label = document.createElement('span');
        label.classList.add('label');
        label.textContent = classPrediction;

        const percent = document.createElement('span');
        percent.classList.add('percent');
        percent.textContent = `${(probability * 100).toFixed(0)}%`;

        resultItem.appendChild(label);
        resultItem.appendChild(percent);
        
        labelContainer.appendChild(resultItem);
    }

    // Show the ad unit now that content is available
    const adUnit = document.querySelector('.ad-unit');
    if (adUnit) {
        adUnit.style.display = 'block';
    }
}

// 초기 로드
window.addEventListener('load', () => {
    // 테마 확인
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
    // 모델 로드 시작
    init();
});