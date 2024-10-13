## Redis

- [String](#string)
- [Number](#number)
- [Hash](#hash)
- [SET](#set)
- [Sorted Set](#sorted-set)
- [Sort](#sort)
- [HyperLogLog](#hyperloglog)
- [List](#list)
- [Transition](#transition)
- [Concurrency](#cuncurrency)
- [RedisSearch](#redissearch)
- [Stream](#stream)

---

#### String

- SET [key] [value] => "OK"
- GET [key] => [value]
- SET [key] [value] GET :: 과거 값을 리턴
- SET [key] [value] XX :: key에 해당하는 값이 없으면 저장 X return null :: eXists
- SET [key] [value] NX :: key에 해당하는 값이 없으면 저장 O :: XX랑 반대 :: SETNX :: Not eXists
-
- SET [key] [value] EX 2 :: 2초 후에 데이터 삭제
- SETEX [key] [expire] [value] :: 2초 후에 데이터 삭제
- PX :: 밀리세컨드 EXAT :: 날짜 PXAT :: 시간 KEEPTTL :: 키에 해당하는 만료시간 유지함
-
- MSET [key] [value] [key] [value] ... :: 멀티 SET
- MSETNX [key] [value] [key] [value] ... :: 어느 key라도 존재하면 전체다 저장x
- MGET [key] [key] ... :: 멀티 GET
-
- DEL :: [key]
- GETRANGE [key] [start] [end] :: value에 substring :: 신기한건 end 인덱스까지 포함해서 리턴
- SETRANGE [key] [index] [value] :: key에 해당하는 값에 인덱스부터 value로 덮어씀 :: 리턴 값은 length

---

#### Number

- INCR [key] :: value + 1;
- DECR [key] :: value - 1
- INCRBY [key] [param] :: value + param
- DECRBY [key] [param] :: value + param
- INCRBYFLOAT [key] [float param] :: value - float param

---

#### Hash

- HSET [key] [keyOfValue] [value] [keyOfValue] [value] ... :: return 업데이트 된 key count
- HGET [key] [keyOfValue]
- HGETALL [key] :: return [[key],[value],[key],[value]...]
- HEXISTS [key] [keyOfValue] :: keyOfValue가 있으면 return 1 아닐 경우 return 0
- DEL [key] :: 해쉬값을 삭제
- HDEL [key] [keyOfValue] :: keyOfValue에 해당하는 k,v를 삭제
- HINCRBY [key] [keyOfValue] [IncryValue] :: IncryValue 만큼 증가
- HINCRBYFLOAT [key] [keyOfValue] [IncryValue]
- HSTRLEN [key] [keyOFValue] :: 문자열 길이
- HKEYS [key] :: 해쉬값의 key들 return
- HVALS [key] :: 해쉬값의 value들 return

---

#### SET

- SADD [key] [value] [value] ... :: 성공하면 1 실패시 0
- SMEMBERS [key] :: 모든 값 array로 리턴
- SUNION [key] [key] [key] ... :: 유니온 된 array 리턴
- SINTER [key] [key] [key] ... :: 교집합 리턴
- SDIFF [baseKey] [key] [key] ... :: baseKey에 해당하는 것 중 겹치는게 없는 걸 리턴
- SINTERSTORE [storeKey] [key] [key] ... :: key들의 교집합음 storeKey에 할당
- SISMEMBER [key] [value] :: value가 있으면 1 없으면 0
- SMISMEMBER [key] [value] [value] [value] ... :: value가 있으면 1 없으면 0 return array
- SCARD [key] :: return length
- SREM [key] [value] :: remove value
- SSCAN [key] [cursorID] COUNT [count] :: cussorID 부터 count 만큼 가져온다. 리턴 값에 다음 sucsorID를 리턴함

---

### Sorted SET

- ZADD [key] [score] [member] :: member에 score값을 매겨서 저장
- ZSCORE [key] [member] :: key->member 에 해당하는 score 값 리턴
- ZREM [key] [member] :: member 삭제
- ZCARD [key] :: return length
- ZCOUNT [key] [min] [max] :: scroe가 min >= max <= 인 갯수 리턴 :: ([min] ([max] 시 min 이랑 max 포함하지 않음
  <br>:: -inf +inf 로 제일 작은 값 제일 큰 값으로 설정 가능
- ZPOPMIN [key] [count] :: 제일 작은 스코어를 가진 count만큼의 값 return
- ZPOPMAX [key] [count] :: 제일 큰 스코어를 가진 count만큼의 값 return
- ZINCRBY [key] [score] [member] :: member의 score에 [score] 만큼 증가
- ZRANGE [key] [minIdx] [maxIdx] ?WITHSCORES :: [key]에 해당하는 idx 범위 가져오기 :: 오름차순으로 정렬 된 상태에서 idx임
- ZRANGE [key] [minScore] [maxScore] BYSCORE ?WITHSCORES :: [key]에 해당하는 member중 score가 min max 범위 안에 있는 member 목록 가져오기
- ZRANGE [key] [minIdx] [maxIdx] REV :: [key]에 해당하는 idx 범위 가져오기 :: 내림차순으로 정렬 된 상태에서 idx임
- ZRANGE [key] [minScore] [maxScore] BYSCORE LIMIT [offset] [count] :: [key]에 해당하는 member중 score가 min max 범위 안에 있는 member 목록 가져오기 :: [offset] 만큼 건너뛰고 [count] 만큼 가져오기

---

### SORT

> Sorted Set

- SORT [key] => Error :: sort 함수에서는 member 자체가 score가 되므로 문자열을 숫자로 변경이 불가능하여 오류가 발생 중요한건 맴버자체가 score
- SORT [key] ALPHA :: 문자열을 알파벳 순서로 Sort함
- SORT [key] LIMIT [offset] [count] ALPHA :: [offset] 만큼 건너띄고 [count] 만큼 가져옴
- SORT books:likes BY books:\* -> year :: ['bad', 'ok', 'good'] :: \*에 SortedSet의 맴버를 바인딩해서 검색 한 해쉬의 year로 정렬한다
- SORT books:likes BY books:\* -> year GET books:\*->title :: ['Bad Book', 'OK book', 'Good Book']
- SORT books:likes BY nosort [DESC|ASC] GET books:\*->title :: 정렬을 안해도 된다. 사용이유는 그냥 데이터 조인만 하고 싶을 경우

> 테스트 데이터 Hash : Sorted Set

| key        | ID   | Title     | Year | -   | key         | Member(Hash ID) | Score(Likes) |
| ---------- | ---- | --------- | ---- | --- | ----------- | --------------- | ------------ |
| books:good | good | Good Book | 1950 | -   | books:likes | good            | 999          |
| books:bad  | bad  | Bad Book  | 1930 | -   | books:likes | bad             | 0            |
| books:ok   | ok   | OK Book   | 1940 | -   | books:likes | ok              | 40           |

▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼

> SORT books:likes BY books:\*-> year <br>
> GET # <br>
> GET books:\*->title <br>
> GET books:\* ->year <br>

| ID   | Title     | Year |
| ---- | --------- | ---- |
| bad  | Bad Book  | 1930 |
| ok   | OK Book   | 1940 |
| good | Good Book | 1950 |

---

### HyperLogLog

> Set에 비해 차지하는 메모리가 적어서 간단한 용도로 쓸때 좋다 <br>
> 리턴값이 부정확할 확률이 0.81% 퍼센트가 있을

- PFADD [key] [value] :: key에 value가 없으면 return 1 있으면 return 0
- PFCOUNT [key] :: 등록된 value의 갯수

---

### List

> List는 배열이 아닌 링크드리스트 이다

- LPUSH [key] [value] :: return count
- RPUSH [key] [value] :: return count
- LLEN [key] :: return count
- LINDEX [key] [index] :: return key[index]
- LRANGE [key] [startIdx] [endIdx] :: 인덱스 범위까지 가져옴
- LPOS [key] [targetValue] :: 해당하는 인덱스를 리턴함 없을 경우 null
- LPOS [key] [targetValue] RANK [offset] :: targetValue의 offset 번째 인덱스를 리턴
- LPOS [key] [targetValue] COUNT [count] :: targetValuefmf count만큼 찾아서 인덱스 배열을 리턴
- LPOS [key] [targetValue] MAXLEN [len] :: 첫번째부터 len까지만 검색해서 targetValue를 찾도록 함
- LPOP [key] :: 첫번째 노드를 리턴하고 삭제
- RPOP [key] :: 마지막 노드를 리턴하고 삭제
- LSET [key] [idx] [value] :: idx에 해당하는 값을 value로 바꿈
- LTRIM [key] [startIdx] [endIdx] :: startIdx ~ endIdx를 제외하고 다 삭제
- LINSERT [key] BEFORE [targetValue] [insertValue] :: targetValue의 인덱스 바로 전에 insertValue를 넣는다
- LINSERT [key] AFTER [targetValue] [insertValue] :: targetValue의 인덱스 바로 뒤에 insertValue를 넣는다
- LREM [key] [startIdx] [targetValue] :: startIdx부터 서치하여 targetValue들을 전부 지운다 :: idx가 음수일경우 역순으로 조사함

---

### Transition

- MULTI [...action] EXEC
- WATCH [key] MULTI [...action] EXEC :: key에 해당하는 값이 변경이 되면 트랜잭션만 실패하게 된다 실패시 Return null

---

### Concurrency

- A 프로세스의 락의 만료 된 후 B 프로세스가 락을 잡고 A 프로세스가 락을 해제 할 때
  B 프로세스의 락을 삭제 하기 때문에 자기 자신이 잡인 락인지 확인을 위해 토큰 값을 부여

```lua
if GET(KEYS[1]) == ARGV[1] then
  DEL(KEYS[1])
end
```

- Lock을 잡고 실행하는 프로세스가 PX 보다 길 경우
  프로세스가 끝나기 전에 다른 프로세스가 Lock을 잡을 수 있다.
  > > PX 시간이 지났는지를 체크 하는 객체를 이용
  > > 혹은 Redis Client 를 Proxy 객체로 감싸서 Expired 체크

### RedisSearch

    - 데이터
    HSET cars#a1 name 'car' color 'blue' year 1960
    HSET cars#b1 name 'old car' color 'blue' year 1940
    HSET cars#c3 name 'fast car' color 'black' year 1980
    - 인덱스 생성
    FT.CREATE idx:cars ON HASH PREFIX 1 cars#
      SCHEMA name TEXT year NUMERIC color TAG
    - 서치
    FT.SEARCH idx:cars '@name:(fast car)'
    FT.SEARCH idx:cars '@color:{blue}'
    FT.SEARCH idx:cars '@year:[1955 1980]'

- 인덱스 타입: NUMERIC, GEO, VECTOR, TAG, TEXT
- 퍼지검색 : FT.SEARCH idx:cars '@name: (%car%)' :: % 하나당 오탈자 1개 있어도 조회됨 > %는 3개까지 가능
- 접두사검색 : FT.SEARCH idx:Cars '@name: (fa\*)' :: startWith 와 같음. 대신 2글자 이상 이여야 함
- FT.\_LIST : 존재하는 인덱스 목록
- FT.EXPLANINCLI idx:items 'query' :: 매칭 되는 문자열 조회 (검증용)
- FT.PROFILE idx.items SEARCH QUERY 'query' LIMIT 0 0 :: 성능 조회

### Stream

- XADD [key] * [keyOfValue] [value] [keyOfValue] [value] :: 스트림 추가 *는 Redis가 ID 생성 하도록 함 (UnixTime으로 자동 생성)
- XREAD STREAMS [key] [unixTime]-[number] :: UnixTime 이후에 모든 스트림 읽기 :: Number는 동일한 유닉스 타임에 대한 순번
- XREAD COUNT [count] STREAMS [key] [unixTime]-[number]
- XREAD BLOCK [ms] STREAMS [key] [unixTime]-[number] :: ms 동안 데이터가 들어오면 리턴해줌
- XREAD COUNT [count] BLOCK [ms] STREAMS [key] [unixTime]-[number] :: Count 만큼 데이터가 안쌓여도 하나라도 생기면 즉시 반환하는 특성이 있음
- XREAD COUNT [count] BLOCK [ms] STREAMS [key] $ :: $가 READ된 UnixTime으로 변환하면서 다시 XREAD를 실행함 즉. 카운트 만큼 다 읽을 수 있음

- XRANGE [key] [startUnixTime]-[number] [endUnixTime]-[number] COUNT [count] :: endUnixTime-Number에 + 를 사용하면 최댓값이 된다. 반대로 - 를 사용하면 최솟값이 됨

- XGROUP CREATE [key] [groupKey] $ MKSTREAM :: $에 id를 입력해서 지정한 id 부터 스트림 할 수 있다
- XGROUP CREATECONSUMER [key] [groupKey] [consumerKey]
- XINFO GROUPS [key] :: 컨슈머 그룹 목록을 보여줌
- XINFO CONSUMERS [key] [groupKey] :: 컨슈머에 디테일한 정보를 보여줌
- XREADGROUP GROUP [groupKey] COUNT [count] STREAMS [key] > :: > 는 id로 지정 할 수 있다. > 기호는 수신되지 않은 걸 다 가져온다는 뜻
- XACK [key] [groupKey] [id] :: 제대로 수신이 완료되었다고 전송함
- XAUTOCLAIM [key] [groupKey] [newReciveConsumerKey] [timeoutMs] [id]-[number] :: ACK 답변이 없는 메세지들 중 timeoutMs 만큼 지난 메세지들을 group 에 있는 다른 곳으로 전송
