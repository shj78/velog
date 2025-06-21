# MUI seeds

MUI를 앱에 뿌려보는 시간을 가지겠습니다.
먼저 MUI를 설치합니다.
그리고 MUI 테마를 설정합니다.

export const bbangBuddyTheme = createTheme({
    palette: {
      ...
    },
    typography: {
      fontFamily: [
        '"Noto Sans"',
        '"Noto Sans KR"',
      ],
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
        color: '#333333',
      }  
    }, 
    components: {
    },
    breakPoint: {
      values: {
      }
    }
});

[Read more](https://velog.io/@deepsea/MUI-seeds)