// === Theme Toggle ===
const themeToggleBtn = document.getElementById('theme-toggle');

const setIconForTheme = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const icon = themeToggleBtn.querySelector('i');
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    setIconForTheme();
});

// Set initial icon on load
document.addEventListener('DOMContentLoaded', setIconForTheme);


// === Web Component: AnimalFaceTester ===
const testerTemplate = document.createElement('template');
testerTemplate.innerHTML = `
    <style>
        /* Styles are encapsulated in Shadow DOM */
        :host {
            display: block;
            width: 100%;
        }
        .card {
            background-color: var(--card-light);
            color: var(--card-foreground-light);
            border: 1px solid var(--border-light);
            border-radius: 12px;
            padding: 2rem;
            width: 100%;
            max-width: 450px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        :host-context(body.dark-mode) .card {
            background-color: var(--card-dark);
            color: var(--card-foreground-dark);
            border: 1px solid var(--border-dark);
        }
        .card-header {
            margin-bottom: 1.5rem;
        }
        .card-header h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
        }
        .card-header p {
            font-size: 1rem;
            color: var(--muted-foreground-light);
            margin: 0;
        }
        :host-context(body.dark-mode) .card-header p {
            color: var(--muted-foreground-dark);
        }
        .card-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
        }
        #image-container {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 8px;
            border: 2px dashed var(--border-light);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--muted-light);
            overflow: hidden;
            position: relative;
        }
        :host-context(body.dark-mode) #image-container {
            border-color: var(--border-dark);
            background-color: var(--muted-dark);
        }
        #image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        #image-container .placeholder {
            color: var(--muted-foreground-light);
            font-size: 1.2rem;
        }
         :host-context(body.dark-mode) #image-container .placeholder {
            color: var(--muted-foreground-dark);
        }
        .button {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 500;
            transition: background-color 0.2s, transform 0.1s;
            border: none;
            width: 100%;
        }
        .button:active {
            transform: scale(0.98);
        }
        .button-primary {
            background-color: var(--primary-light);
            color: var(--primary-foreground-light);
        }
        .button-primary:hover {
            background-color: #333;
        }
        :host-context(body.dark-mode) .button-primary {
            background-color: var(--primary-dark);
            color: var(--primary-foreground-dark);
        }
        :host-context(body.dark-mode) .button-primary:hover {
            background-color: #ccc;
        }
        #label-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            min-height: 50px;
        }
        .result-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.1rem;
        }
        .result-item .label {
            font-weight: 500;
        }
        .result-item .percent {
            font-weight: 600;
            font-feature-settings: "tnum"; /* tabular-nums */
        }
        .ad-unit {
            display: none;
            margin: 1.5rem auto;
            text-align: center;
        }
        .share-buttons {
            display: none;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;
        }
        .share-buttons h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
        }
        .share-button-group {
            display: flex;
            gap: 1rem;
            width: 100%;
        }
        .button-share {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 10px;
        }
        .button-twitter { background-color: #1DA1F2; color: white; }
        .button-facebook { background-color: #1877F2; color: white; }
        .button-copy { background-color: #777; color: white; }
    </style>
    <div class="card">
        <div class="card-header">
            <h1>AI 동물상 테스트</h1>
            <p>당신의 얼굴은 강아지상일까, 고양이상일까?</p>
        </div>
        <div class="card-content">
            <div id="image-container">
                <span class="placeholder">이미지를 업로드하세요</span>
            </div>
            <div id="label-container"></div>
            <div class="share-buttons">
                <h3>결과 공유하기</h3>
                <div class="share-button-group">
                    <button id="twitter-share-btn" class="button button-share button-twitter"><i class="fa-brands fa-twitter"></i> 트위터</button>
                    <button id="facebook-share-btn" class="button button-share button-facebook"><i class="fa-brands fa-facebook"></i> 페이스북</button>
                    <button id="copy-link-btn" class="button button-share button-copy"><i class="fa-solid fa-copy"></i> 링크 복사</button>
                </div>
            </div>
            <ins class="adsbygoogle ad-unit"
                style="display:block"
                data-ad-client="ca-pub-3727745903495236"
                data-ad-slot="2967443951"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            <button type="button" id="upload-btn" class="button button-primary">사진으로 분석하기</button>
            <input type="file" id="file-input" accept="image/*" style="display: none;" />
        </div>
    </div>
`;


class AnimalFaceTester extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(testerTemplate.content.cloneNode(true));

        this.URL = "https://teachablemachine.withgoogle.com/models/FbPUvPxyt/";
        this.model = null;
        this.maxPredictions = 0;
        this.resultText = '';
    }

    connectedCallback() {
        this.uploadBtn = this.shadowRoot.getElementById('upload-btn');
        this.fileInput = this.shadowRoot.getElementById('file-input');
        this.imageContainer = this.shadowRoot.getElementById('image-container');
        this.labelContainer = this.shadowRoot.getElementById('label-container');
        this.shareButtons = this.shadowRoot.querySelector('.share-buttons');
        
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', this.handleFileChange.bind(this));
        
        this.init();
    }

    async init() {
        const modelURL = this.URL + "model.json";
        const metadataURL = this.URL + "metadata.json";
        
        try {
            this.model = await tmImage.load(modelURL, metadataURL);
            this.maxPredictions = this.model.getTotalClasses();
            this.uploadBtn.disabled = false;
            this.uploadBtn.textContent = '사진으로 분석하기';
        } catch (error) {
            console.error("Could not load the model.", error);
            this.uploadBtn.textContent = '모델 로딩 실패';
            this.uploadBtn.disabled = true;
        }
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.imageContainer.innerHTML = '';
        this.labelContainer.innerHTML = '';
        this.shareButtons.style.display = 'none';
        
        const img = document.createElement('img');
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
                this.imageContainer.appendChild(img);
                this.predict(img);
            };
        };
        reader.readAsDataURL(file);
    }

    async predict(imageElement) {
        const prediction = await this.model.predict(imageElement);
        let resultText = "AI가 제 동물상을 분석해줬어요! 여러분도 한 번 해보세요!\\n\\n";
        
        prediction.forEach(p => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const label = document.createElement('span');
            label.classList.add('label');
            label.textContent = p.className;

            const percent = document.createElement('span');
            percent.classList.add('percent');
            percent.textContent = `${(p.probability * 100).toFixed(0)}%`;

            resultItem.appendChild(label);
            resultItem.appendChild(percent);
            
            this.labelContainer.appendChild(resultItem);
            resultText += `${p.className}: ${(p.probability * 100).toFixed(0)}%\\n`;
        });
        
        this.resultText = resultText;
        this.shareButtons.style.display = 'flex';
        this.setupShareButtons();

        const adUnit = this.shadowRoot.querySelector('.ad-unit');
        if (adUnit) {
            adUnit.style.display = 'block';
        }
    }

    setupShareButtons() {
        const url = window.location.href;
        const text = encodeURIComponent(this.resultText);

        const twitterBtn = this.shadowRoot.getElementById('twitter-share-btn');
        const facebookBtn = this.shadowRoot.getElementById('facebook-share-btn');
        const copyBtn = this.shadowRoot.getElementById('copy-link-btn');

        twitterBtn.onclick = () => {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        };

        facebookBtn.onclick = () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        };

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(url).then(() => {
                alert("링크가 복사되었습니다!");
            }, () => {
                alert("링크 복사에 실패했습니다.");
            });
        };
    }
}

customElements.define('animal-face-tester', AnimalFaceTester);
