# Tanstack Hill

Tanstack (구 React Query)
Tanstack 은?
서버의 상태관리 도구로, React의 데이터 관리 측면에서의 아쉬운 점 들을 한방에 해결해주는 라이브러리입니다.
Tanstack 전에는 React에서 서버로부터 받아온 데이터를 다루는데 아래와 같이 useState, useEffect 훅을 이용했어요.
function NonTanstack(){
  const [data,setData] = useState(null);
  const [loading, setLoading] = useSate(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
      setLoading(true);
    fetch("/api/data")
      .then(res => res.json())
      .then(data => {
      setData(data);
      setLoading(false);
    })
    ,catch(err =>{
      setError(err);
      setLoading(false);
    })
  });

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return <div>{data}</div>;
}
이런식으로 데이터를 요청하다보면,
여러 컴포넌트에서 /api/data 경로로 데이터 요청을 한다 했을 때는 중복 호출이 발생하게 됩니다.
또 캐싱이 없기 때문에 새로 로딩하고,
오래된 데이터를 가지고 있을 수 있고,
네트워크 에러시 수동 시도 등이 필요한 불편한 점이 있습니다.
이에 반해 Tanstack은 
자동 캐싱(같은 queryKey)
자동 새로고침
자동 재시작
백그라운드 업데이트
stale time(얼마나 데이터가 최신인 지) 을 지원합니다.
안쓸 수가 없겠죠?
Tanstack에는 기본적으로 데이터 불러오기, 데이터 변경, 캐시 조작의 3가지의 개념이 있습니다.
1. useQuery
//queryClient 셋팅했다고 가정
import { useQuery } from '@tanstack/react-query'

function Tanstack(){
    const {data, isLoading, idError, error, isFetching, isSuccess, isStale, refetch} = useQuery({
        queryKey: ['data'],
        queryFn: () => fetch('/api/data').then(res=>res.json())
    });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return <div>{data}</div>;
}
먼저 데이터를 불러오기 위해,
GET 요청으로 데이터를 가져올 때 사용하는 useQuery입니다.
useQuery가 반환하는 객체에는 
다양한 속성(data, isLoading, idError, error, isFetching, isSuccess, isStale, refetch...)을 제공하고 있고, 
이 객체안에서 페칭한 데이터, 로딩/에러등의 데이터 관련 상태를 확인할 수 있습니다.
더 정확하게는 React Query Devtool을 통해 
어떤 쿼리 키가 활성화되어있는 지, 상태가 fresh한지, 캐시에 어떤 데이터가 저장되어있는 지 등을 확인할 수 있습니다.
그리고 무엇보다도 코드가 간결해집니다.
참 좋죠.
2. useMutation
다음으로 데이터를 변경하기 위해 POST, PUT, DELETE 요청으로 서버에 데이터를 내보낼 때 사용하는 useMutation이 있습니다.
POST 요청인데 useQuery를 쓰는 불상사는 없어야겠죠?
const mutation = useMutation({
  mutationFn: async (newTodo) => {
    const res = await api.post("/todos", newTodo);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["todos"]); // 성공 시 invalidateQueries사용하여 목록 다시 가져오기 가능
  },
});


//사용시
mutation.mutate({ title: "할 일 추가" });

3. useQueryClient
마지막으로 캐시된 쿼리를 조작할 수 있는 도구 useQueryClient입니다.
queryKey는 useQuery가 반환하는 객체의 고유 식별자인데, 
이 queryKey를 관리하는 방법은 내부적으로 이렇게 이루어지고 있습니다.
queryKey를 해시(Key)로 사용하여 데이터를 메모리에 저장
동일한 Key로 요청시 메모리에 저장된 캐시 데이터 반환
queryKey 변경시 새로운 데이터로 캐시 데이터 갱신
캐시 무효화(invalidateQueries)시 특정 queryKey 대상으로 캐시 데이터 무효화
invalidateQueries의 의미: 
해당 쿼리를 stale(만료)표시로 하고 현재 사용중인 쿼리는 백그라운드에서 자동으로 refetch(재요청)를 트리거한다는 의미
const queryClient = useQueryClient();
queryClient.invalidateQueries({
   queryKey: ['todos'],
   exact: false //todos로 시작하는 접두사를 가진 모든 키를 포함한다는 뜻
});
setQueryData를 이용해 캐시 데이터 직접 수정
queryClient.setQueryData(
 ['todo', 1], //수정할 키 
   (oldData) => ({...oldData, title: 'wicked'})
);
이렇게 Tanstack은 React가 의도적으로 다루지 않는 서버 상태 관리를 해결하면서,
React가 UI 렌더링에 집중할 수 있도록 데이터 관리 계층을 분리해주는 
상호보완적 라이브러리의 역할을 해주고 있습니다.
다음 포스팅에는 
queryKey 계층화
enabled
select
staleTime 
cacheTime
refetchOnWindowFocus
같이 Tanstack을 더 유연하게 쓸 수 있는 방법에 대해서 알아봐야겠습니다.

[Read more](https://velog.io/@deepsea/Tanstack-Hill)