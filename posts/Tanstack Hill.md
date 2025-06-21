# Tanstack Hill

원래는 React Query에서 이름이 바뀐 Tanstack입니다.
Tanstack전에는 서버로부터 받아온 데이터를 다루는데 useState, useEffect를 이용했습니다. 
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
여러 컴포넌트에서 /api/data 경로로 데이터 요청을 한다 했을 때, 
중복호출이 발생하게 됩니다. 
또 캐싱이 없기 때문에 새로 로딩하고,
오래된 데이터를 가지고 있을 수 있고,
네트워크 에러시 수동 시도를 해야해요.
그런데 Tanstack은 
자동 캐싱(같은 queryKey)
자동 새로고침
자동 재시작
백그라운드 업데이트
얼마나 데이터가 최신인 지(stale time) 
설정까지 가능하도록 문제를 해결합니다.
//QueryClient 셋팅했다고 가정
import { useQuery } from '@tanstack/react-query'

function Tanstack(){
    const {data, isLoading, error} = useQuery({
        queryKey: ['data'],
        queryFn: () => fetch('/api/data').then(res=>res.json())
    });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return <div>{data}</div>;
}
그리고 무엇보다도 코드가 간결합니다.
참 쉽죠.

[Read more](https://velog.io/@deepsea/Tanstack-Hill)