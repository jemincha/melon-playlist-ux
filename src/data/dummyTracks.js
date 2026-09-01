// src/data/dummyTracks.js
//
// 실제 사용자의 멜론 플레이리스트("국내밴드", 224곡)에서 곡명/아티스트/앨범 정보만
// 추출·정제해 만든 더미 데이터. 개인정보(닉네임, 좋아요 수 등)는 모두 제거함.
//
// 데이터 형태:
// {
//   trackId: string,      // 고유 ID (예: 't001')
//   title: string,        // 곡명
//   artistName: string,   // 아티스트명 (그룹핑 기준 키)
//   album: string,        // 앨범명
//   albumArt: string,     // 앨범아트 placeholder 이미지 URL (picsum, 아티스트별로 고정 seed)
//   addedAt: string,      // ISO 날짜 문자열 - 임의로 균등 배분한 값 (실제 추가일 아님)
// }
//
// 규모: 224곡 / 아티스트 약 60팀. 원래 가이드라인에서 잡았던 50~80곡보다 크지만,
// "수백 곡을 관리하는 헤비 유저"라는 실제 문제 상황을 그대로 보여주는 게 데모 임팩트가
// 더 크다고 판단해 전체를 유지함. 최초 순서는 사용자가 실제로 정리해둔 순서이기 때문에
// 이미 아티스트별로 잘 묶여 있는 상태(=As-Is 초기 상태로 적합)임.

const TRACKS = [
  {
    "trackId": "t001",
    "title": "Lean",
    "artistName": "Tuesday Beach Club",
    "album": "Lean",
    "albumArt": "https://picsum.photos/seed/Tuesday-Beach-Club/80/80",
    "addedAt": "2022-03-01"
  },
  {
    "trackId": "t002",
    "title": "Endless Shine",
    "artistName": "Tuesday Beach Club",
    "album": "Endless Shine",
    "albumArt": "https://picsum.photos/seed/Tuesday-Beach-Club/80/80",
    "addedAt": "2022-03-06"
  },
  {
    "trackId": "t003",
    "title": "Ever",
    "artistName": "Tuesday Beach Club",
    "album": "Ever",
    "albumArt": "https://picsum.photos/seed/Tuesday-Beach-Club/80/80",
    "addedAt": "2022-03-11"
  },
  {
    "trackId": "t004",
    "title": "헤어지는 날 바로 오늘",
    "artistName": "3호선 버터플라이",
    "album": "Dreamtalk",
    "albumArt": "https://picsum.photos/seed/3호선-버터플라이/80/80",
    "addedAt": "2022-03-16"
  },
  {
    "trackId": "t005",
    "title": "꿈꾸는 나비",
    "artistName": "3호선 버터플라이",
    "album": "Self-Titled Obsession (2010 Remastered Ver.)",
    "albumArt": "https://picsum.photos/seed/3호선-버터플라이/80/80",
    "addedAt": "2022-03-21"
  },
  {
    "trackId": "t006",
    "title": "깊은 밤 안개 속",
    "artistName": "3호선 버터플라이",
    "album": "Nine Days Or A Million",
    "albumArt": "https://picsum.photos/seed/3호선-버터플라이/80/80",
    "addedAt": "2022-03-26"
  },
  {
    "trackId": "t007",
    "title": "습관 (Bye Bye)",
    "artistName": "롤러 코스터",
    "album": "Roller Coaster",
    "albumArt": "https://picsum.photos/seed/롤러-코스터/80/80",
    "addedAt": "2022-03-31"
  },
  {
    "trackId": "t008",
    "title": "숨길 수 없어요",
    "artistName": "롤러 코스터",
    "album": "Triangle",
    "albumArt": "https://picsum.photos/seed/롤러-코스터/80/80",
    "addedAt": "2022-04-05"
  },
  {
    "trackId": "t009",
    "title": "Last Scene",
    "artistName": "롤러 코스터",
    "album": "Absolute",
    "albumArt": "https://picsum.photos/seed/롤러-코스터/80/80",
    "addedAt": "2022-04-10"
  },
  {
    "trackId": "t010",
    "title": "날개",
    "artistName": "못 (Mot)",
    "album": "비선형 (Non-Linear) 1집",
    "albumArt": "https://picsum.photos/seed/못-(Mot)/80/80",
    "addedAt": "2022-04-15"
  },
  {
    "trackId": "t011",
    "title": "나의 절망을 바라는 당신에게",
    "artistName": "못 (Mot)",
    "album": "비선형 (Non-Linear) 1집",
    "albumArt": "https://picsum.photos/seed/못-(Mot)/80/80",
    "addedAt": "2022-04-20"
  },
  {
    "trackId": "t012",
    "title": "클로즈",
    "artistName": "못 (Mot)",
    "album": "이상한 계절",
    "albumArt": "https://picsum.photos/seed/못-(Mot)/80/80",
    "addedAt": "2022-04-25"
  },
  {
    "trackId": "t013",
    "title": "사랑의 달인",
    "artistName": "크리스탈 티",
    "album": "핑크 무비 감독판",
    "albumArt": "https://picsum.photos/seed/크리스탈-티/80/80",
    "addedAt": "2022-04-30"
  },
  {
    "trackId": "t014",
    "title": "낭만파A.I.",
    "artistName": "크리스탈 티",
    "album": "핑크 무비 감독판",
    "albumArt": "https://picsum.photos/seed/크리스탈-티/80/80",
    "addedAt": "2022-05-05"
  },
  {
    "trackId": "t015",
    "title": "심야의 자전거",
    "artistName": "크리스탈 티",
    "album": "심야의 자전거",
    "albumArt": "https://picsum.photos/seed/크리스탈-티/80/80",
    "addedAt": "2022-05-10"
  },
  {
    "trackId": "t016",
    "title": "로망 포르노",
    "artistName": "크리스탈 티",
    "album": "핑크 무비",
    "albumArt": "https://picsum.photos/seed/크리스탈-티/80/80",
    "addedAt": "2022-05-15"
  },
  {
    "trackId": "t017",
    "title": "달라",
    "artistName": "ddbb",
    "album": "달라",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-05-20"
  },
  {
    "trackId": "t018",
    "title": "salty",
    "artistName": "ddbb",
    "album": "salty heart",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-05-25"
  },
  {
    "trackId": "t019",
    "title": "rabbit dash",
    "artistName": "ddbb",
    "album": "rabbit dash",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-05-30"
  },
  {
    "trackId": "t020",
    "title": "comes and goes",
    "artistName": "ddbb",
    "album": "dark",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-06-04"
  },
  {
    "trackId": "t021",
    "title": "Cold Love Zombie",
    "artistName": "ddbb",
    "album": "Cold Love Zombie",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-06-09"
  },
  {
    "trackId": "t022",
    "title": "기차",
    "artistName": "ddbb",
    "album": "기차",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-06-14"
  },
  {
    "trackId": "t023",
    "title": "new menu",
    "artistName": "ddbb",
    "album": "dark",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-06-19"
  },
  {
    "trackId": "t024",
    "title": "사나워?",
    "artistName": "ddbb",
    "album": "사나워?",
    "albumArt": "https://picsum.photos/seed/ddbb/80/80",
    "addedAt": "2022-06-24"
  },
  {
    "trackId": "t025",
    "title": "너의 파도",
    "artistName": "Bye Bye Badman",
    "album": "너의 파도",
    "albumArt": "https://picsum.photos/seed/Bye-Bye-Badman/80/80",
    "addedAt": "2022-06-29"
  },
  {
    "trackId": "t026",
    "title": "Island Island",
    "artistName": "Bye Bye Badman",
    "album": "AUTHENTIC",
    "albumArt": "https://picsum.photos/seed/Bye-Bye-Badman/80/80",
    "addedAt": "2022-07-04"
  },
  {
    "trackId": "t027",
    "title": "Always in Love",
    "artistName": "Bye Bye Badman",
    "album": "Always in Love",
    "albumArt": "https://picsum.photos/seed/Bye-Bye-Badman/80/80",
    "addedAt": "2022-07-09"
  },
  {
    "trackId": "t028",
    "title": "Colin",
    "artistName": "Bye Bye Badman",
    "album": "너의 파도",
    "albumArt": "https://picsum.photos/seed/Bye-Bye-Badman/80/80",
    "addedAt": "2022-07-14"
  },
  {
    "trackId": "t029",
    "title": "내 맘 같지 않던 그 시절",
    "artistName": "마이 앤트 메리 (My Aunt Mary)",
    "album": "Circle",
    "albumArt": "https://picsum.photos/seed/마이-앤트-메리-(My-Aunt-Mary)/80/80",
    "addedAt": "2022-07-19"
  },
  {
    "trackId": "t030",
    "title": "공항 가는 길",
    "artistName": "마이 앤트 메리 (My Aunt Mary)",
    "album": "공항 가는 길",
    "albumArt": "https://picsum.photos/seed/마이-앤트-메리-(My-Aunt-Mary)/80/80",
    "addedAt": "2022-07-24"
  },
  {
    "trackId": "t031",
    "title": "골든 글러브",
    "artistName": "마이 앤트 메리 (My Aunt Mary)",
    "album": "Just Pop",
    "albumArt": "https://picsum.photos/seed/마이-앤트-메리-(My-Aunt-Mary)/80/80",
    "addedAt": "2022-07-29"
  },
  {
    "trackId": "t032",
    "title": "죽여줘",
    "artistName": "보수동쿨러",
    "album": "죽여줘",
    "albumArt": "https://picsum.photos/seed/보수동쿨러/80/80",
    "addedAt": "2022-08-03"
  },
  {
    "trackId": "t033",
    "title": "We live in the Jurassic Park",
    "artistName": "보수동쿨러",
    "album": "We live in the Jurassic Park",
    "albumArt": "https://picsum.photos/seed/보수동쿨러/80/80",
    "addedAt": "2022-08-09"
  },
  {
    "trackId": "t034",
    "title": "목화",
    "artistName": "보수동쿨러",
    "album": "목화",
    "albumArt": "https://picsum.photos/seed/보수동쿨러/80/80",
    "addedAt": "2022-08-14"
  },
  {
    "trackId": "t035",
    "title": "0308",
    "artistName": "보수동쿨러",
    "album": "yeah, I don't want it",
    "albumArt": "https://picsum.photos/seed/보수동쿨러/80/80",
    "addedAt": "2022-08-19"
  },
  {
    "trackId": "t036",
    "title": "Ticket to the Moon",
    "artistName": "솔루션스 (THE SOLUTIONS)",
    "album": "Ticket to the Moon",
    "albumArt": "https://picsum.photos/seed/솔루션스-(THE-SOLUTIONS)/80/80",
    "addedAt": "2022-08-24"
  },
  {
    "trackId": "t037",
    "title": "청춘",
    "artistName": "솔루션스 (THE SOLUTIONS)",
    "album": "TIME",
    "albumArt": "https://picsum.photos/seed/솔루션스-(THE-SOLUTIONS)/80/80",
    "addedAt": "2022-08-29"
  },
  {
    "trackId": "t038",
    "title": "Otherside",
    "artistName": "솔루션스 (THE SOLUTIONS)",
    "album": "THE SOLUTIONS",
    "albumArt": "https://picsum.photos/seed/솔루션스-(THE-SOLUTIONS)/80/80",
    "addedAt": "2022-09-03"
  },
  {
    "trackId": "t039",
    "title": "Talk, Dance, Party For Love",
    "artistName": "솔루션스 (THE SOLUTIONS)",
    "album": "THE SOLUTIONS",
    "albumArt": "https://picsum.photos/seed/솔루션스-(THE-SOLUTIONS)/80/80",
    "addedAt": "2022-09-08"
  },
  {
    "trackId": "t040",
    "title": "젊은이",
    "artistName": "구남과여라이딩스텔라",
    "album": "썬파워",
    "albumArt": "https://picsum.photos/seed/구남과여라이딩스텔라/80/80",
    "addedAt": "2022-09-13"
  },
  {
    "trackId": "t041",
    "title": "감기망상",
    "artistName": "구남과여라이딩스텔라",
    "album": "우정모텔",
    "albumArt": "https://picsum.photos/seed/구남과여라이딩스텔라/80/80",
    "addedAt": "2022-09-18"
  },
  {
    "trackId": "t042",
    "title": "여름밤",
    "artistName": "구남과여라이딩스텔라",
    "album": "모래내판타지",
    "albumArt": "https://picsum.photos/seed/구남과여라이딩스텔라/80/80",
    "addedAt": "2022-09-23"
  },
  {
    "trackId": "t043",
    "title": "UFO",
    "artistName": "구남과여라이딩스텔라",
    "album": "썬파워",
    "albumArt": "https://picsum.photos/seed/구남과여라이딩스텔라/80/80",
    "addedAt": "2022-09-28"
  },
  {
    "trackId": "t044",
    "title": "언제나 오늘에",
    "artistName": "서울 전자 음악단",
    "album": "제비다방 컴필레이션 2024/2025",
    "albumArt": "https://picsum.photos/seed/서울-전자-음악단/80/80",
    "addedAt": "2022-10-03"
  },
  {
    "trackId": "t045",
    "title": "비가 되어 내려",
    "artistName": "서울 전자 음악단",
    "album": "비가 되어 내려",
    "albumArt": "https://picsum.photos/seed/서울-전자-음악단/80/80",
    "addedAt": "2022-10-08"
  },
  {
    "trackId": "t046",
    "title": "Ghost Writers",
    "artistName": "서울 전자 음악단",
    "album": "Ghost Writers",
    "albumArt": "https://picsum.photos/seed/서울-전자-음악단/80/80",
    "addedAt": "2022-10-13"
  },
  {
    "trackId": "t047",
    "title": "Old Town",
    "artistName": "세이수미",
    "album": "Where We Were Together",
    "albumArt": "https://picsum.photos/seed/세이수미/80/80",
    "addedAt": "2022-10-18"
  },
  {
    "trackId": "t048",
    "title": "Mind is Light",
    "artistName": "세이수미",
    "album": "Mind is Light",
    "albumArt": "https://picsum.photos/seed/세이수미/80/80",
    "addedAt": "2022-10-23"
  },
  {
    "trackId": "t049",
    "title": "But I Like You",
    "artistName": "세이수미",
    "album": "Where We Were Together",
    "albumArt": "https://picsum.photos/seed/세이수미/80/80",
    "addedAt": "2022-10-28"
  },
  {
    "trackId": "t050",
    "title": "Let It Begin",
    "artistName": "세이수미",
    "album": "Where We Were Together",
    "albumArt": "https://picsum.photos/seed/세이수미/80/80",
    "addedAt": "2022-11-02"
  },
  {
    "trackId": "t051",
    "title": "비 오는 거리에서 춤을 추자",
    "artistName": "김뜻돌",
    "album": "COBALT",
    "albumArt": "https://picsum.photos/seed/김뜻돌/80/80",
    "addedAt": "2022-11-07"
  },
  {
    "trackId": "t052",
    "title": "삐뽀삐뽀",
    "artistName": "김뜻돌",
    "album": "꿈에서 걸려온 전화",
    "albumArt": "https://picsum.photos/seed/김뜻돌/80/80",
    "addedAt": "2022-11-12"
  },
  {
    "trackId": "t053",
    "title": "보물찾기",
    "artistName": "김뜻돌",
    "album": "꿈에서 걸려온 전화",
    "albumArt": "https://picsum.photos/seed/김뜻돌/80/80",
    "addedAt": "2022-11-17"
  },
  {
    "trackId": "t054",
    "title": "a Joke (with Yogoe)",
    "artistName": "TRPP",
    "album": "TRPP",
    "albumArt": "https://picsum.photos/seed/TRPP/80/80",
    "addedAt": "2022-11-22"
  },
  {
    "trackId": "t055",
    "title": "Pause",
    "artistName": "TRPP",
    "album": "TRPP",
    "albumArt": "https://picsum.photos/seed/TRPP/80/80",
    "addedAt": "2022-11-27"
  },
  {
    "trackId": "t056",
    "title": "Go away",
    "artistName": "TRPP",
    "album": "TRPP",
    "albumArt": "https://picsum.photos/seed/TRPP/80/80",
    "addedAt": "2022-12-02"
  },
  {
    "trackId": "t057",
    "title": "Yeah",
    "artistName": "TRPP",
    "album": "TRPP",
    "albumArt": "https://picsum.photos/seed/TRPP/80/80",
    "addedAt": "2022-12-07"
  },
  {
    "trackId": "t058",
    "title": "Yeah (Round and Round)",
    "artistName": "TRPP",
    "album": "구경이 OST Part.1",
    "albumArt": "https://picsum.photos/seed/TRPP/80/80",
    "addedAt": "2022-12-12"
  },
  {
    "trackId": "t059",
    "title": "아름다운 것",
    "artistName": "언니네 이발관",
    "album": "가장 보통의 존재",
    "albumArt": "https://picsum.photos/seed/언니네-이발관/80/80",
    "addedAt": "2022-12-17"
  },
  {
    "trackId": "t060",
    "title": "가장 보통의 존재",
    "artistName": "언니네 이발관",
    "album": "가장 보통의 존재",
    "albumArt": "https://picsum.photos/seed/언니네-이발관/80/80",
    "addedAt": "2022-12-22"
  },
  {
    "trackId": "t061",
    "title": "산들산들",
    "artistName": "언니네 이발관",
    "album": "가장 보통의 존재",
    "albumArt": "https://picsum.photos/seed/언니네-이발관/80/80",
    "addedAt": "2022-12-27"
  },
  {
    "trackId": "t062",
    "title": "순간을 믿어요",
    "artistName": "언니네 이발관",
    "album": "순간을 믿어요",
    "albumArt": "https://picsum.photos/seed/언니네-이발관/80/80",
    "addedAt": "2023-01-01"
  },
  {
    "trackId": "t063",
    "title": "100년 동안의 진심",
    "artistName": "언니네 이발관",
    "album": "가장 보통의 존재",
    "albumArt": "https://picsum.photos/seed/언니네-이발관/80/80",
    "addedAt": "2023-01-06"
  },
  {
    "trackId": "t064",
    "title": "등대",
    "artistName": "하현상",
    "album": "Calibrate",
    "albumArt": "https://picsum.photos/seed/하현상/80/80",
    "addedAt": "2023-01-11"
  },
  {
    "trackId": "t065",
    "title": "불꽃놀이",
    "artistName": "하현상",
    "album": "불꽃놀이",
    "albumArt": "https://picsum.photos/seed/하현상/80/80",
    "addedAt": "2023-01-17"
  },
  {
    "trackId": "t066",
    "title": "향기",
    "artistName": "하현상",
    "album": "Elegy",
    "albumArt": "https://picsum.photos/seed/하현상/80/80",
    "addedAt": "2023-01-22"
  },
  {
    "trackId": "t067",
    "title": "사랑은 영원하다",
    "artistName": "숨비",
    "album": "사랑은 영원하다",
    "albumArt": "https://picsum.photos/seed/숨비/80/80",
    "addedAt": "2023-01-27"
  },
  {
    "trackId": "t068",
    "title": "슬픔을 구름으로 만들어줘",
    "artistName": "숨비",
    "album": "슬픔을 구름으로 만들어줘",
    "albumArt": "https://picsum.photos/seed/숨비/80/80",
    "addedAt": "2023-02-01"
  },
  {
    "trackId": "t069",
    "title": "가끔 미치도록 네가 안고 싶어질 때가 있어",
    "artistName": "가을방학",
    "album": "가을방학",
    "albumArt": "https://picsum.photos/seed/가을방학/80/80",
    "addedAt": "2023-02-06"
  },
  {
    "trackId": "t070",
    "title": "사하",
    "artistName": "가을방학",
    "album": "세 번째 계절",
    "albumArt": "https://picsum.photos/seed/가을방학/80/80",
    "addedAt": "2023-02-11"
  },
  {
    "trackId": "t071",
    "title": "얼음요새",
    "artistName": "디어클라우드",
    "album": "Dear Cloud",
    "albumArt": "https://picsum.photos/seed/디어클라우드/80/80",
    "addedAt": "2023-02-16"
  },
  {
    "trackId": "t072",
    "title": "늦은 혼잣말",
    "artistName": "디어클라우드",
    "album": "Grey",
    "albumArt": "https://picsum.photos/seed/디어클라우드/80/80",
    "addedAt": "2023-02-21"
  },
  {
    "trackId": "t073",
    "title": "네 곁에 있어",
    "artistName": "디어클라우드",
    "album": "MY DEAR, MY LOVER",
    "albumArt": "https://picsum.photos/seed/디어클라우드/80/80",
    "addedAt": "2023-02-26"
  },
  {
    "trackId": "t074",
    "title": "Stay",
    "artistName": "넬 (NELL)",
    "album": "Let It Rain",
    "albumArt": "https://picsum.photos/seed/넬-(NELL)/80/80",
    "addedAt": "2023-03-03"
  },
  {
    "trackId": "t075",
    "title": "지구가 태양을 네 번",
    "artistName": "넬 (NELL)",
    "album": "Newton's Apple",
    "albumArt": "https://picsum.photos/seed/넬-(NELL)/80/80",
    "addedAt": "2023-03-08"
  },
  {
    "trackId": "t076",
    "title": "멀어지다",
    "artistName": "넬 (NELL)",
    "album": "멀어지다",
    "albumArt": "https://picsum.photos/seed/넬-(NELL)/80/80",
    "addedAt": "2023-03-13"
  },
  {
    "trackId": "t077",
    "title": "열기구",
    "artistName": "SURL (설)",
    "album": "I Know",
    "albumArt": "https://picsum.photos/seed/SURL-(설)/80/80",
    "addedAt": "2023-03-18"
  },
  {
    "trackId": "t078",
    "title": "여기에 있자",
    "artistName": "SURL (설)",
    "album": "bright #7",
    "albumArt": "https://picsum.photos/seed/SURL-(설)/80/80",
    "addedAt": "2023-03-23"
  },
  {
    "trackId": "t079",
    "title": "눈",
    "artistName": "SURL (설)",
    "album": "Aren't You?",
    "albumArt": "https://picsum.photos/seed/SURL-(설)/80/80",
    "addedAt": "2023-03-28"
  },
  {
    "trackId": "t080",
    "title": "Dry Flower",
    "artistName": "SURL (설)",
    "album": "I Know",
    "albumArt": "https://picsum.photos/seed/SURL-(설)/80/80",
    "addedAt": "2023-04-02"
  },
  {
    "trackId": "t081",
    "title": "The Lights Behind You",
    "artistName": "SURL (설)",
    "album": "Aren't You?",
    "albumArt": "https://picsum.photos/seed/SURL-(설)/80/80",
    "addedAt": "2023-04-07"
  },
  {
    "trackId": "t082",
    "title": "Peanut butter Sandwich",
    "artistName": "jisokuryClub",
    "album": "pool vol. 2 - Peanut Butter Sandwich",
    "albumArt": "https://picsum.photos/seed/jisokuryClub/80/80",
    "addedAt": "2023-04-12"
  },
  {
    "trackId": "t083",
    "title": "Take On",
    "artistName": "jisokuryClub",
    "album": "orientation",
    "albumArt": "https://picsum.photos/seed/jisokuryClub/80/80",
    "addedAt": "2023-04-17"
  },
  {
    "trackId": "t084",
    "title": "work, shit, sleep",
    "artistName": "jisokuryClub",
    "album": "work, shit, sleep",
    "albumArt": "https://picsum.photos/seed/jisokuryClub/80/80",
    "addedAt": "2023-04-22"
  },
  {
    "trackId": "t085",
    "title": "fishing fishing",
    "artistName": "jisokuryClub",
    "album": "Lunker",
    "albumArt": "https://picsum.photos/seed/jisokuryClub/80/80",
    "addedAt": "2023-04-27"
  },
  {
    "trackId": "t086",
    "title": "앵콜요청금지",
    "artistName": "브로콜리너마저",
    "album": "골든-힛트 모음집 [앵콜요청금지.]",
    "albumArt": "https://picsum.photos/seed/브로콜리너마저/80/80",
    "addedAt": "2023-05-02"
  },
  {
    "trackId": "t087",
    "title": "유자차",
    "artistName": "브로콜리너마저",
    "album": "골든-힛트 모음집 [앵콜요청금지.]",
    "albumArt": "https://picsum.photos/seed/브로콜리너마저/80/80",
    "addedAt": "2023-05-07"
  },
  {
    "trackId": "t088",
    "title": "사랑한다는 말로도 위로가 되지 않는",
    "artistName": "브로콜리너마저",
    "album": "졸업",
    "albumArt": "https://picsum.photos/seed/브로콜리너마저/80/80",
    "addedAt": "2023-05-12"
  },
  {
    "trackId": "t089",
    "title": "이웃에 방해가 되지 않는 선에서",
    "artistName": "브로콜리너마저",
    "album": "골든-힛트 모음집 [앵콜요청금지.]",
    "albumArt": "https://picsum.photos/seed/브로콜리너마저/80/80",
    "addedAt": "2023-05-17"
  },
  {
    "trackId": "t090",
    "title": "졸업",
    "artistName": "브로콜리너마저",
    "album": "졸업",
    "albumArt": "https://picsum.photos/seed/브로콜리너마저/80/80",
    "addedAt": "2023-05-22"
  },
  {
    "trackId": "t091",
    "title": "멸종",
    "artistName": "쏜애플 (THORNAPPLE)",
    "album": "동물",
    "albumArt": "https://picsum.photos/seed/쏜애플-(THORNAPPLE)/80/80",
    "addedAt": "2023-05-27"
  },
  {
    "trackId": "t092",
    "title": "2월",
    "artistName": "쏜애플 (THORNAPPLE)",
    "album": "계몽",
    "albumArt": "https://picsum.photos/seed/쏜애플-(THORNAPPLE)/80/80",
    "addedAt": "2023-06-01"
  },
  {
    "trackId": "t093",
    "title": "시퍼런 봄",
    "artistName": "쏜애플 (THORNAPPLE)",
    "album": "이상기후",
    "albumArt": "https://picsum.photos/seed/쏜애플-(THORNAPPLE)/80/80",
    "addedAt": "2023-06-06"
  },
  {
    "trackId": "t094",
    "title": "서울",
    "artistName": "쏜애플 (THORNAPPLE)",
    "album": "서울병",
    "albumArt": "https://picsum.photos/seed/쏜애플-(THORNAPPLE)/80/80",
    "addedAt": "2023-06-11"
  },
  {
    "trackId": "t095",
    "title": "아지랑이",
    "artistName": "쏜애플 (THORNAPPLE)",
    "album": "이상기후",
    "albumArt": "https://picsum.photos/seed/쏜애플-(THORNAPPLE)/80/80",
    "addedAt": "2023-06-16"
  },
  {
    "trackId": "t096",
    "title": "고백",
    "artistName": "델리스파이스",
    "album": "Espresso",
    "albumArt": "https://picsum.photos/seed/델리스파이스/80/80",
    "addedAt": "2023-06-21"
  },
  {
    "trackId": "t097",
    "title": "챠우챠우-아무리 애를 쓰고 막아 보려 해도 너의 목소리가 들려",
    "artistName": "델리스파이스",
    "album": "Deli Spice",
    "albumArt": "https://picsum.photos/seed/델리스파이스/80/80",
    "addedAt": "2023-06-27"
  },
  {
    "trackId": "t098",
    "title": "항상 엔진을 켜둘께",
    "artistName": "델리스파이스",
    "album": "D",
    "albumArt": "https://picsum.photos/seed/델리스파이스/80/80",
    "addedAt": "2023-07-02"
  },
  {
    "trackId": "t099",
    "title": "처음으로 우산을 잃어버렸어요",
    "artistName": "델리스파이스",
    "album": "Espresso",
    "albumArt": "https://picsum.photos/seed/델리스파이스/80/80",
    "addedAt": "2023-07-07"
  },
  {
    "trackId": "t100",
    "title": "EVERYTHING",
    "artistName": "검정치마",
    "album": "EVERYTHING",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-07-12"
  },
  {
    "trackId": "t101",
    "title": "Love Is All",
    "artistName": "검정치마",
    "album": "TEAM BABY",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-07-17"
  },
  {
    "trackId": "t102",
    "title": "한시 오분 (1:05)",
    "artistName": "검정치마",
    "album": "TEAM BABY",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-07-22"
  },
  {
    "trackId": "t103",
    "title": "나랑 아니면",
    "artistName": "검정치마",
    "album": "TEAM BABY",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-07-27"
  },
  {
    "trackId": "t104",
    "title": "혜야",
    "artistName": "검정치마",
    "album": "TEAM BABY",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-08-01"
  },
  {
    "trackId": "t105",
    "title": "내 고향 서울엔",
    "artistName": "검정치마",
    "album": "TEAM BABY",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-08-06"
  },
  {
    "trackId": "t106",
    "title": "Antifreeze",
    "artistName": "검정치마",
    "album": "201 (Special Edition)",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-08-11"
  },
  {
    "trackId": "t107",
    "title": "Flying Bobs",
    "artistName": "검정치마",
    "album": "TEEN TROUBLES",
    "albumArt": "https://picsum.photos/seed/검정치마/80/80",
    "addedAt": "2023-08-16"
  },
  {
    "trackId": "t108",
    "title": "유영 (Feat. 유라 (youra))",
    "artistName": "카더가든",
    "album": "C",
    "albumArt": "https://picsum.photos/seed/카더가든/80/80",
    "addedAt": "2023-08-21"
  },
  {
    "trackId": "t109",
    "title": "Young Man",
    "artistName": "혁오 (HYUKOH), Sunset Rollercoaster",
    "album": "AAA",
    "albumArt": "https://picsum.photos/seed/혁오-(HYUKOH),-Sunset-Rollercoaster/80/80",
    "addedAt": "2023-08-26"
  },
  {
    "trackId": "t110",
    "title": "LOVE YA!",
    "artistName": "혁오 (HYUKOH)",
    "album": "24 : How to find true love and happiness",
    "albumArt": "https://picsum.photos/seed/혁오-(HYUKOH)/80/80",
    "addedAt": "2023-08-31"
  },
  {
    "trackId": "t111",
    "title": "Paul",
    "artistName": "혁오 (HYUKOH)",
    "album": "23",
    "albumArt": "https://picsum.photos/seed/혁오-(HYUKOH)/80/80",
    "addedAt": "2023-09-05"
  },
  {
    "trackId": "t112",
    "title": "Ohio",
    "artistName": "혁오 (HYUKOH)",
    "album": "20",
    "albumArt": "https://picsum.photos/seed/혁오-(HYUKOH)/80/80",
    "addedAt": "2023-09-10"
  },
  {
    "trackId": "t113",
    "title": "Citizen Kane",
    "artistName": "혁오 (HYUKOH)",
    "album": "24 : How to find true love and happiness",
    "albumArt": "https://picsum.photos/seed/혁오-(HYUKOH)/80/80",
    "addedAt": "2023-09-15"
  },
  {
    "trackId": "t114",
    "title": "그대만 있다면",
    "artistName": "너드커넥션 (Nerd Connection)",
    "album": "그대만 있다면",
    "albumArt": "https://picsum.photos/seed/너드커넥션-(Nerd-Connection)/80/80",
    "addedAt": "2023-09-20"
  },
  {
    "trackId": "t115",
    "title": "좋은 밤 좋은 꿈",
    "artistName": "너드커넥션 (Nerd Connection)",
    "album": "좋은 밤 좋은 꿈",
    "albumArt": "https://picsum.photos/seed/너드커넥션-(Nerd-Connection)/80/80",
    "addedAt": "2023-09-25"
  },
  {
    "trackId": "t116",
    "title": "조용히 완전히 영원히",
    "artistName": "너드커넥션 (Nerd Connection)",
    "album": "New Century Masterpiece Cinema",
    "albumArt": "https://picsum.photos/seed/너드커넥션-(Nerd-Connection)/80/80",
    "addedAt": "2023-09-30"
  },
  {
    "trackId": "t117",
    "title": "우린 노래가 될까",
    "artistName": "너드커넥션 (Nerd Connection)",
    "album": "New Century Masterpiece Cinema",
    "albumArt": "https://picsum.photos/seed/너드커넥션-(Nerd-Connection)/80/80",
    "addedAt": "2023-10-05"
  },
  {
    "trackId": "t118",
    "title": "대나무숲",
    "artistName": "너드커넥션 (Nerd Connection)",
    "album": "대나무숲",
    "albumArt": "https://picsum.photos/seed/너드커넥션-(Nerd-Connection)/80/80",
    "addedAt": "2023-10-10"
  },
  {
    "trackId": "t119",
    "title": "going home",
    "artistName": "김윤아",
    "album": "315360",
    "albumArt": "https://picsum.photos/seed/김윤아/80/80",
    "addedAt": "2023-10-15"
  },
  {
    "trackId": "t120",
    "title": "봄날은 간다",
    "artistName": "김윤아",
    "album": "Shadow Of Your Smile",
    "albumArt": "https://picsum.photos/seed/김윤아/80/80",
    "addedAt": "2023-10-20"
  },
  {
    "trackId": "t121",
    "title": "야상곡(夜想曲)",
    "artistName": "김윤아",
    "album": "유리가면(琉璃假面)",
    "albumArt": "https://picsum.photos/seed/김윤아/80/80",
    "addedAt": "2023-10-25"
  },
  {
    "trackId": "t122",
    "title": "STAY WITH ME",
    "artistName": "자우림",
    "album": "영원한 사랑",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-10-30"
  },
  {
    "trackId": "t123",
    "title": "PÉON PÉON",
    "artistName": "자우림",
    "album": "영원한 사랑",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-04"
  },
  {
    "trackId": "t124",
    "title": "Hey, Hey, Hey",
    "artistName": "자우림",
    "album": "Jaurim 'True' Live (Live)",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-09"
  },
  {
    "trackId": "t125",
    "title": "하하하쏭",
    "artistName": "자우림",
    "album": "All You Need Is Love 5집",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-14"
  },
  {
    "trackId": "t126",
    "title": "있지",
    "artistName": "자우림",
    "album": "자우림",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-19"
  },
  {
    "trackId": "t127",
    "title": "일탈",
    "artistName": "자우림",
    "album": "Purple Heart",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-24"
  },
  {
    "trackId": "t128",
    "title": "밀랍천사",
    "artistName": "자우림",
    "album": "Purple Heart",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-11-29"
  },
  {
    "trackId": "t129",
    "title": "매직 카펫 라이드",
    "artistName": "자우림",
    "album": "Jaurim, The Wonder Land",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-12-05"
  },
  {
    "trackId": "t130",
    "title": "팬이야",
    "artistName": "자우림",
    "album": "Jaurim 04",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-12-10"
  },
  {
    "trackId": "t131",
    "title": "스물다섯, 스물하나",
    "artistName": "자우림",
    "album": "Goodbye, grief.",
    "albumArt": "https://picsum.photos/seed/자우림/80/80",
    "addedAt": "2023-12-15"
  },
  {
    "trackId": "t132",
    "title": "회상",
    "artistName": "산울림 (Sanullim)",
    "album": "The Story Of Sanullim: Complete Studio Recordings",
    "albumArt": "https://picsum.photos/seed/산울림-(Sanullim)/80/80",
    "addedAt": "2023-12-20"
  },
  {
    "trackId": "t133",
    "title": "너의 의미",
    "artistName": "산울림 (Sanullim)",
    "album": "너의 의미",
    "albumArt": "https://picsum.photos/seed/산울림-(Sanullim)/80/80",
    "addedAt": "2023-12-25"
  },
  {
    "trackId": "t134",
    "title": "청춘",
    "artistName": "산울림 (Sanullim)",
    "album": "The Story Of Sanullim: Complete Studio Recordings",
    "albumArt": "https://picsum.photos/seed/산울림-(Sanullim)/80/80",
    "addedAt": "2023-12-30"
  },
  {
    "trackId": "t135",
    "title": "내 마음에 주단을 깔고",
    "artistName": "산울림 (Sanullim)",
    "album": "산울림 제2집 - 내 마음에 주단을 깔고",
    "albumArt": "https://picsum.photos/seed/산울림-(Sanullim)/80/80",
    "addedAt": "2024-01-04"
  },
  {
    "trackId": "t136",
    "title": "내가 고백을 하면 깜짝 놀랄거야",
    "artistName": "산울림 (Sanullim)",
    "album": "귀여운 소녀의 디스코",
    "albumArt": "https://picsum.photos/seed/산울림-(Sanullim)/80/80",
    "addedAt": "2024-01-09"
  },
  {
    "trackId": "t137",
    "title": "소녀(少女)",
    "artistName": "GUMX (검엑스)",
    "album": "What's Been Up?",
    "albumArt": "https://picsum.photos/seed/GUMX-(검엑스)/80/80",
    "addedAt": "2024-01-14"
  },
  {
    "trackId": "t138",
    "title": "KOMM SUSSER TOD",
    "artistName": "GUMX (검엑스)",
    "album": "BUST A NUT",
    "albumArt": "https://picsum.photos/seed/GUMX-(검엑스)/80/80",
    "addedAt": "2024-01-19"
  },
  {
    "trackId": "t139",
    "title": "Skybound",
    "artistName": "KARDI (카디)",
    "album": "Inside Out",
    "albumArt": "https://picsum.photos/seed/KARDI-(카디)/80/80",
    "addedAt": "2024-01-24"
  },
  {
    "trackId": "t140",
    "title": "7000RPM",
    "artistName": "KARDI (카디)",
    "album": "슈퍼밴드2 - Episode.13",
    "albumArt": "https://picsum.photos/seed/KARDI-(카디)/80/80",
    "addedAt": "2024-01-29"
  },
  {
    "trackId": "t141",
    "title": "Havin' a Good Time",
    "artistName": "KARDI (카디)",
    "album": "Havin' a Good Time",
    "albumArt": "https://picsum.photos/seed/KARDI-(카디)/80/80",
    "addedAt": "2024-02-03"
  },
  {
    "trackId": "t142",
    "title": "WatchOut",
    "artistName": "KARDI (카디)",
    "album": "칠(Chil)",
    "albumArt": "https://picsum.photos/seed/KARDI-(카디)/80/80",
    "addedAt": "2024-02-08"
  },
  {
    "trackId": "t143",
    "title": "Good Morning Sunshine",
    "artistName": "The Poles (더 폴스)",
    "album": "Good Morning Sunshine",
    "albumArt": "https://picsum.photos/seed/The-Poles-(더-폴스)/80/80",
    "addedAt": "2024-02-13"
  },
  {
    "trackId": "t144",
    "title": "space",
    "artistName": "The Poles (더 폴스)",
    "album": "space",
    "albumArt": "https://picsum.photos/seed/The-Poles-(더-폴스)/80/80",
    "addedAt": "2024-02-18"
  },
  {
    "trackId": "t145",
    "title": "cares",
    "artistName": "The Poles (더 폴스)",
    "album": "cares",
    "albumArt": "https://picsum.photos/seed/The-Poles-(더-폴스)/80/80",
    "addedAt": "2024-02-23"
  },
  {
    "trackId": "t146",
    "title": "Find Me!",
    "artistName": "The Poles (더 폴스)",
    "album": "Find Me!",
    "albumArt": "https://picsum.photos/seed/The-Poles-(더-폴스)/80/80",
    "addedAt": "2024-02-28"
  },
  {
    "trackId": "t147",
    "title": "High Tide",
    "artistName": "The Poles (더 폴스)",
    "album": "The High Tide Club",
    "albumArt": "https://picsum.photos/seed/The-Poles-(더-폴스)/80/80",
    "addedAt": "2024-03-04"
  },
  {
    "trackId": "t148",
    "title": "사랑으로",
    "artistName": "wave to earth",
    "album": "0.1 flaws and all.",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-03-09"
  },
  {
    "trackId": "t149",
    "title": "bad",
    "artistName": "wave to earth",
    "album": "0.1 flaws and all.",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-03-14"
  },
  {
    "trackId": "t150",
    "title": "seasons",
    "artistName": "wave to earth",
    "album": "summer flows 0.02",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-03-19"
  },
  {
    "trackId": "t151",
    "title": "sunny days",
    "artistName": "wave to earth",
    "album": "0.1 flaws and all.",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-03-24"
  },
  {
    "trackId": "t152",
    "title": "annie.",
    "artistName": "wave to earth",
    "album": "play with earth! 0.03",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-03-29"
  },
  {
    "trackId": "t153",
    "title": "daisy.",
    "artistName": "wave to earth",
    "album": "daisy.",
    "albumArt": "https://picsum.photos/seed/wave-to-earth/80/80",
    "addedAt": "2024-04-03"
  },
  {
    "trackId": "t154",
    "title": "60's Cardin",
    "artistName": "Glen Check",
    "album": "Haute Couture",
    "albumArt": "https://picsum.photos/seed/Glen-Check/80/80",
    "addedAt": "2024-04-08"
  },
  {
    "trackId": "t155",
    "title": "Dazed & Confused",
    "artistName": "Glen Check",
    "album": "Bleach",
    "albumArt": "https://picsum.photos/seed/Glen-Check/80/80",
    "addedAt": "2024-04-13"
  },
  {
    "trackId": "t156",
    "title": "Vogue Boys And Girls",
    "artistName": "Glen Check",
    "album": "Haute Couture",
    "albumArt": "https://picsum.photos/seed/Glen-Check/80/80",
    "addedAt": "2024-04-18"
  },
  {
    "trackId": "t157",
    "title": "4ever",
    "artistName": "Glen Check",
    "album": "Bleach",
    "albumArt": "https://picsum.photos/seed/Glen-Check/80/80",
    "addedAt": "2024-04-23"
  },
  {
    "trackId": "t158",
    "title": "Vivid",
    "artistName": "Glen Check",
    "album": "Haute Couture",
    "albumArt": "https://picsum.photos/seed/Glen-Check/80/80",
    "addedAt": "2024-04-28"
  },
  {
    "trackId": "t159",
    "title": "Wonder",
    "artistName": "ADOY",
    "album": "LOVE",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-03"
  },
  {
    "trackId": "t160",
    "title": "Grace",
    "artistName": "ADOY",
    "album": "CATNIP",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-08"
  },
  {
    "trackId": "t161",
    "title": "Lemon",
    "artistName": "ADOY",
    "album": "VIVID",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-14"
  },
  {
    "trackId": "t162",
    "title": "Swim",
    "artistName": "ADOY",
    "album": "Pool",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-19"
  },
  {
    "trackId": "t163",
    "title": "Don't Stop",
    "artistName": "ADOY",
    "album": "CATNIP",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-24"
  },
  {
    "trackId": "t164",
    "title": "Young",
    "artistName": "ADOY",
    "album": "Young",
    "albumArt": "https://picsum.photos/seed/ADOY/80/80",
    "addedAt": "2024-05-29"
  },
  {
    "trackId": "t165",
    "title": "Rules",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "Rules",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-03"
  },
  {
    "trackId": "t166",
    "title": "She's in someone's locket",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "Rules",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-08"
  },
  {
    "trackId": "t167",
    "title": "Summer",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "The Volunteers",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-13"
  },
  {
    "trackId": "t168",
    "title": "\"L\"",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "\"L\"",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-18"
  },
  {
    "trackId": "t169",
    "title": "PINKTOP",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "The Volunteers",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-23"
  },
  {
    "trackId": "t170",
    "title": "Radio",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "The Volunteers",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-06-28"
  },
  {
    "trackId": "t171",
    "title": "Let me go!",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "The Volunteers",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-07-03"
  },
  {
    "trackId": "t172",
    "title": "Violet",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "The Volunteers",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-07-08"
  },
  {
    "trackId": "t173",
    "title": "Hypocreep",
    "artistName": "The Volunteers (더 발룬티어스)",
    "album": "New Plant",
    "albumArt": "https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80",
    "addedAt": "2024-07-13"
  },
  {
    "trackId": "t174",
    "title": "NO PAIN",
    "artistName": "실리카겔",
    "album": "NO PAIN",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-07-18"
  },
  {
    "trackId": "t175",
    "title": "Desert Eagle",
    "artistName": "실리카겔",
    "album": "Desert Eagle",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-07-23"
  },
  {
    "trackId": "t176",
    "title": "Ryudejakeiru",
    "artistName": "실리카겔",
    "album": "POWER ANDRE 99",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-07-28"
  },
  {
    "trackId": "t177",
    "title": "Realize",
    "artistName": "실리카겔",
    "album": "Machine Boy",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-02"
  },
  {
    "trackId": "t178",
    "title": "Kyo181",
    "artistName": "실리카겔",
    "album": "Kyo181",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-07"
  },
  {
    "trackId": "t179",
    "title": "APEX",
    "artistName": "실리카겔",
    "album": "POWER ANDRE 99",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-12"
  },
  {
    "trackId": "t180",
    "title": "9",
    "artistName": "실리카겔",
    "album": "실리카겔",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-17"
  },
  {
    "trackId": "t181",
    "title": "연인",
    "artistName": "실리카겔",
    "album": "실리카겔",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-22"
  },
  {
    "trackId": "t182",
    "title": "Mercurial",
    "artistName": "실리카겔",
    "album": "Mercurial",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-08-27"
  },
  {
    "trackId": "t183",
    "title": "NEO SOUL",
    "artistName": "실리카겔",
    "album": "SiO2.nH2O",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-09-01"
  },
  {
    "trackId": "t184",
    "title": "Tik Tak Tok (feat. So!YoON!)",
    "artistName": "실리카겔",
    "album": "Tik Tak Tok",
    "albumArt": "https://picsum.photos/seed/실리카겔/80/80",
    "addedAt": "2024-09-06"
  },
  {
    "trackId": "t185",
    "title": "Smoke Sprite (feat. RM of BTS)",
    "artistName": "So!YoON! (황소윤)",
    "album": "Episode1 : Love",
    "albumArt": "https://picsum.photos/seed/So!YoON!-(황소윤)/80/80",
    "addedAt": "2024-09-11"
  },
  {
    "trackId": "t186",
    "title": "새소년",
    "artistName": "새소년",
    "album": "여름깃",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-09-16"
  },
  {
    "trackId": "t187",
    "title": "난춘 (亂春)",
    "artistName": "새소년",
    "album": "난춘 (亂春)",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-09-21"
  },
  {
    "trackId": "t188",
    "title": "파도",
    "artistName": "새소년",
    "album": "파도",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-09-26"
  },
  {
    "trackId": "t189",
    "title": "긴 꿈",
    "artistName": "새소년",
    "album": "긴 꿈",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-01"
  },
  {
    "trackId": "t190",
    "title": "눈",
    "artistName": "새소년",
    "album": "비적응",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-06"
  },
  {
    "trackId": "t191",
    "title": "Kidd",
    "artistName": "새소년",
    "album": "Kidd",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-11"
  },
  {
    "trackId": "t192",
    "title": "여름깃",
    "artistName": "새소년",
    "album": "여름깃",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-16"
  },
  {
    "trackId": "t193",
    "title": "joke!",
    "artistName": "새소년",
    "album": "joke!",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-22"
  },
  {
    "trackId": "t194",
    "title": "자유",
    "artistName": "새소년",
    "album": "자유",
    "albumArt": "https://picsum.photos/seed/새소년/80/80",
    "addedAt": "2024-10-27"
  },
  {
    "trackId": "t195",
    "title": "꿈과 책과 힘과 벽",
    "artistName": "잔나비",
    "album": "전설",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-01"
  },
  {
    "trackId": "t196",
    "title": "주저하는 연인들을 위해",
    "artistName": "잔나비",
    "album": "전설",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-06"
  },
  {
    "trackId": "t197",
    "title": "전설",
    "artistName": "잔나비",
    "album": "전설",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-11"
  },
  {
    "trackId": "t198",
    "title": "뜨거운 여름밤은 가고 남은 건 볼품없지만",
    "artistName": "잔나비",
    "album": "MONKEY HOTEL",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-16"
  },
  {
    "trackId": "t199",
    "title": "가을밤에 든 생각",
    "artistName": "잔나비",
    "album": "잔나비 소곡집 l",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-21"
  },
  {
    "trackId": "t200",
    "title": "사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리 함께했던 시간들이 자꾸 내 마음을 가둬두네",
    "artistName": "잔나비",
    "album": "봉춤을 추네",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-11-26"
  },
  {
    "trackId": "t201",
    "title": "초록을거머쥔우리는",
    "artistName": "잔나비",
    "album": "잔나비 소곡집 ll : 초록을거머쥔우리는",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-12-01"
  },
  {
    "trackId": "t202",
    "title": "로켓트",
    "artistName": "잔나비",
    "album": "로켓트",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-12-06"
  },
  {
    "trackId": "t203",
    "title": "HONG KONG",
    "artistName": "잔나비",
    "album": "MONKEY HOTEL",
    "albumArt": "https://picsum.photos/seed/잔나비/80/80",
    "addedAt": "2024-12-11"
  },
  {
    "trackId": "t204",
    "title": "사랑하게 될 거야",
    "artistName": "한로로",
    "album": "이상비행",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2024-12-16"
  },
  {
    "trackId": "t205",
    "title": "입춘",
    "artistName": "한로로",
    "album": "입춘",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2024-12-21"
  },
  {
    "trackId": "t206",
    "title": "ㅈㅣㅂ",
    "artistName": "한로로",
    "album": "집",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2024-12-26"
  },
  {
    "trackId": "t207",
    "title": "금붕어",
    "artistName": "한로로",
    "album": "이상비행",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2024-12-31"
  },
  {
    "trackId": "t208",
    "title": "비틀비틀 짝짜꿍",
    "artistName": "한로로",
    "album": "비틀비틀 짝짜꿍",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-05"
  },
  {
    "trackId": "t209",
    "title": "정류장",
    "artistName": "한로로",
    "album": "정류장",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-10"
  },
  {
    "trackId": "t210",
    "title": "자처",
    "artistName": "한로로",
    "album": "자처",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-15"
  },
  {
    "trackId": "t211",
    "title": "하루살이",
    "artistName": "한로로",
    "album": "하루살이",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-20"
  },
  {
    "trackId": "t212",
    "title": "보수공사",
    "artistName": "한로로",
    "album": "집",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-25"
  },
  {
    "trackId": "t213",
    "title": "거울",
    "artistName": "한로로",
    "album": "거울",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-01-30"
  },
  {
    "trackId": "t214",
    "title": "화해",
    "artistName": "한로로",
    "album": "이상비행",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-02-04"
  },
  {
    "trackId": "t215",
    "title": "생존법",
    "artistName": "한로로",
    "album": "집",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-02-09"
  },
  {
    "trackId": "t216",
    "title": "이상비행",
    "artistName": "한로로",
    "album": "이상비행",
    "albumArt": "https://picsum.photos/seed/한로로/80/80",
    "addedAt": "2025-02-14"
  },
  {
    "trackId": "t217",
    "title": "아름다운 세상 (Beautiful World)",
    "artistName": "파란노을 (Parannoul)",
    "album": "To See the Next Part of the Dream",
    "albumArt": "https://picsum.photos/seed/파란노을-(Parannoul)/80/80",
    "addedAt": "2025-02-19"
  },
  {
    "trackId": "t218",
    "title": "고통없이 (Painless)",
    "artistName": "파란노을 (Parannoul)",
    "album": "고통없이 (Painless)",
    "albumArt": "https://picsum.photos/seed/파란노을-(Parannoul)/80/80",
    "addedAt": "2025-02-24"
  },
  {
    "trackId": "t219",
    "title": "청춘반란 (Youth Rebellion)",
    "artistName": "파란노을 (Parannoul)",
    "album": "To See the Next Part of the Dream",
    "albumArt": "https://picsum.photos/seed/파란노을-(Parannoul)/80/80",
    "addedAt": "2025-03-01"
  },
  {
    "trackId": "t220",
    "title": "나홀로 뜰 앞에서",
    "artistName": "cotoba (코토바)",
    "album": "나홀로 뜰 앞에서<산울림 50주년 기념 프로젝트>",
    "albumArt": "https://picsum.photos/seed/cotoba-(코토바)/80/80",
    "addedAt": "2025-03-06"
  },
  {
    "trackId": "t221",
    "title": "coii",
    "artistName": "cotoba (코토바)",
    "album": "Humanoid operational",
    "albumArt": "https://picsum.photos/seed/cotoba-(코토바)/80/80",
    "addedAt": "2025-03-11"
  },
  {
    "trackId": "t222",
    "title": "melon",
    "artistName": "cotoba (코토바)",
    "album": "세상은 곧 끝나니까",
    "albumArt": "https://picsum.photos/seed/cotoba-(코토바)/80/80",
    "addedAt": "2025-03-16"
  },
  {
    "trackId": "t223",
    "title": "빙해",
    "artistName": "cotoba (코토바)",
    "album": "빙해",
    "albumArt": "https://picsum.photos/seed/cotoba-(코토바)/80/80",
    "addedAt": "2025-03-21"
  },
  {
    "trackId": "t224",
    "title": "メロン",
    "artistName": "cotoba (코토바)",
    "album": "メロン",
    "albumArt": "https://picsum.photos/seed/cotoba-(코토바)/80/80",
    "addedAt": "2025-03-27"
  }
];

/**
 * getDummyTracks()
 * - 더미 트랙 배열의 복사본을 반환.
 * - 원본 TRACKS 배열을 직접 내보내지 않고 매번 새 배열을 복사해 반환하는 이유:
 *   이후 Phase 3~4에서 usePlaylist가 이 배열을 기반으로 상태를 변경(추가/재배치)하게 되는데,
 *   원본을 그대로 공유하면 여러 컴포넌트/재마운트 사이에서 의도치 않게 원본이 오염될 수 있음.
 */
export function getDummyTracks() {
  return TRACKS.map((track) => ({ ...track }));
}
