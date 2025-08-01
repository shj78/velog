# LCP를 느리게 만드는 img 태그

먼저 LCP(Largest Contentful Paint)란?
웹 성능 지표중 하나로, 사용자가 "페이지가 로드됐다" 라고 느끼는 시점을 측정합니다.
왜 img 태그는 LCP를 느리게 만드는 가
내부적으로 최적화 기능이 없기 때문입니다.
그래서 이미지의 크기나 포맷을 원본 그대로 가지며, 즉시 로딩합니다.
그렇다면 뭘 써야하는 가
Next를 사용하고 있다면 Next에 내장된 Image를 사용합니다.
img 태그의 LCP 저하 이슈는 Next 프로젝트를 빌드하며 발생한 에러였어요.
Next의 Image는 최적화된 기능을 갖고 있기 때문에,
포맷은 WebP, AVIF 등의 최신 포맷으로 자동 변환
크기는 Next가 알아서 화면 크기에 맞게 리사이징하고 우선순위에 따라 지연 로딩합니다.
결국 img태그에 최적화 엔진을 달고 나온게 Next의 Image라고 볼 수 있겠네요..!

[Read more](https://velog.io/@deepsea/LCP%EB%A5%BC-%EB%8A%90%EB%A6%AC%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94-img-%ED%83%9C%EA%B7%B8)