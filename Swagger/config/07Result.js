/**
*@swagger
*paths:
*  /api/swagger/result/{category} :
*    get:
*      tags: [Result]
*      summary : 기록후 결과 화면
*      parameters : 
*       - in : path
*         name : category
*         schema :
*           type : string
*      responses :
*        "200":
*          description: 기록후 결과 페이지 로드 성공
*/