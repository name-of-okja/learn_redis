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
