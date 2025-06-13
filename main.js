// 팀원 데이터 객체로 관리
const teamMembers = {
  김태빈: {
    학번: '92212790',
    연락처: '010-7221-7727',
    역할: '메인, 개인 홈페이지 제작',
    github: 'https://github.com/taebin327',
    홈페이지: 'https://private-homepage-pi.vercel.app/',
  },
  곽남호: {
    학번: '92212697',
    연락처: '010-7454-3904',
    역할: '개인 홈페이지 제작, 자료조사',
    github: 'https://github.com/KwakNamHo',
    홈페이지: 'https://namho-portfolio.vercel.app',
  },
  이원준: {
    학번: '92416140',
    연락처: '010-4841-6929',
    역할: '개인 홈페이지 제작, 자료조사',
    github: 'https://github.com/joon-afk',
    홈페이지: 'https://portfolio-lee-won-joons-projects.vercel.app/',
  },
  김민우: {
    학번: '92212752',
    연락처: '010-8700-9404',
    역할: '개인 홈페이지 제작, 자료조사',
    github: 'https://github.com/vmaca123',
    홈페이지: 'https://portfolio-m497.vercel.app/',
  },
}

const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('searchName')
const resultDiv = document.getElementById('result')

searchBtn.addEventListener('click', () => {
  const name = searchInput.value.trim()

  if (!name) {
    resultDiv.innerHTML = "<p style='color:red;'>팀원 이름을 입력하세요.</p>"
    return
  }

  const member = teamMembers[name]

  if (member) {
    resultDiv.innerHTML = `
      <h3>${name}님의 정보</h3>
      <ul>
        <li><strong>학번:</strong> ${member.학번}</li>
        <li><strong>연락처:</strong> ${member.연락처}</li>
        <li><strong>역할:</strong> ${member.역할}</li>
        <li><strong>GitHub:</strong> <a href="${member.github}" target="_blank">${member.github}</a></li>
        <li><strong>개인 홈페이지:</strong> <a href="${member.홈페이지}" target="_blank">${member.홈페이지}</a></li>
      </ul>
    `
  } else {
    resultDiv.innerHTML = `<p style="color:red;">"${name}" 팀원을 찾을 수 없습니다.</p>`
  }
})
