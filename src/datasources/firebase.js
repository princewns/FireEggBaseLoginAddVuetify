//파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'

//파이어베이스 DB를 초기화
const oFirebase = firebase.initializeApp({
    //파이어베이스 콘솔에서 복사하여 붙여넣기
    apiKey : "AIzaSyDzBsUSoAFe9Ua6TV-lhi5pky18blYHQjU",
    authDomain : "myproject-7f683.firebaseapp.com",
});
//파이어베이스 인증 객체 공개
export const oFirebaseAuth = oFirebase.auth();