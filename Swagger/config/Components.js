/**
*@swagger
*components:
*  schemas:
*    User:
*      required:
*      - cycle
*      - name
*      - sex
*      type: object
*      properties:
*        userEmail:
*          type: string
*          example: nanakim@gmail.com
*        userPassword:
*          type: string
*          example: 1234
*        userName:
*          type: string
*          example: 나나김
*        userSex:
*          type: string
*          example: m
*        userCycle:
*          type: integer
*          example: 5
*    Record:
*      required:
*      - date
*      - grade
*      type: object
*      properties:
*        recordDate:
*          type: string
*          example: 2022-07-29
*        recordCost:
*          type: integer
*          example: 15000
*        recordCategory:
*          type: string
*          example: cut
*        recordEtc:
*          type: string
*          example: this is test for API
*        recordGrade:
*          type: integer
*          example: 5
*    Image:
*      type: object
*      properties:
*        img1: 
*          type: string
*        img2: 
*          type: string
*        img3: 
*          type: string
*    Designer:
*      required:
*      - designerName
*      type: object
*      properties:
*        designerName:
*          type: string
*          example: 미라클
*        designerSalon:
*          type: string
*          example: 에코노베이션
*        fav:
*          type: boolean
*          example: false
*    Cut:
*      required:
*      - cutName
*      type: object
*      properties:
*        cutName:
*          type: string
*          example: cut name test
*        cutLength:
*          type: integer
*          example: 5
*    Perm:
*      required: 
*      - permName
*      type: object
*      properties:
*        permName:
*          type: string
*          example: cut name test
*        permTime:
*          type: integer
*          example: 2
*    Dyeing:
*      required: 
*      - dyeingColor
*      type: object
*      properties:
*        dyeingColor:
*          type: string
*          example: cut name test
*        dyeingDecolorization:
*          type: integer
*          example: 2
*        dyeingTime:
*          type: integer
*          example: 3
*        dyeingHurt:
*          type: integer
*          example: 2
*  securitySchemes:
*    ApiKeyAuth:
*      type: apiKey
*      name: api_key
*      in: header
*/