const themeToggleBtn = document.getElementById('theme-toggle');
const form = document.querySelector('form');
const formStatus = document.getElementById('form-status');

// 테마 전환 버튼 클릭 이벤트
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
});

// 폼 제출 이벤트 (Formspree 사용)
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
  });

  if (response.ok) {
    formStatus.textContent = '문의가 성공적으로 접수되었습니다!';
    formStatus.style.color = 'green';
    form.reset(); // 폼 필드 초기화
  } else {
    const data = await response.json();
    if (data.errors) {
      formStatus.textContent = data.errors.map(error => error.message).join(', ');
    } else {
      formStatus.textContent = '문의 접수 중 오류가 발생했습니다.';
    }
    formStatus.style.color = 'red';
  }
});

// 초기 로드 시 다크 모드 상태 확인
window.addEventListener('load', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
});