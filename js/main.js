(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
  let currentScene = 0; // 현재 활성화 된(눈앞에 보고 있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 씬이 시작된 순간 true

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        // 변화를 줄 obj 마다 어떤 css값을 어떤 값으로 넣을 것인지를 정의
        messageA_opacity: [0, 1],
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 현재 스크롤 위치에 맞춰 currentScene을 셋팅
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        // 전체 스크롤 높이 >= 현재 스크롤 위치
        currentScene = i; // 현재 씬을 i로 셋팅
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    // values: values.messageA_opacity
    // currentYOffset: 각 section에서의 스크롤 위치 (%)
    let rv;
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight; // 현재 씬(scroll section)에서 스크롤된 범위를 비율로 구하기
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs; // html DOM 객체 요소
    const values = sceneInfo[currentScene].values; // 값
    const currentYOffset = yOffset - prevScrollHeight; // 현재 section에서의 스크롤 위치 = 전체 높이 - 이전 섹션까지의 높이 합

    console.log(currentScene);

    switch (currentScene) {
      case 0:
        // console.log("0 play");
        let messageA_oppacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_oppacity_in; // css 스타일 제어
        console.log(messageA_oppacity_in);
        break;
      case 1:
        // console.log("1 play");
        break;
      case 2:
        // console.log("2 play");
        break;
      case 3:
        // console.log("3 play");
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0; // 초기화
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene == 0) return; // 브라우저 최상단에서 스크롤시 바운스 효과로 yOffset 값이 음수가 되는 이슈를 방지(모바일)
      currentScene--;
      2;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
    playAnimation();
  }

  // window size 변경시 scrollHeight 실시간 변경
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset; // pageYOffset: 수직 방향으로 HTML문서가 스크롤되는 픽셀 수 - 현재 스크롤 위치 확인 가능
    scrollLoop();
  });
  // window.addEventListener('DOMContentLoaded', setLayout)
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
})();
