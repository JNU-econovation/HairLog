/**
*@swagger
*paths:
*  /api/swagger/instance :
*    get:
*      tags: [Result]
*      summary : 기록후 결과 화면
*      responses :
*        "200":
*          description: 기록후 결과 페이지 로드 성공
*  /api/swagger/result?id :
*    get:
*      tags: [Result]
*      summary : 기록 결과 화면
*      parameters : 
*       - in : query
*         name : id
*         schema :
*           type : integer
*      responses :
*        "200":
*          description: 기록 결과 페이지 로드 성공
*/