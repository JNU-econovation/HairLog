/**
*@swagger
*paths: 
*  /api/swagger/designer :
*    get : 
*      tags: [Designer]
*      summary: 디자이너 페이지
*      responses:
*        "200" :
*          description: 디자이너 페이지 로드 성공
*    post:
*      tags: [Designer]
*      summary: 디자이너 등록 요청
*      requestBody:
*        required : true
*        content:
*          application/json:
*            schema:
*              $ref : '#/components/schemas/Designer'
*      responses:
*        '201' :
*          description : 디자이너 등록 성공
*  /api/swagger/favDesigner :
*    get : 
*      tags: [Designer]
*      summary: 선호 디자이너 페이지
*      responses:
*        "200" :
*          description: 선호 디자이너 페이지 로드 성공
 */
