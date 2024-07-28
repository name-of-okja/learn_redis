## Default

#### 문자열

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

#### 숫자

- INCR [key] :: value + 1;
- DECR [key] :: value - 1
- INCRBY [key] [param] :: value + param
- DECRBY [key] [param] :: value + param
- INCRBYFLOAT [key] [float param] :: value - float param

#### 해쉬

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
