/**
*@swagger
*paths:
*  /api/swagger/main/{category} :
*    get:
*      tags: [Main]
*      summary : 정렬후 결과 화면
*      description : latest, designer, cut, perm, dyeing 별 정렬 화면 
*      parameters : 
*       - in : path
*         name : category
*         schema :
*           type : string
*      responses :
*        "200":
*          description: 정렬별 페이지 로드 성공
*/
